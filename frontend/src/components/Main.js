import { api } from "../utils/api";
import React, { useState,useEffect } from 'react'; 
import Card from "./Card";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Main(props) {

  const currentUser = React.useContext(CurrentUserContext);

  return (
    <div className="content">
        <section className="profile">
            <div className="profile__info">
                <img className="profile__avatar" src={currentUser?.avatar} alt="Аватар"/>
                <div onClick={props.onEditAvatar} className="profile__edit"/>
                <h1 className="profile__user-name">{currentUser?.name}</h1>
                <p className="profile__description">{currentUser?.about}</p>
                <button onClick={props.onEditProfile} className="button profile__edit-button" type="button"/>
            </div>
            <button onClick={props.onAddPlace} className="button profile__add-button" type="button"/>
        </section>
        <section className="elements">
        { props.cards.map((item) => (
            <Card 
            card={item}
            key={item._id}
            onCardClick={props.onCardClick}
            onCardLike ={props.onCardLike}
            onCardDelete={props.onCardDelete}
            />
        )) }
    </section>
    </div>
  );
}

export default Main;