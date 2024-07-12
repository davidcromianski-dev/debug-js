import {
  Accordion,
  AccordionItem,
  Button,
  useDisclosure,
} from "@nextui-org/react";
import { IoBugOutline, IoTerminalOutline } from "react-icons/io5";
import { BsChatSquareDots } from "react-icons/bs";
import { FaRegFlag } from "react-icons/fa6";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";
import { CodeBlock, dracula } from "react-code-blocks";

import { Slide } from "@/components/Slide";

const CodeModal = ({
  text,
  code,
  color,
}: {
  text: string;
  code: string;
  color: "default" | "primary" | "secondary" | "danger" | "warning" | "success";
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <>
      <Button color={color} size="sm" variant="bordered" onClick={onOpen}>
        {text}
      </Button>
      <Modal
        backdrop="blur"
        className="bg-stone-900 text-white border-1 border-stone-800"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">{text}</ModalHeader>
              <ModalBody>
                <CodeBlock
                  showLineNumbers
                  language="javascript"
                  text={code}
                  theme={dracula}
                />
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  variant="flat"
                  onPress={() => eval(code)}
                >
                  Testar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

const ModalAlert = () => {
  const code = `alert("Isso é um alert");`;

  return <CodeModal code={code} color="danger" text="Alert" />;
};

const ModalConsoleLog = () => {
  const code = `console.log("Isso é um console.log");`;

  return <CodeModal code={code} color="primary" text="Log" />;
};

const ModalConsoleWarn = () => {
  const code = `console.warn("Isso é um console.warn");`;

  return <CodeModal code={code} color="warning" text="Warn" />;
};

const ModalConsoleError = () => {
  const code = `console.error("Isso é um console.error");`;

  return <CodeModal code={code} color="danger" text="Error" />;
};

const ModalConsoleTrace = () => {
  const code = `console.trace("Isso é um console.trace");`;

  return <CodeModal code={code} color="secondary" text="Trace" />;
};

const ModalConsoleGroup = () => {
  const code = `console.group("Isso é um console.group");
  console.log("Primeiro log");
console.groupEnd();`;

  return <CodeModal code={code} color="primary" text="Group" />;
};

const ModalConsoleTable = () => {
  const code = `console.table({
  name: "John",
  age: 30,
  city: "New York",
  country: "USA",
});`;

  return <CodeModal code={code} color="warning" text="Table" />;
};

const ModalDebugger = () => {
  const code = `let x = 1;
x += 4;
debugger;
x++;
console.log(x)`;

  return <CodeModal code={code} color="primary" text="Debugger" />;
};

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
          <div className="flex gap-4 mt-4">
            <ModalAlert />
          </div>
        </AccordionItem>
        <AccordionItem
          key="2"
          aria-label="Console.log"
          startContent={<IoTerminalOutline className="text-warning text-2xl" />}
          title={
            <code className="text-white text-lg">
              Console &#128580;&#129393;&#129396;
            </code>
          }
        >
          É a forma mais comum de debugging em JavaScript. Através do console,
          conseguimos exibir mensagens, variáveis, objetos e até mesmo funções.
          O <code>console.log</code> é uma ferramenta poderosa e muito útil para
          debugar o código. Porém, não é a melhor forma de debugging.
          <br />
          <div className="flex gap-4 mt-4">
            <ModalConsoleLog />
            <ModalConsoleWarn />
            <ModalConsoleError />
            <ModalConsoleTrace />
            <ModalConsoleGroup />
            <ModalConsoleTable />
          </div>
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
          <div className="flex gap-4 mt-4">
            <ModalDebugger />
          </div>
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
