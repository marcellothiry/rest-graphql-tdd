import express from 'express'

export const healthCheckRouter = express.Router()

healthCheckRouter.get('/', (_req, res) => res.sendStatus(200))
