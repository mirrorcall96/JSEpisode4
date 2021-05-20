const authors = require("./authors.json");
const books = require("./books.json");

/**************************************************************
 * getBookById(bookId, books):
 * - receives a bookId
 * - recieves an array of book objects
 * - returns the book object that matches that id
 * - returns undefined if no matching book is found
 ****************************************************************/
function getBookById(bookId, books) {
  // Your code goes here
  let found=undefined;
  books.forEach(book => {
    if (book.id===bookId) found=book;
  });
  return found;
}
//console.log(getBookById(12, books));

/**************************************************************
 * getAuthorByName(authorName, authors):
 * - receives an authorName
 * - recieves an array of author objects
 * - returns the author that matches that name (CASE INSENSITIVE)
 * - returns undefined if no matching author is found
 ****************************************************************/
function getAuthorByName(authorName, authors) {
  // Your code goes here
  let found=undefined;
  authors.forEach(author => {
    if (author.name.toLowerCase()===authorName.toLowerCase()) found=author;
  });
  return found;
}
//console.log(getAuthorByName("J.K. Rowling", authors));

/**************************************************************
 * bookCountsByAuthor(authors):
 * - receives an array of authors
 * - returns an array of objects with the format:
 *    [{ author: <NAME>, bookCount: <NUMBER_OF_BOOKS> }]
 ****************************************************************/
function bookCountsByAuthor(authors) {
  
  let result=[];
  authors.forEach(aauthor => {
    let bookCount =0;
    let author=aauthor.name;
    books.forEach(book => {
      book.authors.forEach(element => {
        if (element.name ===aauthor.name)bookCount++;
      });
    });
    result.push({author,bookCount})
  });
  return result;
  // Your code goes here
}
//console.log(bookCountsByAuthor(authors));

/**************************************************************
 * booksByColor(books):
 * - receives an array of books
 * - returns an object where the keys are colors
 *   and the values are arrays of book titles:
 *    { <COLOR>: [<BOOK_TITLES>] }
 ****************************************************************/
function booksByColor(books) {
  const colors = {};

  // Your code goes here
  books.forEach(book => {
    if(colors[book.color]) colors[book.color].push(book.title);
    else colors[book.color]=[book.title]
  });
  return colors;
}
//console.log(booksByColor(books));

/**************************************************************
 * titlesByAuthorName(authorName, authors, books):
 * - receives an authorName
 * - recieves an array of author objects
 * - recieves an array of book objects
 * - returns an array of the titles of the books written by that author:
 *    ["The Hitchhikers Guide", "The Meaning of Liff"]
 ****************************************************************/
function titlesByAuthorName(authorName, authors, books) {
  // Your code goes here
  let result=[];
  books.forEach(book => {
    book.authors.forEach(author => {
      if (author.name.toLowerCase() ===authorName.toLowerCase()) result.push(book.title);
    });
  });
  return result;

}

//console.log(titlesByAuthorName("LaUreN BEukeS", authors, books));

/**************************************************************
 * mostProlificAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author with the most books
 *
 * Note: assume there will never be a tie
 ****************************************************************/
function mostProlificAuthor(authors) {
  // Your code goes here
  let winner ="";
  let winnerCount=0;
  authors=bookCountsByAuthor(authors);
  authors.forEach(author => {
    if (author.bookCount > winnerCount) {
      winnerCount=author.bookCount;
      winner=author.author;
    }
  });
  return winner;
}
//console.log(mostProlificAuthor(authors));

/**************************************************************
 * relatedBooks(bookId, authors, books):
 * - receives a bookId
 * - receives a list of authors
 * - receives a list of books
 * - returns a list of the titles of all the books by
 *   the same author as the book with bookId
 *   (including the original book)
 *
 * e.g. Let's send in bookId 37 ("The Shining Girls" by Lauren Beukes):
 *      relatedBooks(37);
 * We should get back all of Lauren Beukes's books:
 *      ["The Shining Girls", "Zoo City"]
 *
 * NOTE: YOU NEED TO TAKE INTO ACCOUNT BOOKS WITH MULTIPLE AUTHORS
 *
 * e.g. Let's send in bookId 46 ("Good Omens" by Terry Pratchett and Neil Gaiman):
 *      relatedBooks(46);
 * We should get back all of Neil Gaiman's books AND all of Terry Pratchett's books:
 *      ["Good Omens", "Good Omens", "Neverwhere", "Coraline", "The Color of Magic", "The Hogfather", "Wee Free Men", "The Long Earth", "The Long War", "The Long Mars"]
 *
 * BONUS: REMOVE DUPLICATE BOOKS
 ****************************************************************/
function relatedBooks(bookId, authors, books) {
  let result=[];
  let book = getBookById(bookId,books);
  let thisAuthor=undefined
  let thisbook=undefined
  book.authors.forEach(author=>{
    thisAuthor=getAuthorByName(author.name,authors);
    thisAuthor.books.forEach(element => {
      thisbook=getBookById(element,books);
      //if(!result.includes(thisbook.title))
        result.push(thisbook.title)
    });
  })
  return result;

}
console.log(relatedBooks(46, authors, books));

/**************************************************************
 * friendliestAuthor(authors):
 * - receives a list of authors
 * - returns the name of the author that has
 *   co-authored the greatest number of books
 ****************************************************************/
function friendliestAuthor(authors) {
  // Your code goes here
  let books=[];
  authors.forEach(author => {
    author.books.forEach(n=>{
      if (books[n]){
        books[n].number++;
        books[n].authoers.push(author.name);
      }
      else{
        books[n]={number:1, authoers:[author.name] };
      }
    })
  });
  let multiauthor=[];
  books.forEach(book => {
    if(book.number > 1){
      book.authoers.forEach(element => {
        if (multiauthor[element])multiauthor[element]++;
        else multiauthor[element]=1;
        
      });
    }
  });
  let winner ="";
  let winnerCount=0;
  for (const hisname in multiauthor) {
    if (multiauthor[hisname]>winnerCount){
      winnerCount=multiauthor[hisname];
      winner=hisname;
    }
  }
  return winner;
}
 //console.log(friendliestAuthor(authors));

module.exports = {
  getBookById,
  getAuthorByName,
  bookCountsByAuthor,
  booksByColor,
  titlesByAuthorName,
  mostProlificAuthor,
  relatedBooks,
  friendliestAuthor,
};

/**
 * Uncomment the following lines if you
 * want to manually test your code
 */
