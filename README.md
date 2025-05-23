# CollegeTips Gallery 🎨

A vibrant, interactive image gallery showcasing CollegeTips moments with fun features like mascot hunting, surprise popups, and dynamic filtering. Built with Next.js 15, React 19, and modern UI components.

## 🌟 Features

- **Interactive Gallery**: Browse through different categories of CollegeTips moments
- **Lightbox View**: Full-screen image viewing with keyboard navigation
- **Mascot Hunt Game**: Find hidden mascots throughout the gallery for special rewards
- **Surprise Popups**: Random fun interactions to keep users engaged
- **Responsive Design**: Optimized for both desktop and mobile devices
- **Sound Effects**: Audio feedback for interactions (can be toggled)
- **Category Filtering**: Filter images by Team Vibes, Creative Campaigns, Work Hard Play Hard, Behind-The-Scenes, Office Antics, and Memes
- **Toast Notifications**: User feedback for achievements and interactions

## 🛠️ Tech Stack

- **Framework**: Next.js 15.2.4 with App Router
- **Frontend**: React 19, TypeScript
- **Styling**: Tailwind CSS with custom animations
- **UI Components**: Radix UI primitives with shadcn/ui
- **Icons**: Lucide React
- **Fonts**: Google Fonts (Inter, Fredoka, Comic Neue)
- **State Management**: React Hooks
- **Image Optimization**: Next.js Image component
- **Package Manager**: pnpm

## 📁 Project Structure
college-tips-gallery/
├── app/
│   ├── globals.css          # Global styles and Tailwind imports
│   ├── layout.tsx           # Root layout with font configuration
│   └── page.tsx             # Main page component
├── components/
│   ├── gallery/
│   │   ├── gallery.tsx      # Main gallery component with all features
│   │   └── gallery-data.ts  # Gallery data and image configurations
│   ├── theme-provider.tsx   # Theme context provider
│   └── ui/                  # Reusable UI components (shadcn/ui)
├── hooks/
│   ├── use-mobile.tsx       # Mobile detection hook
│   └── use-toast.ts         # Toast notification hook
├── lib/
│   └── utils.ts             # Utility functions
├── public/
│   ├── static/gallery/      # Gallery images
│   └── placeholder files    # Default images and assets
└── styles/
└── globals.css          # Additional global styles

```

## 🚀 Getting Started

### Prerequisites

- Node.js 18+ 
- pnpm (recommended) or npm/yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/
   gitesh-ujgaonkar/
   image_gallery_for_collegetips.in.git
   cd college-tips-gallery
```
2. Install dependencies
   
   ```
   pnpm install
   ```
   or
   
   ```
   npm install
   ```
3. Add your images
   
   - Place your gallery images in public/static/gallery/
   - Update the image data in components/gallery/gallery-data.ts
   - Follow the existing data structure for consistency
4. Run the development server
   
   ```
   pnpm dev
   ```
   or
   
   ```
   npm run dev
   ```
5. Open your browser Navigate to http://localhost:3000
## 📝 Configuration
### Adding New Images
Edit components/gallery/gallery-data.ts to add new images:

```
{
  id: "unique-id",
  category: "team" | "creative" | 
  "work" | "bts" | "office" | "meme" | 
  "game",
  src: "/static/gallery/your-image.jpg",
  alt: "Image description",
  title: "Image Title",
  caption: "Fun caption with emojis 🎉",
  height: 300, // Height in pixels for 
  masonry layout
  hasMascot: true, // Optional: adds 
  mascot hunt functionality
}
```
### Customizing Categories
Modify the categories array in components/gallery/gallery.tsx to add or change categories.

### Styling
The project uses Tailwind CSS with custom color schemes defined in:

- tailwind.config.ts - Main Tailwind configuration
- styles/globals.css - CSS custom properties for theming
## 🚀 Deployment
### Vercel (Recommended)
1. Push to GitHub
   
   ```
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```
2. Deploy to Vercel
   
   - Visit vercel.com
   - Import your GitHub repository
   - Vercel will automatically detect Next.js and deploy
3. Environment Setup
   
   - No environment variables required for basic setup
   - Images are served statically from the public folder
### Netlify
1. Build the project
   
   ```
   pnpm build
   ```
2. Deploy to Netlify
   
   - Drag and drop the out folder to Netlify
   - Or connect your GitHub repository for automatic deployments
### Other Platforms
1. Build for production
   
   ```
   pnpm build
   pnpm start
   ```
2. Static Export (if needed)
   Add to next.config.mjs :
   
   ```
   const nextConfig = {
     output: 'export',
     trailingSlash: true,
     images: {
       unoptimized: true
     }
   }
   ```
## 🎮 Features Guide
### Mascot Hunt Game
- Look for images marked with hasMascot: true in the data
- Click on mascots to earn points and unlock achievements
- Find all mascots to earn the "Foxy Finder" badge
### Keyboard Navigation
- Escape : Close lightbox
- Arrow Left/Right : Navigate between images in lightbox
- Space : Toggle sound on/off
### Mobile Optimizations
- Touch gestures for image navigation
- Responsive grid layout
- Optimized image loading
## 🤝 Contributing
1. Fork the repository
2. Create a feature branch ( git checkout -b feature/amazing-feature )
3. Commit your changes ( git commit -m 'Add amazing feature' )
4. Push to the branch ( git push origin feature/amazing-feature )
5. Open a Pull Request
## 📄 License
This project is open source and available under the MIT License .

## 🙏 Acknowledgments
- Built with Next.js
- UI components from shadcn/ui
- Icons from Lucide
- Fonts from Google Fonts
Made with ❤️ for CollegeTips community