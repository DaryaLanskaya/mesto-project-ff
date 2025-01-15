import './pages/index.css';

import { createCard, deleteCards, likeСards } from './components/card.js'

import { initialCards } from './components/cards.js'

import { openPopup, closePopup } from './components/modal.js'

import { enableValidation, clearValidation } from './components/validation.js'

const cardList = document.querySelector('.places__list');
const modalImg = document.querySelector('.popup_type_image');
const createCardModal = document.querySelector('.popup_type_new-card');
const createCardButton = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const nameTitle =  document.querySelector('.profile__title');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const jobTitle =  document.querySelector('.profile__description');
const cardImageModal = modalImg.querySelector('.popup__image');
const modalTitle = modalImg.querySelector('.popup__caption');

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

function renderCard() { 
  initialCards.forEach((item) => { 
  const card = createCard(item, false, openForm, deleteCards, likeСards, clickImage);
    cardList.append(card);
  });
};

renderCard();

createCardButton.addEventListener('click', function () {
  openPopup(createCardModal);
  clearValidation(createCardModal, validationConfig);
  enableValidation(validationConfig);
});

editProfileButton.addEventListener('click', function () {
  const nameTitleBlock = nameTitle.textContent; 
  const jobTitleBlock = jobTitle.textContent; 
  nameInput.value = nameTitleBlock;
  jobInput.value = jobTitleBlock;
  openPopup(editProfileModal);
  clearValidation(editProfileModal, validationConfig);
  enableValidation(validationConfig);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  const nameInputValue = nameInput.value; 
  const jobInputValue = jobInput.value; 
  nameTitle.textContent = nameInputValue;
  jobTitle.textContent = jobInputValue;
  closePopup(editProfileModal);
}

editProfileModal.addEventListener('submit', handleProfileFormSubmit); 

function addCardForm(evt) { 
  evt.preventDefault();

  const nameInputValue = cardNameInput.value; 
  const linkInputValue = cardLinkInput.value; 

  const item = 
  {
    name: nameInputValue,
    link: linkInputValue,
  };

  const card = createCard(item, true, openForm, deleteCards, likeСards, clickImage);
  cardList.prepend(card);

  closePopup(createCardModal);

  evt.target.reset();
}

createCardModal.addEventListener('submit', addCardForm); 
function clickImage(item) { 
  const itemName = item.name;
  const itemLink = item.link;
  cardImageModal.src = itemLink;
  cardImageModal.alt = itemName;
  modalTitle.textContent = itemName; 
  openPopup(modalImg);
}

function openForm() { 
  const deleteCardModal = document.querySelector('.popup_type_delete');
  const deleteAssent = document.querySelector('.popup_type_delete .popup__button');
  openPopup(deleteCardModal);
  deleteAssent.addEventListener('click', function () {
  closePopup(deleteCardModal);
  });
}


