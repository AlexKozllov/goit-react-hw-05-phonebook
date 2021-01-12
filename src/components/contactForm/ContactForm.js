import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
import s from "./contactForm.module.css";
import shiftAlert from '../animation/shiftAlert.module.css';
import { v4 as uuidv4 } from "uuid";
import Alert from "../alert/Alert";

const InitialState = { name: "", number: "", validateForm:true };
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
      this.setState({validateForm:false})
      // alert("Some filed is empty");
      return false;
    }
    if (!!name && !!number) {
      this.setState({validateForm: true})
      // alert("Some filed is empty");
      // return true;
    }
    return onCheckUnique(name);
  };

  render() {
    const { isExistContact } = this.props;
    
     const { name, number, validateForm } = this.state;
    return (<>
     <CSSTransition in={isExistContact } classNames={shiftAlert} timeout={250} unmountOnExit>
       {stage=>{
         setTimeout(()=>{
          isExistContact=false
         }, 1000)
         return <Alert text="Exist"/>
       }}
          
      </CSSTransition>
      <CSSTransition in={!validateForm } classNames={shiftAlert} timeout={250} unmountOnExit>
          <Alert text="Invalid"/>
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
