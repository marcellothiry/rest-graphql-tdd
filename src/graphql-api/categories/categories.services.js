import CategoryRepository from '../../repositories/category-repository.js'

export const getAllCategories = () => CategoryRepository.findAll()
