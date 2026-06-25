export class BookDTO {
    constructor(book, author) {
        this.id = book._id ? book._id.toString() : book.id;
        this.title = book.title;
        this.publisher = book.publisher;
        this.year = book.year;
        this.userId = book.userId ? book.userId.toString() : undefined;
    }
}

export default BookDTO;