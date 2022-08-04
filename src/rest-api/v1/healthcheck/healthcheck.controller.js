import express from 'express'

export const healthCheckRouterV1 = express.Router()

healthCheckRouterV1.get('/', (_req, res) => res.sendStatus(200))
