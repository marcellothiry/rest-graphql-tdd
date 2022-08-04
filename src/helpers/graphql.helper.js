import merge from 'deepmerge'
import typedefs from '../graphql-api/common/typedefs.js'
import resolvers from '../graphql-api/common/resolvers.js'

export const allTypeDefs = [typedefs]

export const allResolvers = () => merge.all([resolvers])
