import { Facebook, Instagram, Mail, MapPin, Phone } from "lucide-react"

const data = {
  facebookLink: "https://facebook.com/Sanaullah.pathan.322304",
  instaLink: "https://instagram.com/sp__mobile_ ",
  contact: {
    email: "info@spmobile.com",
    phone: "7096813110",
    address: "SP Mobile, Apple Plaza, Ankleswer",
  },
  company: {
    name: "SP Mobile",
    description:
      "Your trusted mobile shop for brand new smartphones, certified second-hand devices, and all mobile accessories at unbeatable prices.",
  },
}

const socialLinks = [
  { icon: Facebook, label: "Facebook", href: data.facebookLink },
  { icon: Instagram, label: "Instagram", href: data.instaLink },
]

const contactInfo = [
  { icon: Mail, text: data.contact.email },
  { icon: Phone, text: data.contact.phone },
  { icon: MapPin, text: data.contact.address, isAddress: true },
]

export default function Footer() {
  return (
    <>
      <style>{`
        .simple-footer {
          background: #0f172a;
          color: #fff;
          padding: 50px 20px 20px;
          text-align: center;
        }

        .footer-top {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 20px;
          margin-bottom: 30px;
        }

        .footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          font-size: 20px;
          font-weight: 600;
          text-transform: uppercase;
        }

        .footer-links {
          display: flex;
          flex-wrap: wrap;
          justify-content: center;
          gap: 30px;
          font-size: 15px;
          font-weight: 500;
        }

        .footer-links a {
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .footer-links a:hover {
          color: #38bdf8;
        }

        .social-links {
          display: flex;
          justify-content: center;
          gap: 15px;
          margin-top: 10px;
        }

        .social-link {
          color: #aaa;
          transition: color 0.3s ease;
        }

        .social-link:hover {
          color: #38bdf8;
        }

        .footer-bottom {
          border-top: 1px solid #1e293b;
          margin-top: 20px;
          padding-top: 20px;
          font-size: 14px;
          color: #aaa;
        }

        @media (max-width: 600px) {
          .footer-links {
            flex-direction: column;
            gap: 15px;
          }
        }
      `}</style>

      <footer className="simple-footer">
        <div className="footer-top">
          <div className="footer-brand">
            <span>{data.company.name}</span>
          </div>

         

          <div className="social-links">
            {socialLinks.map(({ icon: Icon, label, href }) => (
              <a key={label} href={href} className="social-link" aria-label={label}>
                <Icon size={20} />
              </a>
            ))}
          </div>
        </div>

        <div className="footer-bottom">
          &copy; 2025 {data.company.name}. All rights reserved.
        </div>
      </footer>
    </>
  )
}
