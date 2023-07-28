import { renderLogin } from "./loginPage.js";
import { fetchPromise } from "./main.js";

// Функция для отрисовки первой страницы
export function titleRenderComment({ comments }) {
  const appElement = document.getElementById("app");

  const commentsHtml = comments.map((comment, index) => {
    const commentTextQuotes = comment.comment.replaceAll("QUOTE_BEGIN", "<div class='quote'>").replaceAll("QUOTE_END", "</div>");
    const commentNameSafe = comment.name.replace(/</g, '&lt;').replace(/>/g, '&gt;');
    return `
    <li class="comment" id="comment-add" data-index=${index}>
      <div class="comment-header">
        <div>${commentNameSafe}</div>
        <div>${comment.data}</div>
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
    <div>
      <p class="textAuthorization">Что бы оставить комментарий, пожалуйста <button class="buttonAuthorization" id="authorization-button">авторизуйтесь</a></p>
    </div> 
  </div>
  `;

  appElement.innerHTML = appHtml;

  const buttonElement = document.getElementById("authorization-button");

  buttonElement.addEventListener('click', () => {
    console.log('click');
    renderLogin({ fetchPromise });
  });
};
