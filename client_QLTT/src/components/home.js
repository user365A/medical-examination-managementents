import React from "react";
import "./home.css";
class HomeComponent extends React.Component {
    componentDidMount() {
        this.changeColorPeriodically();
    }

    changeColorPeriodically() {
        setInterval(() => {
            this.setState({ color: this.getRandomColor() });
        }, 2000); 
    }
    getRandomColor() {
        var letters = '0123456789ABCDEF';
        var color = '#';
        for (var i = 0; i < 6; i++) {
            color += letters[Math.floor(Math.random() * 16)];
        }
        return color;
    }




    render() {
        return (
            <>
                <div className="home_component">
                    <h1 className="title" style={{ color: this.getRandomColor() }}>Chào mọi người</h1>
                    <div className="pyro">
                        <div className="before"></div>
                        <div className="after"></div>
                    </div>
                    {/* <h1>co chnag</h1> */}
                </div>
            </>
        )
    }
}

// const mapStateToProps = (state) => {
// }

// const mapDispatchToProps = (dispatch) => {
//     return {

//     }
// }

//dung state cua redux
export default HomeComponent;
// export default withRouter(Doctor) ;