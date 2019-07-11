export const storageService = {
    methods: {
        storageSave: (key, value) => localStorage.setItem(key, JSON.stringify(value)),
        storageGet: (key) => {
            try {
                return JSON.parse(localStorage.getItem(key))
            } catch (e) {
                return null
            }
        }
    }
}

export const storageKeys = {
    SESSION_ID: 'SESSION_ID',
    REQUEST_TOKEN: 'REQUEST_TOKEN'
}