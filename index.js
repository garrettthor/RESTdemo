const express = require('express');
const app = express();
const { v4: uuid } = require('uuid');
uuid();
const path = require('path');

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

const comments = [
    {
        id: uuid(),
        username: 'Todd',
        comment: 'lol that is so funny!'
    },
    {
        id: uuid(),
        username: 'Skyler',
        comment: 'I like to go birdwatching with my dog!'
    },
    {
        id: uuid(),
        username: 'Sk8erBoi',
        comment: 'Plz delet your account, Todd'
    },
    {
        id: uuid(),
        username: 'onlysaywoof',
        comment: 'woof woof woof'
    },
];

app.get('/comments', (req, res) => {
    res.render('comments/index', { comments });
});

app.get('/comments/new', (req, res) => {
    res.render('comments/new');
});

app.post('/comments', (req, res) => {
    const { username, comment} = req.body;
    comments.push({ username, comment, id: uuid() });
    //console.log(req.body);
    res.redirect('/comments');
});

app.get('/comments/:id', (req, res) => {
    const { id } = req.params;
    const comment = comments.find(c => c.id === id)
    res.render('comments/show', { comment })
});

app.patch('/comments/:id', (req, res) => {
    const { id } = req.params;
    const newCommentText = req.body.comment;
    const foundComment = comments.find(c => c.id === id);
    foundComment.comment = newCommentText;
    res.redirect('/comments');
});


app.get('/tacos', (req, res) => {
    res.send('GET /tacos response');
});

app.post('/tacos', (req, res) => {
    console.log(req.body);
    const { meat, qty } = req.body;
    res.send(`OK, here are your ${qty} ${meat} taco(s)!`);
});

app.listen(3000, () => {
    console.log('Listening on PORT 3000');
});