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

const createBookModal = document.getElementById('add-book-dialog');
