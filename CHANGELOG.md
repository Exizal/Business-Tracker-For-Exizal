# Changelog

## [1.0.0] - Complete Rewrite

### Major Changes
- **Full codebase rewrite**: The entire project has been rebuilt from scratch for improved structure, maintainability, and scalability.

### Added Features & Components
- **Next.js 14+ app directory structure**
- **Prisma integration** for database management
- **API routes** for:
  - Ideas (`/api/ideas`)
  - Social Accounts (`/api/social-accounts`)
  - Weather (`/api/weather`)
- **Ideas Management**
  - List, view, and manage ideas
  - Idea form component for creation/editing
- **Social Accounts**
  - Social account card component
  - Social accounts page
- **Weather Widget**
  - Real-time weather integration
- **UI/UX**
  - Liquid Glass (frosted glass) effect for top-level overlays and navigation
  - Responsive layout with Sidebar, Header, Navigation
  - ProgressBar, Tag, Tooltip UI components
  - Apple Human Interface Design patterns (safe areas, layering, contrast, accessibility)
  - Smooth transitions and immediate feedback for interactions
- **Theming**
  - Theme context for light/dark mode
- **Hooks & Utilities**
  - Custom hooks (e.g., `useIdeas`)
  - Utility functions for common logic
- **Styling**
  - Tailwind CSS for rapid, consistent styling
  - PostCSS integration
- **Project Structure**
  - Clear separation of concerns (MVVM, dependency injection where appropriate)
  - Organized components by domain (ideas, social, layout, ui)

---
This release marks a new foundation for the Business Tracker project, with a focus on modern best practices, extensibility, and a beautiful, native-feeling UI. 
