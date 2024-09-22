import React, { useState } from "react";
import TabsTitle from "./TabsTitle";
import { ModelTabs } from "./model";
import clsx from "clsx";
const Tabs: React.FC<ModelTabs> = (model: ModelTabs) => {
  const [selected, setSelected] = useState(0);
  return (
    <div className={clsx("")}>
      <ul
        className={clsx(
          model.width === "wrap" ? "" : "w-full",
          model.tabSpace ?? "gap-x-2",
          model.tabDirection === "vertical" ? "flex justify-start" : "block"
        )}
      >
        {model.children.map((item, index) => (
          <TabsTitle
            className={clsx(
              model.width === "block" ? "w-full" : "",
              model.classTitle
            )}
            selected={selected}
            padding={model.tabPadding}
            title={item.props.title}
            key={item.props.title}
            index={index}
            setSelectedTab={setSelected}
          />
        ))}
      </ul>
      <div className="mt-5">{model.children[selected]}</div>
    </div>
  );
};

export default Tabs;
