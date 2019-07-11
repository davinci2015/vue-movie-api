import VueRouter from 'vue-router'
import routes from './routes'

export default new VueRouter({
    routes: [
        routes.upcomingMovies,
        routes.roulette,
        routes.movieDetails,
        routes.notFound
    ]
})