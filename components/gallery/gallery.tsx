"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import { X, ChevronLeft, ChevronRight, Volume2, VolumeX } from "lucide-react"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import { galleryData } from "./gallery-data"

export default function Gallery() {
  const [activeCategory, setActiveCategory] = useState<string>("all")
  const [lightboxOpen, setLightboxOpen] = useState<boolean>(false)
  const [currentImageIndex, setCurrentImageIndex] = useState<number>(0)
  const [mascotsFound, setMascotsFound] = useState<number>(0)
  const [surprisePopups, setSurprisePopups] = useState<any[]>([])
  const [soundEnabled, setSoundEnabled] = useState<boolean>(true)
  const [filteredImages, setFilteredImages] = useState(galleryData)
  const errorSoundRef = useRef<HTMLAudioElement | null>(null)
  const { toast } = useToast()
  const isMobile = useMobile()

  useEffect(() => {
    errorSoundRef.current = new Audio("/static/error.mp3")

    // Filter images based on active category
    if (activeCategory === "all") {
      setFilteredImages(galleryData)
    } else {
      setFilteredImages(galleryData.filter((item) => item.category === activeCategory))
    }
  }, [activeCategory])

  const categories = [
    { id: "all", name: "All", emoji: "🌟" },
    { id: "team", name: "Team Vibes", emoji: "🤝" },
    { id: "creative", name: "Creative Campaigns", emoji: "🎨" },
    { id: "work", name: "Work Hard, Play Hard", emoji: "🥳" },
    { id: "bts", name: "Behind-The-Scenes", emoji: "🎥" },
    { id: "office", name: "Office Antics", emoji: "😂" },
    { id: "meme", name: "Meme the Moment", emoji: "🤣" },
    { id: "game", name: "Find the Mascot", emoji: "🕹️" },
  ]

  const openLightbox = (index: number) => {
    setCurrentImageIndex(index)
    setLightboxOpen(true)
  }

  const closeLightbox = () => {
    setLightboxOpen(false)
  }

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % filteredImages.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + filteredImages.length) % filteredImages.length)
  }

  const handleKeyDown = (e: KeyboardEvent) => {
    if (!lightboxOpen) return

    if (e.key === "Escape") closeLightbox()
    if (e.key === "ArrowRight") nextImage()
    if (e.key === "ArrowLeft") prevImage()
  }

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown)
    return () => window.removeEventListener("keydown", handleKeyDown)
  }, [lightboxOpen])

  const findMascot = () => {
    const newCount = mascotsFound + 1
    setMascotsFound(newCount)

    if (newCount === 1) {
      toast({
        title: "Mascot Found! 🎉",
        description: "You found your first mascot! Keep looking for more!",
      })
    } else if (newCount === 3) {
      toast({
        title: "Foxy Finder Badge unlocked! 🦊",
        description: "You've found all the hidden mascots! You're officially a Foxy Finder!",
        variant: "success",
      })
    } else {
      toast({
        title: "Mascot Found! 🎉",
        description: `You've found ${newCount} mascots so far!`,
      })
    }
  }

  const triggerSurprise = () => {
    // Select random images
    const randomImages = [...galleryData].sort(() => 0.5 - Math.random()).slice(0, 12)

    // Create popup data
    const popups = randomImages.map((image, index) => {
      return {
        id: `popup-${Date.now()}-${index}`,
        image: image.src,
        title: ["Oops!", "Oh no!", "Error!", "Wait what?", "Not again!"][Math.floor(Math.random() * 5)],
        position: {
          top: `${Math.floor(Math.random() * 70)}%`,
          left: `${Math.floor(Math.random() * 70)}%`,
        },
      }
    })

    // Play sound if enabled
    if (soundEnabled && errorSoundRef.current) {
      errorSoundRef.current.volume = 0.3
      errorSoundRef.current.play()
    }

    setSurprisePopups(popups)
  }

  const dismissPopups = () => {
    setSurprisePopups([])
  }

  const toggleSound = () => {
    setSoundEnabled(!soundEnabled)
  }

  return (
    <div className="space-y-6">
      {/* Category Filters */}
      <div className="flex flex-wrap gap-2 justify-center mb-8">
        {categories.map((category) => (
          <Button
            key={category.id}
            onClick={() => setActiveCategory(category.id)}
            variant={activeCategory === category.id ? "default" : "outline"}
            className={cn(
              "transition-all duration-300 font-medium",
              activeCategory === category.id
                ? "bg-gradient-to-r from-pink-500 to-purple-500 text-white"
                : "hover:bg-pink-100",
            )}
          >
            <span className="mr-1">{category.emoji}</span> {category.name}
          </Button>
        ))}
      </div>

      {/* Surprise Button */}
      <div className="flex justify-center mb-8">
        <Button
          onClick={triggerSurprise}
          className="bg-gradient-to-r from-yellow-400 to-orange-500 hover:from-yellow-500 hover:to-orange-600 text-white font-bold py-2 px-6 rounded-full shadow-lg transform transition hover:scale-105 duration-300"
        >
          <span className="mr-2">💥</span> Click for a Surprise!
        </Button>
        <Button
          onClick={toggleSound}
          variant="ghost"
          size="icon"
          className="ml-2"
          title={soundEnabled ? "Mute sounds" : "Enable sounds"}
        >
          {soundEnabled ? <Volume2 size={20} /> : <VolumeX size={20} />}
        </Button>
      </div>

      {/* Mascot Counter */}
      {mascotsFound > 0 && (
        <div className="text-center mb-6 bg-amber-100 rounded-full py-2 px-4 inline-block mx-auto">
          <p className="font-medium text-amber-800">🦊 Mascots Found: {mascotsFound}/3</p>
        </div>
      )}

      {/* Gallery Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
        {filteredImages.map((item, index) => (
          <div
            key={item.id}
            className={cn(
              "group relative overflow-hidden rounded-xl shadow-md transition-all duration-300",
              item.category === "office" && "hover:rotate-1",
              item.category === "team" && "hover:scale-[1.02]",
              item.category === "creative" && "hover:shadow-xl",
            )}
            style={{ height: item.height || "auto" }}
          >
            <div
              className="relative h-full w-full cursor-pointer"
              onClick={() => {
                if (item.hasMascot) {
                  findMascot()
                }
                openLightbox(index)
              }}
            >
              <Image
                src={item.src || "/placeholder.svg"}
                alt={item.alt}
                fill
                className={cn(
                  "object-cover transition-all duration-300",
                  item.category !== "meme" && "group-hover:scale-105",
                )}
                sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
              />

              {/* Meme overlay for "Meme the Moment" category */}
              {item.category === "meme" && item.memeSrc && (
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <Image
                    src={item.memeSrc || "/placeholder.svg"}
                    alt={`Meme version of ${item.alt}`}
                    fill
                    className="object-cover"
                    sizes="(max-width: 640px) 100vw, (max-width: 768px) 50vw, (max-width: 1024px) 33vw, 25vw"
                  />
                </div>
              )}

              {/* Caption overlay */}
              <div className="absolute inset-0 bg-black bg-opacity-0 group-hover:bg-opacity-40 transition-all duration-300 flex items-end">
                <div className="p-4 text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <h3 className="text-lg font-bold">{item.title}</h3>
                  {item.caption && <p className="text-sm">{item.caption}</p>}
                </div>
              </div>

              {/* Hidden mascot indicator (only visible in dev) */}
              {item.hasMascot && process.env.NODE_ENV === "development" && (
                <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                  Mascot
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* Lightbox */}
      {lightboxOpen && filteredImages[currentImageIndex] && (
        <div className="fixed inset-0 z-50 bg-black bg-opacity-90 flex items-center justify-center p-4">
          <button
            onClick={closeLightbox}
            className="absolute top-4 right-4 text-white hover:text-gray-300 z-10"
            aria-label="Close lightbox"
          >
            <X size={32} />
          </button>

          <button
            onClick={prevImage}
            className="absolute left-4 text-white hover:text-gray-300 z-10"
            aria-label="Previous image"
          >
            <ChevronLeft size={32} />
          </button>

          <button
            onClick={nextImage}
            className="absolute right-4 text-white hover:text-gray-300 z-10"
            aria-label="Next image"
          >
            <ChevronRight size={32} />
          </button>

          <div className="relative w-full max-w-4xl h-[80vh]">
            <Image
              src={filteredImages[currentImageIndex].src || "/placeholder.svg"}
              alt={filteredImages[currentImageIndex].alt}
              fill
              className="object-contain"
              sizes="100vw"
            />

            <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-70 text-white p-4">
              <h2 className="text-xl font-bold">{filteredImages[currentImageIndex].title}</h2>
              <p>{filteredImages[currentImageIndex].caption}</p>
            </div>
          </div>
        </div>
      )}

      {/* Surprise Popups */}
      {surprisePopups.length > 0 && (
        <>
          {surprisePopups.map((popup, index) => (
            <div
              key={popup.id}
              className="fixed z-40 w-64 bg-gray-100 border-2 border-gray-300 rounded shadow-lg animate-bounce-in"
              style={{
                top: popup.position.top,
                left: popup.position.left,
                animationDelay: `${index * 0.1}s`,
              }}
            >
              <div className="bg-blue-700 text-white px-3 py-1 flex justify-between items-center">
                <span className="font-bold text-sm">{popup.title}</span>
                <X size={16} />
              </div>
              <div className="p-3">
                <div className="flex items-center mb-2">
                  <span className="text-red-600 mr-2 text-3xl">⚠️</span>
                  <p className="text-sm font-medium">System Error #CT{Math.floor(Math.random() * 1000)}</p>
                </div>
                <div className="h-24 relative mb-2">
                  <Image
                    src={popup.image || "/placeholder.svg"}
                    alt="Error image"
                    fill
                    className="object-cover rounded"
                    sizes="256px"
                  />
                </div>
                <p className="text-xs mb-2">This CollegeTips moment is too chaotic for your browser to handle!</p>
                <div className="flex justify-center">
                  <button className="bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded text-sm">OK</button>
                </div>
              </div>
            </div>
          ))}

          <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 z-50">
            <Button
              onClick={dismissPopups}
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-6 rounded-full shadow-lg"
            >
              Okay Okay I Get It!
            </Button>
          </div>
        </>
      )}
    </div>
  )
}
