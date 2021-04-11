
// *********************************input fields *************************
const login_input=[
    {
        "label":"Email Address",
        "name":"email_id",
        "id":"email_id",
        "type":"email",
        "error":"email_error",
        "key":4
    },
    {
        "label":"Password",
        "name":"password",
        "id":"password",
        "type":"password",
        "error":"pass_error",
        "key":5
    }

];

const register_input=[
    {
        "label":"Full Name",
        "name":"uname",
        "id":"uname",
        "type":"text",
        "error":"name_error",
        "key":1
    },
    {
        "label":"Contact",
        "name":"phone",
        "id":"phone",
        "type":"tel",
        "error":"contact_error",
        "key":2
    },
    {
        "label":"Serial Key",
        "name":"serial_key",
        "id":"serial_key",
        "type":"text",
        "error":"serial_key_error",
        "key":3
    },

    ...login_input,
    {
        "label":"Confirm Password",
        "name":"cpassword",
        "id":"cpassword",
        "type":"password",
        "error":"cpass_error",
        "key":6
    }
];


export default register_input;
export {login_input};