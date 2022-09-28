function ImagePopup({name,card,onClose}) {
    return(
        <div className={ card ? `popup popup_${name} popup_opened` : `popup`}>
        <div className="popup__content popup__content_place_image">
        <button type="button" className="button popup__close popup__close_image" onClick={onClose}></button>
            <figure className="popup__figure">
                <img className="popup__image" src={card? card.link : "null"} alt={card? card.name : "null"}/>
                <figcaption className="popup__caption"></figcaption>
            </figure>
        </div>
    </div>
    );
  }


  export default ImagePopup;

