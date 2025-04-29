const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;
require('dotenv').config();

app.use(express.json());

const uri = process.env.URI;
const mongoose = require('mongoose');

const httpStatusText = require('./utils/httpStatusText');

mongoose.connect(process.env.URI).then(() => {
    console.log("Connected to MongoDB");
}).catch((err) => {
    console.log(err);
});

const coursesRouter = require('./routes/courses.route')
app.use('/api/courses', coursesRouter)

// Handle 404 for undefined routes 
app.use((req, res) => {
    res.status(404).json({ status: httpStatusText.ERROR , message: "page not found"});
});

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})