<template>
    <div class="wrapper">
        <h1>404 Not Found</h1>
        <router-link :to="routes.upcomingMovies.path">
            <Button>Go Home</Button>
        </router-link>
    </div>
</template>

<script>
    import Button from '../components/Button'
    import routes from '../router/routes'

    export default {
        name: 'NotFound',
        components: { Button },
        data: () => ({ routes })
    }
</script>

<style scoped>
    .wrapper {
        margin-top: 60px;
        text-align: center;
    }
</style>