const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const cors = require('cors');
require('dotenv').config();

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
const usersRouter = require('./routes/users.route');
app.use('/api/courses', coursesRouter)
app.use('/api/users', usersRouter)

// Handle 404 for undefined routes
app.use((req, res) => {
    return res.status(404).json({ status: httpStatusText.ERROR, message: `Route ${req.originalUrl} not found` });
});

app.use((err, req, res, next) => {
    return res.status(err.statusCode || 500).json({
        status: err.statusText || httpStatusText.ERROR,
        message: err.message,
        code: err.statusCode || 500,
        data : null
    });
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})