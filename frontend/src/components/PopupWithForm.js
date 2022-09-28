
function PopupWithForm({name,title,children,buttonText,isOpen,onClose,onSubmit}) {
  return(
    <div className={ isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className={`popup__content popup__content_${name}`}>
        <h3 className="popup__title">{title}</h3>
        <button className="button popup__close" onClick={onClose} type="button"></button>
        <form className={`popup__form popup__form_${name}`} name={name} onSubmit={onSubmit} noValidate>
          {children}
          <button className="popup__save" type="submit" >{buttonText}</button>
        </form>
      </div>
    </div>
  );
}

export default PopupWithForm;
