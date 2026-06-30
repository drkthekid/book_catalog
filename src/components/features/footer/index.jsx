import Image from "next/image";
import Link from "next/link";
import { Camera } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative border-t border-ink/10 bg-paper">
      {/* Linha decorativa dupla — referência à lombada de livro */}
      <div className="absolute inset-x-0 top-0 h-px bg-terracotta/30" />

      <div className="mx-auto w-full max-w-screen-xl px-4 py-8 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center gap-6 sm:flex-row sm:items-end sm:justify-between">

          {/* Logo / marca */}
          <Link href="/" className="group flex items-center gap-3">
            <span className="relative flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-[1.5px] border-terracotta transition-transform duration-300 group-hover:rotate-6">
              <span className="absolute inset-1 rounded-full border border-gold/60" />
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1.6"
                className="relative z-10 h-[17px] w-[17px] text-terracotta"
              >
                <path d="M4 4.5C4 3.67 4.67 3 5.5 3H11V21H5.5C4.67 21 4 20.33 4 19.5V4.5Z" />
                <path d="M20 4.5C20 3.67 19.33 3 18.5 3H13V21H18.5C19.33 21 20 20.33 20 19.5V4.5Z" />
                <line x1="12" y1="3" x2="12" y2="21" />
              </svg>
            </span>
            <span className="flex flex-col leading-none">
              <span className="font-display text-lg font-semibold text-ink">
                Livros da <span className="text-primary font-bold">Carol</span>
              </span>
              <span className="mt-0.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-terracotta">
                Catálogo 
              </span>
            </span>
          </Link>

        </div>

        {/* Copyright */}
        <div className="mt-6 border-t border-dashed border-ink/10 pt-5 text-center">
          <div className="mx-auto flex flex-col items-center justify-center gap-3 text-sm text-ink-soft/60 sm:flex-row sm:gap-2">
            <Image
              src="/logo.png"
              alt="VitruvianDev logo"
              width={80}
              height={80}
              className="rounded-full object-cover"
            />
            <p className="text-center sm:text-left">
              &copy; {new Date().getFullYear()} Desenvolvido por VitruvianDev. Todos os direitos reservados.
            </p>
            <a
              href="https://www.instagram.com/vitruviandev/"
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 text-ink-soft/80 transition-colors hover:text-ink"
            >
              <Camera className="h-4 w-4" />
              @vitruviandev
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;