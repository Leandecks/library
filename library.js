"use strict";
console.log("JS Started");

function Book (title, author, pages, isRead) {
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.isRead = isRead;
  this.info = () => {
    return `${this.title} by ${author}, ${pages} pages, ${isRead ? "already read" : "not read yet"}`
  };
}

const theHobbit = new Book("The Hobbit","J.R.R. Tolkien","295",true)

console.log(theHobbit.info());