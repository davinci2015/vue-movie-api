<template>
    <div class="wrapper" v-if="movies.length">
        <MovieCard v-for="movie in movies"
                   v-bind:image="serviceGetImagePath(movie.poster_path)"
                   v-bind:title="movie.title"
                   v-bind:releaseDate="serviceFormatYear(movie.release_date)"
                   v-bind:id="movie.id"
                   v-bind:voteAverage="movie.vote_average"/>
        <div class="loader">
            <Button class="loader__btn" :onClick="loadNextPage">Load</Button>
        </div>
        <router-link :to="routes.roulette.path">
            <div class="roulette">
                <img src="../assets/roulette.png" alt="Roulette">
            </div>
        </router-link>
    </div>
    <Loader v-else/>
</template>

<script>
    import Button from '../components/Button'
    import MovieCard from '../components/MovieCard'
    import Loader from '../components/Loader'
    import { movieService } from '../mixins/movieService'
    import routes from '../router/routes'

    export default {
        name: 'UpcomingMovies',
        mixins: [movieService],
        components: { Button, MovieCard, Loader },
        data: () => ({
            movies: [],
            page: 1,
            routes
        }),
        mounted() {
            this.getMovies(this.page)
        },
        methods: {
            getMovies: async function (page) {
                const movies = await this.serviceGetMovies(page)
                this.movies.push(...movies)
            },
            loadNextPage() {
                this.getMovies(++this.page)
            }
        }
    }
</script>

<style scoped lang="scss">
    .wrapper {
        width: 100%;
        display: flex;
        flex-direction: row;
        flex-wrap: wrap;
        justify-content: center;
        margin-top: 40px;
        margin-bottom: 40px;
    }

    .loader {
        width: 100%;
        text-align: center;
        margin-top: 40px;
        margin-bottom: 40px;

        &__btn {
            border: 3px dashed white;
            background-color: transparent;
            border-radius: 50%;
            width: 80px;
            height: 80px;
            font-weight: bold;
            text-transform: uppercase;
            transition: border-radius 100ms ease-in-out, width 120ms ease-in-out 120ms;

            &:hover {
                border-radius: 0;
                background-color: rgba(white, 0.1);
                width: 200px;
            }
        }
    }

    .roulette {
        cursor: pointer;
        position: fixed;
        right: 24px;
        bottom: 24px;
        > img {
            opacity: .8;
            animation: rotate 4s infinite;
            width: 70px;
            height: auto;
            transition: opacity 220ms linear;
            &:hover {
                opacity: 1;
            }
        }
    }

    @-webkit-keyframes rotate {
        0% {
            transform: rotate(0);
        }
        100% {
            transform: rotate(360deg);
        }
    }
</style>