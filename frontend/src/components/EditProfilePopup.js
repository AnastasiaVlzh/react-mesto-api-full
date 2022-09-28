import React from 'react';
import PopupWithForm from "./PopupWithForm";
import { CurrentUserContext } from '../contexts/CurrentUserContext'

function EditProfilePopup({isOpen,onClose,onUpdateUser}) {

  const currentUser = React.useContext(CurrentUserContext);

  const [name, setName] = React.useState('');
  const [description,setDescription] = React.useState('');

  function handleNameChange(e) {
    setName(e.target.value);
  }

  function handleDescriptionChange(e) {
    setDescription(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    onUpdateUser({
      name,
      about: description,
    });
  }


  React.useEffect(() => {
    if (currentUser) {
    setName(currentUser.name);
    setDescription(currentUser.about);
    }
}, [currentUser]);

    return(
        <PopupWithForm
        name = "profile-form"
        title= "Редактировать профиль"
        buttonText = "Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
        <div className="popup__field">
          <input id="name-input" type="text" className="popup__input popup__input_type_name" onChange={handleNameChange} value={name} name="name" minLength="2" maxLength="40" required/>
          <span className="error" id="name-input-error"></span>
        </div>
        <div className="popup__field">
          <input id="job-input" type="text" className="popup__input popup__input_type_job" onChange={handleDescriptionChange} value={description} name="about" minLength="2" maxLength="200" required/>
          <span className="error" id="job-input-error"></span>
        </div>
      </PopupWithForm>
    );
  }
  
  export default EditProfilePopup;