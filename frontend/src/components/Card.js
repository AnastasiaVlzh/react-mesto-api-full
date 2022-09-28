import React from 'react';
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function Card({card,onCardClick,onCardLike,onCardDelete}) {

  function handleCardClick() {
        onCardClick(card);
      } 
  function handleLikeClick(){
        onCardLike(card)
  }
  function handleDeleteClick(){
        onCardDelete(card)
  }

  const currentUser = React.useContext(CurrentUserContext);
  const isOwn = card.owner === currentUser?._id;
  
  const cardDeleteButtonClassName = (
    `element__remove ${isOwn ? 'element__remove_active' : 'element__remove'}`
  )

  const isLiked = card.likes.some((i)=> i === currentUser?._id);
  //const isLiked = card.likes.some((i) => i._id === currentUser._id);

  const cardLikeButtonClassName = (
    `element__like ${isLiked ? 'element__like_active' : 'element__like'}`
  )

  return (
    <div className="element" >
    <CurrentUserContext.Provider value={currentUser}>
    <img className="element__picture" src={card.link} alt={card.name} onClick={handleCardClick}  />
    <button className={cardDeleteButtonClassName} onClick={handleDeleteClick} type="button" />
    <div className="element__group">
            <h2 className="element__name">{card.name}</h2>
            <div className="element__likes">
                <button className={cardLikeButtonClassName} onClick={handleLikeClick} type="button" />
                <h3 className="element__like-number">{card.likes.length}</h3>
            </div>
    </div>
    </CurrentUserContext.Provider>
</div>
  );
}

export default Card;