const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'sandbox.smtp.mailtrap.io',
  port: 25,
  auth: {
    user: '',
    pass: ''
  }
});

module.exports = (srv) => {

  srv.before('CREATE', 'Spacefarers', async (req) => {
    const { stardustCollection, wormholeNavigationSkill, name } = req.data;

    if (stardustCollection == null || stardustCollection < 0) {
      req.error(400, 'Stardust collection must be a non-negative number.');
    }
    if (wormholeNavigationSkill == null || wormholeNavigationSkill < 0) {
      req.error(400, 'Wormhole navigation skill must be a non-negative number.');
    }

    req.data.stardustCollection = Math.max(stardustCollection, 100);
    req.data.wormholeNavigationSkill = Math.max(wormholeNavigationSkill, 80);
  });

  srv.after('CREATE', 'Spacefarers', async (created, req) => {
    try {
      const email = created.email || "test@ethereal.email";
      const name = created.name;

      const mailOptions = {
        from: '"Galactic HQ" <no-reply@galaxy.com>',
        to: email,
        subject: '🚀 Welcome to the Galactic Spacefarers!',
        text: `Dear ${name},

Congratulations on starting your adventurous journey among the stars!
May your stardust collection always be high and your wormhole navigation skills sharp.

Safe travels,
Galactic Adventure Command
`
      };

      await transporter.sendMail(mailOptions);
      console.log(`Notification sent to ${email}`);
    } catch (err) {
      console.error('Failed to send cosmic notification email:', err);
    }
  });
};
