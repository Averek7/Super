const express = require('express');

const port = 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({extended: true}));


//routes
app.use('/api', require('./routes/api'))

app.get('/', (req, res) => {
    res.send('Welcome to the Super App');
})

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
})

module.exports = app;