<template>
    <div class="roulette">
        <h1>Roulette</h1>
        <div class="radio" v-for="genre in genres">
            <input @change="onGenrePick"
                   type="radio"
                   name="genre"
                   v-bind:id="genre.id"
                   v-bind:value="genre.id">
            <label v-bind:for="genre.id">{{genre.name}}</label>
        </div>
        <Button class="btn" :onClick="roll">Roll</Button>

        <MovieCard v-if="!!movie"
                   v-bind:image="serviceGetImagePath(movie.poster_path)"
                   v-bind:title="movie.title"
                   v-bind:releaseDate="serviceFormatYear(movie.release_date)"
                   v-bind:id="movie.id"
                   v-bind:voteAverage="movie.vote_average"/>
    </div>
</template>

<script>
    import MovieCard from '../components/MovieCard'
    import Button from '../components/Button'
    import { movieService } from '../mixins/movieService'

    export default {
        name: 'Roulette',
        components: { Button, MovieCard },
        mixins: [movieService],
        mounted: async function () {
            this.genres = await this.serviceGetGenres()
        },
        data: () => ({
            genres: [],
            pickedGenres: new Set(),
            movie: null
        }),
        methods: {
            async roll() {
                const genreIds = Array.from(this.pickedGenres)
                const movies = await this.serviceGetMoviesByGenre(genreIds)
                this.movie = movies[this.getRandom(movies.length)]
            },
            onGenrePick(e) {
                this.pickedGenres.add(e.target.value)
            },
            getRandom(max) {
                return Math.floor(Math.random() * max - 1)
            }
        }
    }
</script>

<style scoped lang="scss">
    .roulette {
        margin: 40px;
    }

    .btn {
        display: block;
        min-width: 220px;
    }

    .radio {
        display: inline-block;
        margin: 20px 10px;

        > label {
            margin-left: 6px;
        }
    }
</style>