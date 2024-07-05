import { useSlide } from "@/config/SlideContext";

export const FooterBar = () => {
  // @ts-ignore
  const { setCurrentSlideId } = useSlide();
  const goToSlide = (event: any) => {
    const id = event.target.getAttribute("data-id");

    setCurrentSlideId(parseInt(id));
  };

  return (
    <div className="flex flex-row h-4 items-stretch w-full shadow">
      <div
        className="bar basis-[10%] bg-red"
        data-color="red"
        data-id={2}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-orange"
        data-color="orange"
        data-id={3}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-yellow"
        data-color="yellow"
        data-id={4}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-green"
        data-color="green"
        data-id={5}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-emerald"
        data-color="emerald"
        data-id={6}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-ixcblue"
        data-color="ixcblue"
        data-id={7}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-bluesky"
        data-color="bluesky"
        data-id={8}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-navyblue"
        data-color="navyblue"
        data-id={9}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-violet"
        data-color="violet"
        data-id={10}
        role="button"
        onClick={goToSlide}
      />
      <div
        className="bar basis-[10%] bg-rose"
        data-color="rose"
        data-id={11}
        role="button"
        onClick={goToSlide}
      />
    </div>
  );
};
