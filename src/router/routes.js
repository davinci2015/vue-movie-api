import UpcomingMovies from '../views/UpcomingMovies'
import Roulette from '../views/Roulette'
import MovieDetails from '../views/MovieDetails'
import NotFound from '../views/NotFound'

export default {
    upcomingMovies: {
        path: '/',
        component: UpcomingMovies
    },
    roulette: {
        path: '/roulette',
        component: Roulette
    },
    movieDetails: {
        path: '/movie-details/:id',
        getPath: id => `/movie-details/${id}`,
        component: MovieDetails
    },
    notFound: {
        path: '*',
        component: NotFound
    }
}