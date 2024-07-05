import { Head } from "./head";

import { Footer } from "@/layouts/footer";
import { Header } from "@/layouts/header";

export default function DefaultLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div
      className="
        relative
        flex
        flex-col
        bg-black
        bg-gradient-to-r
        box-border
        h-screen
    "
    >
      <Head />
      <Header />
      <main className="w-full h-full">{children}</main>
      <Footer />
    </div>
  );
}
