import { getTodos, postTodos } from "./api.js";
import { formatDate } from "./data.js";
import { renderComments } from "./renderComment.js"

"use strict";
console.log("It works!");
const buttonElement = document.getElementById("add-button");
// const commentElement = document.getElementById("list");
const nameInputElement = document.getElementById("name-input");
const textInputElement = document.getElementById("text-input");
const container = document.querySelector(".container");
const addForm = document.querySelector(".add-form");


// Подключаем приложение комментариев к API
// fetch - запускает выполнение запроса к api
const fetchPromise = () => {
 getTodos().then((responseData) => {
        // Преобразовываем данные из формата API в формат приложения
        const appComments = responseData.comments.map((comment) => {
          return {
            // Достаем имя автора
            name: comment.author.name,
            // Преобразовываем дату строку в Data
            data: formatDate(new Date(comment.date)),
            comment: comment.text,
            // В API пока вообще нет признака лайкнутости
            // Поэтому пока добавляем заглушку
            likes: false,
            numberLikes: comment.likes
          }
        })

        comments = appComments;
        renderComments({ comments });
      });
    };

    let currentDate = new Date(); // Создается объект текущей даты
    formatDate(currentDate); // Передается аргумент с текущей датой

let comments = [];

function appComment() {
  addForm.classList.add("hidden");

  let elem = document.createElement("p"); // Добавляем созданный элемент
  elem.textContent = "Пожалуйста подождите, комментарий добавляется..."; // Добавляем текст в созданный элемент
  elem.classList.add("commentElem");
  container.appendChild(elem);

    postTodos({
      userName: nameInputElement.value,
      userComment: textInputElement.value,
      userData: formatDate(new Date()),
    })
    .then((response) => {
      if (response.status === 400) {
        throw new Error("Плохой запрос");
      }
      if (response.status === 500) {
        throw new Error("Сервер сломался");
      }
      return response.json();
    })      
     .then(() => {
      fetchPromise();
    })
    .then(() => {
      return elem.parentNode.removeChild(elem);
    })
    .then(() => {
      return addForm.classList.remove("hidden");
    })
    .then(() => {
      // обработка успешного выполнения запроса
      nameInputElement.value = '';
      textInputElement.value = '';
    })
    .catch((error) => {
      elem.parentNode.removeChild(elem);
      addForm.classList.remove("hidden");

      // Если сервер сломался, то просим попробовать позже
      if (error.message === "Сервер сломался") {
        alert("Сервер сломался, попробуй позже");
        return;
      }
      if (error.message === "Failed to fetch") {
        alert("Кажется, у вас сломался интернет, попробуйте позже");
        return;
      }
      if (error.message === "Плохой запрос") {
        alert("Имя или комментарий должены содержать хотя бы 3 символа");
        return;
      }
      // Во всех остальных случаях просто вывдим ошибку
      console.warn(error);
    });

  renderComments({ comments });
}

buttonElement.addEventListener("click", () => {

  nameInputElement.classList.remove("error")
  if (nameInputElement.value === "") {
    nameInputElement.classList.add("error");
    return;
  };

  textInputElement.classList.remove("error")
  if (textInputElement.value === "") {
    textInputElement.classList.add("error");
    return;
  };

  const userName = nameInputElement.value;
  const userComment = textInputElement.value;
  const userData = formatDate(new Date());

  appComment(userName, userComment, userData);
});

renderComments({ comments });
fetchPromise();