// Import the dependencies for testing
import chai from 'chai';
import chaiHttp from 'chai-http';
import app from '../app.js';
// Configure chai
const id = '6373817586c5e85481f505fe';
chai.use(chaiHttp);
chai.should();
describe("FootballTeams", () => {
    describe("tests", () => {
        // Test to make a team
        it("should make a new team", (done) => {
             chai.request(app)
                 .post('/api/footballTeams')
                 .send({
                    name: "Manchester City",
                    league: "Premier League",
                    location: "Manchester",
                    bestPlayer: "Kevin De Bruyne"
                 })
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.message.should.equal('New footballTeam created!');
                     done();
                  });
         });

        // Test to make an invalid team
        it("should not make a new team", (done) => {
            chai.request(app)
                .post('/api/footballTeams')
                .send({
                   name: "Manchester City",
                   league: "Premier League",
                })
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('footballTeam validation failed: location: Path `location` is required.');
                    done();
                 });
        });

        // Test to get all team records
        it("should get all team records", (done) => {
             chai.request(app)
                 .get(`/api/footballTeams`)
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.should.be.a('object');
                     res.body.status.should.equal('success');
                     res.body.message.should.equal('Teams retrieved successfully');
                     res.body.data.length.should.equal(2);
                     done();
                  });
         });

         // Test to get one team record
        it("should get one team record", (done) => {
            chai.request(app)
                .get(`/api/footballTeams/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.message.should.equal('footballTeam details loading..');
                    done();
                 });
        });

        // Test to get a non existing team record
        it("should get no team record", (done) => {
            chai.request(app)
                .get(`/api/footballTeams/qfqfsvvg`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal('error');
                    done();
                 });
        });

         
        // Test to adapt a team"
        it("should adapt the team", (done) => {
             chai.request(app)
                 .put(`/api/footballTeams/${id}`)
                 .send('bestPlayer = "Karim Benzema"')
                 .end((err, res) => {
                     res.should.have.status(200);
                     res.body.message.should.equal('footballTeam Info updated');
                     done();
                  });
         });

        // Test to delete a team
        it("should delete a team", (done) => {
            chai.request(app)
                .delete(`/api/footballTeams/${id}`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.status.should.equal("success");
                    res.body.message.should.equal("footballTeam deleted");
                    done();
                 });
        });

        // Test to get all team records
        it("should get one team record", (done) => {
            chai.request(app)
                .get(`/api/footballTeams`)
                .end((err, res) => {
                    res.should.have.status(200);
                    res.body.should.be.a('object');
                    res.body.status.should.equal('success');
                    res.body.message.should.equal('Teams retrieved successfully');
                    res.body.data.length.should.equal(1);
                    done();
                 });
        });
    });
});