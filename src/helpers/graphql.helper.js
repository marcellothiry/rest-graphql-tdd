import merge from 'deepmerge'
import typedefs from '../graphql-api/common/typedefs.js'
import resolvers from '../graphql-api/common/resolvers.js'
import categoryTypedefs from '../graphql-api/categories/categories.typedefs.js'
import categoryResolvers from '../graphql-api/categories/categories.resolvers.js'

export const allTypeDefs = [typedefs, categoryTypedefs]

export const allResolvers = () => merge.all([resolvers, categoryResolvers])
