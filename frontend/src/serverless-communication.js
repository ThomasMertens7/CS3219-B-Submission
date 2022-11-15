import { React,  Component } from "react";

var link = "https://asia-southeast1-poetic-planet-368412.cloudfunctions.net/function-1";

class ServerlessCommunication extends Component {
    constructor(props) {
        super(props);

        this.state = { sumValue: null, avg: null };

        this.processRequest = this.processRequest.bind(this);
    }

    processRequest(e) {


        fetch(link, {
            method: "GET",
        })
            .then((response) => response.json())
            .then((data) => {
                console.log(data.data);
                var sum = 0;
                var index = 0;
                for (var key in data.data) {
                    if (index < this._amount.value) {
                        sum += parseFloat(data.data[key]);
                        index++;
                    }
                    
                }
                console.log(sum);
                console.log((sum/parseFloat(this._amount.value)))

                this.setState( {sumValue: sum, avg: (sum/parseFloat(this._amount.value))} );
            })
            .catch((err) => {
                console.log(err);
            });

        e.preventDefault(); // Prevent page reload
    }

    render() {
        var { sumValue, avg } = this.state;

        sumValue = (sumValue) ? sumValue + " billion euros" : "";
        avg = (avg) ? avg + " billion euros" : "";

        return (
            <div className="serverlessInteractionMain">
                <div className="header">
                    <form onSubmit={this.processRequest}>
                        <div class="input-group mb-3">
                            <span class="input-group-text">Input value x  </span>
                            <br></br>
                            <input ref={(a) => this._amount = a} ></input>
                        </div>
                        <br></br>
                        <button class="button" type="submit">Get total value of x most valuable clubs and their average value </button>
                        <br></br>
                        <br></br>
                    </form>
                </div>
                <div className="result">
                    <b>Total value: {sumValue}</b>
                    <br></br>
                    <b>Average value: {avg}</b>
                </div>
            </div>
        );
    }
}

export default ServerlessCommunication;