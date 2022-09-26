const libraryBooksEl = document.querySelector('.library-books');
const addElBtn = document.querySelector('.btn-add');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const errorMsgEl = document.querySelector('.errorMsg');
const form = document.querySelector('form');
const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

class Library {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }

  addBook() {
    addElBtn.addEventListener('click', () => {
      const title = titleEl.value;
      const author = authorEl.value;
      if (title && author) {
        const newBook = {
          title,
          author,
        };
        bookList.push(newBook);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        this.renderBooks();
        form.reset();
        errorMsgEl.innerHTML = '';
      } else {
        errorMsgEl.innerHTML = 'Input something';
      }
    });
  }

  renderBooks() {
    if (!bookList.length) {
      libraryBooksEl.innerHTML = 'No books added';
    } else {
      let markup = '';
      bookList.forEach((elem, index) => {
        markup += `<div class="library-book" style="background-color: ${index % 2 && 'rgb(225, 223, 223)'}">
        <p class="book-title">"${elem.title}"</p> <span> by </span>
        <p class="book-author">${elem.author}</p>    
        <button type="button" class="btn-rmv" id=${index}>Remove</button>
    </div>`;
      });
      libraryBooksEl.innerHTML = markup;
    }

    const removeBook = () => {
      const removeBtnsEl = [...document.getElementsByClassName('btn-rmv')];
      removeBtnsEl.forEach((item) => {
        item.addEventListener('click', (e) => {
          bookList.splice(e.target.id, 1);
          localStorage.setItem('bookList', JSON.stringify(bookList));
          this.renderBooks();
        });
      });
    };
    removeBook();
  }
}

const awesomeBooks = new Library();

awesomeBooks.addBook();
awesomeBooks.renderBooks();
