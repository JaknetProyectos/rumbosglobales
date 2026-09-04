import type { Metadata } from "next";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { ContactForm } from "@/components/contact-form";
import { Link } from "@/i18n/routing";
import { AdvancedContactForm } from "@/components/contact-form-full";
import {
  Compass,
  MapPin,
  Sparkles,
  Zap,
  ShieldCheck,
  CreditCard,
  Send,
  Plane,
  Luggage,
  CalendarCheck,
  ArrowRight,
} from "lucide-react";

export async function generateMetadata(): Promise<Metadata> {
  const t = await getTranslations("cotizaPage.metadata");

  return {
    title: t("title"),
    description: t("description"),
  };
}

export default function CotizaPage() {
  const t = useTranslations("cotizaPage");

  return (
    <div className="w-full bg-[#031f3d] text-white font-sans antialiased selection:bg-[#fea43a] selection:text-[#031f3d] overflow-hidden">
      {/* SECCIÓN 1: HERO PRINCIPAL */}
      <section className="relative overflow-hidden bg-[#031f3d] py-24 text-white lg:py-32">
        {/* Íconos Flotantes Animados */}
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <Plane className="absolute top-12 left-[8%] h-12 w-12 text-[#fea43a]/30 animate-bounce duration-1000" />
          <Compass className="absolute top-1/3 right-[10%] h-16 w-16 text-white/20 animate-spin-slow" />
          <MapPin className="absolute bottom-12 left-[15%] h-10 w-10 text-[#0d5757]/60 animate-pulse" />
          <Sparkles className="absolute top-16 right-[25%] h-8 w-8 text-[#fea43a]/40 animate-pulse" />
          <Luggage className="absolute bottom-16 right-[18%] h-14 w-14 text-white/20 animate-bounce duration-700" />
        </div>

        {/* Círculos con gradiente decorativos */}
        <div className="pointer-events-none absolute -top-24 -left-24 h-96 w-96 rounded-full bg-[#0d5757]/30 blur-3xl"></div>
        <div className="pointer-events-none absolute -bottom-24 -right-24 h-96 w-96 rounded-full bg-[#fea43a]/20 blur-3xl"></div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          <div className="mx-auto max-w-4xl space-y-6 text-center animate-fadeUp">
            <span className="inline-flex items-center gap-2 rounded-full border border-[#fea43a]/40 bg-[#fea43a]/10 px-4 py-1.5 text-xs font-extrabold uppercase tracking-widest text-[#fea43a] backdrop-blur-md shadow-sm">
              <Sparkles className="h-4 w-4 text-[#fea43a]" /> {t("hero.badge")}
            </span>

            <h1 className="text-4xl font-black leading-tight tracking-tight sm:text-5xl md:text-6xl text-white drop-shadow-sm">
              {t("hero.titleLine1")} <br className="hidden sm:inline" />
              <span className="bg-gradient-to-r from-[#fea43a] via-amber-300 to-[#fea43a] bg-clip-text text-transparent">
                {t("hero.titleLine2")}
              </span>
            </h1>

            <p className="mx-auto mt-6 max-w-2xl text-base leading-relaxed text-slate-200 sm:text-lg font-medium">
              {t("hero.description")}
            </p>
          </div>
        </div>
      </section>


      {/* SECCIÓN 2: FILOSOFÍA DE DISEÑO (Fondo Azul con Cards Amarillas) */}
      <section className="relative bg-[#031f3d] py-20 text-white lg:py-28">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-[1fr,minmax(0,0.9fr)] lg:items-center">
            <div className="space-y-6 animate-fadeRight">
              <div className="inline-flex items-center gap-2 rounded-full bg-[#fea43a]/20 border border-[#fea43a]/40 px-3.5 py-1.5 text-xs font-black text-[#fea43a] uppercase tracking-wider">
                <Zap className="h-4 w-4" /> {t("philosophy.badge")}
              </div>

              <h2 className="text-3xl font-black tracking-tight text-white sm:text-4xl lg:text-5xl">
                {t("philosophy.titleLine1")}{" "}
                <span className="text-[#fea43a]">
                  {t("philosophy.titleLine2")}
                </span>
              </h2>

              <p className="text-base leading-relaxed text-slate-300 font-normal">
                {t("philosophy.description")}
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
                {/* Card Amarilla 1 */}
                <div className="flex items-start gap-3 rounded-2xl border-2 border-[#031f3d] bg-[#fea43a] p-5 text-[#031f3d] shadow-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#031f3d] text-[#fea43a] shadow-md">
                    <ShieldCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#031f3d]">{t("philosophy.features.securityTitle")}</h4>
                    <p className="text-xs text-[#031f3d]/80 font-medium mt-0.5">{t("philosophy.features.securityDesc")}</p>
                  </div>
                </div>

                {/* Card Amarilla 2 */}
                <div className="flex items-start gap-3 rounded-2xl border-2 border-[#031f3d] bg-[#fea43a] p-5 text-[#031f3d] shadow-lg">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#0d5757] text-white shadow-md">
                    <CalendarCheck className="h-5 w-5" />
                  </div>
                  <div>
                    <h4 className="text-sm font-black text-[#031f3d]">{t("philosophy.features.flexibilityTitle")}</h4>
                    <p className="text-xs text-[#031f3d]/80 font-medium mt-0.5">{t("philosophy.features.flexibilityDesc")}</p>
                  </div>
                </div>
              </div>
            </div>

            {/* Card Amarilla Destacada en la Derecha */}
            <div className="relative animate-fadeUp">
              <div className="absolute -inset-2 rounded-3xl bg-[#fea43a]/30 blur-xl"></div>
              <div className="relative rounded-3xl border-4 border-[#0d5757] bg-[#fea43a] p-8 text-[#031f3d] shadow-2xl">
                <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#031f3d] text-[#fea43a] mb-6 shadow-md">
                  <Send className="h-7 w-7" />
                </div>
                <h3 className="text-2xl font-black text-[#031f3d]">{t("howItWorks.title")}</h3>
                <ul className="mt-6 space-y-4 text-sm font-semibold text-[#031f3d]">
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#031f3d] text-xs font-black text-[#fea43a]">1</span>
                    <span>{t("howItWorks.step1")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#031f3d] text-xs font-black text-[#fea43a]">2</span>
                    <span>{t("howItWorks.step2")}</span>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded-full bg-[#031f3d] text-xs font-black text-[#fea43a]">3</span>
                    <span>{t("howItWorks.step3")}</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECCIÓN 3: FORMULARIO AVANZADO */}
      <section className="relative bg-[#031f3d] py-16 lg:py-24 border-b border-[#0d5757]">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border-4 border-[#031f3d] bg-[#fea43a] p-6 sm:p-10 text-[#031f3d] shadow-2xl">
            <AdvancedContactForm />
          </div>
        </div>
      </section>


      {/* SECCIÓN 4: FINALIZACIÓN DE RESERVA */}
      <section className="relative overflow-hidden bg-[#031f3d] py-20 text-white lg:py-28">
        <div className="pointer-events-none absolute inset-0 overflow-hidden">
          <CreditCard className="absolute top-10 right-10 h-24 w-24 text-[#fea43a]/10 animate-pulse" />
          <Sparkles className="absolute bottom-10 left-10 h-20 w-20 text-[#0d5757]/30 animate-spin-slow" />
        </div>

        <div className="container relative mx-auto px-4 sm:px-6 lg:px-8">
          {/* Card Amarilla para el Call to Action */}
          <div className="mx-auto max-w-3xl rounded-3xl border-4 border-[#031f3d] bg-[#fea43a] p-8 md:p-12 text-[#031f3d] shadow-2xl text-center space-y-8 animate-fadeUp">
            <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#031f3d] text-[#fea43a] shadow-lg">
              <CreditCard className="h-8 w-8" />
            </div>

            <div className="space-y-4">
              <h2 className="text-3xl font-black tracking-tight sm:text-4xl text-[#031f3d]">
                {t("checkout.titleLine1")}{" "}
                <span className="text-[#0d5757]">
                  {t("checkout.titleLine2")}
                </span>
              </h2>

              <p className="mx-auto max-w-2xl text-sm leading-relaxed text-[#031f3d]/90 font-semibold sm:text-base">
                {t("checkout.description")}
              </p>
            </div>

            <div className="pt-2">
              <Link
                href="/producto/tour-personalizado"
                className="inline-flex items-center justify-center gap-3 rounded-full bg-[#031f3d] px-8 py-4 text-base font-extrabold text-[#fea43a] shadow-xl transition-all duration-300 hover:scale-105 hover:bg-[#0d5757] hover:text-white border-2 border-[#031f3d] active:scale-95"
              >
                <span>{t("checkout.button")}</span>
                <ArrowRight className="h-5 w-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>


      {/* SECCIÓN 5: FORMULARIO BASE */}
      <section className="bg-[#031f3d] py-20 lg:py-24">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl  shadow-2xl">
            <ContactForm />
          </div>
        </div>
      </section>
    </div>
  );
}