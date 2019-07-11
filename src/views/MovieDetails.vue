<template>
    <div class="movie" v-if="movie">
        <div class="movie__image"
             :style="{ backgroundImage: `url(${serviceGetImagePath(movie.poster_path)})` }"></div>
        <div class="movie__info">
            <h1>{{movie.title}} ({{serviceFormatYear(movie.release_date)}})</h1>
            <h3><i>{{movie.tagline}}</i></h3>
            <div class="movie__stars">
                <Star @click.native="rateMovie(star)" class="movie__star"
                      v-bind:active="isStarActive(star)"
                      v-for="star in 10"
                      v-bind:key="star">
                    {{star}}
                </Star>
            </div>
            <p><strong>Rating:</strong> {{movie.vote_average}}</p>
            <p><strong>Popularity:</strong> {{movie.popularity}}</p>
            <p><strong>Language:</strong> {{movie.original_language}}</p>
            <p><strong>Production companies:</strong> {{getProductionCompanies(movie.production_companies)}}</p>
            <p>{{movie.overview}}</p>
        </div>
    </div>
    <Loader v-else/>
</template>

<script>
    import Star from '../components/Star'
    import Loader from '../components/Loader'
    import { movieService } from '../mixins/movieService'

    export default {
        name: 'MovieDetails',
        mixins: [movieService],
        components: { Star, Loader },
        mounted() {
            const movieId = this.$route.params.id
            this.getMovieDetails(movieId)
            this.getMovieRating(movieId)
        },
        data: () => ({
            rating: 0,
            movie: null
        }),
        methods: {
            getMovieDetails: async function (movieId) {
                this.movie = await this.serviceGetMovieDetails(movieId)
            },
            getMovieRating: async function (movieId) {
                const rating = await this.serviceGetMovieRating(movieId)
                this.rating = rating ? rating.value : 0
            },
            getProductionCompanies(companies) {
                return companies.map(company => company.name).join(', ')
            },
            isStarActive(current) {
                return current <= this.rating
            },
            rateMovie: async function (rating) {
                const movieId = this.$route.params.id
                await this.serviceRateMovie(movieId, rating)
                this.rating = rating
            }
        }
    }
</script>

<style scoped lang="scss">
    .loader {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
        color: gainsboro;
    }

    .movie {
        width: calc(100% - 60px);
        display: flex;
        flex-direction: row;

        h3 {
            margin-top: -24px;
            margin-bottom: 42px;
            font-weight: 100;
        }

        &__image {
            min-width: 30%;
            height: 100vh;
            background-repeat: no-repeat;
            background-size: cover;
        }

        &__info {
            padding-left: 24px;
            color: #fff;
            border-left: 4px solid white;
        }

        &__star {
            cursor: pointer;
            display: inline-block;
            margin-left: 4px;
            margin-right: 4px;
        }

        &__stars {
            margin-left: -4px;
            margin-right: -4px;
        }
    }
</style>