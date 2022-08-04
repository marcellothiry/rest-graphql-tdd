import {healthCheckRouter} from './healthcheck/healthcheck.controller.js'
import {categoriesRouter} from './categories/categories.controller.js'

const invalidEndpoint = (_req, res, _next) => {
    res.status(404).json({ error: 'Not found' });
}

export const setupRoutes = (apiVersion, app) => {
    app.use(`${apiVersion}/healthcheck`, healthCheckRouter)
    app.use(`${apiVersion}/categories`, categoriesRouter)
    app.use(invalidEndpoint)
}
