import Image from "next/image";

export default function LandingPage() {
  return (
    <main
      style={{
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding: "48px 24px",
        backgroundColor: "#f5f5f7",
        fontFamily:
          '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Helvetica, Arial, sans-serif',
        position: "relative",
      }}
    >
      {/* ===== Hero Section ===== */}
      <section
        style={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          maxWidth: "640px",
          width: "100%",
          paddingTop: "40px",
        }}
      >
        {/* Logo */}
        <div style={{ marginBottom: "40px" }}>
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
            margin: "0 0 32px 0",
            maxWidth: "520px",
          }}
        >
          Engineered for clarity, durability, and ergonomic precision.
          <br />
          The new standard in dental instruments is coming.
        </p>

        {/* View Products Button */}
        <a
          href="/products"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "8px",
            padding: "14px 32px",
            borderRadius: "9999px",
            border: "none",
            backgroundColor: "#1d1d1f",
            color: "#ffffff",
            fontSize: "1rem",
            fontWeight: 500,
            cursor: "pointer",
            textDecoration: "none",
            whiteSpace: "nowrap",
            marginBottom: "40px",
            transition: "opacity 0.2s ease",
          }}
        >
          View Products →
        </a>

        {/* Email subscribe form — mailto approach */}
        <form
          action="mailto:info@dentasage.com"
          method="POST"
          encType="text/plain"
          style={{
            display: "flex",
            gap: "8px",
            width: "100%",
            maxWidth: "440px",
            marginBottom: "24px",
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
              backgroundColor: "#0071e3",
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
          <div style={{ display: "flex", alignItems: "center", gap: "16px", flexWrap: "wrap", justifyContent: "center" }}>
            <a
              href="mailto:info@dentasage.com"
              style={{ color: "#8e8e93", textDecoration: "none" }}
            >
              info@dentasage.com
            </a>
            <span style={{ color: "#d2d2d7" }}>|</span>
            <a
              href="https://wa.me/message/KRVM27CKATS7B1"
              style={{ color: "#8e8e93", textDecoration: "none" }}
            >
              WhatsApp
            </a>
            <span style={{ color: "#d2d2d7" }}>|</span>
            <span>www.dentasage.com</span>
          </div>
        </div>
      </section>

      {/* ===== Product Preview Section ===== */}
      <section
        style={{
          width: "100%",
          maxWidth: "960px",
          marginTop: "80px",
          padding: "0 0 20px 0",
        }}
      >
        {/* Section title */}
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <p
            style={{
              fontSize: "0.8125rem",
              fontWeight: 600,
              textTransform: "uppercase" as const,
              letterSpacing: "0.15em",
              color: "#8e8e93",
              margin: "0 0 8px 0",
            }}
          >
            DENTASAGE Collection
          </p>
          <h2
            style={{
              fontSize: "clamp(1.75rem, 3vw, 2.5rem)",
              fontWeight: 600,
              letterSpacing: "-0.02em",
              color: "#1d1d1f",
              margin: 0,
            }}
          >
            Four colors. One standard.
          </h2>
        </div>

        {/* Color grid — 4 product images */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(2, 1fr)",
            gap: "16px",
            maxWidth: "640px",
            margin: "0 auto",
          }}
        >
          {[
            { img: "/images/generated/product-grey-card.jpg", name: "Surgical Grey", hex: "#8a8d91" },
            { img: "/images/generated/hero-product-black.jpg", name: "Matte Black", hex: "#1c1c1e" },
            { img: "/images/generated/hero-product-orange.jpg", name: "Signal Orange", hex: "#f97316" },
            { img: "/images/generated/hero-product-pink.jpg", name: "Magenta Pink", hex: "#d946ef" },
          ].map((color) => (
            <a
              key={color.img}
              href="/products/dentasage-sharp-mirror"
              style={{
                display: "block",
                borderRadius: "20px",
                overflow: "hidden",
                backgroundColor: "#ffffff",
                border: "1px solid #e8e8ed",
                textDecoration: "none",
                transition: "transform 0.2s ease, box-shadow 0.2s ease",
              }}
            >
              <div
                style={{
                  aspectRatio: "1 / 1",
                  width: "100%",
                  backgroundColor: "#fafafa",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  overflow: "hidden",
                }}
              >
                <Image
                  src={color.img}
                  alt={`DENTASAGE Sharp Mirror — ${color.name}`}
                  width={300}
                  height={300}
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "contain",
                  }}
                />
              </div>
              <div
                style={{
                  padding: "16px 20px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                  <span
                    style={{
                      width: "14px",
                      height: "14px",
                      borderRadius: "50%",
                      backgroundColor: color.hex,
                      border: "1px solid rgba(0,0,0,0.1)",
                      display: "inline-block",
                    }}
                  />
                  <span
                    style={{
                      fontSize: "0.9375rem",
                      fontWeight: 500,
                      color: "#1d1d1f",
                    }}
                  >
                    {color.name}
                  </span>
                </div>
                <span style={{ fontSize: "0.875rem", color: "#8e8e93" }}>→</span>
              </div>
            </a>
          ))}
        </div>

        {/* View all products link */}
        <div style={{ textAlign: "center", marginTop: "32px" }}>
          <a
            href="/products"
            style={{
              fontSize: "0.9375rem",
              color: "#0071e3",
              textDecoration: "none",
              fontWeight: 400,
            }}
          >
            View all products →
          </a>
        </div>
      </section>

      {/* ===== Footer ===== */}
      <footer
        style={{
          width: "100%",
          textAlign: "center",
          paddingTop: "48px",
          paddingBottom: "24px",
          marginTop: "40px",
        }}
      >
        <p style={{ fontSize: "0.75rem", color: "#8e8e93", margin: 0 }}>
          &copy; {new Date().getFullYear()} DENTASAGE. All rights reserved.
        </p>
      </footer>
    </main>
  );
}
