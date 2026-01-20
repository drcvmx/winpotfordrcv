import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Tabs, TabsList, TabsTrigger, TabsContent } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import winpotLogo from "@/assets/winpot-logo.svg";
import { useAuth } from "@/hooks/useAuth";
import { Loader2, LogOut } from "lucide-react";

// Tab content components
import ContentEditorTab from "@/components/dashboard/ContentEditorTab";

const tabs = [
  { id: "editor", label: "EDITOR DE CONTENIDO" },
];

const Dashboard = () => {
  const [activeTab, setActiveTab] = useState("editor");
  const navigate = useNavigate();
  const { user, isLoading, isEditor, signOut } = useAuth();

  // Redirect if not authenticated or not authorized
  useEffect(() => {
    if (!isLoading && !user) {
      navigate('/login');
    }
  }, [user, isLoading, navigate]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/login');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <Loader2 className="h-8 w-8 animate-spin text-casino-gold" />
      </div>
    );
  }

  if (!user) {
    return null;
  }

  if (!isEditor()) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="text-center p-8">
          <h1 className="text-2xl font-bold text-foreground mb-4">Acceso Denegado</h1>
          <p className="text-muted-foreground mb-6">No tienes permisos para acceder al Dashboard.</p>
          <Button onClick={handleSignOut} variant="outline">
            <LogOut className="mr-2 h-4 w-4" />
            Cerrar Sesión
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header Section */}
      <header className="pt-12 pb-8 px-4">
        <div className="max-w-7xl mx-auto">
          {/* Logo Centered */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="flex justify-center mb-8"
          >
            <img
              src={winpotLogo}
              alt="Winpot Casino"
              className="h-16 md:h-20"
            />
          </motion.div>

          {/* Welcome Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="max-w-4xl mx-auto"
          >
            <div className="casino-card p-6 sm:p-8 md:p-10 relative overflow-hidden">
              {/* Decorative gradient accent */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-casino-gold via-casino-dark-gold to-casino-gold" />

              <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                <div className="flex-1 min-w-0">
                  <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-foreground mb-2 sm:mb-4">
                    Hola <span className="casino-text-gradient break-all">{user.email}</span>,
                  </h1>
                  <p className="text-muted-foreground text-sm sm:text-base md:text-lg leading-relaxed">
                    Bienvenido al panel de control. Desde aquí puedes gestionar el contenido de todas las sucursales.
                  </p>
                </div>
                <Button
                  onClick={handleSignOut}
                  variant="outline"
                  className="shrink-0 w-full sm:w-auto border-red-500/50 text-red-400 hover:bg-red-500/10"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Salir
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </header>

      {/* Tabs Section */}
      <main className="px-4 pb-16">
        <div className="max-w-7xl mx-auto">
          <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
            {/* Tab Navigation */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="mb-8"
            >
              <TabsList className="w-full h-auto flex-wrap justify-center gap-2 bg-transparent p-0">
                {tabs.map((tab) => (
                  <TabsTrigger
                    key={tab.id}
                    value={tab.id}
                    className="px-4 py-3 text-xs md:text-sm font-medium rounded-lg transition-all duration-300 data-[state=active]:bg-casino-gold data-[state=active]:text-black data-[state=inactive]:bg-card data-[state=inactive]:text-muted-foreground data-[state=inactive]:border data-[state=inactive]:border-border data-[state=inactive]:hover:border-casino-gold/50 data-[state=inactive]:hover:text-casino-gold"
                  >
                    {tab.label}
                  </TabsTrigger>
                ))}
              </TabsList>
            </motion.div>

            {/* Tab Content with Animation */}
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
              >
                <TabsContent value="editor" className="mt-0">
                  <ContentEditorTab />
                </TabsContent>
              </motion.div>
            </AnimatePresence>
          </Tabs>
        </div>
      </main>
    </div>
  );
};

export default Dashboard;
