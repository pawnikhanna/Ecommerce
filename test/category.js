let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../index');

describe('Ecommerce', () => {
 describe('/GET category', () => {
    it('it should GET all the categories', (done) => {
    chai.request(server)
        .get('/categories')
        .end((err, res) => {
            (res).should.have.status(200);
            console.log(res.body);
            (res.body).should.be.a('object');
            (res.body).should.have.property('data');
            if(res.body['data'] != null) {
                res.body['data'].should.be.a('array');
                (res.body.data[0]).should.have.property('category_id').which.is.an('number');
                (res.body.data[0]).should.have.property('name').which.is.an('string');
            }
            done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/GET category by id', () => {
       it('it should GET a category by id', (done) => {
        let category_id = 2;
        chai.request(server)
           .get(`/categories/${category_id}`)
           .end((err, res) => {
                (res).should.have.status(200);
                console.log(res.body);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    res.body.data.should.have.lengthOf(1);
                    (res.body.data[0]).should.have.property('category_id').which.is.an('number');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                }
               done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/GET category in product', () => {
       it('it should GET a category in product', (done) => {
        let product_id = 3;
        chai.request(server)
           .get(`/categories/inProduct/${product_id}`)
           .end((err, res) => {
                (res).should.have.status(200);
                console.log(res.body);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('category_id').which.is.an('number');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                }
               done();
            });
        });
    });
});