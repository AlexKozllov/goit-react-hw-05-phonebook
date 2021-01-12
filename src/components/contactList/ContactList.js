import React from "react";
import { CSSTransition, TransitionGroup } from "react-transition-group";

import s from "./contactList.module.css";
import shiftAnimation from "../animation/shiftAnimation.module.css";

const ContactList = ({ listContacts, hendleBtnDelete }) => {
  return (
    <TransitionGroup component="ul">
      {listContacts.map((item) => (
        <CSSTransition classNames={shiftAnimation} timeout={250} key={item.id}>
          <li className={s.listItem}>
            <span className={s.itemName}>{item.name}</span>{" "}
            <span>{item.number}</span>
            <button
              type="button"
              onClick={() => {
                hendleBtnDelete(item.id);
              }}
            >
              &#215;
            </button>
          </li>
        </CSSTransition>
      ))}
    </TransitionGroup>
  );
};

export default ContactList;
