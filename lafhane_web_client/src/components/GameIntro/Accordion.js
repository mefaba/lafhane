import React from "react";
import Slideshow from "./Slideshow";

const Accordion = () => {
  return (
    <div className="accordion_container">
      <div className="tabs">
        <div className="tab">
          <input type="checkbox" id="chck1" />
          <label className="tab-label" htmlFor="chck1">
            Nasıl Oynanır?
          </label>
          <div className="tab-content">
            <Slideshow />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Accordion;
