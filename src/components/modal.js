// function openModal(modal,closeEvent){
//     modal.classList.add('popup_is-opened');
//     const closeButton = modal.querySelector('.popup__close');
//     closeButton.addEventListener('click', closeEvent);
// }

// function closeModal(e) { 
//     const modal = e.target.closest('.popup')
//     modal.classList.remove('popup_is-opened');
// };


function openPopup(popup){
    popup.classList.add('popup_is-opened');
    document.addEventListener('keydown', handleEscape); 
    document.addEventListener('click', closePopupOverlay); 
    document.addEventListener('click', closePopupClick); 
}


function closePopup(popup) { 
    popup.classList.remove('popup_is-opened');
    document.removeEventListener('keydown', handleEscape); 
    document.removeEventListener('click', closePopupOverlay); 
    document.removeEventListener('click', closePopupClick); 
};

function handleEscape(evt) {
    if (evt.key === 'Escape') {
      const openedPopup = document.querySelector('.popup_is-opened') 
      closePopup(openedPopup);
    }
  }

  function closePopupClick(evt) { 
    if (evt.target.classList.contains('popup__close')) {
        const popup = document.querySelector('.popup_is-opened');
        closePopup(popup)
      }
   };

function closePopupOverlay(evt) { 
    if (evt.currentTarget === evt.target) {
        closePopup(evt.target)
    }
  };
// function clearInputModal (modal) {
//     const inputs = modal.getElementsByTagName('input');
//     for (const input of inputs) input.value = '';
//     return clearInputModal;
// }

// function clearInputModal (e) {
//     const modal = e.target.closest('.popup')
//     const inputs = modal.getElementsByTagName('input');
//     for (const input of inputs) input.value = '';
// }

function clearInputModal(popup) {
   const inputs = popup.querySelectorAll('input');
   for (const input of inputs) input.value = '';
}

export { openPopup, closePopup, clearInputModal } 
