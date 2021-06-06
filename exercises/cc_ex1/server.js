// require express and other modules
const { ObjectId } = require('bson');
const express = require('express');
const app = express();

// Express Body Parser
app.use(express.urlencoded({extended: true}));
app.use(express.json());

// Set Static File Directory
app.use(express.static(__dirname + '/public'));


/************
 * DATABASE *
 ************/

const db = require('./models');
const BooksModel = require('./models/books');


/**********
 * ROUTES *
 **********/

/*
 * HTML Endpoints
 */
app.get('/', function homepage(_, res) {
  res.sendFile(__dirname + '/views/index.html');
});

/*
 * JSON API Endpoints
 */
app.get('/api', (_, res) => {
  // Document all your api endpoints below as a simple hardcoded JSON object
  res.json({
    message: 'Welcome to our app api!',
    documentationUrl: '',
    baseUrl: '',
    endpoints: [
      {method: 'GET', path: '/api', description: 'Describes all available endpoints'},
      {method: 'GET', path: '/api/profile', description: 'Data about me'},
      {method: 'GET', path: '/api/books/', description: 'Get All books information'},
      {method: 'POST', path: '/api/books/', description: 'Add a book information into database'},
      {method: 'PUT', path: '/api/books/:id', description: 'Update a book information based upon the specified ID'},
      {method: 'DELETE', path: '/api/books/:id', description: 'Get the book ID of book from the request parameters'}
    ]
  })
});

app.get('/api/profile', (_, res) => {
  res.json({
    'name': 'Batuhan Erden',
    'homeCountry': 'Turkey',
    'degreeProgram': 'Informatics',
    'email': 'erden.batuhan@gmail.com',
    'deployedURLLink': '',
    'apiDocumentationURL': '',
    'currentCity': 'Munich',
    'hobbies': ['Coding', 'Drumming', 'Cycling', 'Swimming']
  })
});

/*
 * Get All books information
 */
app.get('/api/books/', (_, res) => {
  /*
   * Use the books model and query to mongo database to get all objects
   */
  db.books.find({}, function (err, books) {
    /*
     * Return all of the books
     */
    returnAsResponse(res, err, books);
  });
});

/*
 * Add a book information into database
 */
app.post('/api/books/', (req, res) => {
  /*
   * New book information in req.body
   */
  let newBook = req.body;

  /*
   * Use the books model and create a new object with the information in req.body
   */
  db.books.create(newBook, (err, newBookCreated) => {
    /*
		 * Return the created book
		 */
    returnAsResponse(res, err, newBookCreated);
  })
});

/*
 * Update a book information based upon the specified ID
 */
app.put('/api/books/:id', (req, res) => {
  /*
   * Get the book ID and new information of book from the request parameters
   */
  const bookId = req.params.id;
  const bookNewData = req.body;

  console.log(`book ID = ${bookId} \n Book Data = ${bookNewData}`);

  /*
   * Use the books model and find using the bookId and update the book information
   */
  db.books.findByIdAndUpdate(bookId, bookNewData, { new: true }, (err, bookUpdated) => {
    /*
     * Return the updated book
     */
    returnAsResponse(res, err, bookUpdated);
  });
});

/*
 * Delete a book based upon the specified ID
 */
app.delete('/api/books/:id', (req, res) => {
  /*
   * Get the book ID of book from the request parameters
   */
  const bookId = req.params.id;

  /*
   * Use the books model and find using the bookId and delete the book
   */
  db.books.findByIdAndDelete(bookId, (err, bookDeleted) => {
    /*
     * Return the deleted book
     */
    returnAsResponse(res, err, bookDeleted);
  })
});

returnAsResponse = (res, err, obj) => {
  if (err) throw err;

  if (isEmpty(obj)) {
    res.statusCode = 404
    res.json("Object(s) not found!")
  } else {
    res.statusCode = 200
    res.json(obj)
  }
}

isEmpty = obj => !obj || obj.length === 0


/**********
 * SERVER *
 **********/

// listen on the port 3000
const PORT = 3000

app.listen(process.env.PORT || PORT, () => {
  console.log('Express server is up and running on http://localhost:' + PORT);
});

