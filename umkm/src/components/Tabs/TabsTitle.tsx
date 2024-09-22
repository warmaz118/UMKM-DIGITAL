import React from "react";
import { ModelTabsTitle } from "./model";
import clsx from "clsx";

const TabsTitle: React.FC<ModelTabsTitle> = (model: ModelTabsTitle) => {
  return (
    <li>
      <button
        type="button"
        className={clsx(
          "text-center w-full",
          model.padding ?? "px-4 py-2",
          model.index === model.selected ? "text-blue-600" : "text-gray-400",
          model.className
        )}
        onClick={() => model.setSelectedTab(model.index)}
      >
        {model.title}
      </button>
      <div
        className={clsx(
          "w-full h-0.5",
          model.index === model.selected
            ? "bg-blue-600 rounded-lg"
            : "bg-transparent"
        )}
      ></div>
    </li>
  );
};

export default TabsTitle;
