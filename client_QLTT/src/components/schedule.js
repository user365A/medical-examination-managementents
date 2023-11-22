import React from "react";
import "./schedule.css";
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import moment from 'moment-timezone';
import { handleGetAllDoctor } from "./services/doctor.service";
import { handleCreateSchedule } from "./services/patient.service";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import Select from 'react-select';
import { connect } from 'react-redux';
const form_examination = [
    { value: 'offline', label: 'Trực tiếp' },
    { value: 'online', label: 'Video call' },
];
class ScheduleComponent extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            listDoctor: [],
            listTimeSchedule: ["07:00-08:00", "08:00-09:00", "09:00-10:00", "10:00-11:00", "13:00-14:00", "14:00-15:00", "15:00-16:00", "16:00-17:00"],
            date: new Date(),
            maxDate: new Date(),
            formattedDate: "",
            getTime: "",
            emailPatient: "",
            chooseDoctor: "",
            nameDoctor: "",
            chooseFormExamination: "",
            nameFormExamination: "",
            idPatient: "",
            dataVerify: ""

        }
    }

    async componentDidMount() {
        if (this.props.match.params.id) {
            this.setState({
                idPatient: this.props.match.params.id
            })
        }
        this.getAllDoctor();
    }
    async getAllDoctor() {
        let response = await handleGetAllDoctor();
        if (response && response.data.errCode === 0) {
            let doctorConver = [];
            response.data.data.map((item, index) => {
                let convert = {};
                convert.label = item.TENBS;
                convert.value = item.MSBS;
                doctorConver.push(convert)
            })
            this.setState({
                listDoctor: doctorConver
            })
        }
    }
    componentDidUpdate(prevProps, prevState, snapshot) {
        // if (this.props.data !== prevProps.data) {
        //     this.setState({
        //         dataVerify: prevProps.data
        //     })
        // }
    }

    handleGetDay = (date) => {
        let formatt = new Intl.DateTimeFormat('en-US', {
            timeZone: 'Asia/Ho_Chi_Minh',
            year: 'numeric',
            month: 'numeric',
            day: 'numeric',
        }).format(date);
        this.setState({ formattedDate: formatt });
    }

    getTime = (time) => {
        let timeCurent = this.state.formattedDate + ' ' + time;
        this.setState({
            getTime: timeCurent
        });
    }
    handleOnchangText = (event) => {
        let getEmail = event.target.value;
        this.setState({
            emailPatient: getEmail
        })
    }
    handleGetDoctor = (event) => {
        this.setState({
            chooseDoctor: event.value,
            nameDoctor: event.label
        })
    }
    handleGetFormExamination = (event) => {
        this.setState({
            chooseFormExamination: event.value,
            nameFormExamination: event.label
        })
    }


    AddSchedule = async () => {
        let { getTime, chooseDoctor, chooseFormExamination, idPatient, emailPatient } = this.state;
        let data = {
            MSBS: chooseDoctor,
            MSBN: idPatient,
            LichHen: getTime,
            Hinhthuc: chooseFormExamination,
            Trangthai: "Lên lịch",
            emailPatient: emailPatient
        }
        let response = await handleCreateSchedule(data);
        if (response) {
            alert("Vui lòng kiểm tra gmail của bạn!");
            this.props.history.push(`/create-patient`);
        }
        else {
            alert("Không thể đặt lịch, bạn hãy thử lại lần nữa")
        }

    }
    render() {
        let { listTimeSchedule, listDoctor, nameDoctor, nameFormExamination } = this.state;
        const { paramName } = this.props;
        return (
            <>
                <div className="schedule ">
                    <p className="title">Đặt lịch khám bệnh</p>
                    {/* <h1>{myStore.data}</h1> */}
                    <h1>{paramName}</h1>
                    <div className="row">

                        <div className="calendar col-lg-4">
                            <Calendar onChange={this.handleGetDay} value={this.state.date} minDate={this.state.maxDate} />
                        </div>
                        <div className="listDoctor col-lg-3">
                            <span>Chọn bác sĩ <b>{`: ${nameDoctor}`}</b></span>
                            <Select
                                placeholder="Chọn bác sĩ"
                                value={nameDoctor}
                                onChange={this.handleGetDoctor}
                                options={listDoctor}
                            />
                            <br></br>
                            <span>Chọn hình thức khám <b>{`: ${nameFormExamination}`}</b></span>
                            <Select
                                placeholder="Hình thức khám bệnh"
                                value={this.state.chooseFormExamination}
                                onChange={this.handleGetFormExamination}
                                options={form_examination}
                            />
                            <br></br>
                            <div className="mb-3">
                                <form>
                                    <label htmlFor="exampleInputPassword1" className="form-label">Nhập email xác nhận</label>
                                    <input type="email" onChange={(event) => { this.handleOnchangText(event) }} placeholder="Nhập email" className="form-control" id="exampleInputPassword1" />
                                </form>
                            </div>
                        </div>
                        <div className="listTime col-lg-5">
                            {listTimeSchedule.map((item, index) => {
                                return (
                                    <div className="item_time " key={index}>
                                        <button type="button" onClick={() => this.getTime(item)}>{item}</button>
                                    </div>
                                )
                            })}
                        </div>
                    </div>
                </div>
                <div className="submit">
                    <button type="button" className="submit" onClick={() => this.AddSchedule()}>okok</button>
                </div>
            </>
        )
    }
}



//dung state cua redux
export default withRouter((ScheduleComponent));