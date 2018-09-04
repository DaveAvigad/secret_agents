const { expect, should } = require('chai')
// const assert = require('assert')
const app = require('../src/server').default
const request = require('supertest')
const controllers = require('../src/controller')

describe.only('Basic RestAPI test', () => {
    
    describe('#POST /find-closest', function () {
        it('check input validation', function (done) {
            const data = {
                "target-location": "40.6655101,-73.89188969999998"
            }
            request(app)
                .post('/find-closest')
                .send(data)
                .set('Accept', 'application/json')
                .expect(res => expect(res.statusCode).to.equal(200))
                .catch(err => {
                    expect(err).to.be.an('error')
                })
        })
    })
    describe.only('#GET /countries-by-isolation', function () {
        it('should get all countries', function (done) {
            request(app).get('/countries-by-isolation')
                .expect(res => expect(res.statusCode).to.equal(200))
                .catch(err => {
                    expect(err).to.be.an('error')
                })
        })
    })

})
