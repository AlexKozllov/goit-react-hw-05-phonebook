import React from "react";

import s from "./alert.module.css";

const Alert = ({ text }) => {
  return (
    <div className={s.box}>
      <h4>Warning!</h4>
      <p>{text}</p>
    </div>
  );
};

export default Alert;
