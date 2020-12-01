const axios = require('axios')

const obj = {
    email: "kelsey.bathurst@gmail.com",
    firstName: "Kelsey",
    lastName: "Whatever your last name is",
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
        data: {
            personalizations: [
                {
                to: [{ email: obj.email, name: (obj.firstName + ' ' + obj.lastName) }],
                dynamic_template_data: {
                given_name: obj.firstName,
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
