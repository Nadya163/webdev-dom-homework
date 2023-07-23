import { login, setToken } from "./api.js";
import { fetchPromise } from "./script.js";
import { renderReg } from "./registration.js";


export const renderLogin = ({ fetchPromise }) => {
    const appElement = document.getElementById("app");

    const loginHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="form-title">Форма входа</h3>
            <input type="text"
                id="login-input"
                class="login-name"
                placeholder="Логин" />
            <input type="password"
                id="password-input"
                class="login-name"
                placeholder="Пароль" />
            <button class="add-form-button" id="login-button">Войти</button>
            <button class="buttonAuthorization" id="loginReg-button">Зарегистрироваться</button>
            </div>     
    </div>
    `;

    appElement.innerHTML = loginHtml;

    const buttonElement = document.getElementById("login-button");
    const loginInputElement = document.getElementById("login-input");
    const passwordInputElement = document.getElementById("password-input");
    const buttonRegElement = document.getElementById("loginReg-button");
        
    buttonRegElement.addEventListener("click", () => {
        renderReg({ fetchPromise });
    })
    
    buttonElement.addEventListener("click", () => {

        loginInputElement.classList.remove("error")
        if (loginInputElement.value === "") {
            loginInputElement.classList.add("error");
            return;
          };
      
          passwordInputElement.classList.remove("error")
          if (passwordInputElement.value === "") {
            passwordInputElement.classList.add("error");
            return;
          };

        login({
            login: loginInputElement.value,
            password: passwordInputElement.value
        })
        .then((responseData) => {
            setToken(responseData.user.token);
            setLoggedInUserName(responseData.user.name);
        })
        .then(() => {
            fetchPromise();
        })


    });
}

// Добавляем функцию, которая будет принимать имя пользователя в качестве аргумента и сохранять в лоакльном хранилище
export function setLoggedInUserName(name) {
    localStorage.setItem("loggedInUserName", name);
}