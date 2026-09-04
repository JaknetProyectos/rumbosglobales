"use client";

import {
  Compass,
  Home,
  Menu,
  ShoppingBag,
  Users,
  X,
} from "lucide-react";
import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { useCart } from "@/hooks/use-cart";
import { cn } from "@/lib/utils";
import { Logo } from "./logo";
import { CartLink, LangToggle } from "./cart-link";

function NavLinks({
  pathname,
  onNavigate,
  isMobileDrawer = false,
}: {
  pathname: string;
  onNavigate?: () => void;
  isMobileDrawer?: boolean;
}) {
  const t = useTranslations("header.nav");

  const NAV = [
    { href: "/", label: t("home"), icon: Home },
    { href: "/quienes-somos", label: t("about"), icon: Users },
    { href: "/tienda", label: t("store"), icon: ShoppingBag },
    { href: "/cotiza-tu-experiencia", label: t("quote"), icon: Compass },
  ];

  return (
    <nav className={cn("flex items-center justify-center", isMobileDrawer ? "flex-col gap-2 w-full" : "flex-row gap-1 sm:gap-2")}>
      {NAV.map((item) => {
        const Icon = item.icon;
        const active =
          item.href === "/"
            ? pathname === "/"
            : pathname === item.href || pathname.startsWith(`${item.href}/`);
        const isShop =
          item.href === "/tienda" && pathname.startsWith("/producto");
        const isActive = active || isShop;

        return (
          <Link
            key={item.href}
            href={item.href}
            onClick={onNavigate}
            className={cn(
              "group relative flex items-center justify-center rounded-full transition-all duration-300 ease-out active:scale-90",
              isMobileDrawer
                ? "w-full justify-start gap-3 px-4 py-3 text-white"
                : "px-2.5 py-1.5 sm:px-3.5 sm:py-2",
              isActive && !isMobileDrawer && "scale-105"
            )}
          >
            {/* Tab iluminada activa */}
            {isActive && !isMobileDrawer && (
              <span className="absolute inset-0 bg-gradient-to-r from-[#fea43a] to-[#fea43a]/90 rounded-full shadow-md shadow-[#fea43a]/30 animate-pulse" />
            )}

            <Icon
              className={cn(
                "relative z-10 h-5 w-5 transition-transform duration-300 group-hover:scale-110",
                isActive
                  ? isMobileDrawer
                    ? "text-[#fea43a]"
                    : "text-[#031f3d]"
                  : isMobileDrawer
                    ? "text-[#0d5757]"
                    : "text-[#0d5757] group-hover:text-[#031f3d]"
              )}
            />

            <span
              className={cn(
                "relative z-10 text-xs font-bold transition-all duration-300",
                isMobileDrawer
                  ? "block text-base font-medium"
                  : "hidden md:inline-block ml-1.5",
                isActive
                  ? isMobileDrawer
                    ? "text-[#fea43a]"
                    : "text-[#031f3d]"
                  : isMobileDrawer
                    ? "text-white"
                    : "text-[#0d5757]"
              )}
            >
              {item.label}
            </span>
          </Link>
        );
      })}
    </nav>
  );
}

export function Header() {
  const t = useTranslations("header");
  const pathname = usePathname();
  const { itemCount } = useCart();
  const [open, setOpen] = useState(false);

  useEffect(() => {
    setOpen(false);
  }, [pathname]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  return (
    <header className="fixed top-0 left-0 right-0 z-50 w-full max-w-5xl mx-auto rounded-3xl mt-5 border-t border-x border-[#0d5757]/15 bg-white shadow-2xl shadow-[#031f3d]/20 px-4 py-2.5 sm:px-6">
      {/* Contenedor Único Centrado Verticalmente */}
      <div className="flex items-center justify-between gap-2 h-12">
        {/* Logo */}
        <div className="flex items-center shrink-0">
          <Logo />
        </div>

        {/* Navegación central con tabs */}
        <div className="flex items-center justify-center flex-1">
          <NavLinks pathname={pathname} />
        </div>

        {/* Acciones de la derecha (Carrito + Menú Móvil opcional) */}
        <div className="flex items-center gap-2 shrink-0">

          <LangToggle />

          <CartLink />



          <button
            type="button"
            onClick={() => setOpen((v) => !v)}
            aria-label={open ? t("aria.closeMenu") : t("aria.openMenu")}
            className="flex h-9 w-9 items-center justify-center rounded-full bg-[#0d5757]/10 text-[#031f3d] transition-transform active:scale-90 md:hidden"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Desplegable móvil (Drawer emergente hacia arriba) */}
      {open && (
        <div className="absolute bottom-full left-0 right-0 mb-2 rounded-2xl border border-[#0d5757]/20 bg-[#031f3d] p-5 shadow-2xl md:hidden animate-in fade-in slide-in-from-bottom-3 duration-300">
          <NavLinks pathname={pathname} onNavigate={() => setOpen(false)} isMobileDrawer />

          <div className="mt-4 border-t border-[#0d5757]/30 pt-4 flex items-center justify-between text-white">
            <span className="text-xs uppercase tracking-wider text-[#fea43a]/90 font-medium">{t("reservations")}</span>
            <a
              href="tel:5515836982"
              className="text-sm font-extrabold text-white hover:text-[#fea43a] transition-colors"
              style={{ fontFamily: "var(--font-display)" }}
            >
              55 1583 6982
            </a>
          </div>
        </div>
      )}
    </header>
  );
}