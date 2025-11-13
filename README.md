# Stucial - Student Network Platform

**Stucial** is Morocco's premier social platform connecting university students. Built with React.js, it provides a comprehensive ecosystem for students to share resources, services, products, documents, and connect with their peers across Moroccan universities.

## 🌟 Features

### Core Functionality

- **📱 Social Feed**: Interactive dashboard with posts, likes, comments, and sharing capabilities
- **💼 Student Services**: Browse and offer services (tutoring, design, development, writing, etc.)
- **🛍️ Academic Products**: Buy and sell study materials, notes, textbooks, and resources
- **📚 Document Library**: Access shared courses, notes, exercises, and exam materials
- **📋 Document Guide**: Complete guide to required documents for administrative procedures
- **📝 Reclamation System**: Submit and track administrative requests
- **👤 User Profiles**: Manage your profile, view your posts, services, and products
- **💬 Real-time Chat**: Integrated messaging system for direct communication
- **🌐 Multi-language Support**: Available in English, French, and Arabic (Darija)

### Key Pages

1. **Dashboard**: Social feed with posts, comments, and messaging panel
2. **Services**: Browse and offer student services with ratings and reviews
3. **Products**: Marketplace for academic materials and resources
4. **Documents**: Library of shared educational documents
5. **What Docs I Need**: Guide for required administrative documents
6. **Reclamation**: Submit administrative requests and track responses
7. **Profile**: Manage user profile and view personal content

## 🛠️ Tech Stack

### Frontend
- **React 18.3.1** - UI library
- **Vite 6.3.5** - Build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **Radix UI** - Accessible component primitives
- **Lucide React** - Icon library

### UI Components
- **shadcn/ui** - High-quality React components built on Radix UI
- **React Hook Form** - Form state management
- **Recharts** - Chart library for data visualization
- **Sonner** - Toast notifications

### Development Tools
- **@vitejs/plugin-react-swc** - Fast React refresh with SWC
- **TypeScript** (UI components) - Type safety for UI components

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher recommended)
- npm or yarn

### Setup Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/LatrachDev/StuCial.git
   cd StuCial
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Open in browser**
   - The app will automatically open at `http://localhost:3000`
   - If not, navigate to the URL shown in the terminal

## 🚀 Usage

### Development

```bash
# Start development server
npm run dev

# Build for production
npm run build
```

### Building for Production

```bash
npm run build
```

The production build will be created in the `build` directory, ready for deployment.

## 📁 Project Structure

```
SC/
├── src/
│   ├── assets/           # Static assets (images, logos)
│   │   └── logo.png
│   ├── components/        # React components
│   │   ├── ui/           # Reusable UI components (shadcn/ui)
│   │   ├── figma/        # Figma-related components
│   │   ├── ChatPanel.jsx
│   │   ├── Dashboard.jsx
│   │   ├── DocumentsPage.jsx
│   │   ├── Feed.jsx
│   │   ├── LanguageSwitcher.jsx
│   │   ├── LoginPage.jsx
│   │   ├── ProductsPage.jsx
│   │   ├── ProfilePage.jsx
│   │   ├── ReclamationPage.jsx
│   │   ├── ServicesPage.jsx
│   │   ├── Sidebar.jsx
│   │   └── WhatDocsINeedPage.jsx
│   ├── contexts/         # React contexts
│   │   └── LanguageContext.jsx
│   ├── styles/           # Global styles
│   │   └── globals.css
│   ├── App.jsx           # Main application component
│   ├── main.jsx          # Application entry point
│   └── index.css         # Global CSS
├── index.html            # HTML template
├── vite.config.js        # Vite configuration
├── package.json          # Dependencies and scripts
└── README.md            # This file
```

## 🎨 Design System

### Color Palette
- **Primary Blue**: `#0E2F76` - Main brand color
- **Light Blue**: `#AAC0E1` - Accent color
- **Background**: `#F5FEFF` - Light background
- **Text Primary**: `#2D2D2D` - Main text
- **Text Secondary**: `#5A6C7D` - Secondary text

### Typography
- Clean, modern sans-serif fonts
- Responsive text sizing (mobile-first approach)

## 🌍 Internationalization

The platform supports three languages:
- **English** (en)
- **French** (fr)
- **Arabic/Darija** (ar)

Language switching is available via the `LanguageSwitcher` component in the header and sidebar.

## 📱 Responsive Design

The application is fully responsive and optimized for:
- **Mobile devices** (< 768px)
- **Tablets** (768px - 1024px)
- **Desktop** (> 1024px)

Key responsive features:
- Mobile-optimized login page (no scrolling)
- Collapsible sidebar on mobile
- Adaptive grid layouts
- Touch-friendly interface elements

## 🔑 Key Features Explained

### Social Feed
- Create posts with text and images
- Like and comment on posts
- Share posts with friends
- Real-time updates

### Services Marketplace
- Browse services by university and city
- Filter by category (Design, Development, Writing, etc.)
- Rate and review services
- Direct messaging with service providers
- Add your own services

### Products Marketplace
- Browse academic products (notes, textbooks, equipment)
- Filter by condition (Like New, Used, Digital)
- View product details and seller information
- Contact sellers directly
- List your own products

### Document Library
- Search documents by title or subject
- Filter by subject and document type
- Download shared materials
- View download statistics

### Reclamation System
- Submit administrative requests
- Categorize issues (Academic, Administrative, Technical, etc.)
- Attach supporting documents
- Email integration for support

## 🧩 Component Architecture

### Main Components
- **App.jsx**: Root component managing authentication and routing
- **LoginPage.jsx**: Authentication interface
- **Dashboard.jsx**: Main feed and chat panel
- **Sidebar.jsx**: Navigation menu
- **Feed.jsx**: Social media feed component
- **ChatPanel.jsx**: Messaging interface

### Page Components
Each major feature has its own page component:
- ServicesPage, ProductsPage, DocumentsPage, etc.

### UI Components
Located in `src/components/ui/`, these are reusable components built with Radix UI and styled with Tailwind CSS.

## 🔧 Configuration

### Vite Configuration
The project uses Vite for fast development and optimized builds. Configuration is in `vite.config.js`.

### Port Configuration
Default development server runs on port 3000. This can be changed in `vite.config.js`.

## 📝 Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production

## 🤝 Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📄 License

This project is private and proprietary.

## 👥 Contact & Support

- **Email**: seo.stucial@gmail.com
- **GitHub**: [@LatrachDev](https://github.com/LatrachDev)

## 🙏 Acknowledgments

- Original design inspiration from [Figma](https://www.figma.com/design/iYap9HukyuVltMs10vour7/SC)
- Built with [React](https://react.dev/)
- UI components from [shadcn/ui](https://ui.shadcn.com/)
- Icons from [Lucide](https://lucide.dev/)

---

**Made with ❤️ for Moroccan University Students**
