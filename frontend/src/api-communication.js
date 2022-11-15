import { React,  Component } from 'react';
import './communication.css';

const link = 'http://localhost:8080/api/footballTeams';
class ApiCommunication extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: "",
            data: ""
        };
        this.processRequest = this.processRequest.bind(this);
    }
    processRequest(e) {
        // See all football teams
        if (this._requestType.value == "GET") {
            console.log("Getting...")
            fetch(link, {
                method: "GET",
                mode: "cors",
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ message: JSON.stringify(data.message), data: JSON.stringify(data.data) });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // Add a student
        else if (this._requestType.value == "POST") {
            let body = {
                name: this._name.value,
                league: this._league.value,
                location: this._location.value,
                bestPlayer: this._bestPlayer.value
            }
            console.log("Here comes the body");
            console.log(JSON.stringify(body));
            fetch(link, {
                method: "POST",
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(body)
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ message: JSON.stringify(data.message), data: JSON.stringify(data.data) });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // See specific student
        else if (this._requestType.value == "GETVal") {
            fetch(link + "/" + this._id.value, {
                method: "GET"
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ message: JSON.stringify(data.message), data: JSON.stringify(data.data) });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // Edit student
        else if (this._requestType.value == "PUT") {
            let body = {
                name: this._name.value,
                league: this._league.value,
                location: this._location.value,
                bestPlayer: this._bestPlayer.value
            }
            console.log(body)
            fetch(link + "/" + this._id.value, {
                method: "PUT",
                headers: new Headers({
                    'Content-Type': 'application/json'
                }),
                body: JSON.stringify(body),
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ message: JSON.stringify(data.message), data: JSON.stringify(data.data) });
                })
                .catch((err) => {
                    console.log(err);
                });
        }
        // Delete student
        else if (this._requestType.value == "DELETE") {
            fetch(link + "/" + this._id.value, {
                method: "DELETE"
            })
                .then((response) => response.json())
                .then((data) => {
                    console.log(data);
                    this.setState({ message: JSON.stringify(data.message), data: JSON.stringify(data.data) });
                })
                .catch((err) => {
                    console.log(err);
                });
        }

        e.preventDefault(); // Prevent page reload
    }

    render() {
        console.log("Rendering ApiCommunication");
        return (
            <div className="apiCommunicationMain">
                <div className="header">
                    <form onSubmit={this.processRequest}>
                        <div>
                            <select class="form-select" ref={(a) => this._requestType = a}>
                                <option selected value="GET">See all football teams</option>
                                <option value="POST">Add football team</option>
                                <option value="GETVal">See specific football team</option>
                                <option value="PUT">Edit football team</option>
                                <option value="DELETE">Delete football team</option>
                            </select>
                        </div>
                        <br></br>
                        <br></br>
                        <div className="input">
                            <span className="input-text">Football team identification number</span>
                            <br></br>
                            <input className="input-field" ref={(text) => this._id = text} placeholder=""></input>
                        </div>
                        <br></br>
                        <div className="input">
                            <span className="input-text">Football team name</span>
                            <br></br>
                            <input className="input-field" ref={(text) => this._name = text} placeholder=""></input>
                        </div>
                        <br></br>
                        <div className="input">
                            <span className="input-text">League</span>
                            <br></br>
                            <input className="input-field" ref={(text) => this._league = text} placeholder=""></input>
                        </div>
                        <br></br>
                        <div className="input">
                            <span className="input-text">Location</span>
                            <br></br>
                            <input className="input-field" ref={(text) => this._location = text} placeholder=""></input>
                        </div>
                        <br></br>
                        <div className="input">
                            <span className="input-text">Best player</span>
                            <br></br>
                            <input className="input-field" ref={(text) => this._bestPlayer = text} placeholder=""></input>
                        </div>
                        <br></br>
                        <button class="button" type="submit">Process Request</button>
                        <br></br>
                        <br></br>
                    </form>
                </div>
                <div>
                    <GetStatus response={this.state} />
                </div>
            </div>
        );
    }
}

class GetStatus extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        var { message, data } = this.props.response;

        message = (message) ? message : "";
        data = (data) ? data : "";

        return (
            <div className="requestStatus">
                <b>Message: {message}</b>
                <br></br>
                <b>Data: {data}</b>
            </div>
        );
    }
};

export default ApiCommunication;