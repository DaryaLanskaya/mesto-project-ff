// // Запрос к серверу
// const config = {
//     baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30/',
//     headers: {
//       authorization: '354f64aa-f3b9-471d-8401-f8aca7049e54',
//       'Content-Type': 'application/json',
//     }
// }

// //  Получение ответных данных от сервера
// const getDataResponse = (res) => {
//     return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
// };

// // Загрузка информации о пользователе с сервера
// function loadDataUser(res) {
//     console.log(3333)
//     fetch(config.baseUrl + '/users/me', {
//         method: 'GET', 
//         headers: config.headers,
//       })

//     .then(getDataResponse(res))

//     .then((data) => {
//        const nameAvatar = document.querySelector('profile__title');
//        const imgAvatar = document.querySelector('profile__image');
//        const aboutAvatar  = document.querySelector('profile__description');
//        const currentUserId = data._id;
//        imgAvatar.style.backgroundImage  = data.avatar;
//     //    imgAvatar.style.backgroundImage  = `url(${data.avatar})`;
//        nameAvatar.textContent  = data.name;
//        aboutAvatar.textContent  = data.about;
//        console.log('ID пользователя:', currentUserId);
//     })
// }
  
// loadDataUser(res);


// export { config, getDataResponse, loadDataUser }






// 24.01.2025

const PATH = "https://nomoreparties.co/v1/wff-cohort-30";

// Запрос к серверу
const config = {
  baseUrl: PATH,
  // cohortId: "wff-cohort-30",
  headers: {
    authorization: "354f64aa-f3b9-471d-8401-f8aca7049e54",
    "Content-Type": "application/json",
  }
}

// Выведение объектов в консоль
function openInfo() { 
  fetch(PATH + '/cards', {
    headers: {
      authorization: '354f64aa-f3b9-471d-8401-f8aca7049e54',
    }
  })

    .then(res => res.json())

    .then((result) => {
      console.log(result);
    }); 
  }
  
  openInfo();


//  Получение ответных данных от сервера
const handleResponse = (res) => {
  return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// Загрузка информации о пользователе с сервера (GET-запрос)
export const getDataUser = () => {
  return fetch(PATH + '/users/me', {
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
export const updateDataUser  = ({ name, about }) => {
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
export const addDataCard  = ({ name, link }) => {
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
export const deleteDataCard  = (cardID) => {
  return fetch(PATH + `/cards/${cardID}`, {
    method: 'DELETE',
    headers: config.headers,
  })

  .then(handleResponse);
};

// Постановка и снятие лайка

console.log(getDataCards())

// loadDataUser();