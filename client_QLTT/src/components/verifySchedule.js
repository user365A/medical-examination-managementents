import React from "react";
import "./verifySchedule.css";
import { connect } from 'react-redux';
import { updateMyVariable } from "./stores/action";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
class VerifySchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            dataVerify: "veryfy",
        };
    }

    componentDidMount() {

    }
    handVerify = () => {
        // this.props.veryfy(this.state.dataVerify);
        this.props.history.push(`/`);
    }

    render() {
        const { count, increment, decrement } = this.state;
        return (
            <>
                <div className="verifySchedule">
                    <h1>Bạn hãy nhấn xác nhận !</h1>
                    <button type="button" className="btn btn-info" onClick={() => this.handVerify()}>Xác nhận</button>
                </div>
            </>
        )
    }
}


//dung state cua redux
// export default withRouter(Doctor) ;

export default withRouter((VerifySchedule));