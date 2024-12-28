const { NetlifyEmail } = require("@netlify/emails");

exports.handler = async function (event, context) {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: "Method Not Allowed",
    };
  }

  try {
    const { template, to, subject, data } = JSON.parse(event.body);

    if (!template || !to) {
      return {
        statusCode: 400,
        body: JSON.stringify({
          error: "Missing required fields: template, to",
        }),
      };
    }

    const email = new NetlifyEmail({
      directory: process.env.NETLIFY_EMAILS_DIRECTORY,
      secret: process.env.NETLIFY_EMAILS_SECRET,
    });

    // Handle different email templates
    let emailSubject;
    switch (template) {
      case "welcome":
        emailSubject = subject || "Welcome to A-A-RONS Florida Solar LLC";
        break;
      case "quote-request":
        emailSubject = subject ||
          "New Quote Request - A-A-RONS Florida Solar LLC";
        break;
      default:
        emailSubject = subject || "Message from A-A-RONS Florida Solar LLC";
    }

    await email.send({
      template: template,
      to: to,
      subject: emailSubject,
      parameters: data || {}, // Template parameters for variable substitution
    });

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Email sent successfully!",
        template: template,
        to: to,
      }),
    };
  } catch (error) {
    console.error("Email sending error:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({ error: error.message }),
    };
  }
};
