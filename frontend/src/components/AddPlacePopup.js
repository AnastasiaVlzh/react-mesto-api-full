import React from 'react';
import PopupWithForm from "./PopupWithForm";

function AddPlacePopup({isOpen,onClose,onAddPlace}) {

    const nameRef = React.useRef();
    const linkRef = React.useRef();

    function handleSubmit(e){
        e.preventDefault();
        onAddPlace({
          name:nameRef.current.value,
          link:linkRef.current.value
        });
    }

    React.useEffect(() => {
        nameRef.current.value = '';
        linkRef.current.value = '';
      }, [isOpen]);

    return(
        <PopupWithForm
        name = "place-profile"
        title= "Новое место"
        buttonText = "Создать"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
        <div className="popup__field">
          <input ref={nameRef} id="place-input" type="text" className="popup__input popup__input_place_name" placeholder="Название" name="name" minLength="2" maxLength="30" required/>
          <span className="error" id="place-input-error"></span>
        </div>
        <div className="popup__field">
          <input ref={linkRef} id="link-input" type="url" className="popup__input popup__input_place_link" placeholder="Ссылка на картинку" name="link" required/>
          <span className="error" id="link-input-error"></span>
        </div>
      </PopupWithForm>
    );
  }
  
  export default AddPlacePopup;