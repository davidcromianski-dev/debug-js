import { Accordion, AccordionItem, Button } from "@nextui-org/react";
import { IoBugOutline, IoTerminalOutline } from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa6";
import { Code } from "@nextui-org/code";

import { Slide } from "@/components/Slide";

export const Slide5 = () => {
  const itemClasses = {
    base: "py-0 w-full",
    title: "font-normal text-medium",
    trigger:
      "px-2 py-0 data-[hover=true]:bg-stone-900 rounded-lg h-14 flex items-center bg-stone-800",
    indicator: "text-medium",
    content: "text-small px-2",
  };

  return (
    <Slide
      classNames="flex flex-col justify-center items-start text-start gap-20 text-ixcgray-200"
      id={5}
    >
      <div>
        <h1 className="font-bold text-4xl">
          Formas de Debugging em JavaScript
        </h1>
      </div>
      <Accordion
        className="p-2 flex flex-col gap-1 w-full bg-stone-800 rounded-lg"
        itemClasses={itemClasses}
        selectionMode="multiple"
        showDivider={false}
      >
        <AccordionItem
          key="1"
          aria-label="Alert"
          startContent={<BsChatSquareDots className="text-danger text-2xl" />}
          title={
            <code className="text-white text-lg">
              Alert &#128560;&#128128;&#128584;
            </code>
          }
        >
          Funciona? As vezes sim. É a melhor forma? <b>Não</b>. Com o{" "}
          <code>alert</code>, é possível parar a execução do código e exibir uma
          mensagem ao usuário. Porém, o <code>alert</code> é uma forma de
          debugging muito rudimentar e limitada.
          <br />
          <Code color="primary" size="sm">
            alert("Isso é um alert")
          </Code>
          &nbsp;&nbsp;
          <Button
            color="primary"
            size="sm"
            variant="flat"
            onClick={() => alert("Isso é um alert")}
          >
            Alert
          </Button>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Console.log"
          startContent={<IoTerminalOutline className="text-warning text-2xl" />}
          title={
            <code className="text-white text-lg">
              Console.log &#128580;&#129393;&#129396;
            </code>
          }
        >
          É a forma mais comum de debugging em JavaScript. Através do console,
          conseguimos exibir mensagens, variáveis, objetos e até mesmo funções.
          O <code>console.log</code> é uma ferramenta poderosa e muito útil para
          debugar o código. Porém, não é a melhor forma de debugging.
          <br />
          <Code color="primary" size="sm">
            console.log("Isso é um console.log")
          </Code>
          &nbsp;&nbsp;
          <Button
            color="primary"
            size="sm"
            variant="flat"
            onClick={() => {
              console.log("Isso é um console.log");
            }}
          >
            Console.log
          </Button>
          <br />
          <Code color="warning" size="sm">
            console.warn("Isso é um console.warn")
          </Code>
          &nbsp;&nbsp;
          <Button
            color="warning"
            size="sm"
            variant="flat"
            onClick={() => {
              console.warn("Isso é um console.warn");
            }}
          >
            Console.log
          </Button>
          <br />
          <Code color="danger" size="sm">
            console.error("Isso é um console.error")
          </Code>
          &nbsp;&nbsp;
          <Button
            color="danger"
            size="sm"
            variant="flat"
            onClick={() => {
              console.error("Isso é um console.error");
            }}
          >
            Console.log
          </Button>
        </AccordionItem>
        <AccordionItem
          key="3"
          aria-label="Debugger"
          startContent={<IoBugOutline className="text-primary text-2xl" />}
          title={
            <code className="text-white text-lg">
              Debugger &#129392;&#129321;&#128513;
            </code>
          }
        >
          É uma forma mais avançada de debugging. Permite que a execução do
          código seja pausada em um determinado ponto, para que possamos
          inspecionar variáveis, objetos e funções. O <code>debugger</code> é
          uma ferramenta poderosa e muito útil para debugar o código. É sem
          dúvida a melhor forma de debugging em JavaScript.
          <br />
          <Code color="primary" size="sm">
            {`function debug() {
              let x = 1;
              x += 4;
              debugger;
              x++;
              return x;
            }
            debug();
            `}
          </Code>
          &nbsp;&nbsp;
          <Button
            color="primary"
            size="sm"
            variant="flat"
            onClick={() => {
              let x = 1;

              x += 4;
              debugger;
              x++;

              return x;
            }}
          >
            Debugger
          </Button>
        </AccordionItem>
        <AccordionItem
          key="4"
          aria-label="Breakpoints"
          startContent={<FaRegFlag className="text-success text-2xl" />}
          title={
            <code className="text-white text-lg">
              Breakpoints &#129327;&#129395;&#127882;
            </code>
          }
        >
          Assim como o <code>debugger</code>, os breakpoints permitem que a
          execução do código seja pausada em um determinado ponto, para que
          possamos inspecionar variáveis, objetos e funções. Porém, os
          breakpoints são mais avançados e permitem uma maior flexibilidade na
          hora de debugar o código. Para adicionar um breakpoint, basta clicar
          na linha de código onde você deseja pausar a execução, e o breakpoint
          será adicionado automaticamente.
        </AccordionItem>
      </Accordion>
    </Slide>
  );
};
