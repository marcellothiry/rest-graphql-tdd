import {healthCheckRouter} from './healthcheck/healthcheck.controller.js'
import {categoriesRouter} from './categories/categories.controller.js'

const invalidEndpoint = (_req, res, _next) => {
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
