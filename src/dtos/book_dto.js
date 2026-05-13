export class BookDTO {
    constructor(book, author, reading) {
        this.id = book.id;
        this.title = book.title;
        this.authorName = author ? author.name : 'Unknown';
        this.readingStatus = reading ? reading.status : 'To Read';
        this.currentPage = reading ? reading.currentPage : 0;
        this.totalPages = reading ? reading.totalPages : 0;
        this.readingId = reading ? reading.id : null;
    }
}

export default BookDTO;