<template>
    <div class="card">
        <div class="card__image" :style="{ backgroundImage: `url(${image})` }"></div>
        <h3>{{title}} ({{releaseDate}})</h3>
        <span class="card__rating">{{voteAverage}}</span>
        <router-link :to="routes.movieDetails.getPath(id)">
            <Button>See details</Button>
        </router-link>
    </div>
</template>

<script>
    import routes from '../router/routes'
    import Button from '../components/Button'

    export default {
        name: 'MovieCard',
        components: { Button },
        data: () => ({ routes }),
        props: {
            id: Number,
            image: String,
            title: String,
            releaseDate: String,
            voteAverage: Number
        },
    }
</script>

<style scoped lang="scss">
    .card {
        opacity: 0.9;
        position: relative;
        vertical-align: top;
        width: 20%;
        display: inline-block;
        min-height: 220px;
        margin: 16px 32px;
        padding: 14px;
        background-color: #fff;
        border-radius: 8px;
        color: #3e3e3e;
        transform: scale(0.98);
        transition: all 240ms ease-in-out;

        &:hover {
            opacity: 1;
            transform: scale(1);
        }

        &__image {
            background-repeat: no-repeat;
            background-size: cover;
            width: 100%;
            height: 420px;
            border-top-left-radius: 8px;
            border-top-right-radius: 8px;
        }

        &__rating {
            font-size: 28px;
            position: absolute;
            top: 30px;
            width: 100%;
            height: 36px;
            color: #fff;
            font-weight: bold;
            background-color: #b00525;
            padding: 6px;

            &:after {
                content: '';
                position: absolute;
                width: 70px;
                height: 70px;
                background-color: #96031f;
                right: 14px;
                top: 12px;
                z-index: -1;
                transform: rotate(45deg)
            }
        }
    }
</style>