import {healthCheckRouterV1} from './v1/healthcheck/healthcheck.controller.js'
import {categoriesRouterV1} from './v1/categories/categories.controller.js'
import api from '../settings/api.settings.js'

const invalidEndpoint = (req, res, next) => {
    if (req.originalUrl === api.GRAPHQL_PATH) return next()
    res.status(400).json({
        status: 400,
        data: null,
        error: 'The endpoint does not exist.'
    });
}

const setupV1Routes = (app, apiVersion) => {
    app.use(`${apiVersion}/healthcheck`, healthCheckRouterV1)
    app.use(`${apiVersion}/categories`, categoriesRouterV1)
}

export const setupRoutes = (app) => {
    setupV1Routes(app, '/api/v1')
    app.use(invalidEndpoint)
}
