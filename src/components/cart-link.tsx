import { useLocaleContext } from "@/context/LangContext";
import { useCart } from "@/hooks/use-cart";
import { Link } from "@/i18n/routing";
import { Languages, Loader2, ShoppingCart } from "lucide-react";

export function CartLink({
    onNavigate,
}: {
    onNavigate?: () => void;
}) {

    const { itemCount } = useCart()
    return (
        <Link
            href="/carrito"
            onClick={onNavigate}
            aria-label="Carrito"
            className="relative flex h-10 w-10 items-center justify-center rounded-full bg-purple-100 text-purple-700 transition-all duration-300 hover:bg-orange-500 hover:text-white shadow-sm"
        >
            <ShoppingCart className="h-5 w-5" strokeWidth={2} />
            {itemCount > 0 && (
                <span className="absolute -right-1 -top-1 flex h-5 min-w-5 items-center justify-center rounded-full bg-orange-500 px-1 text-[10px] font-bold text-white ring-2 ring-white shadow-sm">
                    {itemCount}
                </span>
            )}
        </Link>
    );
}

export function LangToggle() {
    const { locale, switchLanguage, isPending } = useLocaleContext();
    const nextLang = locale === "es" ? "en" : "es";

    return (
        <button
            onClick={() => switchLanguage(nextLang)}
            disabled={isPending}
            aria-label="Cambiar idioma"
            className="group relative flex h-9 items-center justify-center gap-1.5 rounded-full bg-[#0d5757]/10 px-3 text-[#0d5757] transition-all duration-300 ease-out hover:bg-[#0d5757] hover:text-white active:scale-90 border border-[#0d5757]/15 disabled:opacity-50"
        >
            {isPending ? (
                <Loader2 className="h-4 w-4 animate-spin text-[#0d5757] group-hover:text-white" />
            ) : (
                <Languages className="h-4 w-4 text-[#0d5757] transition-transform duration-300 group-hover:scale-110 group-hover:text-white" />
            )}

            <div className="flex items-center gap-0.5 text-xs font-bold tracking-tight">
                <span className="text-[#031f3d] transition-colors group-hover:text-[#fea43a]">
                    {locale.toUpperCase()}
                </span>
                <span className="text-[#0d5757]/40 group-hover:text-white/40">/</span>
                <span className="text-[#0d5757]/70 transition-colors group-hover:text-white/80">
                    {nextLang.toUpperCase()}
                </span>
            </div>
        </button>
    );
}