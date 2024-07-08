import React from "react";
import {
  Avatar,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
} from "@nextui-org/react";

export const Title = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h1
    className={`title font-semibold text-4xl sm:text-5xl md:text-6lx lg:text-7xl xl:text-8xl 2xl:text-9xl ${className}`}
  >
    {children}
  </h1>
);

export const Subtitle = ({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) => (
  <h2
    className={`subtitle font-regular text-lg sm:text-xl md:text-2lx lg:text-3xl xl:text-4xl ${className}`}
  >
    {children}
  </h2>
);

export const Text = ({
  children,
  className,
  size = "md",
}: {
  children: React.ReactNode;
  className?: string;
  size?: "sm" | "md" | "lg";
}) => {
  const classes = {
    sm: "text-sm sm:text-sm md:text-sm lg:text-md xl:text-lg 2xl:text-lg",
    md: "text-md sm:text-sm md:text-md lg:text-lg xl:text-xl 2xl:text-2xl",
    lg: "text-lg sm:text-md md:text-lg lg:text-xl xl:text-xl 2xl:text-2xl",
  };

  return (
    <p className={`text text-default-400 ${classes[size]} ${className}`}>
      {children}
    </p>
  );
};

export const Cite = ({
  profile,
  author,
  reference,
  citation,
}: {
  profile: string;
  author: string;
  reference: string;
  citation: string;
}) => {
  return (
    <Card className="bg-[#18181b] border-2 border-solid border-[#333] shadow-lg">
      <CardHeader className="justify-between">
        <div className="flex gap-5">
          <Avatar isBordered radius="full" size="lg" src={profile} />
          <div className="flex flex-col gap-1 items-start justify-center">
            <Text
              className="font-semibold leading-none text-default-200"
              size="lg"
            >
              {author}
            </Text>
            <Text className="tracking-tight" size="sm">
              {reference}
            </Text>
          </div>
        </div>
      </CardHeader>
      <CardBody className="px-4 py-0">
        <Text size="lg">
          {citation}
          ...
        </Text>
        <Text className="pt-2" size="sm">
          #Debugging&#x1F41E;
        </Text>
      </CardBody>
      <CardFooter className="gap-3">
        <div className="flex gap-1">
          <Text className="font-semibold" size="sm">
            4
          </Text>
          <Text className="" size="sm">
            Following
          </Text>
        </div>
        <div className="flex gap-1">
          <Text className="font-semibold" size="sm">
            97.1K
          </Text>
          <Text size="sm">Followers</Text>
        </div>
      </CardFooter>
    </Card>
  );
};
