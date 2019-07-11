<template>
    <div id="app">
        <router-view></router-view>
    </div>
</template>

<script>
    import { authService } from './mixins/authService'
    import { storageKeys, storageService } from './mixins/storageService'

    export default {
        name: 'App',
        mixins: [authService, storageService],
        mounted() {
            const requestToken = this.storageGet(storageKeys.REQUEST_TOKEN)
            const sessionId = this.storageGet(storageKeys.SESSION_ID)

            !requestToken && this.requestToken()
            !sessionId && this.createSession(requestToken)
        },
        methods: {
            requestToken: async function() {
                const redirectTo = 'http://localhost:8080/#/'
                const token = await this.authServiceGetRequestToken()
                this.storageSave(storageKeys.REQUEST_TOKEN, token)
                location.replace(this.authServiceGetAuthUrl(token, redirectTo))
            },
            createSession: async function(requestToken) {
                const session = await this.authServiceCreateSession(requestToken)
                if (!session) this.requestToken()
                this.storageSave(storageKeys.SESSION_ID, session)
            }
        }
    }
</script>

<style>
    body, html {
        font-family: 'Avenir', Helvetica, Arial, sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
        margin: 0;
        color: #e0edeb;
        background-color: #1a1a1a;
    }
</style>