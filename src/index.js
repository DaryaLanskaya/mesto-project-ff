import './pages/index.css';

import { createCard, deleteCards, likeСards } from './components/card.js'

import { initialCards } from './components/cards.js'

import { openPopup, closePopup, clearInputPopup} from './components/modal.js'

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

function renderCard() { 
  initialCards.forEach((item) => { 
  const card = createCard(item,deleteCards,likeСards,clickImage);
    cardList.append(card);
  });
};

renderCard();

createCardButton.addEventListener('click', function () {
  openPopup(createCardModal);
});

editProfileButton.addEventListener('click', function () {
  const nameTitleBlock = nameTitle.textContent; 
  const jobTitleBlock = jobTitle.textContent; 
  nameInput.value = nameTitleBlock;
  jobInput.value = jobTitleBlock;
  openPopup(editProfileModal);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  const nameInputValue = nameInput.value; 
  const jobInputValue = jobInput.value; 
  nameTitle.textContent = nameInputValue;
  jobTitle.textContent = jobInputValue;
  closePopup(editProfileModal)
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

  const card = createCard(item,deleteCards,likeСards,clickImage);
  cardList.prepend(card);

  closePopup(createCardModal);
  clearInputPopup(createCardModal);
}

createCardModal.addEventListener('submit', addCardForm); 

function clickImage(item) { 
  const cardImageModal = modalImg.querySelector('.popup__image')
  const itemName = item.name;
  const itemLink = item.link;
  const modalTitle = modalImg.querySelector('.popup__caption');
  cardImageModal.src = itemLink;
  cardImageModal.alt = itemName;
  modalTitle.textContent = itemName; 
  openPopup(modalImg);
}

