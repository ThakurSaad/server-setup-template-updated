const signUpEmailTemp = (data) => `
<html>
  <head>
    <style>
      body {
        font-family: Arial, sans-serif;
        margin: 0;
        padding: 0;
        background-color: #f4f4f4;
      }
      .container {
        max-width: 600px;
        margin: 0 auto;
        padding: 20px;
        background-color: #ffffff;
        border-radius: 5px;
        box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
      }
      h1 {
        color: #333;
        font-size: 24px;
        margin-bottom: 10px;
      }
      p {
        color: #777;
        font-size: 16px;
        line-height: 1.5;
        margin-bottom: 10px;
      }
      .button {
        display: inline-block;
        padding: 10px 20px;
        background-color: #007bff;
        color: #fff;
        text-decoration: none;
        border-radius: 5px;
        font-size: 18px;
      }
      .button:hover {
        background-color: #0056b3;
      }
      a {
        color: #007bff;
        text-decoration: none;
      }
      a:hover {
        text-decoration: underline;
      }
    </style>
  </head>
  <body>
    <div class="container">
      <h1>Welcome to Car Rental</h1>
      <p>Hello ${data?.user},</p>
      <p>Thank you for registering with Car Rental. To activate your account, please use the following activation code:</p>
      <h1>${data?.activationCode}</h1>
      <p>Please enter this code on the activation page within the next ${data?.activationCodeExpire} minutes.</p>
      <p>If you have any questions, please contact us at <a href="mailto:thakursaad613@gmail.com">thakursaad613@gmail.com</a>.</p>
    </div>
  </body>
</html>
`;

module.exports = signUpEmailTemp;
