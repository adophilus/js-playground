import { Navbar } from "./components/navbar"
import { Banner } from "./components/pages/home/banner"
import { Faqs } from "./components/pages/home/faqs"
import { Features } from "./components/pages/home/features"
import { Footer } from "./components/pages/home/footer"
import { Hero } from "./components/pages/home/hero"

function App() {
  return (
    <>
      <Navbar />
      <Hero />
      <Features />
      <Banner />
      <Faqs />
      <Footer />
    </>
  )
}

export default App
