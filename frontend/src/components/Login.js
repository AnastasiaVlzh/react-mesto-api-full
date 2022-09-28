import React, { useState } from 'react';


function Login({ onLogin }) {
  const [loginData, setLoginData] = useState({
    email: "",
    password: "",
  });

  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    const { name, value } = e.target;
    setLoginData({
      ...loginData,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(loginData)
  };

  return (
    <div className="register">
      <p className="register__welcome">Вход</p>
      <form onSubmit={handleSubmit} className="register__form">

        <input className="register__input" id="email" name="email" type="email" value={loginData.email} onChange={handleChange} placeholder="Email" />

        <input className="register__input" id="password" name="password" type="password" value={loginData.password} onChange={handleChange} placeholder="Пароль" />
        <div className="register__button-container">
          <button type="submit" className="button register__button">Войти</button>
        </div>
      </form>
      </div>
);
}

export default Login;
