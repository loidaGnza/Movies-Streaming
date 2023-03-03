const Movies = require ('../models/movies.models')
const MovieGenres = require('../models/movie_genres.models.js')
const uuid = require('uuid')
const Genres = require ('../models/genres.models')

const findAllMovies = async (limit, offset) => {
// ? Limit -> cauntos quiero mostrar
// ? offset= compensar -> donde empiezo a mostrar
// const queryOptions ={
    // limit: limit || 20,
    // offset:offset || 0
// 
// if(limit &&  offset){
//     queryOptions.limit = limit
//     queryOptions.offset = offset
// }

    const data = await Movies.findAndCountAll()
    return data 
}

const createMovie = async (movieObj) => {
    const newMovie ={
        id: uiid.v4(),
        title: movieObj.title,
        synopsis: movieObj.synopsis,
        releasesYear: movieObj.releasesYear,
        director: movieObj.director,
        duration: movieObj.duration,
        trillerUrl: movieObj.trillerUrl,
        coverUrl: movieObj.coverUrl,
        movieUrl: movieObj.movieUrl,
        classification: movieObj.classification,
        rating: movieObj.rating
    }
    const data = await Movies.create(newMovie)
    return data

}

const addGenreToMovie = async (dataObj) =>{
const data = await MovieGenres.create({
    id: uuid.v4(),
    movieId: dataObj.movieId,
    genreId: dataObj.genreId
})
return data
}

const findAllMoviesByGenre = async (genreId) =>{
const data = await Movies.findAll({
    include: {
        model:Genres,
        where: {
            id: genreId
        }
    }
})
return data
}

module.exports ={
    findAllMovies,
    createMovie,
    addGenreToMovie,
    findAllMoviesByGenre
}