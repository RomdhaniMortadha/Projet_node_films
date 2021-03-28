const mongoose = require("mongoose");
const Joi = require("joi");
Joi.objectID = require("joi-objectid")(Joi);

const seance = new mongoose.Schema({
  date: { type: String },
  temps: { type: String },
  nb_place: { type: Number },
});

let seance_validation_schema = Joi.object({
  date: Joi.required(),
  temps: Joi.required(),
  nb_place: Joi.number().positive(),
});
function seance_validation(body) {
  return seance_validation_schema.validate(body);
}

const Seance = mongoose.model("Seance", seance);
module.exports.seance_validation = seance_validation;
module.exports.Seance = Seance;
