const listEl = document.querySelector('.list');
const addnewEl = document.querySelector('.addnew');
const contactEl = document.querySelector('.contact');
const date = document.querySelector('.date');
const booksListEl = document.querySelector('.awesome-book');
const libraryBooksEl = document.querySelector('.list-books');
const addElBtn = document.querySelector('.btn-add');
const contactInformEl = document.querySelector('.contact-inform');
const form = document.querySelector('form');
const titleEl = document.getElementById('title');
const authorEl = document.getElementById('author');
const alertMessageEl = document.querySelector('.alertMessage');
setInterval(() => {
  date.innerHTML = new Date();
}, 1000);

const toggleWindow = () => {
  listEl.addEventListener('click', () => {
    form.classList.remove('show');
    contactInformEl.classList.remove('show');
    booksListEl.classList.remove('hide');
    listEl.style.color = 'blue';
    addnewEl.style.color = 'black';
    contactEl.style.color = 'black';
  });

  addnewEl.addEventListener('click', () => {
    form.classList.add('show');
    contactInformEl.classList.remove('show');
    booksListEl.classList.add('hide');
    listEl.style.color = 'black';
    addnewEl.style.color = 'blue';
    contactEl.style.color = 'black';
  });

  contactEl.addEventListener('click', () => {
    form.classList.remove('show');
    contactInformEl.classList.add('show');
    booksListEl.classList.add('hide');
    listEl.style.color = 'black';
    addnewEl.style.color = 'black';
    contactEl.style.color = 'blue';
  });
};

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
        localStorage.setItem('book-List', JSON.stringify(bookList));
        this.renderBooks();
        form.reset();
        alertMessageEl.innerHTML = 'Book added successfully, <br> Check list.';
        alertMessageEl.style.color = 'blue';
      } else {
        alertMessageEl.innerHTML = 'Input something';
        alertMessageEl.style.color = 'red';
      }
      setTimeout(() => {
        alertMessageEl.innerHTML = '';
      }, 1500);
    });
  }

  awesomeBooks() {
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
          this.awesomeBooks();
        });
      });
    };
    removeBook();
  }
}
const awesomeBooks = new Library();

awesomeBooks.addBook();
awesomeBooks.awesomeBooks();
toggleWindow();