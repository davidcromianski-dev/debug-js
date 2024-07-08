import { useEffect } from "react";

import { useSlide } from "@/config/SlideContext";
import { Slide1 } from "@/slides/Slide1";
import { Slide2 } from "@/slides/Slide2";
import { Slide3 } from "@/slides/Slide3";
import { Slide4 } from "@/slides/Slide4";
import { Slide5 } from "@/slides/Slide5";
import { Slide6 } from "@/slides/Slide6";
import { Slide7 } from "@/slides/Slide7";
import { Slide8 } from "@/slides/Slide8";
import { Slide9 } from "@/slides/Slide9";
import { Slide10 } from "@/slides/Slide10";
import { Slide11 } from "@/slides/Slide11";

export const SlidesManager = () => {
  // @ts-ignore
  const { currentSlideId, setCurrentSlideId } = useSlide();

  useEffect(() => {
    changeSlide(currentSlideId);
  }, [currentSlideId]);

  const changeSlide = (id: number) => {
    const slide = document.querySelector(`.slide[data-id="${id.toString()}"]`);

    slide?.scrollIntoView({ behavior: "smooth" });

    const footerBars = document.querySelectorAll(`footer .bar`);
    let currentBar;

    footerBars.forEach((bar: any) => {
      const barId = parseInt(bar.getAttribute("data-id"));

      bar.classList.remove("active", "inactive");
      bar.style.opacity = "1";
      if (id === 1) {
        bar.style.flexBasis = "10%";
      } else if (barId == id) {
        bar.style.flexBasis = "28%";
        bar.classList.add("active");
        currentBar = bar;
      } else {
        bar.style.flexBasis = "8%";
        bar.style.opacity = "0.5";
        bar.classList.add("inactive");
      }
    });

    // @ts-ignore
    const currentBarColor = currentBar?.getAttribute("data-color");
    let color = currentBarColor ?? "stone";

    const layout = document.querySelector(`#layout`);

    if (!layout) return;
    let oldClass = Array.from(layout.classList).find((c) =>
      c.match(/via-\w+-900/),
    );

    if (oldClass != null) {
      layout.classList.remove(oldClass);
    }
    layout.classList.add(`via-${color}-900`);
  };

  const previousSlide = () => {
    if (currentSlideId === 1) return;
    setCurrentSlideId(currentSlideId - 1);
  };

  const nextSlide = () => {
    if (currentSlideId === 11) return;
    setCurrentSlideId(currentSlideId + 1);
  };

  const showSlide = () => {
    switch (currentSlideId) {
      case 1:
        return <Slide1 />;
      case 2:
        return <Slide2 />;
      case 3:
        return <Slide3 />;
      case 4:
        return <Slide4 />;
      case 5:
        return <Slide5 />;
      case 6:
        return <Slide6 />;
      case 7:
        return <Slide7 />;
      case 8:
        return <Slide8 />;
      case 9:
        return <Slide9 />;
      case 10:
        return <Slide10 />;
      case 11:
        return <Slide11 />;
      default:
        return <Slide1 />;
    }
  };

  const actorsClasses =
    "basis-[10%] cursor-pointer transition-all duration-300";

  return (
    <section className="h-full w-full flex">
      <div
        className={actorsClasses}
        id="previous"
        role="button"
        onClick={previousSlide}
      />
      {showSlide()}
      <div
        className={actorsClasses}
        id="next"
        role="button"
        onClick={nextSlide}
      />
    </section>
  );
};
