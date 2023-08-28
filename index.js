const express = require('express')
const { v4: uuid } = require('uuid')

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

const app = express()
app.use(express.json())

app.get('/api/books', (req, res) => {
   const {books} = store;
   res.json(books);
});
app.get('/api/books/:id', (req, res) => {
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
app.post('/api/books', (req, res) => {
    const {books} = store;
    const {title, desc, author, favorite, fileCover, fileName} = req.body;

    const newBook = new Book(books.length , title, desc, author, favorite, fileCover, fileName);
    books.push(newBook);

    res.status(201);
    res.json(newBook);
    
});
app.post('/api/user/login', (req, res) => {
    const testUser = { id: 1, mail: "test@mail.ru" };

    res.status(201);
    res.json(testUser);

});
app.put('/api/books/:id', (req, res) => {
    const {books} = store;
    const {title, desc} = req.body;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1){
        books[idx] = {...books[idx], title, desc};
        res.json(books[idx]);

    }else {
        res.status(404)
    }

});
app.delete('/api/books/:id', (req, res) => {
    const {books} = store;
    const {id} = req.params;

    const idx = books.findIndex(el => el.id === id);

    if (idx !== -1){
        books.splice(idx, 1)

    }else {
        res.status(404)
    }

});

const PORT = process.env.PORT || 3000
app.listen(PORT)