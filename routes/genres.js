const express = require("express");
const Joi = require("joi");
const router = express.Router();

let genres = [
  {
    id: 1,
    name: "Comedy",
  },
  {
    id: 2,
    name: "Sports",
  },
  {
    id: 3,
    name: "Thriller",
  },
  {
    id: 4,
    name: "Devotional",
  },
];

router.get("/", (req, res) => {
  res.send(genres);
});

router.get("/:id", (req, res) => {
  const genre = genres.find((selectedGenre) => {
    return selectedGenre.id === parseInt(req.params.id);
  });
  if (!genre) {
    return res.status(404).send("Selected genres is not found");
  }
  res.send(genre);
});

router.post("/", (req, res) => {
  const { error, value } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    genres.push({
      id: genres.length + 1,
      name: req.body.name,
    });
    res.send(value);
  }
});

router.put("/:id", (req, res) => {
  const genre = genres.find((selectedGenre) => {
    return selectedGenre.id === parseInt(req.params.id);
  });
  if (!genre) {
    return res.status(404).send("Selected genres is not found");
  }
  const { error, value } = validateGenre(req.body);
  if (error) {
    return res.status(400).send(error.details[0].message);
  } else {
    genre.name = req.body.name;
    res.send(value);
  }
});

router.delete("/:id", (req, res) => {
  const genre = genres.find((selectedGenre) => {
    return selectedGenre.id === parseInt(req.params.id);
  });
  if (!genre) {
    return res.status(404).send("Selected genres is not found");
  } else {
    const index = genres.indexOf(req.params.id);
    genres.splice(index, 1);
    res.send(genre);
  }
});

function validateGenre(genre) {
  const genreSchema = Joi.object({
    name: Joi.string().min(3).required(),
  });

  return genreSchema.validate(genre, {
    abortEarly: false,
  });
}

module.exports = router;
