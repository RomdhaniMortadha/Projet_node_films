const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);

const films = new mongoose.Schema({
  nom: { type: String, required: true },
  acteurs: [{ type: String }],
  seances: [{ type: mongoose.Schema.Types.ObjectId, ref: "Seance" }],
});

let films_validation_schema = Joi.object({
  nom: Joi.string().min(3).required(),
  acteurs: Joi.array().items(Joi.string().min(2)),
  seances: Joi.array().items(Joi.objectID()),
});

function films_validation(body) {
  return films_validation_schema.validate(body);
}

const Films = mongoose.model("Films", films);
module.exports.films_validation = films_validation;
module.exports.Films = Films;
