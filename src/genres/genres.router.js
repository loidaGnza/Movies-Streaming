const router = require('express').Router()

const genreServices = require('./genres.services')

router.route('/')
    .get(genreServices.getAllGenres)
    .post(genreServices.postGenre)


router.post ('/movieID/genre/:genreId')

module.exports = router