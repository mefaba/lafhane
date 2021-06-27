import React from "react";
import "./shortbreak.scss";

const ShortBreak = ({ children }) => {
  console.log("React.children", React.Children);
  return (
    <div className="shortbreak_container">
      {React.Children.map(children, (eachChildNode, index) => {
        return (
          <div key={index} className="shortbreak_box">
            {eachChildNode}
          </div>
        );
      })}
    </div>
  );
};

export default ShortBreak;
