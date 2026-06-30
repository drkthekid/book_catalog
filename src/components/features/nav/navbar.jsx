import { Logo } from "@/components/logo";
import { NavMenu } from "@/components/features/nav/nav-menu";
import { NavigationSheet } from "@/components/features/nav/navigation-sheet";
import { ButtonTheme } from "@/components/ui/theme/button-theme";

const Navbar = () => {
  return (
    <nav className="relative h-[76px] border-b border-ink/10 bg-paper after:absolute after:inset-x-0 after:-bottom-[5px] after:h-px after:bg-ink/10 dark:bg-ink dark:border-paper/10 dark:after:bg-paper/10">
      <div className="mx-auto flex h-full max-w-(--breakpoint-xl) items-center justify-between px-4 sm:px-6 lg:px-8">
        <Logo />

        {/* Desktop Menu */}
        <NavMenu className="hidden md:flex" />

        <div className="flex items-center gap-3">
          <ButtonTheme className="h-9 w-9 rounded-full border border-ink/15 text-ink-soft transition-colors hover:border-terracotta hover:bg-terracotta/5 hover:text-terracotta dark:border-paper/20 dark:text-paper/70" />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;