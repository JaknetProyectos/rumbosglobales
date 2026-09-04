"use client";

import { Link } from "@/i18n/routing";
import { useTranslations } from "next-intl";
import { ShieldCheck, FileText, RefreshCw, Compass, Copyright, Sparkles } from "lucide-react";

export function SiteFooter() {
  const t = useTranslations("footer");

  const LINKS = [
    { 
      href: "/legal/privacidad", 
      label: t("links.privacyPolicy"),
      icon: ShieldCheck 
    },
    { 
      href: "/legal/terminos", 
      label: t("links.termsAndReturns"),
      icon: FileText 
    },
    { 
      href: "/legal/reembolsos", 
      label: t("links.refundPolicy"),
      icon: RefreshCw 
    },
  ];

  return (
    <footer className="relative overflow-hidden rounded-t-2xl bg-[#0d5757] text-white">

      <div className="relative mx-auto w-full max-w-7xl px-6 py-12 lg:px-10">
        {/* Layout organizado en Columnas */}
        <div className="grid grid-cols-1 gap-10 md:grid-cols-3 border-b border-white/10 pb-10">
          
          {/* Columna 1: Marca e Identidad */}
          <div className="flex flex-col items-start gap-4">
            <div className="flex items-center gap-3">
              <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-[#fea43a] text-[#031f3d] shadow-lg shadow-[#fea43a]/20">
                <Compass className="h-7 w-7 animate-spin-slow" />
              </div>
              <span className="text-xl font-black tracking-tight text-[#fea43a]">
                Rumbos Globales
              </span>
            </div>
            <p className="text-xs font-medium leading-relaxed text-white/80 max-w-xs">
              {t("tagline")}
            </p>
          </div>

          {/* Columna 2: Enlaces Legales */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#fea43a] flex items-center gap-1.5">
              <Sparkles className="h-3.5 w-3.5" />
              Enlace Legal
            </h3>
            <ul className="flex flex-col gap-3">
              {LINKS.map((l) => {
                const Icon = l.icon;
                return (
                  <li key={l.href}>
                    <Link
                      href={l.href}
                      className="group inline-flex items-center gap-3 text-xs font-bold text-white/90 transition-colors duration-200 hover:text-[#fea43a]"
                    >
                      <div className="flex h-8 w-8 items-center justify-center rounded-xl bg-[#031f3d] text-[#fea43a] transition-all duration-200 group-hover:bg-[#fea43a] group-hover:text-[#031f3d]">
                        <Icon className="h-4 w-4" />
                      </div>
                      <span className="underline-offset-4 group-hover:underline">
                        {l.label}
                      </span>
                    </Link>
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Columna 3: Métodos de Pago Seguros */}
          <div className="flex flex-col gap-4">
            <h3 className="text-xs font-extrabold uppercase tracking-widest text-[#fea43a]">
              {t("securePayments")}
            </h3>
            <div className="flex flex-col items-start gap-3 rounded-2xl border-2 border-[#031f3d] bg-[#031f3d]/60 p-4 backdrop-blur-sm shadow-xl">
              <img
                src={"/cards.png"}
                alt={t("paymentMethodsAlt")}
                className="h-8 w-auto object-contain brightness-110 contrast-125"
              />
            </div>
          </div>

        </div>

        {/* Copyright y Pie de Página */}
        <div className="mt-8 flex flex-col items-center justify-between gap-4 text-center text-xs font-semibold text-white/70 sm:flex-row sm:text-left">
          <div className="flex items-center gap-2">
            <Copyright className="h-4 w-4 text-[#fea43a]" />
            <span>
              {t("copyright", { year: new Date().getFullYear() })}
            </span>
          </div>
        </div>
      </div>
    </footer>
  );
}