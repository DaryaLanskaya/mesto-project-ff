function openModal(modal,closeEvent){
    const inputs = modal.getElementsByTagName('input');
    for (const input of inputs) input.value = '';
    modal.classList.add('popup_is-opened');
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', closeEvent);
}

function closeModal(e) { 
    const modal = e.target.closest('.popup')
    modal.classList.remove('popup_is-opened');
};

export { openModal, closeModal } 
