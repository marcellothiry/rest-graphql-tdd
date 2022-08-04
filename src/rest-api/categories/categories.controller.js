import express from 'express'

export const categoriesRouter = express.Router()

categoriesRouter.get('/', (_req, res) => res.sendStatus(200))
