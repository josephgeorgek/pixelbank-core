# Corporate Internet Banking - Frontend

Pixel-perfect React frontend built with MUI, TypeScript, and comprehensive visual regression testing.

## Quick Start

```bash
cd micro-front-end
npm install
npm run dev
```

Frontend runs on: http://localhost:5173

## Commands

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm test` - Run unit tests
- `npm run test:visual` - Run Playwright visual regression tests
- `npm run test:update-snapshots` - Update visual test baselines

## Routes

- `/login` - Main login page (matches 1.Login_page.png)
- `/activate` - Account activation flow 
- `/reset-password` - Password reset flow
- `/unlock-account` - Account unlock process

## Testing

### Visual Regression Tests
- Pixel-perfect matching at 1440×900 resolution
- 0.5% threshold for visual differences
- Automatic baseline comparison with provided PNGs

### Unit Tests
- Component rendering and interaction tests
- Form validation and state management
- Navigation and user flows

## Architecture

- **React 18** + **TypeScript** + **Vite**
- **MUI** with custom theme matching exact screenshot colors
- **react-router-dom** for routing
- **axios** for HTTP requests (mock implementations)
- **Playwright** for visual regression testing
- **Jest** + **React Testing Library** for unit tests

## Configuration

- Theme colors sampled exactly from screenshots
- Locked font rendering for consistent visual tests
- No Supabase dependencies per requirements
- CORS-enabled for backend integration at http://localhost:8080

## Visual Accuracy

All pages built to be pixel-perfect matches of provided screenshots with:
- Exact color sampling (#E85E00 primary, #6C7B7F secondary)
- Roboto font with locked metrics
- Precise spacing and layout
- Background image positioning for login page