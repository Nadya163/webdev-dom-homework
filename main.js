import { getTodos, getTodosLogin, postTodos } from "./api.js";
// import { formatDate } from "./data.js";
import { renderComment } from "./renderComment.js";
import { titleRenderComment } from "./titlePage.js";
import { format } from "date-fns";
// yyyy-MM-dd hh.mm.ss

const now = new Date();
format(now, 'yyyy-MM-dd hh.mm.ss');

"use strict";
console.log("It works!");

const titleFetchPromise = () => {
  getTodos().then((responseData) => {
    // Преобразовываем данные из формата API в формат приложения
    const appComments = responseData.comments.map((comment) => {
      return {
        // Достаем имя автора
        name: comment.author.name,
        // Преобразовываем дату строку в Data
        data: format(new Date(comment.date), 'yyyy-MM-dd hh.mm.ss'),
        comment: comment.text,
        // В API пока вообще нет признака лайкнутости
        // Поэтому пока добавляем заглушку
        likes: false,
        numberLikes: comment.likes
      }
    })

    comments = appComments;
    titleRenderComment({ comments }); 
  });
}

titleFetchPromise();

// Подключаем приложение комментариев к API
// fetch - запускает выполнение запроса к api
const fetchPromise = () => {
  getTodosLogin().then((responseData) => {
    // Преобразовываем данные из формата API в формат приложения
    const appComments = responseData.comments.map((comment) => {
      return {
        // Достаем имя автора
        name: comment.author.name,
        // Преобразовываем дату строку в Data
        data: format(now, 'yyyy-MM-dd hh.mm.ss'),
        comment: comment.text,
        // В API пока вообще нет признака лайкнутости
        // Поэтому пока добавляем заглушку
        likes: false,
        numberLikes: comment.likes
      }
    })

    comments = appComments;
    renderComment({ comments });
  });
};


let comments = [];

export function appComment() {
  const addForm = document.querySelector(".add-form");
  const containerElement = document.querySelector(".container");

  addForm.classList.add("hidden");

  let elem = document.createElement("p"); // Добавляем созданный элемент
  elem.textContent = "Пожалуйста подождите, комментарий добавляется..."; // Добавляем текст в созданный элемент
  elem.classList.add("commentElem");
  containerElement.appendChild(elem);

  const nameInputElement = document.getElementById("name-input");
  const textInputElement = document.getElementById("text-input");

  postTodos({
    userName: nameInputElement.value,
    userComment: textInputElement.value,
    userData: format(now, 'yyyy-MM-dd hh.mm.ss'),
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
}

export { fetchPromise };