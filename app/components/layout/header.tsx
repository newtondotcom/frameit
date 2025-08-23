import { Link, type NavLinkProps } from "react-router";
import { useState } from "react";
import ThemeToggle from "@/components/color-mode";
import { Button } from "@/components/ui/button";
import { X, Menu } from "lucide-react";
import { RainbowHeader } from "@/components/ui/rainbow-header";
import { useRainbowStore } from "@/hooks/use-is-rainbow";

type NavLink = {
  to: string;
  label: string;
};

type NavLinksProps = {
  onClick?: () => void;
  links?: NavLink[];
};

const navLinks = [
  { to: "#features", label: "Features" },
  { to: "#specs", label: "Specs" },
  { to: "#content", label: "Contents" },
  { to: "#buy", label: "Buy" },
];

export default function Header() {
  const { isRainbow } = useRainbowStore();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const toggleMobileMenu = () => {
    setMobileMenuOpen((prev) => !prev);
  };

  const NavLinks: React.FC<NavLinksProps> = ({ onClick, links = navLinks }) => (
    <>
      {links.map(({ to, label }) => (
        <Link
          key={to}
          to={to}
          className="text-sm font-black uppercase tracking-wider hover:text-primary transition-colors border-2 border-transparent hover:border-black px-3 py-2"
          onClick={onClick}
        >
          {label}
        </Link>
      ))}
    </>
  );

  return (
    <div className="fixed top-2 left-0 right-0 z-[100]">
      {!isRainbow && (
        <header className="w-full max-w-[calc(100%-4rem)] h-20 flex items-center justify-between border-4 border-black bg-card shadow-[8px_8px_0px_0px_theme(colors.black)] z-50 px-6 lg:px-8 mx-auto transform transition-transform hover:translate-x-1 hover:translate-y-1 hover:shadow-[4px_4px_0px_0px_theme(colors.black)] dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]">
          <Link className="flex items-center gap-2" to="/">
            <span className="font-black text-3xl text-foreground uppercase tracking-wider">FrameIt</span>
          </Link>

          <nav
            className="hidden md:flex gap-4 sm:gap-6"
            aria-label="Main navigation"
          >
            <NavLinks />
          </nav>

          <ThemeToggle />

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </Button>
        </header>
      )}

      {isRainbow && (
        <RainbowHeader>
          <Link className="flex items-center gap-2" to="/">
            <span className="font-bold text-2xl">FrameIt</span>
          </Link>

          <nav
            className="hidden md:flex gap-4 sm:gap-6"
            aria-label="Main navigation"
          >
            <NavLinks />
          </nav>

          <ThemeToggle />

          <Button
            variant="ghost"
            className="md:hidden"
            onClick={toggleMobileMenu}
            aria-expanded={mobileMenuOpen}
            aria-controls="mobile-menu"
            aria-label={mobileMenuOpen ? "Close menu" : "Open menu"}
          >
            {mobileMenuOpen ? (
              <X className="w-6 h-6" aria-hidden="true" />
            ) : (
              <Menu className="w-6 h-6" aria-hidden="true" />
            )}
          </Button>
        </RainbowHeader>
      )}

      {mobileMenuOpen && (
        <nav
          id="mobile-menu"
          className="fixed top-24 left-4 right-4 md:hidden flex flex-col gap-4 p-6 border-4 border-black bg-card shadow-[8px_8px_0px_0px_theme(colors.black)] dark:border-yellow-400 dark:shadow-[8px_8px_0px_0px_theme(colors.yellow.400)]"
          aria-label="Mobile navigation"
        >
          <NavLinks onClick={toggleMobileMenu} />
        </nav>
      )}
    </div>
  );
}
