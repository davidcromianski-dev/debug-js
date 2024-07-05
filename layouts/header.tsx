import { useEffect, useState } from "react";
import { Code } from "@nextui-org/code";

export const Header = () => {
  const [currentDateTime, setCurrentDateTime] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDateTime(new Date());
    }, 1000);

    return () => clearInterval(intervalId);
  }, []);

  return (
    <header className="w-full text-center py-1">
      <Code
        className="text-ixcgray-100 text-xs mx-auto"
        color="default"
        size="sm"
      >
        {currentDateTime.toLocaleString("pt-BR")}
      </Code>
    </header>
  );
};
