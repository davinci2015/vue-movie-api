import Network from '../services/Network'
const network = new Network()

export const movieService = {
    methods: {
        serviceGetImagePath: (path) => `https://image.tmdb.org/t/p/w500/${path}`,

        serviceFormatYear: (date) => date.substring(0, 4),

        serviceGetMovies: (page) =>
            network.fetch('/movie/upcoming', Network.methods.GET, {
                params: { page }
            }).then(res => res.results),

        serviceGetMovieDetails: (movieId) =>
            network.fetch(`/movie/${movieId}`, Network.methods.GET),

        serviceRateMovie: (movieId, rating) =>
            network.fetch(`/movie/${movieId}/rating`, Network.methods.POST, {
                data: { value: rating }
            }),

        serviceGetMovieRating: (movieId) =>
            network.fetch(`/movie/${movieId}/account_states`, Network.methods.GET)
                .then(res => res.rated),

        serviceGetGenres: () =>
            network.fetch('/genre/movie/list', Network.methods.GET)
                .then(res => res.genres),

        serviceGetMoviesByGenre: (genreIds) => {
            return network.fetch('/discover/movie', Network.methods.GET, {
                params: { with_genres: genreIds.join('|') }
            }).then(res => res.results)
        }
    }
}