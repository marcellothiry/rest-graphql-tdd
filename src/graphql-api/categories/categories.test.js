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

describe('Categories testing suite (graphQL)', () => {

    before(async () => await startServer())

    after(async () => await stopServer())

    describe('Finding categories', () => {
        it('should return all users (3)', () => chai
            .request(api.url())
            .post('/graphql')
            .set('Content-Type', 'application/json')
            .set('Accept', 'application/json')
            .send(GET_ALL_CATEGORIES())
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res).to.be.json
                expect(res.body.data.categories).to.be.a('array')
                expect(res.body.data.categories).to.have.lengthOf(3)
                expect(res.body.data.categories[0].email).to.equal('spaces')
                expect(res.body.data.categories[1].email).to.equal('fitness')
                expect(res.body.data.categories[2].email).to.equal('womenshealth')
            })
        )
    })
})
