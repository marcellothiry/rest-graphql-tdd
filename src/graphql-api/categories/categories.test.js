import api from '../../settings/api.settings.js'
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import {startServer, stopServer} from '../../index.js'

chai.use(chaiHttp)

const GET_ALL_CATEGORIES = () => JSON.stringify({
    query: `
        query categoriesQuery {
            categories {
                id
                title
                c_node_gradient_lower
                c_node_gradient_upper
            }
        }
    `,
})

const GET_ALL_CATEGORIES_INVALID = () => JSON.stringify({
    query: `
        query categoriesQuery {
            categories {
                id
                price
            }
        }
    `,
})

describe('Categories testing suite (graphQL)', () => {

    before(async () => await startServer())

    after(async () => await stopServer())

    describe('Finding categories', () => {
        it('should return all categories (3)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(GET_ALL_CATEGORIES())
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body.data.categories).to.be.a('array')
                expect(res.body.data.categories).to.have.lengthOf(3)
                expect(res.body.data.categories[0].id).to.equal('spaces')
                expect(res.body.data.categories[1].id).to.equal('fitness')
                expect(res.body.data.categories[2].id).to.equal('womenshealth')
            })
        )

        it('should return error when the query asks for an invalid field (price)', () => chai
            .request(api.url())
            .post(api.GRAPHQL_PATH)
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(GET_ALL_CATEGORIES_INVALID())
            .then((res) => {
                expect(res).to.have.status(400)
                expect(res).to.be.json
                expect(res.body.errors[0].message).to.equal('Cannot query field "price" on type "Category".')
            })
        )
    })
})
