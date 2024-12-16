function openModal(modal,closeEvent){
    let inputs = modal.getElementsByTagName('input');
    for (let input of inputs) input.value = '';
    modal.classList.add('popup_is-opened');
    const closeButton = modal.querySelector('.popup__close');
    closeButton.addEventListener('click', closeEvent);
}

function modalClose(e) { 
    let modal = e.target.closest('.popup')
    modal.classList.remove('popup_is-opened');
};

export { openModal, modalClose } 
