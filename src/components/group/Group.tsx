import React, { FC, useState } from "react";

interface IProps {
  children: React.ReactNode[];
  direction: "row" | "column";
  className?: string;
}

const Group: FC<IProps> = ({ children, direction, className }) => {
  const isRow = direction === "row";

  return (
    <div
      className={[
        `rounded-xl grid grid-cols-2 border border-secondary-800 border-solid divide-secondary-800 overflow-hidden ${
          isRow ? "divide-x" : "divide-y"
        }`,
        className || "",
      ].join(" ")}
    >
      {children.map((child, index) => (
        <div
          key={index}
          className="aspect-square flex justify-center cursor-pointer items-center"
        >
          {child}
        </div>
      ))}
    </div>
  );
};

export default Group;
