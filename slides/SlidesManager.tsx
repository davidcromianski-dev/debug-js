import { useEffect } from "react";

import { Slides } from "@/slides/Slides";
import { useSlide } from "@/config/SlideContext";

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

    footerBars.forEach((bar: any) => {
      const barId = parseInt(bar.getAttribute("data-id"));

      bar.classList.remove("active", "inactive");
      bar.style.opacity = "1";
      if (id === 1) {
        bar.style.flexBasis = "10%";
      } else if (barId == id) {
        bar.style.flexBasis = "28%";
        bar.classList.add("active");
      } else {
        bar.style.flexBasis = "8%";
        bar.style.opacity = "0.5";
        bar.classList.add("inactive");
      }
    });
  };

  const previousSlide = () => {
    if (currentSlideId === 1) return;
    setCurrentSlideId(currentSlideId - 1);
  };

  const nextSlide = () => {
    if (currentSlideId === 11) return;
    setCurrentSlideId(currentSlideId + 1);
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
      {Slides()}
      <div
        className={actorsClasses}
        id="next"
        role="button"
        onClick={nextSlide}
      />
    </section>
  );
};
