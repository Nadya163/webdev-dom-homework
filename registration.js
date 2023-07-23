import { registration, setToken } from "./api.js";
import { renderLogin } from "./loginPage.js";

export const renderReg = ({ fetchPromise }) => {
    const appElement = document.getElementById("app");

    const registrHtml = `
    <div class="container">
        <div class="add-form">
            <h3 class="form-title">Форма регистрации</h3>
            <input type="text"
                id="registr-name"
                class="login-name"
                placeholder="Ваше имя" />
            <input type="text"
                id="registr-login"
                class="login-name"
                placeholder="Ваш логин" />
            <input type="password"
                id="registr-password"
                class="login-name"
                placeholder="Ваш пароль" />
            <button class="add-form-button" id="registr-button">Зарегистрироваться</button>
            <button class="buttonAuthorization" id="registrLogin-button">Войти</button>
        </div>
    </div>
    `;

    appElement.innerHTML = registrHtml;

    const buttonElement = document.getElementById("registr-button");
    const nameInputElement = document.getElementById("registr-name");
    const loginInputElement = document.getElementById("registr-login");
    const passwordInputElement = document.getElementById("registr-password");
    const buttonLoginElement = document.getElementById("registrLogin-button");

    buttonLoginElement.addEventListener("click", () => {
        renderLogin({ fetchPromise });
    })

    buttonElement.addEventListener("click", () => {
        registration({
          name: nameInputElement.value,
          login: loginInputElement.value,
          password: passwordInputElement.value
        })
          .then((responseData) => {
            console.log(responseData);
            setToken(responseData.user.token);
            setLoggedInUserName(responseData.user.name);
          })
          .then(() => {
            fetchPromise();
          })
          .catch((error) => {
            console.error(error);
          });
      });

    // Добавляем функцию, которая будет принимать имя пользователя в качестве аргумента и сохранять в лоакльном хранилище
    function setLoggedInUserName(name) {
    localStorage.setItem("loggedInUserName", name);
}
}