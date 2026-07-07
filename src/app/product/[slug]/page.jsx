import Link from "next/link";
import { notFound } from "next/navigation";
import { AspectRatio } from "@/components/ui/aspect-ratio";
import { Button } from "@/components/ui/button";
import { Price, PriceValue } from "@/components/shadcnblocks/price";
import { getProductBySlug, PRODUCTS_LIST } from "@/lib/products";
import Navbar from "@/components/features/nav/navbar";
import Footer from "@/components/features/footer";

export function generateStaticParams() {
    return PRODUCTS_LIST.map((product) => ({ slug: product.slug }));
}

export default async function ProductPage({ params }) {
    const { slug } = await params;
    const product = getProductBySlug(slug);

    if (!product) {
        notFound();
    }

    const { name, description, image, price, hardcover, noMarks, volumes } = product;
    const { regular, sale, currency } = price;

    return (
        <>
            <Navbar />

            <div className="min-h-screen bg-paper">
                <div className="mx-auto w-full max-w-6xl px-6 py-14 lg:py-20">

                    {/* Breadcrumb */}
                    <div className="mb-10">
                        <Link
                            href="/"
                            className="group inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.18em] text-ink-soft transition-colors hover:text-terracotta"
                        >
                            <span className="transition-transform group-hover:-translate-x-0.5">←</span>
                            Voltar ao Catálogo
                        </Link>
                    </div>

                    <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-16 xl:grid-cols-[1.1fr_0.9fr]">

                        {/* ── Imagem ── */}
                        <div className="relative">
                            {/* Lombada decorativa — elemento assinatura */}
                            <div
                                aria-hidden="true"
                                className="absolute -left-3 top-6 bottom-6 w-1.5 rounded-full bg-terracotta/40"
                            />

                            <div className="overflow-hidden rounded-2xl shadow-[0_8px_40px_-8px_rgba(0,0,0,0.18)]">
                                <AspectRatio ratio={volumes ? 4 / 3 : 3 / 4} className={volumes ? "bg-paper-soft" : ""}>
                                    <img
                                        src={image.src}
                                        alt={image.alt}
                                        className={`h-full w-full transition-transform duration-700 hover:scale-[1.03] ${volumes ? "object-contain object-center p-6" : "object-cover object-top"}`}
                                    />
                                </AspectRatio>
                            </div>
                        </div>

                        {/* ── Informações ── */}
                        <div className="flex flex-col gap-8 lg:py-2">

                            {/* Eyebrow + título */}
                            <div className="space-y-3">
                                <h1 className="text-3xl font-semibold leading-snug tracking-tight text-ink lg:text-4xl">
                                    {name}
                                </h1>
                                <p className="text-sm leading-relaxed text-ink-soft">
                                    {description}
                                </p>
                            </div>

                            {/* Badges de condição */}
                            {(hardcover || noMarks || volumes) && (
                                <div className="flex flex-wrap gap-2">
                                    {hardcover && (
                                        <Badge variant="terracotta">Capa dura</Badge>
                                    )}
                                    {noMarks && (
                                        <Badge variant="sage">Sem rasuras</Badge>
                                    )}
                                    {volumes && (
                                        <Badge variant="neutral">
                                            Coleção {volumes.from}–{volumes.to}
                                        </Badge>
                                    )}
                                </div>
                            )}

                            {/* Divisória */}
                            <div className="h-px w-full bg-ink/8" />

                            {/* Preço + CTA */}
                            <div className="space-y-5">
                                <div>
                                    <p className="mb-1 text-[11px] font-bold uppercase tracking-[0.25em] text-ink-soft">
                                        Preço
                                    </p>
                                    <Price onSale={sale != null} className="flex items-baseline gap-3">
                                        <PriceValue
                                            price={sale ?? regular}
                                            currency={currency}
                                            variant="sale"
                                            locale="pt-BR"
                                            className="text-4xl font-semibold text-terracotta-deep"
                                        />
                                        {sale && (
                                            <PriceValue
                                                price={regular}
                                                currency={currency}
                                                variant="regular"
                                                locale="pt-BR"
                                                className="text-base font-medium text-ink-soft line-through"
                                            />
                                        )}
                                    </Price>
                                </div>

                                <Button
                                    asChild
                                    size="lg"
                                    className="w-full rounded-xl shadow-md transition-all hover:opacity-90 hover:shadow-lg active:scale-[0.98]"
                                >
                                    <a
                                        href="https://www.instagram.com/caarolxs__/"
                                        target="_blank"
                                        rel="noreferrer"
                                        className="flex items-center justify-center gap-2"
                                    >
                                        {/* Instagram icon inline */}
                                        <svg
                                            aria-hidden="true"
                                            xmlns="http://www.w3.org/2000/svg"
                                            width="18"
                                            height="18"
                                            viewBox="0 0 24 24"
                                            fill="none"
                                            stroke="currentColor"
                                            strokeWidth="2"
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                        >
                                            <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
                                            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
                                            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
                                        </svg>
                                        Chamar no Instagram
                                    </a>
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>
    );
}

/* ── Badge helper ────────────────────────────────────────── */
function Badge({ variant = "neutral", children }) {
    const styles = {
        terracotta:
            "border border-terracotta/25 bg-terracotta/[0.07] text-terracotta-deep",
        sage: "border border-sage/30 bg-sage/[0.08] text-sage",
        neutral: "border border-ink/10 bg-paper-soft text-ink-soft",
    };

    return (
        <span
            className={`inline-flex items-center rounded-full px-3 py-1.5 text-[11px] font-bold uppercase tracking-[0.15em] ${styles[variant]}`}
        >
            {children}
        </span>
    );
}