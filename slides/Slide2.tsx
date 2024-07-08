import { Slide } from "@/components/Slide";
import { Cite, Title } from "@/components/Text";

export const Slide2 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-evenly items-center text-center text-ixcgray-100"
      id={2}
    >
      <Title>
        Mas o que &#x1F480;&#x1F92C;&#x1F479;&#x1F47A; &eacute; <br />
        <span className="bg-clip-text text-transparent bg-gradient-to-b from-red-400 to-red-700">
          Debugging
        </span>
        ?
      </Title>
      <Cite
        author="Filipe Fortes"
        citation="Depuração é como ser o detetive em um filme onde você mesmo é o
        assassino."
        profile="/filipe_fortes.jpeg"
        reference="Microsoft | Flipboard | CEO at Coda"
      />
    </Slide>
  );
};
