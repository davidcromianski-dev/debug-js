import { Slide } from "@/components/Slide";
import { Cite } from "@/components/Text";

export const Slide4 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-center items-center text-center gap-20"
      id={4}
    >
      <div>
        <h1 className="text-ixcgray-200 font-bold text-4xl">
          "[...] se você sabe o que está fazendo, vai testar pra que?"
        </h1>
        <p className="text-ixcgray-300 mt-2">Extreme Go Horse - Axioma 20</p>
      </div>
      <Cite
        author="Brian Kernighan"
        citation="Depurar é duas vezes mais difícil do que escrever o código em primeiro lugar. Portanto, se
você
escrever o código da forma mais inteligente possível, por definição você não será inteligente o
suficiente para depurá-lo."
        profile="/brian.jpg"
        reference="The Elements of Programming Style, 1978"
      />
    </Slide>
  );
};
