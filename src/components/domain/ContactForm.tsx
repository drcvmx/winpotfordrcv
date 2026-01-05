import { useState } from "react";
import { z } from "zod";
import { FormInput, FormTextarea } from "@/components/ui/form-input";
import { Checkbox } from "@/components/ui/checkbox";
import { Text } from "@/components/ui/typography";
import { useToast } from "@/hooks/use-toast";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Nombre es requerido").max(100),
  email: z.string().trim().email("Email inválido").max(255),
  phone: z.string().trim().max(20).optional(),
  age: z.string().trim().max(3).optional(),
  subject: z.string().trim().max(200).optional(),
  message: z.string().trim().min(1, "Mensaje es requerido").max(1000),
  acceptPrivacy: z.literal(true, { errorMap: () => ({ message: "Debes aceptar el aviso de privacidad" }) }),
});

export function ContactForm() {
  const { toast } = useToast();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    age: "",
    subject: "",
    message: "",
    acceptPrivacy: false,
  });
  const [errors, setErrors] = useState<Record<string, string>>({});

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) setErrors((prev) => ({ ...prev, [name]: "" }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const result = contactSchema.safeParse(formData);
    
    if (!result.success) {
      const fieldErrors: Record<string, string> = {};
      result.error.errors.forEach((err) => {
        if (err.path[0]) fieldErrors[err.path[0] as string] = err.message;
      });
      setErrors(fieldErrors);
      return;
    }

    toast({ title: "Mensaje enviado", description: "Nos pondremos en contacto pronto." });
    setFormData({ name: "", email: "", phone: "", age: "", subject: "", message: "", acceptPrivacy: false });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <FormInput
        name="name"
        placeholder="Nombre*"
        value={formData.name}
        onChange={handleChange}
        className={errors.name ? "border-destructive" : ""}
      />
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="email"
          type="email"
          placeholder="Correo electrónico*"
          value={formData.email}
          onChange={handleChange}
          className={errors.email ? "border-destructive" : ""}
        />
        <FormInput
          name="phone"
          type="tel"
          placeholder="Teléfono"
          value={formData.phone}
          onChange={handleChange}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <FormInput
          name="age"
          placeholder="Edad*"
          value={formData.age}
          onChange={handleChange}
        />
        <FormInput
          name="subject"
          placeholder="Asunto"
          value={formData.subject}
          onChange={handleChange}
        />
      </div>

      <FormTextarea
        name="message"
        placeholder="Mensaje"
        value={formData.message}
        onChange={handleChange}
        className={errors.message ? "border-destructive" : ""}
      />

      <div className="flex items-start gap-3">
        <Checkbox
          id="privacy"
          checked={formData.acceptPrivacy}
          onCheckedChange={(checked) => setFormData((prev) => ({ ...prev, acceptPrivacy: checked === true }))}
          className="mt-1"
        />
        <label htmlFor="privacy" className="text-sm text-muted-foreground cursor-pointer">
          Al enviar aceptas nuestro <span className="underline">Aviso de Privacidad</span>
        </label>
      </div>
      {errors.acceptPrivacy && <Text size="xs" className="text-destructive">{errors.acceptPrivacy}</Text>}

      <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground font-semibold px-8 py-3 rounded transition-all">
        Enviar
      </button>
    </form>
  );
}
