import config from '../configs/connectDB';
const crypto = require('crypto');
import sql from 'mssql';
import emailservice from "../services/sendEmail";

let buildUrlEmail = (token) => {
    let result = `http://localhost:3000/verify-booking?token=${token}`;
    return result;

}


let getAllDoctor = async (req, res) => {
    sql.connect(config, (err) => {
        if (err) {
            console.error('Lỗi kết nối đến SQL Server:', err);
            return;
        }

        const request = new sql.Request();
        request.query('select * from BACSI', (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err);
                return;
            }
            // return res.status(200).json({ data: result.recordset });
            return res.status(200).json({
                errCode: 0,
                message: "Get success!",
                data: result.recordset
            });
        });
    });
};


let createPatient = async (req, res) => {
    let { TENBN, DIACHI, SODT, NGAYSINH, TinhTrangSucKhoe, TENTAIKHOAN, MATKHAU } = req.body;
    let UUid = crypto.randomUUID();
    let MSBN = UUid.toString();
    if (!MSBN || !TENBN || !DIACHI || !SODT) {
        return res.status(200).json({
            message: 'missing required params'
        });
    } else {
        sql.connect(config, (err) => {
            if (err) {
                console.error('Lỗi kết nối đến SQL Server:', err);
                return;
            }
            const request = new sql.Request();
            request.input('MSBN', MSBN);
            request.input('TENBN', TENBN);
            request.input('DIACHI', DIACHI);
            request.input('SODT', SODT);
            request.input('NGAYSINH', NGAYSINH);
            request.input('TinhTrangSucKhoe', TinhTrangSucKhoe);
            request.input('TENTAIKHOAN', TENTAIKHOAN);
            request.input('MATKHAU', MATKHAU);

            request.query('insert into BENHNHAN(MSBN, TENBN, DIACHI, SODT, NGAYSINH, TinhTrangSucKhoe, TENTAIKHOAN, MATKHAU) values (@MSBN, @TENBN, @DIACHI, @SODT, @NGAYSINH, @TinhTrangSucKhoe, @TENTAIKHOAN, @MATKHAU)', async (err, result) => {
                if (err) {
                    console.error('Lỗi truy vấn SQL:', err);
                    return;
                }
                else {
                    request.query('select MSBN from BENHNHAN where MSBN=@MSBN', (err, result) => {
                        if (err) {
                            console.error('Lỗi truy vấn SQL:', err);
                            return;
                        } else {
                            if (result.recordset.length === 0) {
                                return res.status(404).json({ message: 'No records found' });
                            } else {
                                const responseObject = { data: result.recordset[0] }; // Wrap the result in an object
                                return res.status(200).json(responseObject);
                            }
                        }
                    });
                }
            });
        });
    }
}


// let sendEmail = async (req, res) => {
//     let { MSBS, MSBN, LichHen, Hinhthuc, Trangthai, emailPatient } = req.body;
//     if (!MSBS || !MSBN || !LichHen || !Hinhthuc || !Trangthai) {
//         return res.status(200).json({
//             message: 'missing required params'
//         });
//     } else {
//         const request = new sql.Request();
//         request.input('MSBS', MSBS);
//         // request.input('MSBN', MSBN);
//         // request.input('LichHen', LichHen);
//         // request.input('Hinhthuc', Hinhthuc);
//         // request.input('Trangthai', Trangthai);

//         try {
//             let UUid = crypto.randomUUID();
//             await emailservice.sendSimpleEmail({
//                 reciverEmail: recipientEmail,
//                 time: LichHen,
//                 redirectLink: buildUrlEmail(UUid)
//             });
//             return true; // Email sent successfully
//         } catch (emailError) {
//             console.error('Lỗi gửi email:', emailError);
//             return false; // Email sending failed
//         }



//         // sql.connect(config, (err) => {
//         //     if (err) {
//         //         console.error('Lỗi kết nối đến SQL Server:', err);
//         //         return;
//         //     }
//         //     const request = new sql.Request();
//         //     request.input('MSBS', MSBS);
//         //     request.input('MSBN', MSBN);
//         //     request.input('LichHen', LichHen);
//         //     request.input('Hinhthuc', Hinhthuc);
//         //     request.input('Trangthai', Trangthai);

//         //     request.query('insert into LICHHENKHAM(MSBS,MSBN,LichHen,Hinhthuc,Trangthai) values (@MSBS, @MSBN, @LichHen, @Hinhthuc, @Trangthai)', async (err, result) => {
//         //         if (err) {
//         //             console.error('Lỗi truy vấn SQL:', err);
//         //             return;
//         //         }
//         //         else {
//         //             try {
//         //                 let UUid = crypto.randomUUID();
//         //                 await emailservice.sendSimpleEmail({
//         //                     reciverEmail: recipientEmail,
//         //                     time: LichHen,
//         //                     redirectLink: buildUrlEmail(UUid)
//         //                 });
//         //                 return true; // Email sent successfully
//         //             } catch (emailError) {
//         //                 console.error('Lỗi gửi email:', emailError);
//         //                 return false; // Email sending failed
//         //             }
//         //         }
//         //     });
//         // });
//     }
// }



