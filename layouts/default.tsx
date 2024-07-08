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
        bg-gradient-to-r
        from-black
        via-stone-900
        to-black
        box-border
        h-screen
    "
      id="layout"
    >
      <Head />
      <Header />
      <main className="w-full h-full">{children}</main>
      <Footer />
      {/*<script src="examples/ts/dist/main.js" />*/}
      {/*<script src="examples/webpack/dist/bundle.js" />*/}
    </div>
  );
}
