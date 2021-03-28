const router = require("express").Router();
const { Seance, seance_validation } = require("../models/Seance");

router.get("/", async (req, res) => {
  try {
    const seance = await Seance.find();
    res.send(seance);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

router.get("/:id", async (req, res) => {
  let seance = await Seance.findById(req.params.id);

  if (!seance) return res.status(404).send("Id Not Found");
  res.send(seance);
});

router.post("/add/idFilm", async (req, res) => {
  let validation = seance_validation(req.body);
  const film = await Film.findById(req.params.idFilm);
  if (!film) return res.status(404).send("id Not Found");
  if (validation.error)
    return res.status(400).send(validation.error.details[0].message);

  let seance = new Seance(_.pick(req.body, ["date", "temps", "nb_place"]));

  try {
    seance = await seance.save();
    await Film.findByIdAndUpdate(req.params.filmID, {
      $push: { seances: seance._id },
    });
  } catch (error) {
    return res.status(400).send(error.message);
  }
});

router.delete("/:id", async (req, res) => {
  let seance = await Seance.findByIdAndDelete(req.params.id);
  if (!seance) return res.status(404).send("Id Not Found");
  res.send(seance);
});

module.exports = router;
