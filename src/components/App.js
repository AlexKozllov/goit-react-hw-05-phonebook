import React, { Component } from "react";
import { CSSTransition } from 'react-transition-group';
import ContactForm from "./contactForm/ContactForm";
import ContactList from "./contactList/ContactList";
import Filter from "./filter/Filter";
// import ExistAlert from "./existAlert/ExistAlert";

import s from "./app.module.css";
import scaleAnimation from './animation/scaleAnimation.module.css';
import shiftAppear from './animation/shiftAppear.module.css';

class App extends Component {
  state = {
    contacts: [],
    filter: "",
    isExistContact: false
  };

  componentDidMount() {
    if (localStorage.getItem("contacts")) {
      this.setState({
        contacts: [...JSON.parse(localStorage.getItem("contacts"))],
      });
    }
  }

  componentDidUpdate(prevProps, prevState) {
    const { contacts } = this.state;
    if (prevState !== this.state) {
      localStorage.setItem("contacts", JSON.stringify([...contacts]));
    }
  }

  addContacts = (stateForm) => {
    this.setState((prevState) => {
      return { contacts: [stateForm, ...prevState.contacts ] };
    });
  };

  hendleFilter = (e) => {
    const { value } = e.target;
    this.setState({ filter: value });
  };

  getVisibleContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter((contact) =>
      contact.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase())
    );
  };

  hendleBtnDelete = (itemId) => {
    this.setState((prevState) => {
      return {
        contacts: prevState.contacts.filter((item) => item.id !== itemId),
      };
    });
  };

  onCheckUnique = (name) => {
    const { contacts } = this.state;
    const isExistContact = !!contacts.find(
      (item) => item.name.toLocaleLowerCase() === name.toLocaleLowerCase()
    );
    isExistContact ? this.setState({isExistContact : true}) : this.setState({isExistContact : false})


    return !isExistContact
  };

  render() {
    const { filter, contacts,isExistContact } = this.state;
    const visibleContacts = this.getVisibleContacts();
    return (
      <div className={s.wrapper}>
        
        <CSSTransition in={true} appear classNames={shiftAppear} timeout={500} unmountOnExit>
          <h1 className={s.headerPhoneboo}>Phonebook</h1>
        </CSSTransition>
        
        <ContactForm
          handlerInput={this.handlerInput}
          addContacts={this.addContacts}
          onCheckUnique={this.onCheckUnique}
          isExistContact={isExistContact}
        />
        <CSSTransition in={contacts.length>1}
         classNames={scaleAnimation} 
         timeout={250} 
         unmountOnExit>
           <Filter filterValue={filter} hendleFilter={this.hendleFilter} />
        </CSSTransition>
      
        
          {contacts.length > 0 && <ContactList
            listContacts={visibleContacts}
            hendleBtnDelete={this.hendleBtnDelete}
          />}
          
     
       
      </div>
    );
  }
}

export default App;
