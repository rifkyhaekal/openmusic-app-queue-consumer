const nodemailer = require('nodemailer');

class MailSender {
  constructor() {
    this._transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: process.env.MAIL_ADRESS,
        pass: process.env.MAIL_PASSWORD,
      },
    });
  }

  sendEmail(targetEmail, content) {
    const message = {
      from: 'OpenMusic App',
      to: targetEmail,
      subject: 'Ekspor Lagu Playlist',
      text: 'Terlampir hasil dari ekspor lagu pada playlist',
      attachments: [{ filename: 'playlistsongs.json', content }],
    };

    return this._transporter.sendMail(message);
  }
}

module.exports = MailSender;
