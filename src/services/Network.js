import config from '../config/index'
import {storageService, storageKeys} from '../mixins/storageService'

class Network {
    static methods = {
        GET: 'GET',
        POST: 'POST'
    }

    addApiKey(url) {
        return `${url}?api_key=${config.API_KEY}`
    }

    addSessionId(url) {
        const sessionId = storageService.methods.storageGet(storageKeys.SESSION_ID)
        return sessionId ? `${url}&session_id=${sessionId}` : url
    }

    constructUrl(url, queryParams) {
        url = this.addApiKey(`${config.API_BASE_URL}${url}`)
        url = this.addSessionId(url)

        for (let key in queryParams) url += `&${key}=${queryParams[key]}`
        return url
    }

    fetch(url, method, options = {}) {
        return fetch(
            this.constructUrl(url, options.params),
            {
                method,
                body: JSON.stringify(options.data),
                headers: {
                    'Accept': 'application/json, text/plain, */*',
                    'Content-Type': 'application/json'
                }
            })
            .then(res => res.json())
    }
}

export default Network