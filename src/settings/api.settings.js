import dotenv from 'dotenv'

dotenv.config()

export default {
    VERSION: process.env.API_VERSION || '/api/v1',
    SCHEME: process.env.API_SCHEME ?? 'http',
    HOST: process.env.API_HOST ?? 'localhost',
    PORT: process.env.API_PORT ?? 4000,
    url: function () {
        return `${this.SCHEME}://${this.HOST}:${this.PORT}`
    },
}
