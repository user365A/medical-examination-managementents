import React from "react";
import { withRouter } from "react-router-dom/cjs/react-router-dom";


import "./create_patient.css";
import { handleCreatePatient } from "./services/patient.service";
class CreatePatient extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            namePatient: "",
            address: "",
            numberPhone: "",
            birthday: "",
            nameAccount: "",
            password: "",
            healthStatus: ""
        }
    }

    componentDidMount() {

    }

    componentDidUpdate() {

    }


    handleOnchangText = (event, id) => {
        let stateCopy = { ...this.state };
        stateCopy[id] = event.target.value;
        this.setState({
            ...stateCopy
        })
    }

    handleAddPatient = async () => {
        let { namePatient, address, numberPhone, birthday, nameAccount, password, healthStatus } = this.state;
        let data = {
            TENBN: namePatient,
            DIACHI: address,
            SODT: numberPhone,
            NGAYSINH: birthday,
            TinhTrangSucKhoe: healthStatus,
            TENTAIKHOAN: nameAccount,
            MATKHAU: password
        }
        let response = await handleCreatePatient(data);
        if (response) {
            alert("Bạn đã tạo tài khoản thành công :)");
            this.setState({
                namePatient: "",
                address: "",
                numberPhone: "",
                birthday: "",
                nameAccount: "",
                password: "",
                healthStatus: ""
            });
            let idPatient = response.data.data.MSBN;
            this.props.history.push(`/schedule/${idPatient}`);
        }
        else {
            alert("Bạn đã tạo tài khoản thất bại :(");
        }
    }

    render() {
        return (
            <>
                <div className="create_patient ">
                    <p className="title">Đăng ký khám bệnh</p>
                    <form>
                        <div className="row">
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputEmail1" className="">Tên của bạn</label>
                                <input type="text" onChange={(event) => { this.handleOnchangText(event, 'namePatient') }} value={this.state.namePatient} className="form-control" id="exampleInputEmail1" placeholder="Tên của bạn" />
                            </div>
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Địa chỉ</label>
                                <input type="text" onChange={(event) => { this.handleOnchangText(event, 'address') }} value={this.state.address} placeholder="Địa chỉ" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Số điện thoại</label>
                                <input type="text" onChange={(event) => { this.handleOnchangText(event, 'numberPhone') }} value={this.state.numberPhone} placeholder="Số điện thoại" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Ngày sinh</label>
                                <input type="date" onChange={(event) => { this.handleOnchangText(event, 'birthday') }} value={this.state.birthday} placeholder="Ngày sinh" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Tên tài khoản</label>
                                <input type="text" onChange={(event) => { this.handleOnchangText(event, 'nameAccount') }} value={this.state.nameAccount} placeholder="Tên tài khoản" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Mật khẩu</label>
                                <input type="text" onChange={(event) => { this.handleOnchangText(event, 'password') }} value={this.state.password} placeholder="Mật khẩu" className="form-control" id="exampleInputPassword1" />
                            </div>
                            <div className="mb-3 col-lg-3">
                                <label htmlFor="exampleInputPassword1" className="form-label">Tình trạng sức khỏe</label>
                                <textarea rows="4" onChange={(event) => { this.handleOnchangText(event, 'healthStatus') }} value={this.state.healthStatus} cols="50" type="text" placeholder="Tình trạng sức khỏe" className="form-control" id="exampleInputPassword1" />
                            </div>
                        </div>
                        <button type="button" className="btn btn-primary" onClick={() => this.handleAddPatient()}>Đăng ký</button>
                    </form>
                </div>
            </>
        )
    }
}



//dung state cua redux
export default withRouter(CreatePatient);
// export default withRouter(Doctor) ;