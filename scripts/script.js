const newTitle = document.getElementById('new-title'); // eslint-disable-line max-classes-per-file
const newAuthor = document.getElementById('new-author');

class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
}

class Library {
  constructor() {
    this.books = [
      {
        title: 'title1',
        author: 'autor1',
      },
      {
        title: 'title2',
        author: 'autor2',
      },
      {
        title: 'Dune',
        author: 'Frank Herbert',
      },
    ];
  }

  addBook(bookTitle, bookAuthor) {
    if (bookTitle !== '' && bookAuthor !== '') {
      const newBook = new Book(bookTitle, bookAuthor);
      this.books.push(newBook);

      newTitle.value = '';
      newAuthor.value = '';
      loadBooks();
    }
  }

  removeBook(index) {
    this.books.splice(index, 1);

    loadBooks();
  }
}

const superLibrary = new Library();

function loadHTML(index) {
  const superHTML = `
  <li class="book">
    <div class="book-details">
    <h4 id="">"${superLibrary.books[index].title}"</h4>
    <p id="">by ${superLibrary.books[index].author}</p>
    </div>
    <button id="remove-button${index}">Remove</button>
  </li>
  `;

  document
    .querySelector('.booklist-container')
    .insertAdjacentHTML('beforeend', superHTML);
  document
    .getElementById(`remove-button${index}`)
    .addEventListener('click', () => superLibrary.removeBook(index));
}

function loadBooks() {
  const booksAmount = superLibrary.books.length;
  const emptyHTML = '';

  document.querySelector('.booklist-container').innerHTML = emptyHTML;
  for (let i = 0; i < booksAmount; i += 1) {
    loadHTML(i);
  }

  localStorage.setItem('books', JSON.stringify(superLibrary.books));
}

const localbooks = localStorage.getItem('books');
if (localbooks) {
  superLibrary.books = JSON.parse(localbooks);
}

window.addEventListener('load', loadBooks());
const addButton = document.getElementById('add-button');

addButton.addEventListener('click', () => superLibrary.addBook(newTitle.value, newAuthor.value));

const listLink = document.getElementById('list-link');
const addLink = document.getElementById('add-link');
const contactLink = document.getElementById('contact-link');

function showSection(sectionId) {
  const section1 = document.getElementById('books');
  const section2 = document.getElementById('section2');
  const section3 = document.getElementById('section3');

  if (sectionId === 'section1') {
    section1.classList.remove('hidden');
    section2.classList.add('hidden');
    section3.classList.add('hidden');
  } else if (sectionId === 'section2') {
    section1.classList.add('hidden');
    section2.classList.remove('hidden');
    section3.classList.add('hidden');
  } else if (sectionId === 'section3') {
    section1.classList.add('hidden');
    section2.classList.add('hidden');
    section3.classList.remove('hidden');
  }
}

listLink.addEventListener('click', () => showSection('section1'));
addLink.addEventListener('click', () => showSection('section2'));
contactLink.addEventListener('click', () => showSection('section3'));
