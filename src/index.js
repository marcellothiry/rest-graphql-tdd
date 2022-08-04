import dotenv from 'dotenv'
import api from './settings/api.settings.js'
import {ApolloServer} from 'apollo-server-express'
import express from 'express'
import {allResolvers, allTypeDefs} from './helpers/graphql.helper.js'
import {setupRoutes} from './rest-api/routes.js'

/**
 * This variable allows to start/stop the server during the tests.
 */
let server

const getExpressApp = () => {
    const app = express()
    app.disable('x-powered-by')
    app.use(express.json())
    setupRoutes(api.VERSION, app)
    return app
}

/**
 * Can be used to pass any kind of information to all resolvers (e.g., token). In this
 * example, I'm just sharing the request/response objects.
 * @param req the request object
 * @param res the response object
 * @returns {Promise<{res, req}>} the context object to be shared among the resolvers
 */
const createContext = async ({ req, res }) => ({ req, res })

const apolloServer = () =>
    new ApolloServer({
        typeDefs: allTypeDefs,
        resolvers: allResolvers(),
        csrfPrevention: true,
        cache: 'bounded',
        debug: false,
        context: createContext,
    })

/**
 * If the server is already running, just return the instance (works like a singleton).
 * This avoids trying to start the server during the tests when the server is already
 * running.
 */
export const startServer = async () => {
    if (server) return server
    dotenv.config()
    server = apolloServer()
    await server.start()
    const app = getExpressApp()
    server.applyMiddleware({ app, path: api.GRAPHQL_PATH })
    app.listen(api.PORT, () =>
        console.log(`Server ready at ${api.url()}${server.graphqlPath}`)
    )
}

/**
 * Used only for testing (after running all tests). It allows to run the tests without
 * previously running the project.
 */
export const stopServer = async () => {
    await server.stop()
    console.error('Server stopped')
}

try {
    await startServer()
} catch (err) {
    console.error('Error starting server', err)
}
