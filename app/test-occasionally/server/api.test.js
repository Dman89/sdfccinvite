import {renderComponent, expect} from "../test_helper";
import * as Types from "../../actions/types";
import * as Actions from "../../actions/";
let mongoose = require("mongoose");
let User = require('../../../server/models/user');
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server/index_server.js');
let should = chai.should();
const PORT = process.env.PORT || 3001;
const ROOT_URL = process.env.ROOT_URL || "http://localhost:"+port;
chai.use(chaiHttp);

describe("API Calls:", function() {
  describe("\tUser:", () => {
      describe('\t/POST User', () => {
        let url;
        beforeEach(()=>{
          url = '/api/signup'
        })
        it('Success: Post User', function(done) {
          this.timeout(5000)
          let user = {
              email: "Usseer",
              password: "Paasssswwoorrd",
          }
          chai.request(server)
              .post(url)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                done();
              });
        });
        it('Error: Post User (Duplicate)', (done) => {
          let user = {
              email: "Usseer",
              password: "Paasssswwoorrd"
          }
          chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(422);
                res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/LOGIN User', () => {
        let url;
        beforeEach(()=>{
          url = '/api/signin'
        })
        it('Success: User LOGGED In', (done) => {
          let user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd"
          }
          chai.request(server)
              .post(url)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                done();
              });
        });
        it('Error: User LOGGED In (Wrong Password)', (done) => {
          let user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorr"
          }
          chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
              done();
            });
        });
        it('Error: User LOGGED In (Wrong User)', (done) => {
          let user = {
          	"email": "Ussee",
          	"password": "Paasssswwoorrd"
          }
          chai.request(server)
            .post(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(401);
                res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/Profile User (Restricted)', () => {
        let url, user_token;

        beforeEach((done)=>{
          url = '/api/profile'
          let usera = {
            "email": "Usseer",
            "password": "Paasssswwoorrd"
          }
          chai.request(server)
            .post('/api/signin')
            .send(usera)
            .end((err, res) => {
              user_token = res.body.token;
              done();
            });
        })
        it('Success: User LOGGED In', (done) => {
          let user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd"
          }
          chai.request(server)
              .get(url)
              .set("authorization", user_token)
              .end((err, res) => {
                res.should.have.status(200);
                res.body.should.be.a('object');
                done();
              });
        });
        it('Error: User LOGGED In (Wrong TOKEN)', (done) => {
          chai.request(server)
            .get(url)
            .set("authorization", "user_token")
            .end((err, res) => {
              res.should.have.status(401);
              res.body.should.be.a('object');
              done();
            });
        });
      });
      describe('\t/DELETE User', () => {
        let url;
        beforeEach(()=>{
          url = '/api/a666Route'
        })
        it('Success: Delete User', (done) => {
          let user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd",
          	"allow": "true"
          }
          chai.request(server)
              .delete(url)
              .send(user)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  // res.body.should.have.property('errors');
                  // res.body.errors.should.have.property('pages');
                  // res.body.errors.pages.should.have.property('kind').eql('required');
                done();
              });
        });
        it('Error: Delete User (Wrong Password)', (done) => {
          let user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorr",
          	"allow": "true"
          }
          chai.request(server)
            .delete(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                // res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
        });
        it('Error: Delete User (Wrong User)', (done) => {
          let user = {
          	"email": "Ussee",
          	"password": "Paasssswwoorrd",
          	"allow": "true"
          }
          chai.request(server)
            .delete(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
        });
        it('Error: Delete User (Not Allowed)', (done) => {
          let user = {
          	"email": "Usseer",
          	"password": "Paasssswwoorrd",
          	"allow": "false"
          }
          chai.request(server)
            .delete(url)
            .send(user)
            .end((err, res) => {
                res.should.have.status(500);
                res.body.should.be.a('object');
                // res.body.should.have.property('errors');
                // res.body.errors.should.have.property('pages');
                // res.body.errors.pages.should.have.property('kind').eql('required');
              done();
            });
        });
      });
      describe("\t/Check For User", () => {
        let url, in_user_email, email;
        beforeEach(()=>{
          email = "a1z1a123112sa@koobecaf.moc";
          in_user_email = "daniel@danielcudney.com";
          url = ("/api/check_user/");
        })
        it("Error: Email In Use",(done)=>{
          url = url + in_user_email;
          chai.request(server)
              .get(url)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  expect(res.body.ok).to.eql(false)
                done();
              });
        })
        it("Success: Email Is Open To User",(done)=>{
          url = url + email;
          chai.request(server)
              .get(url)
              .end((err, res) => {
                  res.should.have.status(200);
                  res.body.should.be.a('object');
                  expect(res.body.ok).to.eql(true)
                done();
              });
        })
      })
  })
})
