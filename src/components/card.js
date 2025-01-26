import { setLike, removeLike } from './api.js'

function createCard(
    item,
    userId,
    openEvent,
    likeEvent,
    openImageEvent,
  ){  
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardClone.querySelector('.card__delete-button');
  const likeIcon = cardClone.querySelector('.card__like-button'); 
  const counterLike = cardClone.querySelector('.card__like-counter');
  const containsLike = item.likes.some( element => element._id === userId);
  const cardImg =  cardClone.querySelector('.card__image');
  counterLike.textContent = item.likes.length;  
  cardClone.setAttribute('id',item._id);
  cardClone.querySelector('.card__title').textContent = item.name; 
  cardClone.querySelector('.card__image').src = item.link;
  cardClone.querySelector('.card__image').alt = item.name;
  likeIcon.addEventListener('click', (evt) => likeEvent(evt, item._id, counterLike));

  cardImg.addEventListener("click", () => { 
    openImageEvent(item);
  }); 

  if(containsLike){ // Вывод лайкнутых карточек при перезагрузке страницы
    likeIcon.classList.add('card__like-button_is-active');
  }

  if(userId === item.owner._id) { // Сравнение моего ID и ID владельца карточки
    deleteButton.addEventListener('click', () => openEvent(item._id)); 
    deleteButton.classList.remove('button-hidden');
  }
  else
  {
     deleteButton.classList.add('button-hidden');
  }

  return cardClone;
};

function deleteСard(cardId) { 
  const selectedCard = document.getElementById(cardId);
  selectedCard.remove();
};

function likeСards(evt, cardId, counerElement) { 
  const classLike = 'card__like-button_is-active';
  if(evt.target.classList.contains(classLike)) {
    removeLike(cardId)
    .then((data) => {
      counerElement.textContent = data.likes.length;  
      evt.target.classList.remove(classLike);
    })
  
    .catch((err) => {
      console.error(`Ошибка ${err}. Не получилось удалить лайк.`);
    })
  }

  else {
  setLike(cardId)
  .then((data) => {
    counerElement.textContent = data.likes.length;  
    evt.target.classList.add(classLike);
  })

  .catch((err) => {
    console.error(`Ошибка ${err}. Не получилось поставить лайк.`);
  })
  }
};

export { createCard, likeСards, deleteСard }