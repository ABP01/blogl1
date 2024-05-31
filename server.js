const express = require('express');
const path = require('path');

let initial_path = path.join(__dirname, "public");

const app = express();
app.use(express.static(initial_path));

app.get('/', (req, res) => {
    res.sendFile(path.join(initial_path, 'home.html'));
})

app.listen("3000", () => {
    console.log("Listening..............");
})