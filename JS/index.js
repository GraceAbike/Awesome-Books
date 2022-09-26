const libraryBooksEl = document.querySelector('.library-books');
const addElBtn = document.querySelector('.btn-add');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const errorMsgEl = document.querySelector('.errorMsg');
const form = document.querySelector('form');
const bookList = JSON.parse(localStorage.getItem('bookList')) || [];

const renderBooks = () => {
  if (!bookList.length) {
    libraryBooksEl.innerHTML = 'No books added';
  } else {
    let markup = '';
    bookList.forEach((elem, index) => {
      markup += `<div class="library-book" index=${index}>
      <p class="book-title">${elem.title}</p>
      <p class="book-author">${elem.author}</p>    
      <button type="button" class="library-btn-rmv" id=${index}>Remove</button>
  </div>`;
    });
    libraryBooksEl.innerHTML = markup;
  }

  const removeBook = () => {
    const removeBtnsEl = [...document.getElementsByClassName('library-btn-rmv')];
    removeBtnsEl.forEach((item) => {
      item.addEventListener('click', (e) => {
        bookList.splice(e.target.id, 1);
        localStorage.setItem('bookList', JSON.stringify(bookList));
        renderBooks();
      });
    });
  };
  removeBook();
};

const addBook = () => {
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
      renderBooks();
      form.reset();
      errorMsgEl.innerHTML = '';
    } else {
      errorMsgEl.innerHTML = 'Input something';
    }
  });
};

renderBooks();
addBook();
