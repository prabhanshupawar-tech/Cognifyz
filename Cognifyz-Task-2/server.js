const express = require('express');

const app = express();
const port = 3000;

app.set('view engine', 'ejs');

app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Display registration form
app.get('/', (req, res) => {
    res.render('index');
});

// Handle registration
app.post('/register', (req, res) => {

    const {
        name,
        email,
        age,
        password,
        confirmPassword,
        gender,
        city
    } = req.body;

    res.render('success', {
        name: name,
        email: email,
        age: age,
        gender: gender,
        city: city
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});