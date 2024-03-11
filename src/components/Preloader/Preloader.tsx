import React from "react";
import "./style.css";

const Preloader = () => {
  React.useEffect(() => {}, []);
  return (
    <div className="preloader">
      <div className="preloader__container">
        <span className="preloader__round"></span>
      </div>
    </div>
  );
};

export default Preloader;
