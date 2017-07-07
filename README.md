# MyReads: A Book Tracking App

In this project, a bookshelf app is created that allows user to select and categorize books the user have read, are currently reading, or want to read. The project emphasizes on using React to build the application and provides an API server and client library that is used to persist information as user interacts with the application.

## App Functionality

In this application, the main page `/` displays a list of "shelves" (i.e. categories), each of which contains a number of books. The three shelves are:

 - Currently Reading
 - Want to Read
 - Read

Each book has a control that lets user select the shelf for that book. When user selects a different shelf, the book moves there. Clicking the control again shows the current shelf.
The main page also has a link to `/search`, a search page that allows user to find books to add to your library.

The search page has a text input that may be used to find books. As the value of the text input changes, the books that match that query are displayed on the page, along with a control that lets user add the book to your library. Search Page only shows books which are not in shelf.

The user can also click the book's name or author's name to find more information about the book at `/books/:book_id` and the come back to home page using the back button.

# Getting Started

## Pre-requisites

 - [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/en/)

## Running the App

 - Clone the Repository and move to repository directory using command line.
 - The application requires only `npm install` and `npm start` to get it installed and launched.
 - Alternatively `yarn install` and `yarn start` can also be used.

# Acknowledgments

This app would not have been completed without help from following:

 - [React Training](https://reacttraining.com/)
 - [Facebook's React Tutorial](https://facebook.github.io/react/tutorial/tutorial.html)
