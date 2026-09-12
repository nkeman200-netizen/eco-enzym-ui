import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import About from './components/sections/About'
import Products from './components/sections/Products'
import Footer from './components/sections/Footer'

function App() {
  return (
    <div className="min-h-screen bg-bg-base font-sans text-text-main font-normal relative">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Products />
      </main>
      <Footer />
    </div>
  )
}

export default App
