let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../index');

describe('Ecommerce', () => {
 describe('/GET product', () => {
    it('it should GET all the products', (done) => {
    chai.request(server)
        .get('/product')
        .end((err, res) => {
            res.should.have.status(200);
            (res.body).should.be.a('object');
            (res.body).should.have.property('data');
            res.body['data'].should.be.a('array');
            if(res.body.data.length > 0) {
                (res.body.data[0]).should.have.property('product_id').which.is.an('number');
                (res.body.data[0]).should.have.property('name').which.is.an('string');
                (res.body.data[0]).should.have.property('description');
                (res.body.data[0]).should.have.property('price').which.is.an('number').above(0);
            }
            done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/GET product', () => {
       it('it should GET a product by id', (done) => {
        let product_id = 5;
        chai.request(server)
           .get(`/product/${product_id}`)
           .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('product_id').which.is.an('number');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                    (res.body.data[0]).should.have.property('description');
                    (res.body.data[0]).should.have.property('price').which.is.an('number').above(0);
                }
               done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/SEARCH product', () => {
       it('it should SEARCH a product by name', (done) => {
        let category = "tok";
        chai.request(server)
           .get(`/product/search/${category}`)
           .end((err, res) => {
                (res).should.have.status(200);
                console.log(res.body);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('product_id').which.is.an('number');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                    (res.body.data[0]).should.have.property('description');
                    (res.body.data[0]).should.have.property('price').which.is.an('number').above(0);
                }
               done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/GET product', () => {
       it('it should GET a product in category', (done) => {
        let category_id = 2;
        chai.request(server)
           .get(`/product/inCategory/${category_id}`)
           .end((err, res) => {
                (res).should.have.status(200);
                console.log(res.body);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                }
               done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/GET product detail', () => {
       it('it should GET a detail of a product', (done) => {
        let product_id = 3;
        chai.request(server)
           .get(`/product/${product_id}/detail`)
           .end((err, res) => {
                (res).should.have.status(200);
                console.log(res.body);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                    (res.body.data[0]).should.have.property('description');
                    (res.body.data[0]).should.have.property('price').which.is.an('number').above(0);
                }
               done();
            });
        });
    });
});

describe('Ecommerce', () => {
    describe('/GET product reviews', () => {
       it('it should GET reviews of a product', (done) => {
        let product_id = 1;
        chai.request(server)
           .get(`/product/${product_id}/reviews`)
           .end((err, res) => {
                (res).should.have.status(200);
                console.log(res.body);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null)
                {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('review');
                }
               done();
            });
        });
    });
});