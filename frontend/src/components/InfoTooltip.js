import Success from '../images/Union.svg';
import Reject from '../images/Reject.png';

function InfoTooltip({isOpen,name,auth,onClose}) {
  return (
    <div className={ isOpen ? `popup popup_${name} popup_opened` : `popup popup_${name}`}>
      <div className={`popup__content popup__content_${name}`}>
        <button className="button popup__close" onClick={onClose} type="button"></button>
        <img className="popup__image_signup" src={auth? Success : Reject} alt="результат регистрации" />
        <p className="popup__title popup__title_signup">
          {auth ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </p>
      </div>
    </div>
  )
}

export default InfoTooltip;