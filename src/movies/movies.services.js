const moviesControllers = require ('./movies.controllers')
const responses = require('../utils/handleResponses')
const {addToFirebaseMovieVideo} = require ('../utils/firebase')


const getAllMovies =(req, res) => {
    moviesControllers.findAllMovies()
        .then(data => {
            responses.success({
                res,
                status:200,
                data,
                message: 'Getting all the movies',

            })
        })
        .catch(err => {
            responses.error({
                res,
                data: err,
                message: 'Something bad getting the movies',
                status: 400
            })
        })  
}

const postMovie = async (req, res) => {
    const movieobj =req.body
    const movieFile =req.file

    try{
        const movieUrl =await addToFirebaseMovieVideo(movieFile)
        const data =await moviesControllers.createMovie({...movieobj, movieUrl})
        responses.success({
            res,
            satus:201,
            data,
            message:'MOvie created!'
        })
    }catch(err){
        responses.error({
            res,
            data: err,
            message:err.message,
            status:400,
            fields: {
                title: 'string',
                synopsis : 'string',
                releaseYear: 2020,
                director: 'string',
                duration: 180,
                trillerUrl: 'a',
                coverUrl: 'a',
                classification: 'string',
                rating: 0.0
            }
        })
    }
}

const postGenreToMovie = (req,res) =>{

    const {movieId, genreId} = req.params

    moviesControllers.addGenreToMovie({movieId, genreId})
        .then(data => {
            responses.success({
                res,
                status:201,
                message:'Genre added to movie sucessfully',
                data
            })
        })
        .catch(err => {
            responses.error({
                res,
                status:400,
                message:err.message,
                data:err
            })
        })
}


const getAllMoviesByGenre = (req, res) => {
    const genreId = req.params.genreId
    movieControllers.findAllMoviesByGenre(genreId)
        .then(data => {
            responses.success({
                res,
                status: 200,
                data,
                message: 'Getting all the movies'
            })
        })
        .catch(err => {
            responses.error({
                res,
                data: err,
                message: 'Something bad getting the movies',
                status: 400
            })
        })  
}

module.exports ={
    getAllMovies,
    postMovie,
    postGenreToMovie,
    getAllMoviesByGenre
}