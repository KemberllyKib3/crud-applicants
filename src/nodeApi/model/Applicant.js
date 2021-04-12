const mongoose = require('mongoose');
const Schema = mongoose.Schema;

let Applicant = new Schema({
  email: { type: String },
  name: { type: String },
  whatsapp: { type: String },
  linkedin: { type: String },
  city: { type: String },
  UF: { type: String },
  portfolio: { type: String },
  disponibility: { type: Array },
  day_period: { type: Array },
  salario: { type: String },

}, { collection: 'applicants' })

module.exports = mongoose.model('Applicant', Applicant)