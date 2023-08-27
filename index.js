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
    
});
app.post('/api/user/login', (req, res) => {

});
app.put('/api/books/:id', (req, res) => {

});
app.delete('/api/books/:id', (req, res) => {

});



const PORT = process.env.PORT || 3000
app.listen(PORT)