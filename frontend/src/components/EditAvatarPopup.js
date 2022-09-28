import React from 'react';
import PopupWithForm from "./PopupWithForm";

function EditAvatarPopup({isOpen,onClose,onUpdateAvatar}) {

    const inputRef = React.useRef();
  
    function handleSubmit(e) {
        e.preventDefault();
        onUpdateAvatar({
          avatar: inputRef.current.value,
        });
      }
    
      React.useEffect(() => {
        inputRef.current.value = '';
      }, [isOpen]);

    return(
        <PopupWithForm
        name = "avatar"
        title= "Обновить аватар"
        buttonText = "Сохранить"
        isOpen={isOpen}
        onClose={onClose}
        onSubmit={handleSubmit}
        >
        <div className="popup__field">
            <input ref={inputRef}  id="photo-input" type="url" className="popup__input popup__input_type_photo" defaultValue="" name="avatar" minLength="2" maxLength="140" required/>
            <span className="error" id="photo-input-error"></span>
        </div>
      </PopupWithForm>
    );
  }
  
  export default EditAvatarPopup;