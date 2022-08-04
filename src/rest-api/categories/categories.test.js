import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import api from '../../settings/api.settings.js'
import {startServer, stopServer} from '../../index.js'
import CategoryRepository from '../../repositories/category-repository.js'

chai.use(chaiHttp)

describe('Categories testing suite', () => {

    before(async () => await startServer())

    // todo: check Mocha configuration to run this hook after all suites (the server is a singleton, so it's no problem to call it every time)
    after(async () => await stopServer())

    describe('Finding categories', () => {
        it('should return all categories with status 200', () => chai
            .request(api.url())
            .get(`${api.VERSION}/healthcheck`)
            .then((res) => {
                expect(res).to.have.status(200)
                expect(res.body.status).to.equal(200)
                expect(res.body.data).to.eql(CategoryRepository.findAll())
            })
        )
    })
})
