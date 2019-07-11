<template>
    <h1 class="loader">Loading...</h1>
</template>

<script>
    export default {
        name: 'Loader'
    }
</script>

<style scoped>
    .loader {
        position: absolute;
        top: 30%;
        left: 50%;
        transform: translate(-50%);
        color: gainsboro;
    }
</style>