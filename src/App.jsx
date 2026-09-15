import Navbar from './components/sections/Navbar'
import Hero from './components/sections/Hero'
import Problem from './components/sections/Problem'
import About from './components/sections/About'
import Plan from './components/sections/Plan'
import Products from './components/sections/Products'
import Stakes from './components/sections/Stakes'
import SuccessVision from './components/sections/SuccessVision'
import Testimonials from './components/sections/Testimonials'
import FinalCTA from './components/sections/FinalCTA'
import Footer from './components/sections/Footer'

/**
 * Root component — SB7 (StoryBrand 7) Framework
 *
 * Urutan section mengikuti narasi SB7 yang telah disempurnakan:
 *   1. Hero          — perkenalkan hero (pelanggan) + masalah + CTA awal
 *   2. Problem       — 3 lapis masalah (external, internal, philosophical)
 *   3. About/Guide   — brand sebagai pemandu: empati + otoritas terverifikasi
 *   4. Products      — katalog solusi konkret dengan benefit statement & harga
 *   5. Plan          — 3 langkah beli yang mudah (eliminasi friksi)
 *   6. Stakes        — konsekuensi jika tidak bertindak (urgensi)
 *   7. SuccessVision — gambaran hidup setelah pakai produk (transformasi)
 *   8. Testimonials  — social proof & metrik dampak (data simulasi terstruktur)
 *   9. FinalCTA      — ajakan terakhir sebelum keluar
 *  10. Footer        — kontak & identitas pengabdian masyarakat
 */
function App() {
  return (
    <div className="min-h-screen bg-bg-base font-sans text-text-main font-normal relative">
      <Navbar />
      <main>
        <Hero />
        <Problem />
        <About />
        <Products />
        <Plan />
        <Stakes />
        <SuccessVision />
        <Testimonials />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  )
}

export default App
