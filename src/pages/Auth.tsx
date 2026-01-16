import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { z } from 'zod';
import { useAuth } from '@/hooks/useAuth';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Lock, Mail, Eye, EyeOff } from 'lucide-react';

const loginSchema = z.object({
  email: z.string().trim().email({ message: "Email inválido" }),
  password: z.string().min(6, { message: "La contraseña debe tener al menos 6 caracteres" }),
});

export default function Auth() {
  const navigate = useNavigate();
  const { user, isLoading: authLoading, signIn, signUp } = useAuth();
  const { toast } = useToast();
  
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({});

  // Redirect if already logged in
  useEffect(() => {
    if (!authLoading && user) {
      navigate('/dashboard');
    }
  }, [user, authLoading, navigate]);

  const validateForm = () => {
    try {
      loginSchema.parse({ email, password });
      setErrors({});
      return true;
    } catch (error) {
      if (error instanceof z.ZodError) {
        const fieldErrors: { email?: string; password?: string } = {};
        error.errors.forEach((err) => {
          if (err.path[0] === 'email') fieldErrors.email = err.message;
          if (err.path[0] === 'password') fieldErrors.password = err.message;
        });
        setErrors(fieldErrors);
      }
      return false;
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsSubmitting(true);

    try {
      if (isLogin) {
        const { error } = await signIn(email, password);
        
        if (error) {
          if (error.message.includes('Invalid login credentials')) {
            toast({
              title: "Error de acceso",
              description: "Credenciales inválidas. Verifica tu email y contraseña.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        toast({
          title: "¡Bienvenido!",
          description: "Has iniciado sesión correctamente.",
          className: "bg-green-600 text-white border-none",
        });
        
        navigate('/dashboard');
      } else {
        const { error } = await signUp(email, password);
        
        if (error) {
          if (error.message.includes('User already registered')) {
            toast({
              title: "Usuario existente",
              description: "Este email ya está registrado. Intenta iniciar sesión.",
              variant: "destructive",
            });
          } else {
            toast({
              title: "Error",
              description: error.message,
              variant: "destructive",
            });
          }
          return;
        }

        toast({
          title: "Cuenta creada",
          description: "Tu cuenta ha sido creada. Ahora puedes iniciar sesión.",
          className: "bg-green-600 text-white border-none",
        });
        
        setIsLogin(true);
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  if (authLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900">
        <Loader2 className="h-8 w-8 animate-spin text-amber-500" />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 p-4">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-slate-700 bg-slate-800/50 backdrop-blur-sm shadow-2xl">
          <CardHeader className="text-center space-y-2">
            <div className="mx-auto w-16 h-16 bg-gradient-to-br from-amber-500 to-amber-600 rounded-full flex items-center justify-center mb-4">
              <Lock className="h-8 w-8 text-white" />
            </div>
            <CardTitle className="text-2xl font-bold text-white">
              {isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'}
            </CardTitle>
            <CardDescription className="text-slate-400">
              {isLogin 
                ? 'Accede al panel de administración' 
                : 'Registra una nueva cuenta'}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-slate-200">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="correo@ejemplo.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500"
                    disabled={isSubmitting}
                  />
                </div>
                {errors.email && (
                  <p className="text-sm text-red-400">{errors.email}</p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="password" className="text-slate-200">Contraseña</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
                  <Input
                    id="password"
                    type={showPassword ? 'text' : 'password'}
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 pr-10 bg-slate-700/50 border-slate-600 text-white placeholder:text-slate-500 focus:border-amber-500 focus:ring-amber-500"
                    disabled={isSubmitting}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-300"
                  >
                    {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-sm text-red-400">{errors.password}</p>
                )}
              </div>

              <Button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-white font-semibold py-2.5"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    {isLogin ? 'Iniciando sesión...' : 'Creando cuenta...'}
                  </>
                ) : (
                  isLogin ? 'Iniciar Sesión' : 'Crear Cuenta'
                )}
              </Button>
            </form>

            <div className="mt-6 text-center">
              <button
                onClick={() => setIsLogin(!isLogin)}
                className="text-sm text-amber-400 hover:text-amber-300 transition-colors"
              >
                {isLogin 
                  ? '¿No tienes cuenta? Regístrate' 
                  : '¿Ya tienes cuenta? Inicia sesión'}
              </button>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </div>
  );
}
