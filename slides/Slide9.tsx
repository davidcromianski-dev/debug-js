import { Card, CardBody, Image, Tab, Tabs } from "@nextui-org/react";
import { Code } from "@nextui-org/code";
import { FaChrome } from "react-icons/fa6";
import { LuFileStack } from "react-icons/lu";
import { FaLayerGroup } from "react-icons/fa";
import { BsFillSignStopFill } from "react-icons/bs";
import { BiCodeBlock } from "react-icons/bi";
import { TbStackPush } from "react-icons/tb";
import { IoEarOutline } from "react-icons/io5";

import { Slide } from "@/components/Slide";

export const Slide9 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-center items-center text-center gap-20 text-ixcgray-200"
      id={9}
    >
      <div>
        <h1 className="font-bold text-4xl">
          Google Chrome DevTools, é magica? &#129497;
        </h1>
      </div>
      <section className="flex flex-col gap-5 items-center justify-center">
        <Tabs aria-label="Options" color="primary" variant="bordered">
          <Tab
            key="acesso"
            title={
              <div className="flex items-center gap-2">
                <FaChrome /> Acesso
              </div>
            }
          >
            <div className="flex flex-col gap-2 flex-wrap justify-center items-center">
              <Code color="primary">F12</Code>
              <Code color="secondary">ctrl + shift + P</Code>
              <Code color="warning">Right click + inspecionar</Code>
            </div>
          </Tab>
          <Tab
            key="sources"
            title={
              <div className="flex items-center gap-2">
                <LuFileStack /> Sources
              </div>
            }
          >
            <Card className="bg-stone-800 border-1 border-stone-700 text-white">
              <CardBody>
                <p>
                  Local onde você pode visualizar e editar os arquivos do seu
                  projeto.
                </p>
                <br />
                <ul className="list-disc">
                  <li>
                    - Os arquivos que foram carregados no navegador serão
                    mostrados no painel esquerdo.
                  </li>
                  <li>- O arquivo aberto será exibido no centro.</li>
                  <li>
                    - No painel direito, ficam as ferramentas de edição e de
                    depuração.
                  </li>
                </ul>
              </CardBody>
            </Card>
          </Tab>
          <Tab
            key="agrupar"
            title={
              <div className="flex items-center gap-2">
                <FaLayerGroup /> Agrupar
              </div>
            }
          >
            <Image alt="Agrupar" src="/agrupar.png" />
          </Tab>
          <Tab
            key="breakpoints"
            title={
              <div className="flex items-center gap-2">
                <BsFillSignStopFill /> Breakpoints
              </div>
            }
          >
            <div className="flex gap-4 items-center justify-center">
              <Image alt="Breakpoints" src="/breakpoints.png" />
              <Image alt="Breakpoints Actions" src="/breakpoint-actions.png" />
            </div>
          </Tab>
          <Tab
            key="escopo"
            title={
              <div className="flex items-center gap-2">
                <BiCodeBlock /> Escopo
              </div>
            }
          >
            <Image alt="Escopo" src="/escopo.png" />
          </Tab>
          <Tab
            key="chamadas"
            title={
              <div className="flex items-center gap-2">
                <TbStackPush /> Pilhas de chamadas
              </div>
            }
          >
            <Image alt="Chamadas" src="/chamadas.png" />
          </Tab>
          <Tab
            key="listeners"
            title={
              <div className="flex items-center gap-2">
                <IoEarOutline /> Listeners
              </div>
            }
          >
            <div className="flex gap-4 items-center justify-center">
              <Image alt="Listeners globais" src="/listeners-globais.png" />
              <Image alt="Listeners de Breakpoint" src="/listeners-break.png" />
            </div>
          </Tab>
        </Tabs>
      </section>
    </Slide>
  );
};
