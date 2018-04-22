var chai = require('chai'),
    chaiHttp = require('chai-http'),
    server = require('../server').server,
    should = chai.should(),
    customerID = '';

process.env.NODE_ENV = 'test';
chai.use(chaiHttp);

describe("Testing api server..", function () {

    this.timeout(10000); // 10 seconds

    after(function (done) {
        server.close();
        done();
    });

    it('should get all customers on api/customers GET', function(done) {
        chai.request(server)
        .get('/api/customers')
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            done();
        });
    });

    it('should add a new customer on api/customers POST', function(done) {
        chai.request(server)
        .post('/api/customers')
        .send({
            firstname: 'Test User',
            lastname: 'Test User',
            birthday: '1990-02-20',
            gender: 'm'
        })
        .end(function(err, res) {
            res.body.success.should.equal(true);
            res.body.should.have.property('customer');
            customerID = res.body.customer.customerID;
            done();
        });
    });

    it('should get customer by id on api/customers GET', function(done) {
        chai.request(server)
        .get('/api/customers/' + customerID)
        .end(function(err, res) {
            res.should.have.status(200);
            res.body.success.should.equal(true);
            res.body.should.have.property('customer');
            done();
        });
    });

    it('should update customer on api/customers PUT', function(done) {
        chai.request(server)
        .put('/api/customers/' + customerID)
        .send({
            birthday: '2018-4-18'
        })
        .end(function(err, res) {
            res.body.success.should.equal(true);
            res.body.should.have.property('customer');
            res.body.customer.birthday.should.equal('2018-4-18');
            done();
        });
    });

    it('should delete customer on api/customers DELETE', function(done) {
        chai.request(server)
        .delete('/api/customers/' + customerID)
        .end(function(err, res) {
            res.body.success.should.equal(true);
            done();
        });
    });
});