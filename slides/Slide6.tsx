import { atomOneDark, CodeBlock } from "react-code-blocks";
import { Button, useDisclosure } from "@nextui-org/react";
import { FaRegMap } from "react-icons/fa6";
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
    "compilerOptions": {
        "target": "es6",                     // Especifica a versão do ECMAScript para o qual o código deve ser transpilado
        "module": "commonjs",                // Especifica o sistema de módulos
        "sourceMap": true,                   // Gera arquivos .map para depuração
        "outDir": "./dist",                  // Diretório de saída para os arquivos transpilados
        "rootDir": "./src",                  // Diretório raiz para os arquivos de entrada
        "strict": true,                      // Habilita todas as verificações estritas
        "esModuleInterop": true,             // Habilita a interoperabilidade com módulos ES
        "skipLibCheck": true,                // Ignora a verificação de tipos de arquivos de declaração
        "forceConsistentCasingInFileNames": true  // Garante consistência na diferenciação entre maiúsculas e minúsculas nos nomes de arquivos
    },
    "include": [
        "src"                                // Inclui todos os arquivos TypeScript no diretório "src"
    ],
    "exclude": [
        "node_modules",                      // Exclui o diretório "node_modules"
        "**/*.spec.ts"                       // Exclui arquivos de teste (se estiver usando arquivos .spec.ts para testes)
    ]
}
`;

  return (
    <Slide
      classNames="flex flex-col justify-center items-start text-start gap-20 text-ixcgray-200"
      id={6}
    >
      <div>
        <h1 className="font-bold text-4xl">E com TypeScript? &#129300;</h1>
      </div>
      <section className="flex gap-5">
        <CodeBlock
          showLineNumbers
          highlight={"5"}
          language="json"
          text={code}
          theme={atomOneDark}
        />
        <Button color="primary" variant="flat" onPress={() => onOpen()}>
          <FaRegMap /> Arquivo .map?
        </Button>
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
                  permitem que você depure seu código TypeScript diretamente no
                  navegador, mesmo que o código tenha sido transpilado para
                  JavaScript.
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
