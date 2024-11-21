const cardList = document.querySelector('.places__list');

function render() { 
  initialCards.forEach((item) => { 
  const card = addCard(item,cardsDelete);
    cardList.append(card);
  });
};

function addCard(item,deleteEvent){ 
  const cardTemplate = document.querySelector('#card-template').content; 
  const cardClone = cardTemplate.querySelector('.card').cloneNode(true);
  const deleteButton = cardClone.querySelector('.card__delete-button');
  cardClone.querySelector('.card__title').textContent = item.name; 
  cardClone.querySelector('.card__image').src = item.link;
  deleteButton.addEventListener('click', deleteEvent); 
  return cardClone;
};

function cardsDelete(e) { 
  const card = e.target.closest('.card')
  card.remove()
};

render();