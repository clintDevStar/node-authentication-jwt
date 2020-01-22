process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/users");

// Require dev dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

// parent block
describe("User", () => {
  beforeEach(done => {
    // Before Each test we empty the database
    User.remove({}, err => {
      done();
    });
  });
  /**
   * Test the /POST route
   */
  describe("/POST User", () => {
    it("should create user", done => {
      let user = {
        name: "Fin",
        password: "Eastood0009"
      };
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("name");
          res.body.should.have.property("password");
          done();
        });
    });
    it("should not create user without name field", done => {
      let user = {
        password: "berlin"
      };
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Name and Password required!");
          done();
        });
    });
    it("should not create user without password field", done => {
      let user = {
        name: "Mofius"
      };
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(400);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Name and Password required!");
          done();
        });
    });
    it("should not create user with an empty name field", done => {
      let user = {
        name: " ",
        password: "seseko"
      };
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Name field can not be empty space!");
          done();
        });
    });
    it("should not create user with empty space on password", done => {
      let user = {
        name: "fally",
        password: " "
      };
      chai
        .request(app)
        .post("/users")
        .send(user)
        .end((err, res) => {
          res.should.have.status(422);
          res.body.should.be.a("object");
          res.body.should.have
            .property("error")
            .eql("Invalid Password!");
          done();
        });
    });
  });
});
