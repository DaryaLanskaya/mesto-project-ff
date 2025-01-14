function createCard(item,deleteEnabled = false,deleteEvent,likeEvent,imageEvent){  
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardClone.querySelector('.card__delete-button');
 
  cardClone.querySelector('.card__title').textContent = item.name; 
  cardClone.querySelector('.card__image').src = item.link;
  cardClone.querySelector('.card__image').alt = item.name;

  const likeIcon = cardClone.querySelector('.card__like-button') 
  likeIcon.addEventListener('click', likeEvent); 
  const cardImg =  cardClone.querySelector('.card__image'); 
  cardImg.addEventListener("click", () => { 
    imageEvent(item);
  }); 
  
  if(deleteEnabled) {
    deleteButton.addEventListener('click', deleteEvent); 
    deleteButton.classList.remove('button-hidden');
  } else {
    deleteButton.classList.add('button-hidden');
  }

  return cardClone;
};

function deleteCards(e) { 
  const card = e.target.closest('.card')
  card.remove()
};

function likeСards(evt) { 
  evt.target.classList.toggle('card__like-button_is-active');
};

export { createCard, deleteCards, likeСards }