import React from "react";

import s from "./filter.module.css";

const Filter = ({ filterValue, hendleFilter }) => {
  return (
    <form className={s.findField}>
      <h3>Find contacts by name</h3>
      <input value={filterValue} onChange={hendleFilter} />
    </form>
  );
};

export default Filter;
