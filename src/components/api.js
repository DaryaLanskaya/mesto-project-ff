// Запрос к серверу
const config = {
    baseUrl: 'https://nomoreparties.co/v1/wff-cohort-30/cards',
    headers: {
      authorization: '354f64aa-f3b9-471d-8401-f8aca7049e54',
      'Content-Type': 'application/json',
    }
}

//  Получение ответных данных от сервера
const getDataResponse = (res) => {
    return res.ok ? res.json() : Promise.reject(`Что-то пошло не так: ${res.status}`);
};

// Загрузка информации о пользователе с сервера
function loadDataUser(res) {
    fetch(config.headers + '/users/me', {
        method: 'GET', 
        headers: config.headers,
      })

    .then(getDataResponse(res))

    .then((data) => {
       const nameAvatar = document.querySelector('profile__title');
       const imgAvatar = document.querySelector('profile__image');
       const aboutAvatar  = document.querySelector('profile__description');
       const currentUserId = data._id;
       imgAvatar.style.backgroundImage  = data.avatar;
    //    imgAvatar.style.backgroundImage  = `url(${data.avatar})`;
       nameAvatar.textContent  = data.name;
       aboutAvatar.textContent  = data.about;
       console.log('ID пользователя:', currentUserId);
    })
}
  
loadDataUser();