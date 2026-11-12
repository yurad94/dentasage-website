import Image from "next/image";

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "48px 24px",
        backgroundColor: "#f5f5f7",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: "relative",
      }}
    >
      {/* Content */}
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "640px",
          width: "100%",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "48px" }}>
          <Image
            src="/images/generated/logo-dentasage-light.png"
            alt="DENTASAGE"
            width={220}
            height={60}
            style={{ height: "48px", width: "auto" }}
            priority
          />
        </div>

        {/* Headline */}
        <h1
          style={{
            fontSize: "clamp(2.25rem, 5vw, 3.75rem)",
            fontWeight: 600,
            letterSpacing: "-0.025em",
            lineHeight: 1.1,
            color: "#1d1d1f",
            margin: "0 0 24px 0",
          }}
        >
          Precision Dental Mirrors
        </h1>

        {/* Subheadline */}
        <p
          style={{
            fontSize: "clamp(1.125rem, 2vw, 1.5rem)",
            lineHeight: 1.6,
            color: "#6e6e73",
            margin: "0 0 40px 0",
            maxWidth: "520px",
          }}
        >
          Engineered for clarity, durability, and ergonomic precision.
          <br />
          The new standard in dental instruments is coming.
        </p>

        {/* Email form */}
        <form
          action="https://formspree.io/f/your-form-id"
          method="POST"
          style={{
            display: "flex",
            gap: "8px",
            width: "100%",
            maxWidth: "440px",
            marginBottom: "32px",
          }}
        >
          <input
            type="email"
            name="email"
            required
            placeholder="Enter your email for early access"
            style={{
              flex: 1,
              padding: "14px 20px",
              borderRadius: "9999px",
              border: "1px solid #d2d2d7",
              backgroundColor: "#ffffff",
              fontSize: "0.9375rem",
              color: "#1d1d1f",
              outline: "none",
            }}
          />
          <button
            type="submit"
            style={{
              padding: "14px 24px",
              borderRadius: "9999px",
              border: "none",
              backgroundColor: "#1d1d1f",
              color: "#ffffff",
              fontSize: "0.9375rem",
              fontWeight: 500,
              cursor: "pointer",
              whiteSpace: "nowrap",
            }}
          >
            Notify Me
          </button>
        </form>

        {/* Contact info */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "8px",
            fontSize: "0.875rem",
            color: "#8e8e93",
            marginTop: "8px",
          }}
        >
          <div style={{ display: "flex", alignItems: "center", gap: "16px" }}>
            <a
              href="mailto:info@dentasage.com"
              style={{ color: "#8e8e93", textDecoration: "none" }}
            >
              info@dentasage.com
            </a>
            <span style={{ color: "#d2d2d7" }}>|</span>
            <a
              href="https://wa.me/0000000000"
              style={{ color: "#8e8e93", textDecoration: "none" }}
            >
              WhatsApp
            </a>
            <span style={{ color: "#d2d2d7" }}>|</span>
            <span>www.dentasage.com</span>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer
        style={{
          position: "absolute",
          bottom: "24px",
          left: 0,
          right: 0,
          textAlign: "center",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "#8e8e93", margin: 0 }}>
          &copy; {new Date().getFullYear()} DENTASAGE. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
