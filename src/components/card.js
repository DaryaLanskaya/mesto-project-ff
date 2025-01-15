function createCard(item,deleteEnabled = false,openEvent,likeEvent,imageEvent){  
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true); 
  const deleteButton = cardClone.querySelector('.card__delete-button');
  const deleteModal= document.querySelector('.popup_type_delete');

  cardClone.querySelector('.card__title').textContent = item.name; 
  cardClone.querySelector('.card__image').src = item.link;
  cardClone.querySelector('.card__image').alt = item.name;
  
  // const deleteCard = cardClone.querySelector('.card__delete-button');
  // deleteCard.addEventListener('click', openForm); 

  const likeIcon = cardClone.querySelector('.card__like-button'); 
  likeIcon.addEventListener('click', likeEvent); 

  const cardImg =  cardClone.querySelector('.card__image'); 
  cardImg.addEventListener("click", () => { 
    imageEvent(item);
  }); 
  
  if(deleteEnabled) {
    deleteButton.addEventListener('click', openEvent); 

    deleteButton.classList.remove('button-hidden');
  }
  else
  {
     deleteButton.classList.add('button-hidden');
  }

  // if(deleteEnabled) {
  //   deleteButton.addEventListener('click', deleteEvent); 
  //   deleteButton.classList.remove('button-hidden');
  // }
  // else
  // {
  //   deleteButton.classList.add('button-hidden');
  // }

  return cardClone;
};

// function openForm (e) {
//   const card = e.target.closest('.card'); 
//   const deleteModal= document.querySelector('.popup_type_delete');
//   deleteModal.classList.add('popup_is-opened');
// };

// function deleteCards (e) {
//   const card = e.target.closest('.card');
// }

function likeСards(evt) { 
  evt.target.classList.toggle('card__like-button_is-active');
};

export { createCard, likeСards }