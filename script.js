function cancelForm() {
    document.querySelector('.cancel').addEventListener('click', (event) => {
        event.preventDefault()
        document.querySelector('.modal-overlay').classList.remove('active')
    })
}

function displayForm() {
    document.querySelector('.new').addEventListener('click', (event) => {
        event.preventDefault()
        document.querySelector('.modal-overlay').classList.add('active')
    })
}
displayForm()
cancelForm()