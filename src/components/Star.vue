<template>
    <div v-bind:class="{star: true, active: this.active}"></div>
</template>

<script>
    export default {
        name: 'Star',
        props: {
            active: Boolean
        }
    }
</script>

<style scoped lang="scss">
    .star {
        width: 24px;
        height: 24px;
        background-size: cover;
        background-image: url('../assets/star.png');
        transition: all 220ms linear;
        &:hover {
            background-image: url('../assets/favourites.png');
        }
    }

    .active {
        background-image: url('../assets/favourites.png');
    }
</style>