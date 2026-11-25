const express = require('express');
const app = express();
app.use(express.json());

const courses = require('./courses.json');

app.get('/api/courses', (req,res) => res.json(courses));

app.post('/api/enroll', (req,res) => {
  const { courseId, completed } = req.body;
  const course = courses.find(c => c.id === courseId);
  const missing = course.pre.filter(p => !completed.includes(p));
  if(missing.length > 0) return res.json({ ok:false, missing });
  res.json({ ok:true, message: "Enrolled in " + courseId });
});

app.listen(5000, () => console.log('API running on 5000'));

[
  {"id":"CS101","title":"Programming in C","credits":4,"diff":"Beginner","pre":[]},
  {"id":"CS102","title":"Python Programming","credits":3,"diff":"Beginner","pre":["CS101"]},
  {"id":"CS201","title":"Data Structures","credits":4,"diff":"Intermediate","pre":["CS101","CS102"]}
]
