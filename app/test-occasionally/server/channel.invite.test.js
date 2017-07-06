import {renderComponent, expect} from "../test_helper";
import * as Types from "../../actions/types";
import * as Actions from "../../actions/";
import Channel from "../../../server/controllers/authentication";
let mongoose = require("mongoose");
let chai = require('chai');
let chaiHttp = require('chai-http');
let server = require('../../../server/index_server.js');
let should = chai.should();
const PORT = process.env.PORT || 3001;
const ROOT_URL = process.env.ROOT_URL || "http://localhost:"+PORT;
chai.use(chaiHttp);

//

describe("Slack Backend API:", () => {
  describe("\tInvite To Channel:", () => {
    let sending_data, sending_BAD_data, url;
    beforeEach(() => {
      url = '/api/channelInvite'
      sending_data = {"email": "1stloveyourself@gmail.com", "last_name": "Daniel", "first_name": "Daniel", "password": "password", start_date: "01/2016", end_date: "01/2018"}
      sending_BAD_data = {}
    })
    afterEach(()=>{

    })
    it('Success: Invite User', function(done) {
      this.timeout(20000)
      chai.request(server)
          .post(url)
          .send(sending_data)
          .end((err, res) => {
              res.should.have.status(201);
              res.body.should.be.a('object');
              res.body.statusMessage.should.be.eql("Success, User Invite Sent!");
            done();
          });
    });
    it('Failed: Invite User (Sent Recently)', function(done) {
      this.timeout(1000)
      chai.request(server)
          .post(url)
          .send(sending_data)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.statusMessage.should.be.eql("Email Was Sent Recenetly, Check Your Spam");
            done();
          });
    });
    it('Failed: Invite User (Already a Team Member)', function(done) {
      url = '/api/channelInvite'
      sending_data = {"email": "daniel@danielcudney.com", "last_name": "Daniel", "first_name": "Daniel", start_date: "01/2016", end_date: "01/2018"}
      this.timeout(1000)
      chai.request(server)
          .post(url)
          .send(sending_data)
          .end((err, res) => {
              res.should.have.status(200);
              res.body.should.be.a('object');
              res.body.statusMessage.should.be.eql("Congratulations! You are already part of the team!");
            done();
          });
    });
    it('Failed: Invite User', function(done) {
      this.timeout(5000)
      chai.request(server)
          .post(url)
          .send(sending_BAD_data)
          .end((err, res) => {
              res.should.have.status(400);
              res.body.should.be.a('object');
              res.body.statusMessage.should.be.eql("Please Provide Email Address, First Name, and Last Name");
            done();
          });
    });
  })
})
