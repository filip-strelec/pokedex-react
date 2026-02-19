# Pokédex Explorer

A modern, responsive Pokémon explorer built with React, Vite, and styled-components. Fetches data from PokeAPI and provides advanced filtering, sorting, and data management features.

## 🚀 Deployment & Setup

### Installation

```bash
# Install dependencies
npm install
```

### Development

```bash
# Start development server
npm run dev
```

The app will be available at `http://localhost:5173`

### Build for Production

```bash
# Create production build
npm run build
```

The optimized build will be in the `dist/` directory.

### Preview Production Build

```bash
# Preview the production build locally
npm run preview
```

### Deployment Options

This is a static React application that can be deployed to any static hosting service:

- **Vercel**: Connect your repository and deploy automatically
- **Netlify**: Drag and drop the `dist` folder or connect via Git
- **GitHub Pages**: Use `gh-pages` package to deploy the `dist` folder
- **AWS S3 + CloudFront**: Upload `dist` folder to S3 bucket
- **Firebase Hosting**: Use `firebase deploy` after configuring

**Build Command**: `npm run build`
**Output Directory**: `dist`

## ✨ Features

### 1. **Pokémon Grid Display**
- Responsive grid layout (mobile, tablet, desktop)
- Shows image, name, types, and base stats (HP, Attack, Defense)
- Lazy-loaded images with error handling
- Click to open detailed modal view

### 2. **Advanced Filtering**
- **Search by name** - Real-time text search
- **Filter by type** - Multi-select from 18 types
- **Filter by generation** - Gen I through Gen IX
- **Filter by abilities** - Multi-select from all available abilities
- **Stat range filters** - Min/max ranges for Attack, Defense, Speed, HP
- Filters persist across page navigation
- Clear all filters button

### 3. **Sorting Options**
- ID (ascending/descending)
- Name (A-Z / Z-A)
- Total Power (high to low / low to high)
- Individual stats (HP, Attack, Defense, Speed)

### 4. **Pagination**
- Configurable page size: 20, 50, or 100 per page
- Smart page number display with ellipsis
- First/Last/Previous/Next navigation
- Filters and sort persist across pages

### 5. **Detailed Modal View**
- Full-size official artwork
- Complete base stats with visual bars
- Pokémon description from species API
- Height, weight, total stats
- All abilities listed
- Quick actions: Add to favorites, Add to team

### 6. **Favorites System**
- Heart button on each card
- Persisted in localStorage
- View all favorites in side panel
- Quick access from header

### 7. **Team Builder**
- Build a team of up to 6 Pokémon
- Persisted in localStorage
- View team in side panel
- Quick add/remove from cards

### 8. **Comparison Tool**
- Compare up to 3 Pokémon side-by-side
- All stats displayed in table format
- Best stats highlighted in green
- Toggle compare from card buttons

### 9. **URL Sharing**
- All filters, sort, and pagination encoded in URL
- Copy shareable link to clipboard
- Filters automatically applied when opening shared link

### 10. **Advanced Export Options** ⭐
- **Export filtered results** - Export only the currently filtered Pokémon
- **Export all Pokémon** - Export the complete dataset (1025 Pokémon)
- **Export custom range** - Export by ID range (e.g., 1-100, 200-300, etc.)
- **Format options** - CSV or JSON
- Shows count preview before export
- Includes all stats, types, and abilities

### 11. **Performance Optimizations**
- In-memory API cache (no duplicate requests)
- Batched initial loading (50 Pokémon at a time)
- Memoized filtering, sorting, and pagination
- React.memo on card components
- Client-side filtering for instant results

### 12. **Responsive Design**
- Mobile-first approach
- Breakpoints: mobile (480px), tablet (768px), desktop (1024px)
- Touch-friendly buttons and controls
- Optimized grid layouts for all screen sizes

## 🛠️ Technical Stack

- **React 18** - UI framework
- **Vite** - Build tool and dev server
- **styled-components** - CSS-in-JS styling
- **react-icons** - Icon library
- **PokeAPI** - Data source
- **Context + useReducer** - State management
- **localStorage** - Persistent favorites and team

## 📁 Project Structure

```
src/
├── api/pokeApi.js              # API layer with caching
├── components/                 # React components
│   ├── Header.jsx              # App header with navigation
│   ├── FilterPanel.jsx         # Advanced filter controls
│   ├── Toolbar.jsx             # Sort, page size, share, export
│   ├── PokemonGrid.jsx         # Responsive grid
│   ├── PokemonCard.jsx         # Individual card
│   ├── PokemonModal.jsx        # Detail modal
│   ├── Pagination.jsx          # Page navigation
│   ├── SidePanel.jsx           # Favorites/Team panel
│   ├── ComparePanel.jsx        # Comparison view
│   └── ExportModal.jsx         # Export options modal
├── context/PokemonContext.jsx  # Global state
├── hooks/usePokemonData.js     # Data loading hook
├── styles/                     # Styled components
│   ├── theme.js                # Design tokens
│   ├── GlobalStyle.js          # Global CSS
│   └── shared.js               # Reusable components
├── utils/                      # Helper functions
│   ├── pokemon.js              # Filter, sort, paginate
│   ├── url.js                  # URL encoding/decoding
│   ├── storage.js              # localStorage helpers
│   └── export.js               # CSV/JSON export
└── constants.js                # Types, colors, generations
```

## 🌐 Browser Support

Modern browsers with ES6+ support (Chrome, Firefox, Safari, Edge)

## 📝 License

This project is open source and available under the MIT License.
