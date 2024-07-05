import { Slide } from "@/components/Slide";
import { Title } from "@/components/Title";
import { useSlide } from "@/config/SlideContext";

const Slide1 = () => {
  return (
    <Slide classNames="flex flex-col justify-center" id={1}>
      <Title>
        Estrat&eacute;gias de
        <br />
        <span
          style={{
            textDecoration: "spelling-error",
          }}
        >
          Debugging
        </span>{" "}
        em
      </Title>
      <Title gradient color="yellow">
        JavaScript
      </Title>
      <br />
      <br />
      <br />
      <br />
      <Title size="sm" weight="thin">
        David Cromianski
      </Title>
    </Slide>
  );
};
const Slide2 = () => {
  return (
    <Slide classNames="" id={2}>
      Slide 2
    </Slide>
  );
};
const Slide3 = () => {
  return (
    <Slide classNames="" id={3}>
      Slide 3
    </Slide>
  );
};
const Slide4 = () => {
  return (
    <Slide classNames="" id={4}>
      Slide 4
    </Slide>
  );
};
const Slide5 = () => {
  return (
    <Slide classNames="" id={5}>
      Slide 5
    </Slide>
  );
};
const Slide6 = () => {
  return (
    <Slide classNames="" id={6}>
      Slide 6
    </Slide>
  );
};
const Slide7 = () => {
  return (
    <Slide classNames="" id={7}>
      Slide 7
    </Slide>
  );
};
const Slide8 = () => {
  return (
    <Slide classNames="" id={8}>
      Slide 8
    </Slide>
  );
};
const Slide9 = () => {
  return (
    <Slide classNames="" id={9}>
      Slide 9
    </Slide>
  );
};
const Slide10 = () => {
  return (
    <Slide classNames="" id={10}>
      Slide 10
    </Slide>
  );
};
const Slide11 = () => {
  return (
    <Slide classNames="" id={11}>
      Slide 11
    </Slide>
  );
};

export const Slides = () => {
  // @ts-ignore
  const { currentSlideId } = useSlide();
  const slides = {
    1: <Slide1 />,
    2: <Slide2 />,
    3: <Slide3 />,
    4: <Slide4 />,
    5: <Slide5 />,
    6: <Slide6 />,
    7: <Slide7 />,
    8: <Slide8 />,
    9: <Slide9 />,
    10: <Slide10 />,
    11: <Slide11 />,
  };

  return slides[currentSlideId as keyof typeof slides];
};
