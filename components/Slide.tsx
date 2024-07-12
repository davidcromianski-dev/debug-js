import React from "react";

export const Slide = ({
  children,
  classNames,
  id,
}: {
  children: React.ReactNode;
  classNames?: string;
  id: number;
}) => {
  const className = `slide basis-[80%] h-full overflow-auto pb-4 ${classNames}`;

  return (
    <div className={className} data-id={id}>
      {children}
    </div>
  );
};
