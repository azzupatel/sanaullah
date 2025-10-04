import Navbar from "@/components/navbar"
import MobileShopBanner from "@/components/mobile-shop-banner"
import Footer from "@/components/footer"
import { motion } from "framer-motion"


export default function Home() {
  return (
    <>
      <Navbar />
      <MobileShopBanner />
    
      <Footer />
    </>
  )
}
