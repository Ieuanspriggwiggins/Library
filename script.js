let booksArray = [];
const booksContainer = document.getElementById('books-container');
const createBookModal = document.getElementById('add-book-dialog');
const editBookModal = document.getElementById('edit-book-dialog');

const addBtn = document.getElementById('add-btn');
const deleteBtn = document.getElementById('delete-btn');

const bookTitleInput = document.getElementById('title-input');
const bookAuthorInput = document.getElementById('author-input');
const bookNumberOfPagesInput = document.getElementById('number-of-pages-input');
const bookCurrentPageInput = document.getElementById('current-page-number-input');

const editBookTitleInput = document.getElementById('edit-title-input');
const editBookAuthorInput = document.getElementById('edit-author-input');
const editBookNumberOfPagesInput = document.getElementById('edit-number-of-pages-input');
const editBookCurrentPageInput = document.getElementById('edit-current-page-number-input');


/**
 * Book constructor for creating a book.
 * @param {string} title 
 * @param {string} author 
 * @param {number} numberOfPages 
 * @param {number} currentPage 
 * @param {boolean} read 
 */
function Book(title, author, numberOfPages, currentPage){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.currentPage = currentPage;
    this.uuid = crypto.randomUUID();
}

function getBookPercentageRead(book){
    return Math.floor((book.currentPage / book.numberOfPages) * 100);
}

/**
 * Creates a book object instance and adds it to the book array.
 * @param {string} title 
 * @param {string} author 
 * @param {number} numberOfPages 
 * @param {number} currentPage 
 * @param {boolean} read 
 */
function createBook(title, author, numberOfPages, currentPage){
    const book = new Book(title, author, numberOfPages, currentPage);
    booksArray.push(book);
}

//Handle the modal dialog for creating a new book.
addBtn.addEventListener('click', function(event) {
    createBookModal.showModal();
}); 

deleteBtn.addEventListener('click', onDeleteBtnClick);

//Add event listener for all buttons to close modals
const closeModalBtns = document.getElementsByClassName('close-modal-btn');
for(let i = 0; i < closeModalBtns.length; i++){
    closeModalBtns[i].addEventListener('click', (event) => {
        const button = event.target;
        const parentModal = button.closest('dialog');
        parentModal.close();
    });
}

//On create form submission
const createBookForm = document.getElementById('create-book-form');
createBookForm.addEventListener('submit', (event) => {
    event.preventDefault(); //Stop the page from refreshing.
    const form = event.target;
    const dialog = form.closest('dialog');
    dialog.close();

    const bookTitle = bookTitleInput.value;
    const bookAuthor = bookAuthorInput.value;
    const bookNumberOfPages = bookNumberOfPagesInput.value;
    const bookCurrentPage = bookCurrentPageInput.value;

    createBook(bookTitle, bookAuthor, bookNumberOfPages, bookCurrentPage);
    saveBooks();
});

/**
 * Creates the books display.
 */
function drawBooks(){
    //clear the container first.
    booksContainer.innerHTML = '';
    for(let i = 0; i < booksArray.length; i++){
        const bookElement = generateBookCard(booksArray[i]);
        booksContainer.appendChild(bookElement);
    };
}

/**
 * Creates a single book card and returns the parent div element with containing elements.
 * @param {Book} book 
 * @returns HTML Element containing the book
 */
function generateBookCard(book){
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');
    bookDiv.dataset.id = book.uuid;

    const bookHeading = document.createElement('h3');
    bookHeading.innerText = book.title;
    bookDiv.appendChild(bookHeading);
    
    const authorPara = document.createElement('p');
    authorPara.innerText = book.author;
    bookDiv.appendChild(authorPara);

    const totalPagesPara = document.createElement('p');
    totalPagesPara.innerText = `Total Pages: ${book.numberOfPages}`;
    bookDiv.appendChild(totalPagesPara);

    const pagesReadPara = document.createElement('p');
    pagesReadPara.innerText = `Pages Read: ${book.currentPage}`;
    bookDiv.appendChild(pagesReadPara);

    const percentageReadPara = document.createElement('p');
    percentageReadPara.innerText = `Percentage Read: ${getBookPercentageRead(book)}%`;
    bookDiv.appendChild(percentageReadPara);

    const editBtn = document.createElement('button');
    editBtn.classList.add('edit-btn');
    editBtn.innerText = 'Edit';
    editBtn.addEventListener('click', onEditBtnClick);
    bookDiv.appendChild(editBtn);

    return bookDiv;
}

/**
 * On edit button click, open the modal for editting the book.
 * @param {Event} event 
 */
function onEditBtnClick(event){
    const editBtn = event.target;
    const uuid = editBtn.closest('.book').dataset.id;
    const book = getBookByUuid(uuid);
    editBookModal.dataset.uuid = uuid;

    editBookTitleInput.value = book.title;
    editBookAuthorInput.value = book.author;
    editBookNumberOfPagesInput.value = book.numberOfPages;
    editBookCurrentPageInput.value = book.currentPage;
    editBookModal.showModal();
}

/**
 * Event for when a delete button is pressed.
 * @param {event} event 
 */
function onDeleteBtnClick(event){
    const btn = event.target;
    const dialog = btn.closest('dialog');
    const uuid = dialog.dataset.uuid;
    deleteBookByUuid(uuid);
    saveBooks();
    editBookModal.close();
}


/**
 * Gets a book by it's uuid from the array
 * @param {string} uuid 
 * @returns The book object if found, null if not found.
 */
function getBookByUuid(uuid){
    for(let i = 0; i < booksArray.length; i++){
        if(booksArray[i].uuid === uuid){
            return booksArray[i];
        }
    }
    return null;
}

/**
 * Deletes a book by it's uuid.
 * @param {string} uuid 
 */
function deleteBookByUuid(uuid){
    for(let i = 0; i < booksArray.length; i++){
        if(booksArray[i].uuid == uuid){
            booksArray.splice(i, 1);
        }
    }
}

/**
 * Saves books to the local storage.
 */
function saveBooks(){
    booksArrayString = JSON.stringify(booksArray);
    localStorage.setItem('books', booksArrayString);
    drawBooks();
}

/**
 * Loads the books from the local storage as a string and converts it to the array of objects required.
 * @returns Return to escape function if the books item is not set in localstorage.
 */
function loadBooks(){
    const books = localStorage.getItem('books');
    if(books == null) return;
    booksArray = JSON.parse(books);
    drawBooks();
}
loadBooks();