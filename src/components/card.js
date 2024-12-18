function createCard(item,deleteEvent,likeEvent,imageEvent){  // ФУНКЦИЯ СОЗДАНИЯ КАРТОЧКИ 
  // ПЕРЕДАЕМ МЕТОДЫ - ИМПУТ. УДАЛЕНИЕ. ЛАЙК. КЛИК НА КАРТИНКУ
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true); // ДЕЛАЕМ КЛОН КАРТОЧКИ
  const deleteButton = cardClone.querySelector('.card__delete-button'); // ИЩЕМ КНОПКУ УДАЛЕНИЯ
  cardClone.querySelector('.card__title').textContent = item.name; // ЗАПИСЫВАЕМ НАЗВАНИЕ
  cardClone.querySelector('.card__image').src = item.link; // ЗАПИСЫВАЕМ ССЫЛКУ НА ИЗОБРАЖЕНИЕ
  cardClone.querySelector('.card__image').alt = item.name; // ЗАПИСЫВАЕМ АЛЬТ НА ИЗОБРАЖЕНИЕ
  deleteButton.addEventListener('click', deleteEvent); // У КНОПКИ ПРОПИСЫВАЕМ СОБЫТИЕ УДАЛЕНИЯ 
  const likeIcon = cardClone.querySelector('.card__like-button') // КНОПКА ЛАЙК
  likeIcon.addEventListener('click', likeEvent); // НА КНОПКУ ПЕРЕДАЕМ СОБЫТИЕ ЛАЙКНУТЬ 
  const cardImg =  cardClone.querySelector('.card__image'); // КАРТИНКА В КАРТОЧКЕ
  cardImg.addEventListener("click", () => { 
    imageEvent(item);
  }); 
  
  return cardClone;
};

function deleteCards(e) { 
  const card = e.target.closest('.card')
  card.remove()
};

function likeСards(evt) { 
  evt.target.classList.toggle('card__like-button_is-active');
};

export{ createCard, deleteCards, likeСards}