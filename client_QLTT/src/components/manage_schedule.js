import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";
import "./manage_schedule.css";
import Select from 'react-select';
import { handleGetAllDoctor } from "./services/doctor.service";
import { handleGetScheduleByDoctor, handleChangeStatus } from "./services/schedule.service";
const form_examination = [
    { value: 'offline', label: 'Trực tiếp' },
    { value: 'online', label: 'Video call' },
];
class ManageSchedule extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            chooseDoctor: "",
            nameDoctor: "",
            listDoctor: [],
            listSchedule: []
        }
    }
    componentDidMount() {
        this.fectGetAllDoctor();
    }
    componentDidUpdate(prevProps, prevState, snapshot) {

    }

    fectGetAllDoctor = async () => {
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

    fetchGetScheduleByDoctor = async (data) => {
        let response = await handleGetScheduleByDoctor(data);
        if (response && response.data.errCode === 0) {
            this.setState({
                listSchedule: response.data.data
            })
        }
    }

    handGetScheduleDoctor = async (event) => {
        this.setState({
            chooseDoctor: event.value,
            nameDoctor: event.label
        });
        let data = {
            MSBS: event.value
        }
        this.fetchGetScheduleByDoctor(data);
    }

    changeStatus = async (item) => {
        let data = {
            MSBS: this.state.chooseDoctor,
            MSBN: item.MSBN,
            Trangthai: "Hoàn thành"
        }
        let nameDoctor = this.state.nameDoctor;
        let response = await handleChangeStatus(data);
        if (response && response.data.errCode === 0) {
            this.handGetScheduleDoctor({ value: this.state.chooseDoctor, label: nameDoctor });
        }
    }

    render() {
        let { listDoctor, chooseDoctor, nameDoctor, listSchedule } = this.state;
        return (
            <>
                <div className="manage_schedule container">
                    <div className="title">
                        Quản lý lịch khám bệnh
                    </div>
                    <div className="select_doctor">
                        <Select
                            placeholder="Chọn bác sĩ"
                            value={chooseDoctor}
                            onChange={this.handGetScheduleDoctor}
                            options={listDoctor}
                        />
                        <span>Bác sĩ : <b>{nameDoctor}</b></span>
                    </div>
                    <div className="list_schedule ">
                        {listSchedule.length ?
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col">Số thứ tự</th>
                                        <th scope="col">Tên bệnh nhân</th>
                                        <th scope="col">Lịch hẹn</th>
                                        <th scope="col">Hình thức khám</th>
                                        <th scope="col">Trạng thái</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listSchedule.map((item, index) => {
                                        return (
                                            <tr key={index}>
                                                <th scope="row">{index + 1}</th>
                                                <td>{item.TENBN}</td>
                                                <td>{item.LichHen}</td>
                                                <td>
                                                    {item.Hinhthuc === "offline" ?
                                                        <span className="form_examination-offline">{item.Hinhthuc}</span>
                                                        :
                                                        <span className="form_examination-online">{item.Hinhthuc}</span>
                                                    }
                                                </td>
                                                <td>
                                                    {item.Trangthai === 'Hoàn thành' ?
                                                        <span className="success">{item.Trangthai}</span>
                                                        :
                                                        <span className="not_success">{item.Trangthai}</span>
                                                    }
                                                </td>
                                                <td>
                                                    {item.Trangthai === 'Hoàn thành' ?
                                                        <>
                                                            <button type="button" className="btn btn-secondary" disabled>Hoàn thành</button>&ensp;
                                                        </>
                                                        :
                                                        <button type="button" className="btn btn-info" onClick={() => this.changeStatus(item)}>Thay đổi</button>
                                                    }
                                                </td>
                                            </tr>
                                        )
                                    })}
                                </tbody>
                            </table>
                            :
                            ''
                        }
                    </div>
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
export default withRouter(ManageSchedule);