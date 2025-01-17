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
function loadInformUser(res) {
    fetch(config.headers + '/users/me', {
        method: 'GET', 
        headers: config.headers,
      })
    getDataResponse(res);
}
  
loadInformUser();