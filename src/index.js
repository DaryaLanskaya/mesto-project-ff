import './pages/index.css';

import { createCard, cardsDelete, cardsLike} from './components/card.js'

import { initialCards } from './components/cards.js'

import { openModal, modalClose} from './components/modal.js'

const cardList = document.querySelector('.places__list');

function render() { 
  initialCards.forEach((item) => { 
 
  const card = createCard(item,cardsDelete,cardsLike,clickImage);
    cardList.append(card);
  });
};

render();

const modalImg = document.querySelector('.popup_type_image');
const createModal = document.querySelector('.popup_type_new-card');
const createButton = document.querySelector('.profile__add-button');

createButton.addEventListener('click', function () {
  openModal(createModal,modalClose);
});

const editModal = document.querySelector('.popup_type_edit');
const editButton = document.querySelector('.profile__edit-button');

editButton.addEventListener('click', function () {
    openModal(editModal,modalClose);
});

function closePopupOverlay(evt) { 
  const popupOpen = document.querySelector('.popup_is-opened');
  if (evt.currentTarget === evt.target) {
    popupOpen.classList.remove('popup_is-opened');
  }
};

createModal.addEventListener("click", (evt) => { 
  closePopupOverlay(evt,createModal);
});

editModal.addEventListener("click", (evt) => { 
  closePopupOverlay(evt,editModal);
});

modalImg.addEventListener("click", (evt) => { 
  closePopupOverlay(evt,modalImg);
});

document.addEventListener('keydown', function(evt) {
  closePopupEsc(evt);
});

const formElement = document.querySelector('.popup_type_edit');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');

function handleFormSubmit(evt) {
  evt.preventDefault(); 
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const nameTitle =  document.querySelector('.profile__title');
  const jobTitle =  document.querySelector('.profile__description');
  nameTitle.textContent = nameInputValue;
  jobTitle.textContent = jobInputValue;
}

formElement.addEventListener('submit', handleFormSubmit); 

let formElementCreate = document.querySelector('.popup_type_new-card');
const designationInput = document.querySelector('.popup__input_type_card-name');

function addCardForm(evt) {
  evt.preventDefault(); 
  let cards= document.querySelector('.places__list'); 
  let card= document.querySelector('.places__item'); 
  let clone = card.cloneNode(true);
  clone.classList.add('card__new');
  cards.prepend(clone);
  const designationInputValue = designationInput.value;
  let linkInput = document.querySelector('.popup__input_type_url');
  let linkInputValue = linkInput.value;
  const cardImage = document.querySelector('.card__new .card__image')
  const designationTitle =  document.querySelector('.card__new .card__title')
  designationTitle.textContent = designationInputValue;
  cardImage.src = linkInputValue;
  let buttonDelete = document.querySelector('.card__new .card__delete-button');
  buttonDelete.addEventListener('click', cardsDelete);
  const likeIcon = document.querySelector('.card__like-button') 
  likeIcon.addEventListener('click', cardsLike);
}

const saveButtonNew = createModal.querySelector('.popup__button');
saveButtonNew.addEventListener('click', modalClose); 

formElementCreate.addEventListener('submit', addCardForm); 

const saveButton =  editModal.querySelector('.popup__button');  
saveButton.addEventListener('click', modalClose); 

function closePopupEsc(evt) { 
  if( evt.keyCode == 27 ){ 
    const popupOpen = document.querySelector('.popup_is-opened');
    popupOpen.classList.remove('popup_is-opened');
    modalClose;
  }
}

function clickImage(event) { 
  const srcValue = event.currentTarget.src;
  const cardImageModal = modalImg.querySelector('.popup__image')
  cardImageModal.src = srcValue;
  const altValue = event.currentTarget.alt;
  const modalTitle = modalImg.querySelector('.popup__caption');
  modalTitle.innerHTML = altValue; 
  openModal(modalImg,modalClose);
}