let createSchedule = async (req, res) => {
    let { MSBS, MSBN, LichHen, Hinhthuc, Trangthai, emailPatient } = req.body;
    if (!MSBS || !MSBN || !LichHen || !Hinhthuc || !Trangthai) {
        return res.status(200).json({
            message: 'missing required params'
        });
    } else {
        sql.connect(config, async (err) => {
            if (err) {
                console.error('Lỗi kết nối đến SQL Server:', err);
                return;
            }
            const request = new sql.Request();
            request.input('MSBS', MSBS);
            request.input('MSBN', MSBN);
            request.input('LichHen', LichHen);
            request.input('Hinhthuc', Hinhthuc);
            request.input('Trangthai', Trangthai);

            try {
                const emailResult = await sendEmail(emailPatient, LichHen);
                if (emailResult) {
                    // Email sent successfully, now execute the database query
                    request.query('insert into LICHHENKHAM(MSBS,MSBN,LichHen,Hinhthuc,Trangthai) values (@MSBS, @MSBN, @LichHen, @Hinhthuc, @Trangthai)', async (err, result) => {
                        if (err) {
                            console.error('Lỗi truy vấn SQL:', err);
                            return;
                        } else {
                            return res.status(200).json({
                                errCode: 0,
                                message: "Create success!"
                            });
                        }
                    });
                }
            } catch (emailError) {
                console.error('Lỗi gửi email:', emailError);
                return res.status(500).json({
                    errCode: 1,
                    message: "Error sending email"
                });
            }
        });
    }
}

let sendEmail = async (recipientEmail, LichHen) => {
    try {
        let UUid = crypto.randomUUID();
        await emailservice.sendSimpleEmail({
            reciverEmail: recipientEmail,
            time: LichHen,
            redirectLink: buildUrlEmail(UUid)
        });
        return true; // Email sent successfully
    } catch (emailError) {
        console.error('Lỗi gửi email:', emailError);
        return false; // Email sending failed
    }
}

let getAllSchedule = async (req, res) => {
    let { MSBS } = req.body;
    sql.connect(config, (err) => {
        if (err) {
            console.error('Lỗi kết nối đến SQL Server:', err);
            return;
        }

        const request = new sql.Request();
        request.input('MSBS', MSBS);
        request.query('SELECT TENBN,LICHHENKHAM.MSBN, LichHen,Hinhthuc,Trangthai FROM LICHHENKHAM INNER JOIN BENHNHAN ON LICHHENKHAM.MSBN = BENHNHAN.MSBN and LICHHENKHAM.MSBS=@MSBS', (err, result) => {
            if (err) {
                console.error('Lỗi truy vấn SQL:', err);
                return;
            }
            else {
                return res.status(200).json({
                    errCode: 0,
                    message: "Get success!",
                    data: result.recordset
                });
            }
        });
    });
}

let updateSchedule = async (req, res) => {
    let { MSBS, MSBN, Trangthai } = req.body;
    if (!MSBS || !MSBN || !Trangthai) {
        return res.status(200).json({
            message: 'Missing required params'
        });
    } else {
        sql.connect(config, (err) => {
            if (err) {
                console.error('Lỗi kết nối đến SQL Server:', err);
                return;
            }
            const request = new sql.Request();
            request.input('MSBS', MSBS);
            request.input('MSBN', MSBN);
            request.input('Trangthai', Trangthai);

            // Use the correct syntax for the UPDATE statement
            request.query('UPDATE LICHHENKHAM SET Trangthai = @Trangthai WHERE MSBS = @MSBS AND MSBN = @MSBN', (err, result) => {
                if (err) {
                    console.error('Lỗi truy vấn SQL:', err);
                    return;
                }
                return res.status(200).json({
                    errCode: 0,
                    message: "Update success!"
                });
            });
        });
    }
}


// let updatePatient = async (req, res) => {
//     let { firstName, lastName, email, address, id } = req.body;
//     if (!firstName || !lastName || !email || !address || !id) {
//         return res.status(200).json({
//             message: 'missing required params'
//         })
//     }

//     await pool.execute('update users set firstName= ?, lastName = ? , email = ? , address= ? where id = ?',
//         [firstName, lastName, email, address, id]);

//     return res.status(200).json({
//         message: 'ok'
//     })
// }

// let deletePatient = async (req, res) => {
//     let userId = req.params.id;
//     if (!userId) {
//         return res.status(200).json({
//             message: 'missing required params'
//         })
//     }
//     await pool.execute('delete from users where id = ?', [userId])
//     return res.status(200).json({
//         message: 'ok'
//     })
// }





module.exports = {
    getAllDoctor, createPatient, createSchedule, updateSchedule, getAllSchedule
}
