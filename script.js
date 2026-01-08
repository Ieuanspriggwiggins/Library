let booksArray = [];

function Book(title, author, numberOfPages, currentPage, read = false){
    this.title = title;
    this.author = author;
    this.numberOfPages = numberOfPages;
    this.currentPage = currentPage;
    this.read = read;
}

Book.prototype.getPercentageRead = function(){
    return (this.currentPage / this.numberOfPages) * 100;
}

function createBook(title, author, numberOfPages, currentPage, read = false){
    const book = new Book(title, author, numberOfPages, currentPage, read);
    booksArray.push(book);
}

const createBookModal = document.getElementById('add-book-dialog');
