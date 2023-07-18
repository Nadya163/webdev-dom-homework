export function renderComments({ comments, }) {
    const commentElement = document.getElementById("list");
    const textInputElement = document.getElementById("text-input")
    if (comments.length === 0) {
    
      commentElement.textContent = "Пожалуйста подождите, комментарии загружаются...";
      return;
    }
  
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
  
    commentElement.innerHTML = commentsHtml;
    initLikeButtonListeners({ comments });
    const commentElements = document.querySelectorAll('.comment');
    for (const commentElement of commentElements) {
      const index = commentElement.dataset.index;
      commentElement.addEventListener('click', () => {
        const { name, comment } = comments[index];
        textInputElement.value = 'QUOTE_BEGIN' + ' (' + name + ') ...' + comment + '... ' + 'QUOTE_END' + ' ';
      });
    };
  };

  const delay = (ms) => {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  };

 const initLikeButtonListeners = ({ comments }) => {
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
          renderComments({ comments });
        })
      });
    };
  };