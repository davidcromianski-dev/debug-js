import React from "react";

import DefaultLayout from "@/layouts/default";
import { SlidesManager } from "@/slides/SlidesManager";
import { SlideProvider } from "@/config/SlideContext";

export default function IndexPage() {
  return (
    <SlideProvider>
      <DefaultLayout>
        <SlidesManager />
      </DefaultLayout>
    </SlideProvider>
  );
}
