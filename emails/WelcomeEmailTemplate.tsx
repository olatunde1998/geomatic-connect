interface WelcomeEmailTemplateProps {
  firstName: string;
}
export default function WelcomeEmailTemplate({
  firstName,
}: WelcomeEmailTemplateProps) {
  return (
    <div
      style={{
        fontFamily: "Arial, sans-serif",
        lineHeight: "1.6",
        color: "#333",
        maxWidth: "600px",
        margin: "0 auto",
        padding: "20px",
      }}
    >
      {/* Header */}
      <div
        style={{
          padding: "15px",
          backgroundColor: "#388E3C",
          textAlign: "left",
        }}
      >
        <img
          src="https://res.cloudinary.com/dgfjxhoae/image/upload/v1743071454/geomatic-connect/geomatic-logo-white_zygulw.png"
          alt="Geomatic Connect"
          width="120"
          style={{ height: "auto" }}
        />
      </div>

      {/* Body */}
      <div
        style={{
          backgroundColor: "#f9f9f9",
          padding: "20px",
          borderRadius: "0 0 5px 5px",
          boxShadow: "0 2px 5px rgba(0,0,0,0.1)",
        }}
      >
        <h2 style={{ color: "#388E3C" }}>Email Verification</h2>
        <p>Hello {firstName},</p>
        <p>
          Thank you for creating your Geomatic Connect account. To complete your
          registration, please verify your email address using this code:
        </p>

        {/* Verification Code */}
        <div
          style={{
            textAlign: "center",
            margin: "25px 0",
          }}
        >
          <span
            style={{
              fontSize: "28px",
              fontWeight: "bold",
              letterSpacing: "5px",
              color: "#388E3C",
              padding: "10px 20px",
              borderRadius: "4px",
              display: "inline-block",
            }}
          >
            {/* {verificationCode} */}
          </span>
        </div>

        {/* Button */}
        <div
          style={{
            textAlign: "center",
            margin: "25px 0",
          }}
        >
          <a
            //   href={verificationLink}
            href="#"
            style={{
              background: "linear-gradient(to right, #4CAF50, #45a049)",
              color: "white",
              padding: "12px 24px",
              textDecoration: "none",
              borderRadius: "4px",
              fontWeight: "bold",
              fontSize: "18px",
              display: "inline-block",
            }}
          >
            Verify Email Address
          </a>
        </div>

        <p>This verification code will expire in 15 minutes.</p>
        <p>
          If you didn't create an account with Geomatic Connect, please ignore
          this email.
        </p>
        <p>
          Best regards,
          <br />
          The Geomatic Connect Team
        </p>
      </div>

      {/* Footer */}
      <div
        style={{
          textAlign: "center",
          marginTop: "20px",
          color: "#888",
          fontSize: "0.8em",
        }}
      >
        <p>
          This is an automated message from Geomatic Connect. Please do not
          reply to this email.
        </p>
        <p>&copy; 2025 Geomatic Connect. All rights reserved.</p>
      </div>
    </div>
  );
}
