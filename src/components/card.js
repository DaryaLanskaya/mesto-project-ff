function createCard(item,deleteEvent,likeEvent){ 
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardClone.querySelector('.card__delete-button');
  cardClone.querySelector('.card__title').textContent = item.name; 
  cardClone.querySelector('.card__image').src = item.link;
  let cardImageModal = document.querySelector('.popup__image');
  let srcValueModal = item.link;
  deleteButton.addEventListener('click', deleteEvent); 
  const likeIcon = cardClone.querySelector('.card__like-button')
  likeIcon.addEventListener('click', likeEvent);
  return cardClone;
};

function cardsDelete(e) { 
  const card = e.target.closest('.card')
  card.remove()
};

function cardsLike(evt) { 
  evt.target.classList.toggle('card__like-button_is-active');
};

export{ createCard, cardsDelete, cardsLike}