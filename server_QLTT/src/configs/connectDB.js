
const config = {
    // user: 'ADC\zuka', // Tên người dùng SQL Server
    // password: '', // Mật khẩu SQL Server
    // server: 'ADC', // Tên máy chủ SQL Server
    // database: 'QLKCB_2023', // Tên cơ sở dữ liệu SQL Server
    // // driver:"mssql",
    // driver: "msnodesqlv8",

    user: 'sa',
    password: 'khaho',
    server: 'ADC',
    port: 1433,
    database: 'QLKCB1_2023',
    stream: false,
    options: {
        trustedConnection: true,
        encrypt: true,
        enableArithAbort: true,
        trustServerCertificate: true,

    },
    requestTimeout: 0,
    connectionTimeout: 15000,
    debug: true,

};


export default config;