const express = require('express')
const {v4: uuid} = require("uuid");
const router = express.Router();
const fileMulter = require('../middleware/file');

class Book {
    constructor(id = uuid(), title = "" , desc = "",  authors = "", favorite = "", fileCover = "", fileName = "") {
        this.title = title;
        this.desc = desc;
        this.id = id;
        this.authors = authors;
        this.favorite = favorite;
        this.fileCover = fileCover;
        this.fileName = fileName;
    }
}

const store = {
    books: [],
}

router.get('/api/books', (req, res) => {
    const {books} = store;
    res.json(books);
});
router.get('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1){
        res.json(books[index])
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});
router.get('/api/books/:id/download', (req, res) => {
    const {books} = store;
    const {id} = req.params;
    const index = books.findIndex(el => el.id === id);

    if (index !== -1){
        res.download(books[index].fileName);
    } else {
        res.status(404);
        res.json('404 | страница не найдена');
    }
});
router.post('/api/books', fileMulter.single('book-txt'), (req, res) => {
    const {id, title, desc, authors, favorite, fileCover, fileName} = req.params;
    if(req.file){
        const {path} = req.file;
        res.json({path});
    }
    res.json();
    store.books.push(new Book({id, title, desc, authors, favorite, fileCover, fileName}));
});
router.post('/api/user/login', (req, res) => {

});
router.put('/api/books/:id', (req, res) => {

});
router.delete('/api/books/:id', (req, res) => {

});

module.exports = router;