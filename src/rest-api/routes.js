import {healthCheckRouter} from './healthcheck/healthcheck.controller.js'
import {categoriesRouter} from './categories/categories.controller.js'
import api from '../settings/api.settings.js'

const invalidEndpoint = (req, res, next) => {
    if (req.originalUrl === api.GRAPHQL_PATH) return next()
    res.status(400).json({
        status: 400,
        data: null,
        error: 'The endpoint does not exist.'
    });
}

export const setupRoutes = (apiVersion, app) => {
    app.use(`${apiVersion}/healthcheck`, healthCheckRouter)
    app.use(`${apiVersion}/categories`, categoriesRouter)
    app.use(invalidEndpoint)
}
