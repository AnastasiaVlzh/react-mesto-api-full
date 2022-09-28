import headerLogo from '../images/logo/Vector.svg';
import { Link, Route } from 'react-router-dom';

function Header({email,onLogout}) {
  return (
    <div className="header">
        <img className="header__logo" src={headerLogo} alt="Логотип проекта место" />
        <Route path="/signup">
          <Link className="header__login-link" to="/signin">Войти</Link>
        </Route>
        <Route path="/signin">
          <Link className="header__login-link" to="/signup">Регистрация</Link>
        </Route>
        <Route exact path="/">
          <p className="header__email">{email}</p>
          <a onClick={onLogout} className="header__link">Выйти</a>
        </Route> 

    </div>
  );
}

export default Header;
