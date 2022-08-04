import {healthCheckRouter} from './healthcheck/healthcheck.controller.js'
import {categoriesRouter} from './categories/categories.controller.js'

export const setupRoutes = (apiVersion, app) => {
    app.use(`${apiVersion}/healthcheck`, healthCheckRouter)
    app.use(`${apiVersion}/categories`, categoriesRouter)
}
