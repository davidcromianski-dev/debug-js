import { atomOneDark, CodeBlock } from "react-code-blocks";
import { Button, Link, useDisclosure } from "@nextui-org/react";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
} from "@nextui-org/modal";

import { Slide } from "@/components/Slide";

export const Slide6 = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const code = `{
  "include": [
    "src/**/*"
  ],
  "compilerOptions": {
    // Mapeia o código JavaScript gerado de volta para o código TypeScript original para fins de depuração.,
    //    "sourceMap": true,
    "module": "ES6",
    "moduleResolution": "node",
    "target": "ES6",
    "outDir": "./dist",
    "rootDir": "./src",
    "strict": true,
    "esModuleInterop": true,
    "skipLibCheck": true,
    "removeComments": true,
    "forceConsistentCasingInFileNames": true
  }
}
`;

  return (
    <Slide
      classNames="flex flex-col justify-start items-start text-start gap-10 text-ixcgray-200"
      id={6}
    >
      <div>
        <h1 className="font-bold text-4xl">E com TypeScript? &#129300;</h1>
      </div>
      <section className="flex gap-5 w-full h-full overflow-auto items-center justify-around">
        <CodeBlock
          showLineNumbers
          highlight={"9,10,11,12"}
          language="json"
          text={code}
          theme={atomOneDark}
        />
        <Button color="primary" variant="flat" onPress={() => onOpen()}>
          .map?
        </Button>
        <Link href="/examples/ts/index.html" target="blank">
          <Button color="secondary" variant="flat">
            Teste aqui!
          </Button>
        </Link>
      </section>
      <Modal
        backdrop="blur"
        className="bg-stone-900 text-white border-1 border-stone-800"
        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                O que sao arquivos.map?
              </ModalHeader>
              <ModalBody>
                <p>
                  Arquivos <code>.map</code> são arquivos de mapeamento que
                  permitem que você depure seu código TypeScript transpilado
                  diretamente no navegador.
                </p>
                <p>
                  Ao habilitar a opção <code>sourceMap</code> no arquivo{" "}
                  <code>tsconfig.json</code>, o compilador TypeScript irá gerar
                  arquivos <code>.map</code> para cada arquivo JavaScript
                  gerado.
                </p>
                <p>
                  Isso permite que o navegador mapeie o código original em
                  TypeScript para o código JavaScript gerado, facilitando a
                  depuração.
                </p>
              </ModalBody>
              <ModalFooter>
                <Button color="danger" variant="flat" onPress={onClose}>
                  Fechar
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </Slide>
  );
};
