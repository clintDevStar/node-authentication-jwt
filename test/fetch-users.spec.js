process.env.NODE_ENV = "test";

// model schema
const User = require("../models/users");

// Dev Dependencies
const chai = require("chai");
const chaiHttp = require("chai-http");
const app = require("../app");
const should = chai.should();

chai.use(chaiHttp);

let adminUser = {
  name: "admin",
  password: "admin@123"
};

let token = "";

// parent block
describe("Login", () => {
  beforeEach(done => {
    // register an admin user
    chai
      .request(app)
      .post("/users")
      .send(adminUser)
      .end((err, res) => {
        res.should.have.status(200);
      });
    chai
      .request(app)
      .post("/login")
      .send(adminUser)
      .end((err, res) => {
        res.should.have.status(200);
        token = res.body.token;
      });
    done();
  });

  afterEach(done => {
    User.remove({}, err => {
      done();
    });
  });

  it("should fetch all users", done => {
    chai
      .request(app)
      .get("/users")
      .set({ Authorization: "Bearer " + token })
      .end((err, res) => {
        res.should.have.status(500);
        res.body.should.be.a("object");
        done();
      });
  });
});
