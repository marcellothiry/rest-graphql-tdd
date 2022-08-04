import {getAllCategories} from './categories.services.js'

const categoryResolvers = {

    Query: {
        categories: getAllCategories,
    },
}

export default categoryResolvers
