import Gallery from "@/components/gallery/gallery"

export default function Home() {
  return (
    <main className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <header className="text-center mb-8 md:mb-12">
          <h1 className="text-4xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 mb-4 font-fredoka">
            CollegeTips Gallery
          </h1>
          <p className="text-lg md:text-xl text-gray-700 max-w-2xl mx-auto">
            Dive into our chaotic world of creativity, teamwork, and the occasional office shenanigans! 🎉
          </p>
        </header>

        <Gallery />
      </div>
    </main>
  )
}
