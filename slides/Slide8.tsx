import { Button, Snippet } from "@nextui-org/react";
import { FaChrome } from "react-icons/fa6";

import { Slide } from "@/components/Slide";

export const Slide8 = () => {
  return (
    <Slide
      classNames="flex flex-col justify-center items-start text-start gap-20 text-ixcgray-200"
      id={8}
    >
      <div>
        <h1 className="font-bold text-4xl">
          Tem como debugar Node com o Google Chrome?? &#128565;
        </h1>
      </div>
      <section className="flex gap-5 items-center justify-center">
        <Snippet color="primary" variant="bordered">
          node --inspect
        </Snippet>
        <Button
          color="primary"
          variant="flat"
          onClick={() => window.open("chrome://inspect")}
        >
          <FaChrome /> Chrome://inpect
        </Button>
      </section>
    </Slide>
  );
};
