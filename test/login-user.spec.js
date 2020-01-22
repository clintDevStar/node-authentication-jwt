process.env.NODE_ENV = "test";

let mongoose = require("mongoose");
let User = require("../models/users");

// Require dev dependencies
let chai = require("chai");
let chaiHttp = require("chai-http");
let app = require("../app");
let should = chai.should();

chai.use(chaiHttp);

let defaultUser = {
  name: "admin",
  password: "Eastood0009"
};

// parent block
describe("Login", () => {
  beforeEach(done => {
    chai
      .request(app)
      .post("/users")
      .send(defaultUser)
      .end((err, res) => {
        res.should.have.status(200);
        done();
      });
  });
  afterEach(done => {
    // After each test we truncate the database
    User.remove({}, err => {
      done();
    });
  });

  describe("/Login User", () => {
    it("should login existing user successfully", done => {
      chai
        .request(app)
        .post("/login")
        .send(defaultUser)
        .end((err, res) => {
          res.should.have.status(200);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Login Successful!");
          res.body.should.have.property("token");
          done();
        });
    });
    it("should throw error when user enters wrong password", done => {
      let user = {
        name: "admin",
        password: "admin@12"
      };
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(403);
          res.body.should.be.a("object");
          res.body.should.have.property("message").eql("Login Failed!");
          done();
        });
    });
    it("should  throw an error when user is not found", done => {
      let user = {
        name: "samfinch",
        password: "killswitch"
      };
      chai
        .request(app)
        .post("/login")
        .send(user)
        .end((err, res) => {
          res.should.have.status(500);
          res.body.should.be.a("object");
          res.body.should.have.property("error");
          done();
        });
    });
  });
});
