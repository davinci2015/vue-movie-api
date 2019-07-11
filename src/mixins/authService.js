import Network from '../services/Network'
const network = new Network()

export const authService = {
    methods: {
        authServiceGetRequestToken: () =>
            network.fetch('/authentication/token/new', Network.methods.GET)
                .then(res => res.request_token),

        authServiceGetAuthUrl: (token, redirectTo) =>
            `https://www.themoviedb.org/authenticate/${token}?redirect_to=${redirectTo}`,

        authServiceCreateSession: (token) =>
            network.fetch('/authentication/session/new',
                Network.methods.POST,
                { data: { request_token: token } })
                .then(res => res.session_id)
    }
}