import { appComment } from "./main.js";
// import { formatDate } from "./data.js";
import { format } from "date-fns";

export function renderComment({ comments }) {
  const appElement = document.getElementById("app");
  if (comments.length === 0) {
    appElement.innerHTML = "Пожалуйста подождите, комментарии загружаются...";
    return;
  }

  const commentsHtml = comments.map((comment, index) => {
    const commentTextQuotes = comment.comment.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>");
    const commentNameSafe = comment.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    const now = new Date();
    format(now, 'yyyy-MM-dd hh.mm.ss');
    const createDate = format(now, 'yyyy-MM-dd hh.mm.ss');

    return `
      <li class="comment" id="comment-add" data-index=${index}>
        <div class="comment-header">
          <div>${commentNameSafe}</div>
          <div>${createDate}</div>
        </div>
        <div class="comment-body">
          <div class="comment-text" >${commentTextQuotes}</div>
        </div>
        <div class="comment-footer">
          <div class="likes">
            <span class="likes-counter" data-index=${index}>${comment.numberLikes}</span>
            <button class="like-button${comment.likes ? " -active-like" : ""}" data-index=${index}></button>
          </div>
        </div>
      </li>`
  })
    .join("");

  const appHtml = `
    <div class="container">
      <ul class="comments" id="list">${commentsHtml}</ul>
      <div class="add-form">
        <input id="name-input" type="text" class="add-form-name" placeholder="Введите ваше имя" value="">
        <textarea id="text-input" type="textarea" class="add-form-text" placeholder="Введите ваш коментарий"
            rows="4"></textarea>
        <div class="add-form-row">
          <button class="add-form-button" id="add-button">Написать</button>
        </div>
      </div>
    </div>
    `;

  appElement.innerHTML = appHtml;

  initLikeButtonListeners({ comments });
  const commentElements = document.querySelectorAll('.comment');
  for (const commentElement of commentElements) {
    const index = commentElement.dataset.index;
    commentElement.addEventListener('click', () => {
      const { name, comment } = comments[index];
      textInputElement.value = 'QUOTE_BEGIN' + ' (' + name + ') ...' + comment + '... ' + 'QUOTE_END' + ' ';
    });
  };

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

  function initLikeButtonListeners({ comments }) {
    for (const likeButton of document.querySelectorAll(".like-button")) {
      likeButton.addEventListener("click", (event) => {

        console.log(likeButton);
        event.stopPropagation();
        const index = likeButton.dataset.index;
        const comment = comments[index];

        delay(2000).then(() => {
          if (comment.likes) {
            comment.likes = false;
            comment.numberLikes--;
          } else {
            comment.likes = true;
            comment.numberLikes++;
          };
          renderComment({ comments });
        })
      });
    };
  };

  const textInputElement = document.getElementById("text-input");
  const buttonElement = document.getElementById("add-button");
  const commentElement = document.getElementById("list");
  const nameInputElement = document.getElementById("name-input");
  const loggedInUserName = localStorage.getItem("loggedInUserName");
  nameInputElement.value = loggedInUserName;
  nameInputElement.setAttribute("readonly", true);
  nameInputElement.classList.add("inactive");

  buttonElement.addEventListener("click", () => {
    const now = new Date();
    format(now, 'yyyy-MM-dd hh.mm.ss');

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
    const userData = format(now, 'yyyy-MM-dd hh.mm.ss');;

    appComment(userName, userComment, userData);
  });
};