const router = require("express").Router();
const _ = require("lodash");
const { Films, films_validation } = require("../models/Films");
const Seance = require("../models/Seance");

router.get("", async (req, res) => {
  res.send(await Films.find());
});

router.get("/:id", async (req, res) => {
  let films = await Films.findById(req.params.id).populate("seance");
  if (!films) return res.status(404).send("Id not found");
  res.send(films);
});

router.post("/add", async (req, res) => {
  let validation = films_validation(req.body);
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  let films = new Films(_.pick(req.body, ["nom", "acteurs"]));

  try {
    films = await films.save();
  } catch (error) {
    return res.status(400).send(error.message);
  }
  res.status(200).send(films);
});

router.delete("/:id", async (req, res) => {
  let films = await Films.findByIdAndDelete(req.params.id);
  if (!films) return res.status(404).send("Id Not Found");
  res.send(films);
});

module.exports = router;
