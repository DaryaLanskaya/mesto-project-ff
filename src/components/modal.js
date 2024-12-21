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
    if (evt.target.classList.contains('popup_is-opened')) {
        closePopup(evt.target)
    }
  };

export { openPopup, closePopup } 
