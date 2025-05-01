const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

require('dotenv').config();
const cors = require('cors');

app.use(express.json());
app.use(cors());

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
    return res.status(404).json({ status: httpStatusText.ERROR, message: "Route not found" });
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json(err);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})