import React from "react";
import { ModelTab } from "./model";
import clsx from "clsx";

const Tab: React.FC<ModelTab> = (model: ModelTab) => {
  return (
    <div key={model.title} className={clsx(model.className)}>
      {model.children}
    </div>
  );
};

export default Tab;
