const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

const courses = [
    {
        id: 1,
        title: "js",
        price: 300
    },
    {
        id: 2,
        title: "cpp",
        price: 599
    }
]
// get course & courses
app.get('/api/courses', (req, res) => {
    res.json(courses);
})
app.get('/api/courses/:Id', (req, res) => {
    const courseId = +req.params.Id;
    const founded_course = courses.find(course => course.id === courseId);
    if (founded_course === undefined) {
        return res.status(404).json({ msg: "Course not found" });
    }
    res.status(200).json(founded_course);
})

app.listen(PORT, () => {
    console.log(`Server is listening on port ${PORT}`)
})