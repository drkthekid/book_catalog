import "./globals.css";
import { ThemeProvider } from "@/components/ui/theme/theme-provider";
import { Montserrat } from "next/font/google";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700"],
});

export const metadata = {
  title: "livros da carol",
  description: "Site de Vendas!",
};

export default function RootLayout({ children }) {
  return (
    <>
    <html lang="pt-br" suppressHydrationWarning className={montserrat.variable + " scroll-smooth"}>
        <head />
        <body>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </body>
      </html>
    </>
  )
}