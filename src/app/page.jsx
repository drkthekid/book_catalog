import Footer from "@/components/features/footer";
import Navbar from "@/components/features/nav/navbar";
import { ProductList1 } from "@/components/features/products/list";
import { ButtonTheme } from "@/components/ui/theme/button-theme";
import Image from "next/image";

export default function Home() {
  return (
    <>
      <Navbar />
      <div className="flex flex-col items-center justify-center px-8">
        <ProductList1 />
      </div>
      <Footer/>

    </>
  );
}
