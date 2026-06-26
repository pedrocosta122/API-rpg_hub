class UserLibraryDTO {
    constructor(libraryEntry) {
        this.id = libraryEntry._id ? libraryEntry._id.toString() : libraryEntry.id;
        this.userId = libraryEntry.userId ? libraryEntry.userId.toString() : undefined;
        this.bookId = libraryEntry.bookId ? libraryEntry.bookId.toString() :undefined;

        this.bookLink = libraryEntry.bookLink;
        this.campaignNotes = libraryEntry.campaignNotes;

        this.book = libraryEntry.bookDetails || null;
    }
}

export default UserLibraryDTO;