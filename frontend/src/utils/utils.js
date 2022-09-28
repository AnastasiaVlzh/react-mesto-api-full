
  export const config = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__save',
    inactiveButtonClass: 'popup__save_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible'
  }; 
  
  export const profileEdit = document.querySelector('.profile__edit-button');
  export const profileForm = document.querySelector('.popup__form')
  export const placeAddBtn = document.querySelector('.profile__add-button');
  export const placeAddPopup = document.querySelector('.popup_place-profile');
  export const placeInput = placeAddPopup.querySelector('.popup__input_place_name');
  export const linkInput = placeAddPopup.querySelector('.popup__input_place_link');
  export const placeForm = placeAddPopup.querySelector('.popup__form');
  export const placeDeleteBtn = document.querySelector('.element__remove');
  export const profileAvatar = document.querySelector('.profile__edit');
  export const profilePopup = document.querySelector('.popup_avatar')
  export const profileFormAvatar = profilePopup.querySelector('.popup__form')
  export const inputName = document.querySelector('.popup__input_type_name');
  export const inputJob =  document.querySelector('.popup__input_type_job');