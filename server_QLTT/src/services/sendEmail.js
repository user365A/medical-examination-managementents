import nodemailer from "nodemailer";

let sendSimpleEmail = async (dataSend) => {
    const transporter = nodemailer.createTransport({
        host: "smtp.gmail.com",
        port: 465,
        secure: true,
        auth: {
            user: 'zukanopro2002@gmail.com',
            pass: 'qvjvfqxoharzdaxo',
        }
    });
    const info = await transporter.sendMail({
        from: '"Kha Ho 👻" <zukanopro2002@gmail.com>',
        to: dataSend.reciverEmail,
        subject: changeSubject(),
        html: getBodyHTMLEmail(dataSend),
    });
}

let changeSubject = () => {
    let result = 'Thông tin đặt lịch khám bệnh ✔';
    return result;
}

let getBodyHTMLEmail = (dataSend) => {
    let result = `
    <h3>Xin chào !</h3>
    <p>Bạn nhận được email thì đã đặt lịch khám bệnh online trên web KhaHo</p>
    <p>Thông tin đặt lịch khám bệnh:</p>
    <span>Thời gian:&emsp;<b>${dataSend.time}</b></span><br/>
    <div><b ><i style="color:#737574">Nếu thông tin trên là đúng sự thật, vui long click vào đường link này để xác nhận và hoàn tất thủ tục đặt lịch khám bệnh </i></b></div>
    <a href=${dataSend.redirectLink} target="_blank">Click here!</a>
    <div><span>Xin chân thành cảm ơn!</span></div>
    `
    return result;
}


module.exports = {
    sendSimpleEmail
}