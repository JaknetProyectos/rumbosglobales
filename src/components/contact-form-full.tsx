"use client";

import { useState, FormEvent } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";
import {
  Check,
  Loader2,
  AlertCircle,
  Send,
  Compass,
  Calendar,
  Users,
  MapPin,
  User,
  Mail,
  Phone,
  FileText,
  Sparkles,
} from "lucide-react";
import { useContact, ContactData } from "@/hooks/useContact";

export function AdvancedContactForm() {
  const t = useTranslations("advancedContactForm");
  const { sendContactForm, isLoading } = useContact();

  const [feedback, setFeedback] = useState<{
    type: "success" | "error" | null;
    message: string;
  }>({ type: null, message: "" });

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setFeedback({ type: null, message: "" });

    const form = e.currentTarget;
    const formData = new FormData(form);

    const nombre = (formData.get("nombre") as string)?.trim() || "";
    const estadoCiudad = (formData.get("estadoCiudad") as string)?.trim() || "";
    const email = (formData.get("email") as string)?.trim() || "";
    const telefono = (formData.get("telefono") as string)?.trim() || "";
    const destino = (formData.get("destino") as string)?.trim() || "";
    const fecha = (formData.get("fecha") as string)?.trim() || "";
    const viajeros = (formData.get("viajeros") as string)?.trim() || "";
    const detalles = (formData.get("detalles") as string)?.trim() || "";

    const asunto = `${t("emailFormat.subjectPrefix")}: ${destino ? destino : t("emailFormat.defaultDestination")} - ${nombre}`;

    const mensajeEstructurado = `
========================================
${t("emailFormat.header")}
========================================

👤 ${t("emailFormat.clientData")}:
- ${t("emailFormat.name")}: ${nombre}
- ${t("emailFormat.origin")}: ${estadoCiudad || t("emailFormat.notSpecified")}
- ${t("emailFormat.email")}: ${email}
- ${t("emailFormat.phone")}: ${telefono}

✈️ ${t("emailFormat.tripDetails")}:
- ${t("emailFormat.destination")}: ${destino || t("emailFormat.notSpecified")}
- ${t("emailFormat.date")}: ${fecha || t("emailFormat.notSpecified")}
- ${t("emailFormat.travelers")}: ${viajeros || t("emailFormat.notSpecified")}

📝 ${t("emailFormat.additionalNotes")}:
${detalles || t("emailFormat.noDetails")}
========================================
`.trim();

    const data: ContactData = {
      nombre,
      email,
      telefono,
      asunto,
      mensaje: mensajeEstructurado,
      estadoCiudad,
      destino,
      fecha,
      viajeros,
      detallesOriginales: detalles,
      servicioDeseado: "Cotización de Viaje",
    };

    const result = await sendContactForm(data);

    if (result.success) {
      setFeedback({
        type: "success",
        message: t("feedback.success"),
      });
      form.reset();

      setTimeout(() => {
        setFeedback({ type: null, message: "" });
      }, 6000);
    } else {
      setFeedback({
        type: "error",
        message: result.error || t("feedback.errorDefault"),
      });
    }
  };

  return (
    <div className="relative w-full max-w-4xl mx-auto rounded-[2rem] border-4 border-[#031f3d] bg-[#0d5757] p-8 md:p-12 shadow-2xl font-sans selection:bg-[#fea43a] selection:text-[#031f3d]">
      
      {/* Encabezado */}
      <div className="mb-10 pb-8 border-b-2 border-[#031f3d]">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest text-[#031f3d] bg-[#fea43a] border-2 border-[#031f3d] shadow-sm">
          <Sparkles className="w-4 h-4 text-[#031f3d]" />
          {t("badge")}
        </span>
        <h2 className="text-3xl md:text-5xl font-extrabold text-white mt-4 tracking-tight">
          {t("titleStart")}{" "}
          <span className="text-[#fea43a]">
            {t("titleHighlight")}
          </span>
        </h2>
        <p className="text-base text-teal-100 mt-3 leading-relaxed font-medium">
          {t("subtitle")}
        </p>
      </div>

      {/* Formulario Grid */}
      <form onSubmit={handleSubmit} className="space-y-8">
        {/* FILA 1: Nombre + Estado/Ciudad */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithIcon
            id="nombre"
            name="nombre"
            label={t("fields.fullName.label")}
            icon={User}
            placeholder={t("fields.fullName.placeholder")}
            required
            disabled={isLoading}
          />
          <InputWithIcon
            id="estadoCiudad"
            name="estadoCiudad"
            label={t("fields.origin.label")}
            icon={MapPin}
            placeholder={t("fields.origin.placeholder")}
            disabled={isLoading}
          />
        </div>

        {/* FILA 2: Email + Teléfono */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <InputWithIcon
            id="email"
            name="email"
            type="email"
            label={t("fields.email.label")}
            icon={Mail}
            placeholder={t("fields.email.placeholder")}
            required
            disabled={isLoading}
          />
          <InputWithIcon
            id="telefono"
            name="telefono"
            type="tel"
            label={t("fields.phone.label")}
            icon={Phone}
            placeholder={t("fields.phone.placeholder")}
            required
            disabled={isLoading}
          />
        </div>

        {/* FILA 3: Destino + Fecha + Viajeros */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <InputWithIcon
            id="destino"
            name="destino"
            label={t("fields.destination.label")}
            icon={Compass}
            placeholder={t("fields.destination.placeholder")}
            required
            disabled={isLoading}
          />
          <InputWithIcon
            id="fecha"
            name="fecha"
            type="date"
            label={t("fields.date.label")}
            icon={Calendar}
            required
            disabled={isLoading}
          />
          <InputWithIcon
            id="viajeros"
            name="viajeros"
            type="number"
            min="1"
            label={t("fields.travelers.label")}
            icon={Users}
            placeholder={t("fields.travelers.placeholder")}
            required
            disabled={isLoading}
          />
        </div>

        {/* FILA 4: Textarea */}
        <div className="space-y-2.5">
          <label htmlFor="detalles" className="text-xs font-black uppercase tracking-wider text-[#fea43a] flex items-center gap-2">
            <FileText className="w-4 h-4 text-[#fea43a]" />
            {t("fields.details.label")}
          </label>
          <div className="p-1 rounded-2xl bg-white border-2 border-[#031f3d]">
            <textarea
              id="detalles"
              name="detalles"
              rows={4}
              disabled={isLoading}
              placeholder={t("fields.details.placeholder")}
              className="w-full resize-y rounded-xl bg-white px-5 py-4 text-sm text-[#031f3d] font-semibold outline-none placeholder:text-slate-400 disabled:opacity-50"
            />
          </div>
        </div>

        {/* Mensajes de feedback */}
        <AnimatePresence mode="wait">
          {feedback.type === "success" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 rounded-2xl bg-[#fea43a] p-5 text-sm font-black text-[#031f3d] border-2 border-[#031f3d] shadow-lg"
            >
              <Check className="h-6 w-6 text-[#031f3d] shrink-0" strokeWidth={3} />
              <span>{feedback.message}</span>
            </motion.div>
          )}

          {feedback.type === "error" && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex items-center gap-3 rounded-2xl bg-red-100 p-5 text-sm font-black text-red-900 border-2 border-[#031f3d] shadow-lg"
            >
              <AlertCircle className="h-6 w-6 text-red-600 shrink-0" strokeWidth={2.5} />
              <span>{feedback.message}</span>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Botón de Submit */}
        <div className="flex justify-end pt-4">
          <motion.button
            whileTap={!isLoading && feedback.type !== "success" ? { scale: 0.98 } : {}}
            whileHover={!isLoading && feedback.type !== "success" ? { scale: 1.02 } : {}}
            type="submit"
            disabled={isLoading || feedback.type === "success"}
            className="w-full sm:w-auto px-10 py-4 bg-[#fea43a] hover:bg-[#f99827] text-[#031f3d] font-black uppercase tracking-wider rounded-2xl text-sm border-2 border-[#031f3d] shadow-xl transition-all duration-200 flex items-center justify-center gap-3 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100"
          >
            {isLoading ? (
              <>
                <Loader2 className="h-5 w-5 animate-spin" />
                {t("buttons.processing")}
              </>
            ) : feedback.type === "success" ? (
              <>
                <Check className="h-5 w-5" strokeWidth={3} />
                {t("buttons.sent")}
              </>
            ) : (
              <>
                <span>{t("buttons.send")}</span>
                <Send className="h-5 w-5" />
              </>
            )}
          </motion.button>
        </div>
      </form>
    </div>
  );
}

{/* Helper para Inputs en Card Blanco */}
function InputWithIcon({
  id,
  name,
  label,
  type = "text",
  placeholder,
  required = false,
  disabled = false,
  min,
  icon: Icon,
}: {
  id: string;
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  required?: boolean;
  disabled?: boolean;
  min?: string;
  icon: React.ElementType;
}) {
  return (
    <div className="space-y-2.5">
      <label htmlFor={id} className="text-xs font-black uppercase tracking-wider text-[#fea43a] flex items-center gap-2">
        <Icon className="w-4 h-4 text-[#fea43a]" />
        {label} {required && <span className="text-white">*</span>}
      </label>
      <div className="p-1 rounded-2xl bg-white border-2 border-[#031f3d]">
        <input
          id={id}
          name={name}
          type={type}
          min={min}
          required={required}
          disabled={disabled}
          placeholder={placeholder}
          className="w-full rounded-xl bg-white px-4 py-3.5 text-sm text-[#031f3d] font-semibold outline-none transition-all placeholder:text-slate-400 disabled:opacity-50"
        />
      </div>
    </div>
  );
}