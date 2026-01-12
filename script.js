let booksArray = [];
const booksContainer = document.getElementById('books-container');

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
    const bookCurrentPage = document.getElementById('current-page-number-input').value;

    createBook(bookTitle, bookAuthor, bookNumberOfPages, bookCurrentPage);
    saveBooks();
});
function drawBooks(){
    //clear the container first.
    booksContainer.innerHTML = '';
    for(let i = 0; i < booksArray.length; i++){
        const bookElement = generateBookCard(booksArray[i]);
        booksContainer.appendChild(bookElement);
    };
}

function generateBookCard(book){
    const bookDiv = document.createElement('div');
    bookDiv.classList.add('book');

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
    bookDiv.appendChild(editBtn);

    return bookDiv;
}

//<div class="book">
//    <h3>The Hunger Games</h3>
//    <p>Suzane colins</p>
//    <p>Total Pages: 300</p>
//    <p>Pages Read:  150</p>
//    <p>Percentage Read: 50%</p>
//    <p>Status: Read</p>
//    <button class="edit-btn">Edit</button>
//</div>

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
    drawBooks();
}
loadBooks();