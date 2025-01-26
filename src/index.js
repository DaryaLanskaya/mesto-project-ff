import './pages/index.css';

import { createCard, likeСards, deleteСard } from './components/card.js'

import { openPopup, closePopup } from './components/modal.js'

import { enableValidation, clearValidation } from './components/validation.js'

import { getDataUser, getDataCards, updateDataUser, addCard, removeCard, updateAvatarResponse } from './components/api.js'

const cardList = document.querySelector('.places__list');
const modalImg = document.querySelector('.popup_type_image');
const createCardModal = document.querySelector('.popup_type_new-card');
const createProfileButton = document.querySelector('.profile__add-button');
const editProfileModal = document.querySelector('.popup_type_edit');
const btnUpdateModal = editProfileModal.querySelector('.popup__button');
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
const deleteCardModal = document.querySelector('.popup_type_delete');
const deleteAssent = deleteCardModal.querySelector('.popup__button');
const validationConfig = {
  formSelector: '.popup__form',
  inputSelector: '.popup__input',
  submitButtonSelector: '.popup__button',
  inactiveButtonClass: 'popup__button_disabled',
  inputErrorClass: 'popup__input_type_error',
  errorClass: 'popup__error_visible'
}; 

// 3.Показываем карточки на странице
const renderCard = (cardsData, userId) => {
  cardsData.forEach((item) => {
    const cardElement = createCard(
      item,
      userId,
      openFormDeleteCard,
      likeСards,
      clickImage
    );
    cardList.append(cardElement);
  });
};

enableValidation(validationConfig); 

createProfileButton.addEventListener('click', function () {
  openPopup(createCardModal);
  clearValidation(createCardModal, validationConfig);
});

editProfileButton.addEventListener('click', function () {
  const nameTitleBlock = nameTitle.textContent; 
  const jobTitleBlock = jobTitle.textContent; 
  nameInput.value = nameTitleBlock;
  jobInput.value = jobTitleBlock;
  openPopup(editProfileModal);
  clearValidation(editProfileModal, validationConfig);
});

function handleProfileFormSubmit(evt) {
  evt.preventDefault(); 
  const submitButtonText = btnUpdateModal.textContent;
  btnUpdateModal.textContent = "Сохранение ...";

  updateDataUser(nameInput.value, jobInput.value) // PATH
 
  .then((data) => {
    nameTitle.textContent = data.name;
    jobTitle.textContent = data.about;
    closePopup(editProfileModal);
  })

  .catch((err) => {
    console.error(`Ошибка ${err}. Не получилось обновить данные.`);
  })

  .finally(() => (btnUpdateModal.textContent = submitButtonText));
}

editProfileModal.addEventListener('submit', handleProfileFormSubmit); 

function addCardForm(evt) { 
  evt.preventDefault();
  const submitButtonText = btnNewCard.textContent;
  btnNewCard.textContent = "Сохранение ...";
  addCard(cardNameInput.value, cardLinkInput.value) // POST

  .then((item) => {
    const newCardElement = createCard(  // Создаем новую карточку (передаем данные) - при успешном выполнении запроса
      item,
      item.owner._id, // ID владельца 
      openFormDeleteCard,
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

// 4. При открытии модального окна удаления - передаем ID карточки в кнопку модалки
function openFormDeleteCard(id) { 
  deleteAssent.dataset.id = id; // Приравнивание ID
  openPopup(deleteCardModal);
}

deleteAssent.addEventListener('click', function (evt) {
  evt.preventDefault();
  const submitButtonText = deleteAssent.textContent;
  deleteAssent.textContent = "Удаление ...";
  removeCard(deleteAssent.dataset.id)

  .then((data) => {
    deleteСard(deleteAssent.dataset.id)
    closePopup(deleteCardModal);
  })

  .catch((err) => {
    console.error(`Ошибка ${err}. Не получилось поизвести удаление карточки.`);
  })

  .finally(() => (deleteAssent.textContent = submitButtonText));
});

// 1. Редактирование аватара профиля
function submitModalAvatar(evt) {
  evt.preventDefault();
  const submitButtonText = btnAvatar.textContent;
  btnAvatar.textContent = "Сохранение ...";
  updateAvatarResponse(linkAvatar.value) // PATCH
  
  .then((data) => {
    imgAvatar.style.backgroundImage = `url(${data.avatar})`;
    closePopup(updateAvatarModal);
  
    evt.target.reset();
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
});

updateAvatarModal.addEventListener("submit", submitModalAvatar);

// 2. Промис карточек
Promise.all([getDataUser(), getDataCards()]) 
  .then(([userData, cardsData]) => { // Ответ от сервера в виде объекта пользователя и карточек
    nameTitle.textContent = userData.name;
    jobTitle.textContent = userData.about;
    imgAvatar.style.backgroundImage = `url(${userData.avatar})`;
    renderCard(cardsData, userData._id);
  })

  .catch((err) => {
    console.log(
      `Ошибка. Не получилось записать информацию о 
      пользователе страницы, либо отобразить карточки: ${err}`
    );
});


