// 24.01.2025

const PATH = "https://nomoreparties.co/v1/wff-cohort-30";

// Запрос к серверу
const config = {
  baseUrl: PATH,
  headers: {
    authorization: "354f64aa-f3b9-471d-8401-f8aca7049e54",
    "Content-Type": "application/json",
  }
}

//  Получение ответных данных от сервера
const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// Загрузка информации о пользователе с сервера (GET-запрос)
export const getDataUser = () => {
  return fetch(PATH + '/users/me ', {
    headers: config.headers,
  })

  .then(handleResponse);
};

// Загрузка карточек с сервера (GET-запрос)
export const getDataCards = () => {
  return fetch(PATH + '/cards', {
    headers: config.headers,
  })

  .then(handleResponse);
};

// Редактирование профиля - отредактированные данные профиля должны сохраняться на сервере (PATCH-запрос)
export const updateDataUser  = (name, about) => {
  return fetch(PATH + '/users/me', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      about: about,
    }),
  })

  .then(handleResponse);
};

// Добавление новой карточки на сервер (POST-запрос)
export const addCard  = (name, link) => {
  return fetch(PATH + '/cards', {
    method: 'POST',
    headers: config.headers,
    body: JSON.stringify({
      name: name,
      link: link,
    }),
  })

  .then(handleResponse);
};

// Удаление карточки  иконка (DELETE-запрос)
export const removeCard  = (cardId) => {
  return fetch(PATH + `/cards/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })

  .then(handleResponse);
};

// Постановка лайка у карточки (PUT-запрос)
export const setLike  = (cardId) => {
  return fetch(PATH + `/cards/likes/${cardId}`, {
    method: 'PUT',
    headers: config.headers,
  })

  .then(handleResponse);
};

// Снятие лайка у карточки (DELETE-запрос)
export const removeLike  = (cardId) => {
  return fetch(PATH + `/cards/likes/${cardId}`, {
    method: 'DELETE',
    headers: config.headers,
  })

  .then(handleResponse);
};

// Обновление аватара пользователя (PATCH-запрос)
export const updateAvatarResponse  = (url) => {
  return fetch(PATH + '/users/me/avatar', {
    method: 'PATCH',
    headers: config.headers,
    body: JSON.stringify({ 
      avatar: url
    }),
  })

  .then(handleResponse);
};
