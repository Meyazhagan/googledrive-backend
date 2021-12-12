const nodemailer = require("nodemailer");

const construct_mail = (user, link, message) => {
    return {
        from: `${message.title} <${process.env.EMAIL_USERNAME}>`,
        to: user.email,
        cc: "",
        subject: message.subject,
        html: `<div><p>Dear ${user.firstName}</p><div style="padding-left: 1rem"><p>${message.heading}</p>
        <a style="text-decoration: none;background-color: royalblue;padding: 0.5rem 1rem;color: white;border-radius: 5px;" href="${link}">${message.action}</a>
        <a style="color: gray; word-break: break-all" href="${link}"><p>${link}</p></a>
        <p>${message.footer}</p></div></div>`,
    };
};

const sendEmail = ({ user, link, message }) => {
    const transporter = nodemailer.createTransport({
        service: process.env.EMAIL_SERVICE,
        auth: {
            user: process.env.EMAIL_USERNAME,
            pass: process.env.EMAIL_PASSWORD,
        },
    });
    const mailDetails = construct_mail(user, link, message);

    transporter.sendMail(mailDetails, function (err, data) {
        if (err) {
            console.log(err);
        } else {
            console.log(data?.response);
        }
    });
};

module.exports = sendEmail;
