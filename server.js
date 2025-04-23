const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
const coursesRouter = require('./routes/courses.route')
app.use('/api/courses', coursesRouter)

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})