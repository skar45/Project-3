//const request = require("request");
//import API from '../client/src/utils/API'
const axios = require('axios')

const obj = {
    email: "daileykaze@gmail.com",
    firstName: "Dailey",
    lastName: "Kaze",
    title: "Presentations",
    start: "2020-12-01 10:30",
    end: "2020-12-01 14:30"
}

const options = () => {
    axios({
      method: "POST",
      url: "https://api.sendgrid.com/v3/mail/send",
      headers: {
        "content-type": "application/json",
        authorization:
        "Bearer " + process.env.SENDGRID_API_KEY,
        },
        body: {
            personalizations: [
                {
                to: [{ email: obj.email, name: (obj.firstName + ' ' + obj.lastName) }],
                dynamic_template_data: {
                firstName: obj.firstName,
                title: obj.title,
                start: obj.start,
                end: obj.end,
                },
                subject: "Reminder!",
                },
            ],
            from: { email: "teamproducky@gmail.com", name: "Producky Team" },
            reply_to: { email: "teamproducky@gmail.com", name: "Producky Team" },
            template_id: "d-587a743d18654942b4d54c1e45def243",
        },
        json: true,
    })
};

options()
// request(options, function (error, response, body) {
//   if (error) throw new Error(error);

//   console.log(body);
// });
