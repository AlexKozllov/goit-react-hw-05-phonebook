import React from "react";
import { CSSTransition } from 'react-transition-group';
import s from "./filter.module.css";

const Filter = ({ filterValue, hendleFilter }) => {
  return (
    <CSSTransition in={true}
    timeout={2000}
    classNames={s.fade}
    unmountOnExit>
    <form className={s.findField}>
      <h3>Find contacts by name</h3>
      <input value={filterValue} onChange={hendleFilter} />
    </form>
    </CSSTransition>
  );
};

export default Filter;
