let chai = require('chai');
let chaiHttp = require('chai-http');
var should = chai.should();
chai.use(chaiHttp);
let server = require('../index');

describe('Ecommerce', () => {
let token;
    describe('/GET customer by id', () => {
        it('it should GET customer by id', (done) => {
        chai.request(server)
            .get('/customer/2')
            .end((err, res) => {
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                if(res.body['data'] != null) {
                    res.body['data'].should.be.a('array');
                    (res.body.data[0]).should.have.property('customer_id').which.is.an('number');
                    (res.body.data[0]).should.have.property('name').which.is.an('string');
                    (res.body.data[0]).should.have.property('email');
                    (res.body.data[0]).should.have.property('phone_number').which.is.an('number').above(0);
                }
                done();
            });
        });
    });

    describe('/GET customer login', () => {
        let customer = {
            "email": "new@gmail.com",
            "password": "new123"
        }
        it('it should success if credential is valid', (done) =>  {
            chai.request(server)
            .post("/customer/login")
            .send(customer)
            .end((err, res) => {
                //console.log(res.body);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                (res.body).should.have.property('token');
                (res.body.data).should.be.a('string');
                token = "Bearer " + res.body.token;
                done();
            }); 
        })
    });

    describe('Update phone number', () => {
        let customer_id = 5;
        let phone_number = {
            "phone_number": "1234567890"
        };
        it("it should update phone no of the customer", (done) => {
            chai.request(server)
            .put(`/customer/${customer_id}/update`)
            .set("Authorization", token)
            .send(phone_number)
            .end( (err, res) => {
                console.log(res.body);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                (res.body.data).should.be.eq("Phone number updated");
                done();
            });
        });
    });

    describe('Update card number', () => {
        let customer_id = 5;
        let card_number = {
            "card_number": "111222333"
        };
        it("it should update card no of the customer", (done) => {
            chai.request(server)
            .put(`/customer/${customer_id}/creditcard`)
            .set("Authorization", token)
            .send(card_number)
            .end( (err, res) => {
                //console.log(res.body);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                (res.body.data).should.be.eq("Card details updated");
                done();
            });
        });
    });

    describe('Update address', () => {
        let customer_id = 5;
        let address = {
            "address": "GZB"
        };
        it("it should update address", (done) => {
            chai.request(server)
            .put(`/customer/${customer_id}/address`)
            .set("Authorization", token)
            .send(address)
            .end( (err, res) => {
                //console.log(res.body);
                (res).should.have.status(200);
                (res.body).should.be.a('object');
                (res.body).should.have.property('data');
                (res.body.data).should.be.a('string');
                (res.body.data).should.be.eq("Address updated");
                done();
            });
        });
    });
});