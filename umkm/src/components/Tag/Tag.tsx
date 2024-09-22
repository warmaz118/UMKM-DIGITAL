import React from "react";
import { Model } from "./model";
import clsx from "clsx";
const Tag: React.FC<Model> = (model: Model) => {
  const TagSize = {
    xs: "text-xs",
    sm: "text-sm",
    lg: "text-lg",
  };
  const TagVariant = {
    default: "border-gray-500 text-gray-500",
    accent: "border-blue-500 text-blue-500",
    success: "border-emerald-500 text-emerald-500",
    done: "border-indigo-500 text-indigo-500",
    error: "border-rose-500 text-rose-500",
  };
  return (
    <>
      {model.type === "code" && (
        <code
          className={clsx(
            "px-1.5 pb-0.5 rounded-md bg-[#FBFBFB] border border-[#D3D3D3]",
            model.className
          )}
        >
          {model.value}
        </code>
      )}
      {model.type === "text" && (
        <p
          className={clsx(
            "border font-semibold border-solid",
            "px-1.5 pt-[1px] pb-[1.8px] rounded-lg",
            TagSize[model.size ?? "xs"],
            TagVariant[model.variant ?? "default"],
            model.className
          )}
        >
          {model.value}
        </p>
      )}
    </>
  );
};

export default Tag;
