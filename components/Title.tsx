import React from "react";

export const Title = ({
  children,
  gradient = false,
  color,
  className,
  size = "lg",
  weight = "semibold",
}: {
  children: React.ReactNode;
  className?: string;
  color?: "blue" | "green" | "purple" | "red" | "yellow";
  gradient?: boolean;
  size?: "sm" | "md" | "lg";
  weight?: "thin" | "regular" | "semibold" | "bold";
}) => {
  const base = "tracking-tight text-ixcgray-100";
  const p = {
    colors: {
      blue: gradient ? "from-ixcblue-100 to-ixcblue-200" : "text-ixcblue-100",
      green: gradient ? "from-green-100 to-green-200" : "text-green-100",
      purple: gradient ? "from-purple-100 to-purple-200" : "text-purple-100",
      red: gradient ? "from-red-100 to-ired-200" : "text-red-100",
      yellow: gradient ? "from-yellow-400 to-yellow-600" : "text-yellow-100",
    },
    sizes: {
      sm: "text-3xl lg:text-4xl",
      md: "text-[2.3rem] lg:text-5xl leading-9",
      lg: "text-10xl lg:text-8xl",
    },
    weights: {
      thin: "font-thin",
      regular: "font-normal",
      semibold: "font-semibold",
      bold: "font-bold",
    },
  };
  let classNames = base;

  if (color) {
    classNames += ` ${p.colors[color]}`;
  }
  if (gradient) {
    classNames += ` bg-clip-text text-transparent bg-gradient-to-b`;
  }
  classNames += ` ${p.sizes[size]} ${p.weights[weight]}`;
  const final = `${classNames} ${className}`;

  return <h1 className={final}>{children}</h1>;
};
