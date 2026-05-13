const addBookForm = document.getElementById('add-book-form');

if (addBookForm) {
    addBookForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const title = document.getElementById('title').value;
        const authorId = document.getElementById('authorId').value;

        try {
            const response = await fetch('/api/books', {
                method: 'POST',
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify({ title, authorId })
            });

            if (response.ok) {
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Failed to save: ${errorData.message}`)
            }
        } catch(error) {
            console.error('Request error: ', error);
            alert('Server connection error. Please try again later.');
        }   
    })
}

const addAuthorForm = document.getElementById('add-author-form');

if (addAuthorForm) {
    addAuthorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const name = document.getElementById('authorName').value;

        try {
            const response = await fetch('/api/authors', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ name })
            });

            if(response.ok) {
            window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Failed to save: ${errorData.message}`)
            }
        } catch(error) {
            console.error('Request error: ', error);
            alert('Server connection error. Please try again later.');
        }        
    });
}

const removeAuthorForm = document.getElementById('remove-author-form');

if(removeAuthorForm) {
    removeAuthorForm.addEventListener('submit', async (event) => {
        event.preventDefault();

        const authorId = document.getElementById('authorToRemove').value;

        const confirmDelete = confirm('Are you sure you want to delete this author?')

        if(!confirmDelete) return;

        try {
            const response = await fetch(`/api/authors/${authorId}`, { 
                method: "DELETE",
            });

            if(response.ok) {
                window.location.reload();
            } else {
                const errorData = await response.json();
                alert(`Failed to remove author: ${errorData.message}`);
            }
        } catch(error) {
            console.error('Request error: ', error);
            alert('Server connection error. Please try again later.');
        }
    });
}

async function deleteBook(id) {
    const confirmDelete = confirm('Are you sure you want to delete this book?');

    if(!confirmDelete) return;

    try {
        const response = await fetch(`/api/books/${id}`, {
            method: 'DELETE'
        });
        
        if (response.ok) {
            window.location.reload();
        } else {
            alert('Failed to delete')
        }
    } catch(error) {
        console.error('Request error: ', error);
        alert('Server connection error. Please try again later.');
    }
}

function toggleEdit(id) {
    const view = document.getElementById(`view-container-${id}`);
    const edit = document.getElementById(`edit-container-${id}`);

    if(view.style.display === "none") {
        view.style.display = "block";
        edit.style.display = "none";
    } else {
        view.style.display = "none";
        edit.style.display = "block";
    }
}

async function updateBook(bookId, readingId) {
    const newTitle = document.getElementById(`edit-title-${bookId}`).value;
    const newCurrent = document.getElementById(`edit-current-${bookId}`).value;
    const newTotal = document.getElementById(`edit-total-${bookId}`).value;
    const newStatus = document.getElementById(`edit-status-${bookId}`).value;

    try {
        const bookResp = await fetch(`/api/books/${bookId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title: newTitle })
        });

        const readResp = await fetch(`/api/readings/${readingId}`, {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ 
                currentPage: parseInt(newCurrent), 
                totalPages: parseInt(newTotal),
                status: newStatus 
            })
        });

        if (bookResp.ok && readResp.ok) {
            window.location.reload();
        } else {
            alert('Failed to update. Check the details.');
        }
    } catch (error) {
        console.error('Update error:', error);
    }
}
