const express = require("express");
const router = express.Router();
const Joi = require("joi");

const courses = [
  { id: 1, name: "Course 1" },
  { id: 2, name: "Course 2" },
  { id: 3, name: "Course 3" },
  { id: 4, name: "Course 4" },
];

router.get("/", (req, res) => {
  res.send(courses);
});

router.get("/:id", (req, res) => {
  const course = courses.find((courseInput) => {
    return courseInput.id === parseInt(req.params.id);
  });
  if (!course) {
    return res.status(404).send("Selected course is not found!");
  }
  res.send(course);
});

router.get("/:month/:year", (req, res) => {
  res.send(
    `Message posted on ${req.params.month} ${req.params.year} sorted by ${req.query.sortBy}`
  );
});

router.post("/", (req, res) => {
  const { error, value } = validateCourse(req.body);
  if (error) {
    return res
      .status(400)
      .send("Invalid Request: " + JSON.stringify(error.details[0].message));
  } else {
    const courseObject = {
      id: courses.length + 1,
      name: req.body.name,
    };
    courses.push(courseObject);
    return res.send("Successfully added new course: " + JSON.stringify(value));
  }
});

router.put("/:id", (req, res) => {
  const course = courses.find((courseInput) => {
    return courseInput.id === parseInt(req.params.id);
  });
  if (!course) {
    return res.status(404).send("Selected course is not found!");
  }
  const { error, value } = validateCourse(req.body);
  if (error) {
    return res
      .status(400)
      .send("Invalid Request: " + JSON.stringify(error.details[0].message));
  } else {
    course.name = req.body.name;
    return res.send("Successfully updated course: " + JSON.stringify(value));
  }
});

function validateCourse(course) {
  const courseSchema = Joi.object({
    name: Joi.string().min(3).required(),
  });
  return courseSchema.validate(course, {
    abortEarly: false,
  });
}

router.delete("/:id", (req, res) => {
  const course = courses.find((courseInput) => {
    return courseInput.id === parseInt(req.params.id);
  });
  if (!course) {
    return res.status(404).send("Selected course is not found!");
  }
  const index = courses.indexOf(course);
  courses.splice(index, 1);
  res.send(course);
});

module.exports = router;
