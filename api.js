export function getTodos() {
    return fetch('https://wedev-api.sky.pro/api/v1/nadya-terleeva/comments', {
    method: "GET"
  })
    // подписываемся на успешное завершение запроса с помощью then
    .then((response) => {
    return response.json();
});
};

export function postTodos({ userName, userComment, userData }) {
      return fetch('https://wedev-api.sky.pro/api/v1/nadya-terleeva/comments', {
      method: 'POST',
      body: JSON.stringify({
        name: userName,
        text: userComment,
        data: userData,
        forceError: true
      }),
    })
}