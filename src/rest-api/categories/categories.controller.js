import express from 'express'
import CategoryRepository from '../../repositories/category-repository.js'

export const categoriesRouter = express.Router()

/**
 * For more complex business rules, we could create a categories.service.js.
 */
categoriesRouter.get('/', (_req, res) => {
    res.status(200).json({
        status: 200,
        data: {
            categories: CategoryRepository.findAll()
        }
    })
})
