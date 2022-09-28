import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Register({ onRegister }) {

    const [registerData, setRegisterData] = useState({
        email: "",
        password: "",
      });

    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        setMessage('');
        const { name, value } = e.target;
        setRegisterData({
          ...registerData,
          [name]: value,
        });
      };

      const handleSubmit = (e) => {    
        e.preventDefault();
        onRegister(registerData)
          .catch(err => setMessage(err.message || 'Что-то пошло не так'));
      };

    return (
        <div className="register">
          <p className="register__welcome">Регистрация</p>
          <form onSubmit={handleSubmit} className="register__form">
 
            <input className="register__input" id="email" name="email" type="email" value={registerData.email} onChange={handleChange} placeholder="Email" />

            <input className="register__input" id="password" name="password" type="password" value={registerData.password} onChange={handleChange} placeholder="Пароль" />
            <div className="register__button-container">
              <button type="submit" onSubmit={handleSubmit} className="button register__button">Зарегистрироваться</button>
            </div>
          </form>
          <div className="register__signin">
            <p>Уже зарегистрированы?<Link to="/signin" className="register__login-link"> Войти</Link></p>
          </div>
          </div>
    );
}

export default Register;