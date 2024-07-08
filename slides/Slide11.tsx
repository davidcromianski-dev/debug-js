import { Slide } from "@/components/Slide";
import { Subtitle, Title } from "@/components/Text";

export const Slide11 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-center text-ixcgray-200 gap-20"
      id={11}
    >
      <Title>
        <span className="bg-clip-text text-transparent bg-white">
          Obrigado!
        </span>
      </Title>
      <Subtitle>{"<david.cromianski@ixcsoft.com.br>"}</Subtitle>
    </Slide>
  );
};
