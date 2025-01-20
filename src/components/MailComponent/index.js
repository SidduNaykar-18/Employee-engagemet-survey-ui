import React, { useEffect, useRef } from "react";
import axios from "axios";
import { useSelector } from "react-redux";

const MailComponent = () => {
  const surveyData = useSelector((state) => state.surveyData);
  const emailSentRef = useRef(false);

  // useEffect(() => {
  //   if (surveyData && !emailSentRef.current) {
  //     sendEmail();
  //     emailSentRef.current = true;
  //   }
  // }, [surveyData]);

  const sendEmail = async () => {
    const htmlContent = `
      <!DOCTYPE html>
      <html>
        <head>
          <style>
            body {
              font-family: Arial, sans-serif;
              color: #333;
              padding: 20px;
              margin: 0;
              text-align: left;
              border-radius: 15px;
            }
            h3 {
              color: #2c3e50;
            }
            .survey-section {
              background-color: #ffffff;
              border: 1px solid #ccc;
              margin-bottom: 20px;
              padding: 15px;
              border-radius: 8px;
            }
            .survey-question {
              font-size: 16px;
              font-weight: bold;
              color: #2c3e50;
              margin-top: 10px;
            }
            .survey-answer {
              font-size: 14px;
              color: #7f8c8d;
              margin-top: 5px;
              padding: 5px;
              border-radius: 5px;
              background-color: #dff0d8;
            }
            .survey-answer-no-answer {
              font-style: italic;
              color: #e74c3c;
              background-color: #dff0d8;
            }
             .logo {
             text-align: center; /* Center align the logo */
             margin: 20px 0; /* Add some spacing around the logo */
              }
          </style>
        </head>
        <body>
     <div class="logo">
</div>
         <p>Dear Deepvatika,</p>
          <p>We hope this message finds you well</P>
          <p>An employee has successfully completed the anonymous employee engagement survey.</p>
          <p>Please find the detailed survey results for your review</p>
          ${Object?.entries(surveyData)
            .map(
              ([section, questions]) => `
              <div class="survey-section">
                <h3>${section.replace(/([A-Z])/g, " $1")}</h3>
                ${Object.entries(questions)
                  .map(
                    ([key, value]) => `
                    <div class="survey-question">${key}:</div>
                    <div class="survey-answer">${
                      value || "No answer provided"
                    }</div>
                  `
                  )
                  .join("")}
              </div>
            `
            )
            .join("")}
          <p>Thanks,<br />Best regards,</p>
        </body>
      </html>
    `;

    try {
      const response = await axios.post(
        "https://api.brevo.com/v3/smtp/email",
        {
          sender: {
            name: "Innovatily",
            email: "EE-survey@innovatily.com",
          },
          to: [
            {
              email: "siddappa.n@innovatily.com",
              name: "Siddappa",
            },
          ],
          subject: "Employee Engagement Survey Results",
          htmlContent: htmlContent,
        },
        {
          headers: {
            accept: "application/json",
            "api-key":
              "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",
            "content-type": "application/json",
          },
        }
      );
      console.log("Email sent successfully:", response.data);
    } catch (error) {
      console.error(
        "Error sending email:",
        error.response?.data || error.message
      );
    }
  };

  return <div></div>;
};

export default MailComponent;
