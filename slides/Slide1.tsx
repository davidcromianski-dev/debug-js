import { Slide } from "@/components/Slide";
import { Subtitle, Title } from "@/components/Text";

export const Slide1 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-center text-ixcgray-200 gap-20"
      id={1}
    >
      <Title>
        Estrat&eacute;gias de
        <br />
        <span className="spelling-error">Debugging</span> em <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-yellow-400 to-yellow-600">
          JavaScript
        </span>
      </Title>
      <Subtitle>David Cromianski</Subtitle>
    </Slide>
  );
};
