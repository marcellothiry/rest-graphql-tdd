import api from '../../../settings/api.settings.js'
import chai, {expect} from 'chai'
import chaiHttp from 'chai-http'
import {startServer, stopServer} from '../../../index.js'

chai.use(chaiHttp)

describe('Healthcheck testing suite', () => {

    const API_VERSION = '/api/v1'

    before(async () => await startServer())

    after(async () => await stopServer())

    describe('Ping', () => {
        it('should respond a simple status 200 for the healthcheck endpoint', () => chai
            .request(api.url())
            .get(`${API_VERSION}/healthcheck`)
            .then((res) => expect(res).to.have.status(200))
        )
    })
})
