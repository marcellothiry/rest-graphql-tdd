import express from 'express'
import CategoryRepository from '../../../repositories/category-repository.js'

export const categoriesRouterV1 = express.Router()

/**
 * For more complex business rules, we could create a categories.service.js.
 */
categoriesRouterV1.get('/', (_req, res) => {
    res.status(200).json({
        status: 200,
        data: {
            categories: CategoryRepository.findAll()
        }
    })
})
