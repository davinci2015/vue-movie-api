<template>
    <button class="btn" @click="onClick">
        <slot></slot>
    </button>
</template>

<script>
    export default {
        name: 'Button',
        props: {
            onClick: {
                type: Function,
                default: () => {}
            }
        }
    }
</script>

<style scoped lang="scss">
    .btn {
        cursor: pointer;
        font-size: 14px;
        border-radius: 4px;
        padding: 8px 14px;
        border: 0;
        background-color: #ff5039;
        color: #fff;
        transition: background-color 150ms linear;

        &:hover {
            background-color: darken(#ff5039, 10);
        }
    }
</style>