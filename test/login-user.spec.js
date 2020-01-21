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
  password: "admin@123"
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
          done();
        });
    });
  });
});
