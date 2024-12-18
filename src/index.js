import './pages/index.css';

import { createCard, deleteCards, likeСards } from './components/card.js'

import { initialCards } from './components/cards.js'

import { openPopup, closePopup, clearInputModal} from './components/modal.js'

const cardList = document.querySelector('.places__list');

function renderCard() { 
  initialCards.forEach((item) => { 
 
  const card = createCard(item,deleteCards,likeСards,clickImage);
    cardList.append(card);
  });
};

renderCard();

const modalImg = document.querySelector('.popup_type_image');
const createCardModal = document.querySelector('.popup_type_new-card');
const createCardButton = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const designationInput = document.querySelector('.popup__input_type_card-name');
const saveButtonProfile =  editProfileModal.querySelector('.popup__button');  
const formCard = createCardModal.querySelector('.popup__form');
const formProfile =  editProfileModal.querySelector('.popup__form');  
const saveButtonCard = createCardModal.querySelector('.popup__button');
const nameTitle =  document.querySelector('.profile__title');
const popups = document.querySelectorAll('.popup')
console.log(popups)

createCardButton.addEventListener('click', function () {
  openPopup(createCardModal);
});

editProfileButton.addEventListener('click', function () {
    openPopup(editProfileModal);
});


// function closePopupOverlay(evt) { 
//   const popupOpen = document.querySelector('.popup_is-opened');
//   if (evt.currentTarget === evt.target) {
//     popupOpen.classList.remove('popup_is-opened');
//   }
// };

// createCardModal.addEventListener("click", (evt) => { 
//   closePopupOverlay(evt,createCardModal);
// });

// editProfileModal.addEventListener("click", (evt) => { 
//   closePopupOverlay(evt,editProfileModal);
// });

// modalImg.addEventListener("click", (evt) => { 
//   closePopupOverlay(evt,modalImg);
// });

// document.addEventListener('keydown', function(evt) {
//   closePopupEsc(evt);
// });

// document.addEventListener('keydown', handleEscape); 
// document.removeEventListener('keydown', handleEscape); 

// popups.forEach((popup) => {
//   popup.addEventListener('mousedown', (evt) => {
//       if (evt.target.classList.contains('popup_is-opened')) {
//           closePopup(popup)
//       }
//       if (evt.target.classList.contains('popup__close')) {
//         closePopup(popup)
//       }
//   })

// })



// document.addEventListener('keydown', handleEscape); 
// document.removeEventListener('keydown', handleEscape); 

// function openPopup(popup) {
//   document.addEventListener('keydown', handleEscape); 
// }

// function closePopup(popup) {
//   document.removeEventListener('keydown', handleEscape); 
// }

// saveButton.addEventListener('click', closePopup); 

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  const nameInputValue = nameInput.value;
  const jobInputValue = jobInput.value;
  const jobTitle =  document.querySelector('.profile__description');
  nameTitle.textContent = nameInputValue;
  jobTitle.textContent = jobInputValue;
  closePopup(editProfileModal)
}

editProfileModal.addEventListener('submit', handleProfileFormSubmit); 

function addCardForm(evt) {
  evt.preventDefault(); 
  const cards= document.querySelector('.places__list'); 
  const card= document.querySelector('.places__item'); 
  const clone = card.cloneNode(true);
  clone.classList.add('card__new');
  cards.prepend(clone);
  const designationInputValue = designationInput.value;
  const linkInput = document.querySelector('.popup__input_type_url');
  const linkInputValue = linkInput.value;
  const cardImage = document.querySelector('.card__new .card__image')
  const designationTitle =  document.querySelector('.card__new .card__title')
  designationTitle.textContent = designationInputValue;
  cardImage.src = linkInputValue;
  cardImage.alt = designationInputValue
  const buttonDelete = document.querySelector('.card__new .card__delete-button');
  buttonDelete.addEventListener('click', deleteCards);
  const likeIcon = document.querySelector('.card__like-button') 
  likeIcon.addEventListener('click', likeСards);
  cardImage.addEventListener('click', clickImage); 
  console.log(createCardModal);
  clearInputModal(createCardModal);
  closePopup(createCardModal)
}

createCardModal.addEventListener('submit', addCardForm); 

// saveButtonProfile.addEventListener('click', closePopup); 

// saveButtonCard.addEventListener('click', closePopup); 
// function closePopupEsc(evt) { 
//   if(evt.key === 'Escape'){ 
//     const popupOpen = document.querySelector('.popup_is-opened');
//     popupOpen.classList.remove('popup_is-opened');
//     closePopup;
//   }    
// }

function clickImage(event) { 
  // const srcValue = event.currentTarget.src;
  // const cardImageModal = modalImg.querySelector('.popup__image')
  // cardImageModal.src = srcValue;
  // const altValue = event.currentTarget.alt;
  // const modalTitle = modalImg.querySelector('.popup__caption');
  // modalTitle.textContent = altValue; 
  // openPopup(modalImg,closePopup);
}