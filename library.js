"use strict";
console.log("JS Started");

// Library array

const library = [];

// Book constructor

class Book {
  constructor(title, author, pages, isRead) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.isRead = isRead;
  }
}

// Add book to library

function addBookToLibrary (currentBook) {
  library.push(currentBook);
  dialog.close();
}

const display = document.querySelector(".display");
const openModalButton = document.querySelector(".open");
const dialog = document.querySelector("dialog");
const closeModalButton = document.querySelector(".close");
const submit = document.querySelector(".submit");

const titleInput = document.querySelector("#title");
const authorInput = document.querySelector("#author");
const pagesInput = document.querySelector("#pages");
const isReadInput = document.querySelector("#is-read");

openModalButton.addEventListener("click", () => {
  dialog.showModal();
});

closeModalButton.addEventListener("click", () => {
  dialog.close();
});

submit.addEventListener("click", () => {
  const isValid = validateInput();
  if (isValid) {
    let currentBook = new Book(titleInput.value, authorInput.value, pagesInput.value, isReadInput.checked);
    clearInput();
    addBookToLibrary(currentBook);
    output();
  }
});

// Validation

function validateInput () {
  if (titleInput.validity.valueMissing) {
    titleInput.setCustomValidity("Title can't be empty!");
    return false
  } else {
    titleInput.setCustomValidity("");
  }

  if (authorInput.validity.valueMissing) {
    authorInput.setCustomValidity("Author can't be empty!");
    return false
  } else {
    authorInput.setCustomValidity("");
  }

  if (pagesInput.validity.valueMissing) {
    pagesInput.setCustomValidity("Pages can't be empty!");
    return false
  } else {
    pagesInput.setCustomValidity("");
  }

  if (pagesInput.validity.badInput) {
    pagesInput.setCustomValidity("This needs to be a number!");
    return false;
  } else {
    pagesInput.setCustomValidity("");
  }

  if (pagesInput.validity.rangeUnderflow) {
    pagesInput.setCustomValidity("Pages needs to be at least 1!");
    return false;
  } else {
    pagesInput.setCustomValidity("");
  }

  return true;
}

// Loop through library and output

function output () {
  document.querySelectorAll(".book").forEach(book => book.remove());
  
  library.forEach(book => {
    let bookCard = document.createElement("div");
    bookCard.classList.add("book");
    let bookCardTitle = document.createElement("div");
    bookCardTitle.classList.add("title");
    let bookCardAuthor = document.createElement("div");
    bookCardAuthor.classList.add("author");
    let bookCardPages = document.createElement("div");
    let bookCardIsRead = document.createElement("div");
    bookCardIsRead.classList.add("read-toggle");
    let bookCardDelete = document.createElement("button");
    bookCardDelete.classList.add("x");

    bookCardDelete.addEventListener("click", () => {
      bookCard.style.display = "none";
      library.splice(library.indexOf(book), 1);
    });

    bookCardIsRead.addEventListener("click", () => {
      if (bookCardIsRead.classList.contains("read")) {
        bookCardIsRead.classList.remove("read");
        bookCardIsRead.classList.add("not-read");
        bookCardIsRead.textContent = "Not read";
      } else {
        bookCardIsRead.classList.remove("not-read");
        bookCardIsRead.classList.add("read");
        bookCardIsRead.textContent = "Read";
      }
    });
    
    bookCardTitle.textContent = `${book.title}`;
    bookCardAuthor.textContent = book.author;
    bookCardPages.textContent = `${book.pages} pages`;
    if (book.isRead) {
      bookCardIsRead.textContent = "Read";
      bookCardIsRead.classList.add("read");
      bookCardIsRead.classList.remove("not-read");
    } else {
      bookCardIsRead.textContent = "Not Read";
      bookCardIsRead.classList.remove("read");
      bookCardIsRead.classList.add("not-read");
    }
    
    bookCardDelete.textContent = "✕";
    bookCard.appendChild(bookCardTitle);
    bookCard.appendChild(bookCardAuthor);
    bookCard.appendChild(bookCardPages);
    bookCard.appendChild(bookCardIsRead);
    bookCard.appendChild(bookCardDelete);
    display.appendChild(bookCard);
  });
}

// Clear input fields

function clearInput () {
  titleInput.value = "";
  authorInput.value = "";
  pagesInput.value = "";
  isReadInput.checked = false;
}