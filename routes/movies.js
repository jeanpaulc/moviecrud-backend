const express = require('express')
const router = express.Router()
const knex = require('../knex')

// READ ALL records for this table
router.get('/', (req, res, next) => {
  knex('movies')
    .then(records => {
      res.status(200).send(records)
    })
    .catch(err => {
      next(err)
    })
})

// READ ONE record for this table
router.get('/:id', (req, res, next) => {
  knex('movies')
    .where('id', req.params.id)
    .then(record => {
      if (record.length) {
        res.status(200).send(record)
      }
      else {
        res.status(400).json({ error: { message: `Bad Request @ ID ${id}`} })
      }
    })
    .catch(err => {
      next(err)
    })
})

const hasParams = (obj, requiredParams) => {
  for (var i = 0; i < requiredParams.length; i++) {
    if( !obj.hasOwnProperty(requiredParams[i]) ) return false
  }
  return true
}

// CREATE ONE record for this table
router.post('/', (req, res, next) => {
  const required = ['title', 'director', 'year']

  if (!hasParams(req.body, required)) {
    res.status(400).json({ error: { message: 'Missing Required Fields' } })
  }
  else {

    let newMovie = {
      title: req.body.title,
      director: req.body.director,
      year: req.body.year,
      rating: req.body.rating,
      poster_url: req.body.poster_url
    }

    knex('movies')
      .insert(newMovie)
      .returning('*')
      .then(([postedRecord]) => {
        console.log(postedRecord)
        res.status(201).json(postedRecord)
      })
      .catch(err => {
        next(err)
      })
  }
})

const objPatcher = (reqObj, record) => {
  for (let key in reqObj) {
    if(reqObj.hasOwnProperty(key)) {
      record[key] = reqObj[key]
    }
  }
  return record
}

// UPDATE ONE record for this table
router.patch('/:id', (req, res, next) => {
  let { id } = req.params
  knex('movies')
    .where('id', id)
    .then(record => {
      if (record.length) {
        let patchedRecord = record[0]
        patchedRecord = objPatcher(req.body, patchedRecord)

        knex('movies')
          .update(patchedRecord)
          .where('id', id)
          .returning('*')
          .then(([updatedRecord]) => {
            res.status(201).json(updatedRecord)
          })
      }
      else {
        res.status(400).json({ error: { message: `Bad Request @ ID ${id}`} })
      }
    })
})
// DELETE ONE record for this table
router.delete('/:id', (req, res, next) => {
  let { id } = req.params
  knex('movies')
    .where('id', id)
    .then(foundRecord => {
      if(foundRecord.length) {
        knex('movies').del()
          .where('id', id)
          .returning('*')
          .then(([deletedRecord]) => {
            res.status(201).json(deletedRecord)
          })
      }
      else {
        res.status(400).json({ error: { message: `Bad Request @ ID ${id}`} })
      }
    })
    .catch((err) => {
      next(err)
    })
})

module.exports = router
