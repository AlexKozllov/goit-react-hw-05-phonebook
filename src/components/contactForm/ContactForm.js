import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
// import styled from "styled-components";
import s from "./contactForm.module.css";
import shiftAlert from '../animation/shiftAlert.module.css';
import { v4 as uuidv4 } from "uuid";
import ExistAlert from "../existAlert/ExistAlert";

const InitialState = { name: "", number: "" };
class ContactForm extends Component {
  state = InitialState;

  handleInput = (e) => {
    const { name, value } = e.target;
    this.setState({
      [name]: value,
    });
  };

  handleSubmit = (e) => {
    e.preventDefault();
    const { addContacts } = this.props;
    const { name, number } = this.state;
    const isValidateForm = this.validateForm();
    if (!isValidateForm) return;
    addContacts({ id: uuidv4(), name, number });
    this.setState(InitialState);
  };

  validateForm = () => {
    const { onCheckUnique } = this.props;
    const { name, number } = this.state;
    if (!name || !number) {
      alert("Some filed is empty");
      return false;
    }
    return onCheckUnique(name);
  };

  render() {
    const { isExistContact } = this.props;
     const { name, number } = this.state;
    return (<>
     <CSSTransition in={isExistContact} classNames={shiftAlert} timeout={250} unmountOnExit>
          <ExistAlert/>
      </CSSTransition>
      <form className={s.contactForm} onSubmit={this.handleSubmit}>
        <label>
          Name
          <input
            type="text"
            name="name"
            value={name}
            onChange={this.handleInput}
          ></input>
        </label>
        <label>
          Number
          <input
            type="tel"
            name="number"
            value={number}
            onChange={this.handleInput}
          ></input>
        </label>
        <button className={s.addBtn} type="submit">
          Add contact
        </button>
      </form>
      </>
    );
  }
}

export default ContactForm;

// const Form = styled.form`
//   input {
//     display: block;
//   }
// `;
