import {healthCheckRouter} from "./healthcheck/healthcheck.controller.js";

export const setupRoutes = (apiVersion, app) => {
    app.use(`${apiVersion}/healthcheck`, healthCheckRouter)
}
