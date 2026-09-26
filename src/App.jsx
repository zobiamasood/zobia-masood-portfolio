import Hero from "./components/Hero"
import Navbar from "./components/Navbar"
import About from "./components/About"
import Skills from "./components/Skills"
import Projects from "./components/projects"
import BeyondCode from "./components/BeyondCode"
import Certificates from "./components/Certificates"
import PeerPath from "./components/PeerPath"
import VisitorTrace from "./components/VisitorTrace"
import Contacts from "./components/Contacts"
import Footer from "./components/Footer"
import { usePageAnimations } from "./Animation/animation"
import CustomCursor from "./components/CustomCursor"



function App() {
   usePageAnimations()

   return (
    <>
      <a href="#about" data-page-scroll-indicator aria-label="Scroll to about section">
        <span>Scroll</span>
        <span data-page-scroll-progress aria-hidden="true" />
        <span aria-hidden="true">↓</span>
      </a>
      <div className="site-shell">
      <CustomCursor />
      <Navbar />
      <Hero />
      <About />
      <Skills />
      <Projects />
      <BeyondCode />
      <PeerPath />
      <Certificates />
      <VisitorTrace />
      <Contacts />
      <Footer />
      </div>
    </>
  )
}

export default App