# Changelog

## [1.1.0] - UI Overhaul, Bug Fixes & Easter Eggs! ✨

### UI/UX Improvements
- **Sidebar Revamp**: Apple-style Liquid Glass sidebar with smooth collapse/expand, pointer-tracked light reflection, and animated transitions. Navigation and dark mode toggle now feel native and immediate.
- **Glass Effects Everywhere**: Enhanced glassmorphism for all overlays, navigation bars, buttons, and cards. Layering and depth improved for clarity and context.
- **Dark Mode Polish**: One-tap dark mode toggle with instant feedback and persistent theme. Improved contrast and readability for all text and icons.
- **Weather Widget**: Live weather with search, location, and 5-day forecast. Responsive, animated, and visually integrated with the sidebar.
- **Navigation & Layout**: Floating navigation bar, consistent safe areas, and smooth transitions between all major views. Adheres to Apple’s Human Interface Guidelines.
- **Accessibility & Feedback**: All interactive elements provide immediate visual feedback (highlight, scale, shadow) on touch/click. Hit areas and labels improved for accessibility.
- **Consistent Theming**: Unified color palette, gradients, and blur for a coherent, beautiful look across light and dark themes.

### Bug Fixes
- Fixed sidebar collapse/expand state sync and animation glitches.
- Resolved weather widget loading and error handling edge cases.
- Improved drag-and-drop for ideas grid/list.
- Fixed z-index and layering issues for modals and overlays.
- Addressed minor layout bugs on mobile and tablet breakpoints.

### Developer Experience
- Maintained MVVM separation and dependency injection patterns.
- Improved code readability, structure, and consistency.
- Updated hooks and utilities for reliability and clarity.

### Easter Eggs 🥚
- The codebase is sprinkled with hidden messages and playful comments for those who look closely. (Wink! 😉)
- Try exploring the UI and source for a few surprises from Exizal & Galaxy...

---

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
