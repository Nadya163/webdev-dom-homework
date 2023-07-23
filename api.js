const todoURL = "https://wedev-api.sky.pro/api/v2/nadya-terleeva/comments"
const loginURL = "https://wedev-api.sky.pro/api/user/login"
const userURL = "https://wedev-api.sky.pro/api/user"

export let token;

export const setToken = (newToken) => {
token = newToken;
}

export function getTodos() {
    return fetch(todoURL, {
    method: "GET"
  })
    // подписываемся на успешное завершение запроса с помощью then
    .then((response) => {
    return response.json();
});
};

export function getTodosLogin() {
  return fetch(todoURL, {
  method: "GET",
  headers: {
    Authorization: `Bearar ${token}`,
  }
})
  .then((response) => {
  return response.json();
});
};

export function postTodos({ userName, userComment, userData }) {
      return fetch(todoURL, {
      method: 'POST',
      headers: {
        Authorization: `Bearar ${token}`,
      },
      body: JSON.stringify({
        name: userName,
        text: userComment,
        data: userData,
        forceError: true
      }),
    })
}

export function login({ login, password }) {
  return fetch(loginURL, {
  method: 'POST',
  body: JSON.stringify({
    login,
    password
  }),
})
.then((response) => {
  return response.json();
});
}

export function registration({ name, login, password }) {
  return fetch(userURL, {
  method: 'POST',
  body: JSON.stringify({
    name,
    login,
    password
  }),
})
.then((response) => {
  return response.json();
});
}