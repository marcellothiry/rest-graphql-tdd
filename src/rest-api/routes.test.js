import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import {startServer, stopServer} from '../index.js'
import api from '../settings/api.settings.js'

chai.use(chaiHttp)

describe('Endpoints validity test suite', () => {

    before(async () => await startServer())

    after(async () => await stopServer())

    describe('Invalid endpoints', () => {

        const checkInvalidEndpoint = (path, useVersion = true) => chai
            .request(api.url())
            .get(useVersion ? `${api.VERSION}${path}` : path)
            .then((res) => {
                expect(true).to.be.true // sonar expects at least one assertion in each test case
                expect(res).to.have.status(404)
                expect(res.body.status).to.equal(404)
                expect(res.body.data).to.equal(null)
                expect(res.body.error).to.equal('The endpoint does not exist.')
            })

        it('should return error 404 when trying to access invalid endpoint (/categories/abc)', () =>
           checkInvalidEndpoint('/categories/abc')
        )

        it('should return error 404 when trying to access invalid endpoint (/healthcheck/123)', () =>
           checkInvalidEndpoint('/healthcheck/123')
        )

        it('should return error 404 when trying to access invalid endpoint (/products)', () =>
            checkInvalidEndpoint('/products')
        )

        it('should return error 404 when trying to access invalid endpoint (/categories/abc - no version)', () =>
            checkInvalidEndpoint('/categories/abc', false)
        )

        it('should return error 404 when trying to access invalid endpoint (/healthcheck/123 - no version)', () =>
            checkInvalidEndpoint('/healthcheck/123', false)
        )

        it('should return error 404 when trying to access invalid endpoint (/products - no version)', () =>
            checkInvalidEndpoint('/products', false)
        )
    })
})
