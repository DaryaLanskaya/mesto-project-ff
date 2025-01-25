import './pages/index.css';

import { createCard, deleteCards, likeСards } from './components/card.js'

import { initialCards } from './components/cards.js'

import { openPopup, closePopup } from './components/modal.js'

import { enableValidation, clearValidation } from './components/validation.js'

import { getDataUser, getDataCards, updateDataUser, addCard, updateAvatarResponse } from './components/api.js'

const cardList = document.querySelector('.places__list');
const modalImg = document.querySelector('.popup_type_image');
const createCardModal = document.querySelector('.popup_type_new-card');
const createProfileButton = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const editProfileButton = document.querySelector('.profile__edit-button');
const nameInput = document.querySelector('.popup__input_type_name');
const jobInput = document.querySelector('.popup__input_type_description');
const cardNameInput = document.querySelector('.popup__input_type_card-name');
const btnNewCard = createCardModal.querySelector('.popup__button');
const nameTitle =  document.querySelector('.profile__title');
const cardLinkInput = document.querySelector('.popup__input_type_url');
const jobTitle =  document.querySelector('.profile__description');
const cardImageModal = modalImg.querySelector('.popup__image');
const modalTitle = modalImg.querySelector('.popup__caption');
const updateAvatarModal = document.querySelector('.popup_type_avatar');
const imgAvatar = document.querySelector('.profile__image');   
const linkAvatar = document.querySelector('.popup__input_type_card-avatar');   
const btnAvatar = updateAvatarModal.querySelector('.popup__button') 
const modalEditElement = document.querySelector('.popup__form');

console.log(btnAvatar)

const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

// function renderCard() { 
//   initialCards.forEach((item) => { 
//   const card = createCard(item, false, openForm, deleteCards, likeСards, clickImage);
//     cardList.append(card);
//   });
// };

// renderCard();

// 3.Показываем карточки на странице
const renderCard = (cardsData, userId) => {
  cardsData.forEach((item) => {
    const cardElement = createCard(
      item,
      userId,
      false,
      openForm,
      deleteCards,
      likeСards,
      clickImage
    );
    cardList.prepend(cardElement);
  });
};

createProfileButton.addEventListener('click', function () {
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
  const submitButtonText = btnNewCard.textContent;
  btnNewCard.textContent = "Сохранение ...";
  console.log(cardNameInput.value, cardLinkInput.value)
  addCard(cardNameInput.value, cardLinkInput.value) // POST

  .then((item) => {
    const newCardElement = createCard(  // Создаем новую карточку (передаем данные) - при успешном выполнении запроса
      item,
      item.owner._id, // ID владельца 
      true,
      openForm,
      deleteCards,
      likeСards,
      clickImage
     ) 

    cardList.prepend(newCardElement);
    closePopup(createCardModal);
    evt.target.reset();
  })

  .catch((err) => {
    console.error(`Ошибка ${err}. Не получилось создать новую карточку.`);
  })

  .finally(() => (btnNewCard.textContent = submitButtonText));


  // const nameInputValue = cardNameInput.value; 
  // const linkInputValue = cardNameInput.value; 

  // const item = 
  // {
  //   name: nameInputValue,
  //   link: linkInputValue,
  // };

  // const card = createCard(item, true, openForm, deleteCards, likeСards, clickImage);
  // cardList.prepend(card);

  // closePopup(createCardModal);

  // evt.target.reset();
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

// 1. Редактирование аватара профиля
function avatarModalSubmit(evt) {
  evt.preventDefault();
  const submitButtonText = btnAvatar.textContent;
  btnAvatar.textContent = "Сохранение ...";
  updateAvatarResponse(linkAvatar.value) // PATCH
  
  .then((data) => {
    imgAvatar.style.backgroundImage = `url(${data.avatar})`;
    closePopup(updateAvatarModal);
    updateAvatarModal.reset();
  })

  .catch((err) => {
    console.error(`Ошибка ${err}.Скорее всего не получилось загрузить 
    аватар в профиль.`);
  })

  .finally(() => (btnAvatar.textContent = submitButtonText));
}

// Слушатель - при нажатии на кнопку отправки в модальном окне
imgAvatar.addEventListener('click', function () {
  openPopup(updateAvatarModal);
  clearValidation(updateAvatarModal, validationConfig);
  enableValidation(validationConfig);
});

btnAvatar.addEventListener("click", avatarModalSubmit);

// 2. Промис карточек
Promise.all([getDataUser(), getDataCards()]) 
  .then(([userData, cardsData]) => { // Ответ от сервера в виде объекта пользователя и карточек
    //  userId = userData._id;
    console.log(userData, cardsData)
    nameTitle.textContent = userData.name;
    jobTitle.textContent = userData.about;
    imgAvatar.style.backgroundImage = `url(${userData.avatar})`;
    renderCard(cardsData, userData._id);
  })
  //   cards.forEach((data) => {
  //     const card = createCard(
  //       data,
  //       {

  //       },
  //       userId
  //     );
  //     cardList.prepend(card);
  // });
  .catch((err) => {
    console.log(
      `Ошибка. Не получилось записать информацию о 
      пользователе страницы, либо отобразить карточки: ${err}`
    );
});