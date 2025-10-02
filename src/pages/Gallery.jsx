import { useState, useEffect } from 'react'
import bg from '../images/backgroundImage.png'
import DomeGallery from '../components/DomeGallery'

const importImages = import.meta.glob(
  '../images/Shortlisted pics/**/*.{jpg,JPG,png,PNG,jpeg,JPEG}',
  { eager: true, import: 'default' }
)

// Shuffle function
const shuffleArray = (array) => {
  const shuffled = [...array]
  for (let i = shuffled.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]]
  }
  return shuffled
}

// Prepare images and filter out invalid ones
const SHORTLISTED_IMAGES = shuffleArray(
  Object.values(importImages)
    .filter(Boolean) // remove undefined/null
    .map((src) => ({ src, alt: '' }))
)

const Gallery = () => {
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const timer = setTimeout(() => setLoading(false), 1500)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="relative w-full min-h-screen flex flex-col items-center">
      {/* Background */}
      <div
        className="fixed inset-0 bg-cover bg-center"
        style={{ backgroundImage: `url(${bg})` }}
      />

      {loading ? (
        // Loader
        <div className="flex items-center justify-center min-h-screen relative z-20">
          <div className="w-16 h-16 border-4 border-[#DBAB6A] border-dashed rounded-full animate-spin"></div>
        </div>
      ) : (
        // DomeGallery
        <div className="relative z-10 w-full flex justify-center items-start pt-24 sm:pt-2">
          <div className="w-full h-[90vh] max-h-[1200px] flex justify-center items-start">
            <DomeGallery
              images={SHORTLISTED_IMAGES}
              fit={5.0}
              fitBasis="width"
              padFactor={0.1}
              minRadius={1000}
              maxRadius={1600}
              overlayBlurColor="rgba(0,0,0,0.4)"
              showVignette={false}
              grayscale={false}
              verticalSpan={6}
              segments={25}
            />
          </div>
        </div>
      )}
    </div>
  )
}

export default Gallery
