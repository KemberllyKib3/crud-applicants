const express = require('express');
const app = express();

const applicantRoute = express.Router();
const Applicant = require('../model/Applicant')

// para adicionar um novo candidato
applicantRoute.route('/add-applicant').post((req, res, next) => {
  Applicant.create(req.body, (error, data) => {
    if (error) {
      console.log(error);
      return next(error);
    } else {
      res.json(data);
      console.log(data);
    }
  })
});

// para listar todos os candidatos
applicantRoute.route('/').get((req, res) => {
  Applicant.find((error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

// para ver informações de um candidato escolhido
applicantRoute.route('/edit-applicant/:id').get((req, res) => {
  Applicant.findById(req.params.id, (error, data) => {
    if (error) {
      return next(error);
    } else {
      res.json(data);
    }
  })
});

// para atualizar as informações de um candidato escolhido
applicantRoute.route('/update-applicant/:id').put((req, res, next) => {
  Applicant.findByIdAndUpdate(req.params.id, {
    $set: req.body
  }, (error, data) => {
    if (error) {
      return next(error);
      console.log(error)
    } else {
      res.json(data)
      console.log('Candidato atualizado com sucesso!')
    }
  })
});

// para deletar um candidato
applicantRoute.route('/delete-applicant/:id').delete((req, res, next) => {
  Applicant.findByIdAndRemove(req.params.id, (error, data)=>{
    if (error) {
      return next(error);
    } else {
      res.status(200).json({
        msg: data
      })
    }
  })
});

module.exports = applicantRoute;