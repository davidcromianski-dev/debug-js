import { Slide } from "@/components/Slide";
import { Subtitle, Title } from "@/components/Text";

export const Slide10 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-evenly items-center text-center text-ixcgray-100"
      id={10}
    >
      <Title>Mãos na massa!</Title>
      <Subtitle>Vamos juntos analisar alguns códigos </Subtitle>
    </Slide>
  );
};
