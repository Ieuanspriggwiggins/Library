let booksArray = [];

/**
 * Book constructor for creating a book.
 * @param {string} title 
 * @param {string} author 
 * @param {number} numberOfPages 
 * @param {number} currentPage 
 * @param {boolean} read 
 */
function Book(title, author, numberOfPages, currentPage, read = false){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.currentPage = currentPage;
    this.read = read;
    this.uuid = crypto.randomUUID();
}

/**
 * Calculates what percentage of the total book has been read.
 * @returns A percentage of the pages total read.
 */
Book.prototype.getPercentageRead = function(){
    return (this.currentPage / this.numberOfPages) * 100;
}

/**
 * Creates a book object instance and adds it to the book array.
 * @param {string} title 
 * @param {string} author 
 * @param {number} numberOfPages 
 * @param {number} currentPage 
 * @param {boolean} read 
 */
function createBook(title, author, numberOfPages, currentPage, read = false){
    const book = new Book(title, author, numberOfPages, currentPage, read);
    booksArray.push(book);
}

//Handle the modal dialog for creating a new book.
const createBookModal = document.getElementById('add-book-dialog');
const addBtn = document.getElementById('add-btn');

addBtn.addEventListener('click', function(event) {
    createBookModal.showModal();
}); 

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

    const bookTitle = document.getElementById('title-input').value;
    const bookAuthor = document.getElementById('author-input').value;
    const bookNumberOfPages = document.getElementById('number-of-pages-input').value;
    const bookCurrentPage = document.getElementById('current-page-number-input');

    createBook(bookTitle, bookAuthor, bookNumberOfPages, bookCurrentPage);
    saveBooks();
});

/**
 * Saves books to the local storage.
 */
function saveBooks(){
    booksArrayString = JSON.stringify(booksArray);
    localStorage.setItem('books', booksArrayString);
}

/**
 * Loads the books from the local storage as a string and converts it to the array of objects required.
 * @returns Return to escape function if the books item is not set in localstorage.
 */
function loadBooks(){
    const books = localStorage.getItem('books');
    if(books == null) return;
    booksArray = JSON.parse(books);
}
loadBooks();
