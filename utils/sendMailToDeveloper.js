const sendMailer = require("./mail");

const developersMail = ["michele.gabri01@gmail.com", /*"albertopavarin05@gmail.com"*/];

const sendMailToDeveloper = async ({ body, object, html }) => {
    for (const developer of developersMail) {
        await sendMailer({
            from: process.env.MAIL,
            to: developer,
            subject: object,
            body: body,
            html: html ? html : `<p>${body}</p>`,
        });
    }
};

module.exports = sendMailToDeveloper;
