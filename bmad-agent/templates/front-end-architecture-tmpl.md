# {Project Name} Frontend Architecture Document

## Table of Contents

{ Update this if sections and subsections are added or removed }

- [Introduction](#introduction)
- [Overall Frontend Philosophy & Patterns](#overall-frontend-philosophy--patterns)
- [Detailed Frontend Directory Structure](#detailed-frontend-directory-structure)
- [Component Breakdown & Implementation Details](#component-breakdown--implementation-details)
  - [Component Naming & Organization](#component-naming--organization)
  - [Template for Component Specification](#template-for-component-specification)
- [State Management In-Depth](#state-management-in-depth)
  - [Store Structure / Slices](#store-structure--slices)
  - [Key Selectors](#key-selectors)
  - [Key Actions / Reducers / Thunks](#key-actions--reducers--thunks)
- [API Interaction Layer](#api-interaction-layer)
  - [Client/Service Structure](#clientservice-structure)
  - [Error Handling & Retries (Frontend)](#error-handling--retries-frontend)
- [Routing Strategy](#routing-strategy)
  - [Route Definitions](#route-definitions)
  - [Route Guards / Protection](#route-guards--protection)
- [Build, Bundling, and Deployment](#build-bundling-and-deployment)
  - [Build Process & Scripts](#build-process--scripts)
  - [Key Bundling Optimizations](#key-bundling-optimizations)
  - [Deployment to CDN/Hosting](#deployment-to-cdnhosting)
- [Frontend Testing Strategy](#frontend-testing-strategy)
  - [Component Testing](#component-testing)
  - [UI Integration/Flow Testing](#ui-integrationflow-testing)
  - [End-to-End UI Testing Tools & Scope](#end-to-end-ui-testing-tools--scope)
- [Accessibility (AX) Implementation Details](#accessibility-ax-implementation-details)
- [Performance Considerations](#performance-considerations)
- [Internationalization (i18n) and Localization (l10n) Strategy](#internationalization-i18n-and-localization-l10n-strategy)
- [Feature Flag Management](#feature-flag-management)
- [Frontend Security Considerations](#frontend-security-considerations)
- [Browser Support and Progressive Enhancement](#browser-support-and-progressive-enhancement)
- [Change Log](#change-log)

## Introduction

{ This document details the technical architecture specifically for the frontend of {Project Name}. It complements the main {Project Name} Architecture Document and the UI/UX Specification. This document details the frontend architecture and **builds upon the foundational decisions** (e.g., overall tech stack, CI/CD, primary testing tools) defined in the main {Project Name} Architecture Document (`docs/architecture.md` or linked equivalent). **Frontend-specific elaborations or deviations from general patterns must be explicitly noted here.** The goal is to provide a clear blueprint for frontend development, ensuring consistency, maintainability, and alignment with the overall system design and user experience goals. }

- **Link to Main Architecture Document (REQUIRED):** {e.g., `docs/architecture.md`}
- **Link to UI/UX Specification (REQUIRED if exists):** {e.g., `docs/front-end-spec.md`}
- **Link to Primary Design Files (Figma, Sketch, etc.) (REQUIRED if exists):** {From UI/UX Spec}
- **Link to Deployed Storybook / Component Showcase (if applicable):** {URL}

## Overall Frontend Philosophy & Patterns

{ Describe the core architectural decisions and patterns chosen for the frontend. This should align with the "Definitive Tech Stack Selections" in the main architecture document and consider implications from the overall system architecture (e.g., monorepo vs. polyrepo, backend service structure). }

- **Framework & Core Libraries:** {e.g., React 18.x with Next.js 13.x, Angular 16.x, Vue 3.x with Nuxt.js}. **These are derived from the 'Definitive Tech Stack Selections' in the main Architecture Document.** This section elaborates on *how* these choices are applied specifically to the frontend.
- **Component Architecture:** {e.g., Atomic Design principles, Presentational vs. Container components, use of specific component libraries like Material UI, Tailwind CSS for styling approach. Specify chosen approach and any key libraries.}
- **State Management Strategy:** {e.g., Redux Toolkit, Zustand, Vuex, NgRx. Briefly describe the overall approach â€“ global store, feature stores, context API usage. **Referenced from main Architecture Document and detailed further in "State Management In-Depth" section.**}
- **Data Flow:** {e.g., Unidirectional data flow (Flux/Redux pattern), React Query/SWR for server state. Describe how data is fetched, cached, passed to components, and updated.}
- **Styling Approach:** **{Chosen Styling Solution, e.g., Tailwind CSS / CSS Modules / Styled Components}**. Configuration File(s): {e.g., `tailwind.config.js`, `postcss.config.js`}. Key conventions: {e.g., "Utility-first approach for Tailwind. Custom components defined in `src/styles/components.css`. Theme extensions in `tailwind.config.js` under `theme.extend`. For CSS Modules, files are co-located with components, e.g., `MyComponent.module.css`.}
- **Key Design Patterns Used:** {e.g., Provider pattern, Hooks, Higher-Order Components, Service patterns for API calls, Container/Presentational. These patterns are to be consistently applied. Deviations require justification and documentation.}

## Detailed Frontend Directory Structure

{ Provide an ASCII diagram representing the frontend application\'s specific folder structure (e.g., within `src/` or `app/` or a dedicated `frontend/` root directory if part of a monorepo). This should elaborate on the frontend part of the main project structure outlined in the architecture document. Highlight conventions for organizing components, pages/views, services, state, styles, assets, etc. For each key directory, provide a one-sentence mandatory description of its purpose.}

### EXAMPLE - Not Prescriptive (for a React/Next.js app)

```plaintext
src/
â”œâ”€â”€ app/                        # Next.js App Router: Pages/Layouts/Routes. MUST contain route segments, layouts, and page components.
â”‚   â”œâ”€â”€ (features)/             # Feature-based routing groups. MUST group related routes for a specific feature.
â”‚   â”‚   â””â”€â”€ dashboard/
â”‚   â”‚       â”œâ”€â”€ layout.tsx      # Layout specific to the dashboard feature routes.
â”‚   â”‚       â””â”€â”€ page.tsx        # Entry page component for a dashboard route.
â”‚   â”œâ”€â”€ api/                    # API Routes (if using Next.js backend features). MUST contain backend handlers for client-side calls.
â”‚   â”œâ”€â”€ globals.css             # Global styles. MUST contain base styles, CSS variable definitions, Tailwind base/components/utilities.
â”‚   â””â”€â”€ layout.tsx              # Root layout for the entire application.
â”œâ”€â”€ components/                 # Shared/Reusable UI Components.
â”‚   â”œâ”€â”€ ui/                     # Base UI elements (Button, Input, Card). MUST contain only generic, reusable, presentational UI elements, often mapped from a design system. MUST NOT contain business logic.
â”‚   â”‚   â”œâ”€â”€ Button.tsx
â”‚   â”‚   â””â”€â”€ ...
â”‚   â”œâ”€â”€ layout/                 # Layout components (Header, Footer, Sidebar). MUST contain components structuring page layouts, not specific page content.
â”‚   â”‚   â”œâ”€â”€ Header.tsx
â”‚   â”‚   â””â”€â”€ ...
â”‚   â””â”€â”€ (feature-specific)/     # Components specific to a feature but potentially reusable within it. This is an alternative to co-locating within features/ directory.
â”‚       â””â”€â”€ user-profile/
â”‚           â””â”€â”€ ProfileCard.tsx
â”œâ”€â”€ features/                   # Feature-specific logic, hooks, non-global state, services, and components solely used by that feature.
â”‚   â””â”€â”€ auth/
â”‚       â”œâ”€â”€ components/         # Components used exclusively by the auth feature. MUST NOT be imported by other features.
â”‚       â”œâ”€â”€ hooks/              # Custom React Hooks specific to the 'auth' feature. Hooks reusable across features belong in `src/hooks/`.
â”‚       â”œâ”€â”€ services/           # Feature-specific API interactions or orchestrations for the 'auth' feature.
â”‚       â””â”€â”€ store.ts            # Feature-specific state slice (e.g., Redux slice) if not part of a global store or if local state is complex.
â”œâ”€â”€ hooks/                      # Global/sharable custom React Hooks. MUST be generic and usable by multiple features/components.
â”‚   â””â”€â”€ useAuth.ts
â”œâ”€â”€ lib/ / utils/             # Utility functions, helpers, constants. MUST contain pure functions and constants, no side effects or framework-specific code unless clearly named (e.g., `react-helpers.ts`).
â”‚   â””â”€â”€ utils.ts
â”œâ”€â”€ services/                   # Global API service clients or SDK configurations. MUST define base API client instances and core data fetching/mutation services.
â”‚   â””â”€â”€ apiClient.ts
â”œâ”€â”€ store/                      # Global state management setup (e.g., Redux store, Zustand store).
â”‚   â”œâ”€â”€ index.ts                # Main store configuration and export.
â”‚   â”œâ”€â”€ rootReducer.ts          # Root reducer if using Redux.
â”‚   â””â”€â”€ (slices)/               # Directory for global state slices (if not co-located in features).
â”œâ”€â”€ styles/                     # Global styles, theme configurations (if not using `globals.css` or similar, or for specific styling systems like SCSS partials).
â””â”€â”€ types/                      # Global TypeScript type definitions/interfaces. MUST contain types shared across multiple features/modules.
    â””â”€â”€ index.ts
```

### Notes on Frontend Structure:

{ Explain any specific conventions or rationale behind the structure. e.g., "Components are co-located with their feature if not globally reusable to improve modularity." AI Agent MUST adhere to this defined structure strictly. New files MUST be placed in the appropriate directory based on these descriptions. }

## Component Breakdown & Implementation Details

{ This section outlines the conventions and templates for defining UI components. Detailed specification for most feature-specific components will emerge as user stories are implemented. The AI agent MUST follow the "Template for Component Specification" below whenever a new component is identified for development. }

### Component Naming & Organization

- **Component Naming Convention:** **{e.g., PascalCase for files and component names: `UserProfileCard.tsx`}**. All component files MUST follow this convention.
- **Organization:** {e.g., "Globally reusable components in `src/components/ui/` or `src/components/layout/`. Feature-specific components co-located within their feature directory, e.g., `src/features/feature-name/components/`. Refer to Detailed Frontend Directory Structure.}

### Template for Component Specification

{ For each significant UI component identified from the UI/UX Specification and design files (Figma), the following details MUST be provided. Repeat this subsection for each component. The level of detail MUST be sufficient for an AI agent or developer to implement it with minimal ambiguity. }

#### Component: `{ComponentName}` (e.g., `UserProfileCard`, `ProductDetailsView`)

- **Purpose:** {Briefly describe what this component does and its role in the UI. MUST be clear and concise.}
- **Source File(s):** {e.g., `src/components/user-profile/UserProfileCard.tsx`. MUST be the exact path.}
- **Visual Reference:** {Link to specific Figma frame/component, or Storybook page. REQUIRED.}
- **Props (Properties):**
  { List each prop the component accepts. For each prop, all columns in the table MUST be filled. }
  | Prop Name | Type                                      | Required? | Default Value | Description                                                                                                |
  | :-------------- | :---------------------------------------- | :-------- | :------------ | :--------------------------------------------------------------------------------------------------------- |
  | `userId`        | `string`                                  | Yes       | N/A           | The ID of the user to display. MUST be a valid UUID.                                                     |
  | `avatarUrl`     | `string \| null`                          | No        | `null`        | URL for the user\'s avatar image. MUST be a valid HTTPS URL if provided.                                    |
  | `onEdit`        | `() => void`                              | No        | N/A           | Callback function when an edit action is triggered.                                                        |
  | `variant`       | `\'compact\' \| \'full\'`                     | No        | `\'full\'`        | Controls the display mode of the card.                                                                   |
  | `{anotherProp}` | `{Specific primitive, imported type, or inline interface/type definition}` | {Yes/No}  | {If any}    | {MUST clearly state the prop\'s purpose and any constraints, e.g., \'Must be a positive integer.\'}         |
- **Internal State (if any):**
  { Describe any significant internal state the component manages. Only list state that is *not* derived from props or global state. If state is complex, consider if it should be managed by a custom hook or global state solution instead. }
  | State Variable | Type      | Initial Value | Description                                                                    |
  | :-------------- | :-------- | :------------ | :----------------------------------------------------------------------------- |
  | `isLoading`     | `boolean` | `false`       | Tracks if data for the component is loading.                                   |
  | `{anotherState}`| `{type}`  | `{value}`     | {Description of state variable and its purpose.}                               |
- **Key UI Elements / Structure:**
  { Provide a pseudo-HTML or JSX-like structure representing the component\'s DOM. Include key conditional rendering logic if applicable. **This structure dictates the primary output for the AI agent.** }
  ```html
  <div> <!-- Main card container with specific class e.g., styles.cardFull or styles.cardCompact based on variant prop -->
    <img src="{avatarUrl || defaultAvatar}" alt="User Avatar" class="{styles.avatar}" />
    <h2>{userName}</h2>
    <p class="{variant === 'full' ? styles.emailFull : styles.emailCompact}">{userEmail}</p>
    {variant === 'full' && onEdit && <button onClick={onEdit} class="{styles.editButton}">Edit</button>}
  </div>
  ```
- **Events Handled / Emitted:**
  - **Handles:** {e.g., `onClick` on the edit button (triggers `onEdit` prop).}
  - **Emits:** {If the component emits custom events/callbacks not covered by props, describe them with their exact signature. e.g., `onFollow: (payload: { userId: string; followed: boolean }) => void`}
- **Actions Triggered (Side Effects):**
  - **State Management:** {e.g., "Dispatches `userSlice.actions.setUserName(newName)` from `src/store/slices/userSlice.ts`. Action payload MUST match the defined action creator." OR "Calls `updateUserProfileOptimistic(newData)` from a local `useReducer` hook."}
  - **API Calls:** {Specify which service/function from the "API Interaction Layer" is called. e.g., "Calls `userService.fetchUser(userId)` from `src/services/userService.ts` on mount. Request payload: `{ userId }`. Success response populates internal state `userData`. Error response dispatches `uiSlice.actions.showErrorToast({ message: 'Failed to load user details' })`.}
- **Styling Notes:**
  - {MUST reference specific Design System component names (e.g., "Uses `<Button variant='primary'>` from UI library") OR specify Tailwind CSS classes / CSS module class names to be applied (e.g., "Container uses `p-4 bg-white rounded-lg shadow-md`. Title uses `text-xl font-semibold`.") OR specify SCSS custom component classes to be applied (e.g., "Container uses `@apply p-4 bg-white rounded-lg shadow-md`. Title uses `@apply text-xl font-semibold`."). Any dynamic styling logic based on props or state MUST be described. If Tailwind CSS is used, list primary utility classes or `@apply` directives for custom component classes. AI Agent should prioritize direct utility class usage for simple cases and propose reusable component classes/React components for complex styling patterns.}
- **Accessibility Notes:**
  - {MUST list specific ARIA attributes and their values (e.g., `aria-label="User profile card"`, `role="article"`), required keyboard navigation behavior (e.g., "Tab navigates to avatar, name, email, then edit button. Edit button is focusable and activated by Enter/Space."), and any focus management requirements (e.g., "If this component opens a modal, focus MUST be trapped inside. On modal close, focus returns to the trigger element.").}

---

_Repeat the above template for each significant component._

---

## State Management In-Depth

{ This section expands on the State Management strategy. **Refer to the main Architecture Document for the definitive choice of state management solution.** }

- **Chosen Solution:** {e.g., Redux Toolkit, Zustand, Vuex, NgRx - As defined in main arch doc.}
- **Decision Guide for State Location:**
    - **Global State (e.g., Redux/Zustand):** Data shared across many unrelated components; data persisting across routes; complex state logic managed via reducers/thunks. **MUST be used for session data, user preferences, application-wide notifications.**
    - **React Context API:** State primarily passed down a specific component subtree (e.g., theme, form context). Simpler state, fewer updates compared to global state. **MUST be used for localized state not suitable for prop drilling but not needed globally.**
    - **Local Component State (`useState`, `useReducer`):** UI-specific state, not needed outside the component or its direct children (e.g., form input values, dropdown open/close status). **MUST be the default choice unless criteria for Context or Global State are met.**

### Store Structure / Slices

{ Describe the conventions for organizing the global state (e.g., "Each major feature requiring global state will have its own Redux slice located in `src/features/[featureName]/store.ts`"). }

- **Core Slice Example (e.g., `sessionSlice` in `src/store/slices/sessionSlice.ts`):**
  - **Purpose:** {Manages user session, authentication status, and basic user profile info accessible globally.}
  - **State Shape (Interface/Type):**
    ```typescript
    interface SessionState {
      currentUser: { id: string; name: string; email: string; roles: string[]; } | null;
      isAuthenticated: boolean;
      token: string | null;
      status: "idle" | "loading" | "succeeded" | "failed";
      error: string | null;
    }
    ```
  - **Key Reducers/Actions (within `createSlice`):** {Briefly list main synchronous actions, e.g., `setCurrentUser`, `clearSession`, `setAuthStatus`, `setAuthError`.}
  - **Async Thunks (if any):** {List key async thunks, e.g., `loginUserThunk`, `fetchUserProfileThunk`.}
  - **Selectors (memoized with `createSelector`):** {List key selectors, e.g., `selectCurrentUser`, `selectIsAuthenticated`.}
- **Feature Slice Template (e.g., `{featureName}Slice` in `src/features/{featureName}/store.ts`):**
  - **Purpose:** {To be filled out when a new feature requires its own state slice.}
  - **State Shape (Interface/Type):** {To be defined by the feature.}
  - **Key Reducers/Actions (within `createSlice`):** {To be defined by the feature.}
  - **Async Thunks (if any, defined using `createAsyncThunk`):** {To be defined by the feature.}
  - **Selectors (memoized with `createSelector`):** {To be defined by the feature.}
  - **Export:** {All actions and selectors MUST be exported.}

### Key Selectors

{ List important selectors for any core, upfront slices. For emergent feature slices, selectors will be defined with the slice. **ALL selectors deriving data or combining multiple state pieces MUST use `createSelector` from Reselect (or equivalent for other state libraries) for memoization.** }

- **`selectCurrentUser` (from `sessionSlice`):** {Returns the `currentUser` object.}
- **`selectIsAuthenticated` (from `sessionSlice`):** {Returns `isAuthenticated` boolean.}
- **`selectAuthToken` (from `sessionSlice`):** {Returns the `token` from `sessionSlice`.}

### Key Actions / Reducers / Thunks

{ Detail more complex actions for core, upfront slices, especially asynchronous thunks or sagas. Each thunk MUST clearly define its purpose, parameters, API calls made (referencing the API Interaction Layer), and how it updates the state on pending, fulfilled, and rejected states. }

- **Core Action/Thunk Example: `authenticateUser(credentials: AuthCredentials)` (in `sessionSlice.ts`):**
  - **Purpose:** {Handles user login by calling the auth API and updating the `sessionSlice`.}
  - **Parameters:** `credentials: { email: string; password: string }`
  - **Dispatch Flow (using Redux Toolkit `createAsyncThunk`):**
    1. On `pending`: Dispatches `sessionSlice.actions.setAuthStatus('loading')`.
    2. Calls `authService.login(credentials)` (from `src/services/authService.ts`).
    3. On `fulfilled` (success): Dispatches `sessionSlice.actions.setCurrentUser(response.data.user)`, `sessionSlice.actions.setToken(response.data.token)`, `sessionSlice.actions.setAuthStatus('succeeded')`.
    4. On `rejected` (error): Dispatches `sessionSlice.actions.setAuthError(error.message)`, `sessionSlice.actions.setAuthStatus('failed')`.
- **Feature Action/Thunk Template: `{featureActionName}` (in `{featureName}Slice.ts`):**
  - **Purpose:** {To be filled out for feature-specific async operations.}
  - **Parameters:** {Define specific parameters with types.}
  - **Dispatch Flow (using `createAsyncThunk`):** {To be defined by the feature, following similar patterns for pending, fulfilled, rejected states, including API calls and state updates.}

## API Interaction Layer

{ Describe how the frontend communicates with the backend APIs defined in the main Architecture Document. }

### Client/Service Structure

- **HTTP Client Setup:** {e.g., Axios instance in `src/services/apiClient.ts`. **MUST** include: Base URL (from environment variable `NEXT_PUBLIC_API_URL` or equivalent), default headers (e.g., `Content-Type: 'application/json'`), interceptors for automatic auth token injection (from state management, e.g., `sessionSlice.token`) and standardized error handling/normalization (see below).}
- **Service Definitions (Example):**
  - **`userService.ts` (in `src/services/userService.ts`):**
    - **Purpose:** {Handles all API interactions related to users.}
    - **Functions:** Each service function MUST have explicit parameter types, a return type (e.g., `Promise<User>`), JSDoc/TSDoc explaining purpose, params, return value, and any specific error handling. It MUST call the configured HTTP client (`apiClient`) with correct endpoint, method, and payload.
      - `fetchUser(userId: string): Promise<User>`
      - `updateUserProfile(userId: string, data: UserProfileUpdateDto): Promise<User>`
  - **`productService.ts` (in `src/services/productService.ts`):**
    - **Purpose:** {...}
    - **Functions:** {...}

### Error Handling & Retries (Frontend)

- **Global Error Handling:** {How are API errors caught globally? (e.g., Via Axios response interceptor in `apiClient.ts`). How are they presented/logged? (e.g., Dispatches `uiSlice.actions.showGlobalErrorBanner({ message: error.message })`, logs detailed error to console/monitoring service). Is there a global error state? (e.g., `uiSlice.error`).}
- **Specific Error Handling:** {Components MAY handle specific API errors locally for more contextual feedback (e.g., displaying an inline message on a form field: "Invalid email address"). This MUST be documented in the component's specification if it deviates from global handling.}
- **Retry Logic:** {Is client-side retry logic implemented (e.g., using `axios-retry` with `apiClient`)? If so, specify configuration: max retries (e.g., 3), retry conditions (e.g., network errors, 5xx server errors), retry delay (e.g., exponential backoff). **MUST apply only to idempotent requests (GET, PUT, DELETE).**}

## Routing Strategy

{ Detail how navigation and routing are handled in the frontend application. }

- **Routing Library:** {e.g., React Router, Next.js App Router, Vue Router, Angular Router. As per main Architecture Document.}

### Route Definitions

{ List the main routes of the application and the primary component/page rendered for each. }

| Path Pattern           | Component/Page (`src/app/...` or `src/pages/...`) | Protection                      | Notes                                                 |
| :--------------------- | :-------------------------------------------------- | :------------------------------ | :---------------------------------------------------- |
| `/`                    | `app/page.tsx` or `pages/HomePage.tsx`              | `Public`                        |                                                       |
| `/login`               | `app/login/page.tsx` or `pages/LoginPage.tsx`       | `Public` (redirect if auth)     | Redirects to `/dashboard` if already authenticated.   |
| `/dashboard`           | `app/dashboard/page.tsx` or `pages/DashboardPage.tsx` | `Authenticated`                 |                                                       |
| `/products`            | `app/products/page.tsx`                             | `Public`                        |                                                       |
| `/products/:productId` | `app/products/[productId]/page.tsx`                 | `Public`                        | Parameter: `productId` (string)                       |
| `/settings/profile`    | `app/settings/profile/page.tsx`                     | `Authenticated`, `Role:[USER]`  | Example of role-based protection.                   |
| `{anotherRoute}`       | `{ComponentPath}`                                   | `{Public/Authenticated/Role:[ROLE_NAME]}` | {Notes, parameter names and types}                    |

### Route Guards / Protection

- **Authentication Guard:** {Describe how routes are protected based on authentication status. **Specify the exact HOC, hook, layout, or middleware mechanism and its location** (e.g., `src/guards/AuthGuard.tsx`, or Next.js middleware in `middleware.ts`). Logic MUST use authentication state from the `sessionSlice` (or equivalent). Unauthenticated users attempting to access protected routes MUST be redirected to `/login` (or specified login path).}
- **Authorization Guard (if applicable):** {Describe how routes might be protected based on user roles or permissions. **Specify the exact mechanism**, similar to Auth Guard. Unauthorized users (authenticated but lacking permissions) MUST be shown a "Forbidden" page or redirected to a safe page.}

## Build, Bundling, and Deployment

{ Details specific to the frontend build and deployment process, complementing the "Infrastructure and Deployment Overview" in the main architecture document. }

### Build Process & Scripts

- **Key Build Scripts (from `package.json`):** {e.g., `"build": "next build"`. What do they do? Point to `package.json` scripts. `"dev": "next dev"`, `"start": "next start"`.}. **AI Agent MUST NOT generate code that hardcodes environment-specific values. All such values MUST be accessed via the defined environment configuration mechanism.** Specify the exact files and access method.
- **Environment Configuration Management:** {How are `process.env.NEXT_PUBLIC_API_URL` (or equivalent like `import.meta.env.VITE_API_URL`) managed for different environments (dev, staging, prod)? (e.g., `.env`, `.env.development`, `.env.production` files for Next.js/Vite; build-time injection via CI variables). Specify the exact files and access method.}

### Key Bundling Optimizations

- **Code Splitting:** {How is it implemented/ensured? (e.g., "Next.js/Vite handles route-based code splitting automatically. For component-level code splitting, dynamic imports `React.lazy(() => import('./MyComponent'))` or `import('./heavy-module')` MUST be used for non-critical large components/libraries.")}
- **Tree Shaking:** {How is it implemented/ensured? (e.g., "Ensured by modern build tools like Webpack/Rollup (used by Next.js/Vite) when using ES Modules. Avoid side-effectful imports in shared libraries.")}
- **Lazy Loading (Components, Images, etc.):** {Strategy for lazy loading. (e.g., "Components: `React.lazy` with `Suspense`. Images: Use framework-specific Image component like `next/image` which handles lazy loading by default, or `loading='lazy'` attribute for standard `<img>` tags.")}
- **Minification & Compression:** {Handled by build tools (e.g., Webpack/Terser, Vite/esbuild)? Specify if any specific configuration is needed. Compression (e.g., Gzip, Brotli) is typically handled by the hosting platform/CDN.}

### Deployment to CDN/Hosting

- **Target Platform:** {e.g., Vercel, Netlify, AWS S3/CloudFront, Azure Static Web Apps. As per main Architecture Document.}
- **Deployment Trigger:** {e.g., Git push to `main` branch via GitHub Actions (referencing main CI/CD pipeline).}
- **Asset Caching Strategy:** {How are static assets cached? (e.g., "Immutable assets (JS/CSS bundles with content hashes) have `Cache-Control: public, max-age=31536000, immutable`. HTML files have `Cache-Control: no-cache` or short max-age (e.g., `public, max-age=0, must-revalidate`) to ensure users get fresh entry points. Configured via {hosting platform settings / `next.config.js` headers / CDN rules}.}

## Frontend Testing Strategy

{ This section elaborates on the "Testing Strategy" from the main architecture document, focusing on frontend-specific aspects. **Refer to the main Architecture Document for definitive choices of testing tools.** }

- **Link to Main Overall Testing Strategy:** {Reference the main `docs/architecture.md#overall-testing-strategy` or equivalent.}

### Component Testing

- **Scope:** {Testing individual UI components in isolation (similar to unit tests for components).}
- **Tools:** {e.g., React Testing Library with Jest, Vitest, Vue Test Utils, Angular Testing Utilities. As per main Arch Doc.}
- **Focus:** {Rendering with various props, user interactions (clicks, input changes using `fireEvent` or `userEvent`), event emission, basic internal state changes. **Snapshot testing MUST be used sparingly and with clear justification (e.g., for very stable, purely presentational components with complex DOM structure); prefer explicit assertions.**}
- **Location:** {e.g., `*.test.tsx` or `*.spec.tsx` co-located alongside components, or in a `__tests__` subdirectory.}

### Feature/Flow Testing (UI Integration)

- **Scope:** {Testing how multiple components interact to fulfill a small user flow or feature within a page, potentially mocking API calls or global state management. e.g., testing a complete form submission within a feature, including validation and interaction with a mocked service layer.}
- **Tools:** {Same as component testing (e.g., React Testing Library with Jest/Vitest), but with more complex setups involving mock providers for routing, state, API calls.}
- **Focus:** {Data flow between components, conditional rendering based on interactions, navigation within a feature, integration with mocked services/state.}

### End-to-End UI Testing Tools & Scope

- **Tools:** {Reiterate from main Testing Strategy, e.g., Playwright, Cypress, Selenium.}
- **Scope (Frontend Focus):** {Define 3-5 key user journeys that MUST be covered by E2E UI tests from a UI perspective, e.g., "User registration and login flow", "Adding an item to cart and proceeding to the checkout page summary", "Submitting a complex multi-step form and verifying success UI state and data persistence (via API mocks or a test backend)."}
- **Test Data Management for UI:** {How is consistent test data seeded or mocked for UI E2E tests? (e.g., API mocking layer like MSW, backend seeding scripts, dedicated test accounts).}

## Accessibility (AX) Implementation Details

{ Based on the AX requirements in the UI/UX Specification, detail how these will be technically implemented. }

- **Semantic HTML:** {Emphasis on using correct HTML5 elements. **AI Agent MUST prioritize semantic elements (e.g., `<nav>`, `<button>`, `<article>`) over generic `<div>`/`<span>` with ARIA roles where a native element with the correct semantics exists.**}
- **ARIA Implementation:** {Specify common custom components and their required ARIA patterns (e.g., "Custom select dropdown MUST follow ARIA Combobox pattern including `aria-expanded`, `aria-controls`, `role='combobox'`, etc. Custom Tabs MUST follow ARIA Tabbed Interface pattern."). Link to ARIA Authoring Practices Guide (APG) for reference.}
- **Keyboard Navigation:** {Ensuring all interactive elements are focusable and operable via keyboard. Focus order MUST be logical. Custom components MUST implement keyboard interaction patterns as per ARIA APG (e.g., arrow keys for radio groups/sliders).**}
- **Focus Management:** {How is focus managed in modals, dynamic content changes, route transitions? (e.g., "Modals MUST trap focus. On modal open, focus moves to the first focusable element or the modal container. On close, focus returns to the trigger element. Route changes SHOULD move focus to the main content area or H1 of the new page.")}
- **Testing Tools for AX:** {e.g., Axe DevTools browser extension, Lighthouse accessibility audit. **Automated Axe scans (e.g., using `jest-axe` for component tests, or Playwright/Cypress Axe integration for E2E tests) MUST be integrated into the CI pipeline and fail the build on new violations of WCAG AA (or specified level).** Manual testing procedures: {List key manual checks, e.g., keyboard-only navigation for all interactive elements, screen reader testing (e.g., NVDA/JAWS/VoiceOver) for critical user flows.}}

## Performance Considerations

{ Highlight frontend-specific performance optimization strategies. }

- **Image Optimization:** {Formats (e.g., WebP), responsive images (`<picture>`, `srcset`), lazy loading.}
  - Implementation Mandate: {e.g., "All images MUST use `<Image>` component from Next.js (or equivalent framework-specific optimizer). SVGs for icons. WebP format preferred where supported."}
- **Code Splitting & Lazy Loading (reiterate from Build section if needed):** {How it impacts perceived performance.}
  - Implementation Mandate: {e.g., "Next.js handles route-based code splitting automatically. Dynamic imports `import()` MUST be used for component-level lazy loading."}
- **Minimizing Re-renders:** {Techniques like `React.memo`, `shouldComponentUpdate`, optimized selectors.}
  - Implementation Mandate: {e.g., "`React.memo` MUST be used for components that render frequently with same props. Selectors for global state MUST be memoized (e.g., with Reselect). Avoid passing new object/array literals or inline functions as props directly in render methods where it can cause unnecessary re-renders."}
- **Debouncing/Throttling:** {For event handlers like search input or window resize.}
  - Implementation Mandate: {e.g., "Use a utility like `lodash.debounce` or `lodash.throttle` for specified event handlers. Define debounce/throttle wait times."}
- **Virtualization:** {For long lists or large data sets (e.g., React Virtualized, TanStack Virtual).}
  - Implementation Mandate: {e.g., "MUST be used for any list rendering more than {N, e.g., 100} items if performance degradation is observed."}
- **Caching Strategies (Client-Side):** {Use of browser cache, service workers for PWA capabilities (if applicable).}
  - Implementation Mandate: {e.g., "Configure service worker (if PWA) to cache application shell and key static assets. Leverage HTTP caching headers for other assets as defined in Deployment section."}
- **Performance Monitoring Tools:** {e.g., Lighthouse, WebPageTest, browser DevTools performance tab. Specify which ones are primary and any automated checks in CI.}

## Internationalization (i18n) and Localization (l10n) Strategy

{This section defines the strategy for supporting multiple languages and regional differences if applicable. If not applicable, state "Internationalization is not a requirement for this project at this time."}

- **Requirement Level:** {e.g., Not Required, Required for specific languages [list them], Fully internationalized for future expansion.}
- **Chosen i18n Library/Framework:** {e.g., `react-i18next`, `vue-i18n`, `ngx-translate`, framework-native solution like Next.js i18n routing. Specify the exact library/mechanism.}
- **Translation File Structure & Format:** {e.g., JSON files per language per feature (`src/features/{featureName}/locales/{lang}.json`), or global files (`public/locales/{lang}.json`). Define the exact path and format (e.g., flat JSON, nested JSON).}
- **Translation Key Naming Convention:** {e.g., `featureName.componentName.elementText`, `common.submitButton`. MUST be a clear, consistent, and documented pattern.}
- **Process for Adding New Translatable Strings:** {e.g., "AI Agent MUST add new keys to the default language file (e.g., `en.json`) and use the i18n library's functions/components (e.g., `<Trans>` component, `t()` function) to render text. Keys MUST NOT be constructed dynamically at runtime in a way that prevents static analysis."}
- **Handling Pluralization:** {Specify method/syntax, e.g., using ICU message format via the chosen library (e.g., `t('key', { count: N })`).}
- **Date, Time, and Number Formatting:** {Specify if the i18n library handles this, or if another library (e.g., `date-fns-tz` with locale support, `Intl` API directly) and specific formats/styles should be used for each locale.}
- **Default Language:** {e.g., `en-US`}
- **Language Switching Mechanism (if applicable):** {How is the language changed by the user and persisted? e.g., "Via a language selector component that updates a global state/cookie and potentially alters the URL route."}

## Feature Flag Management

{This section outlines how conditionally enabled features are managed. If not applicable, state "Feature flags are not a primary architectural concern for this project at this time."}

- **Requirement Level:** {e.g., Not Required, Used for specific rollouts, Core part of development workflow.}
- **Chosen Feature Flag System/Library:** {e.g., LaunchDarkly, Unleash, Flagsmith, custom solution using environment variables or a configuration service. Specify the exact tool/method.}
- **Accessing Flags in Code:** {e.g., "Via a custom hook `useFeatureFlag('flag-name'): boolean` or a service `featureFlagService.isOn('flag-name')`. Specify the exact interface, location, and initialization of the service/provider."}
- **Flag Naming Convention:** {e.g., `[SCOPE]_[FEATURE_NAME]_[TARGET_GROUP_OR_TYPE]`, e.g., `CHECKOUT_NEW_PAYMENT_GATEWAY_ROLLOUT`, `USER_PROFILE_BETA_AVATAR_UPLOAD`. MUST be documented and consistently applied.}
- **Code Structure for Flagged Features:** {e.g., "Use conditional rendering (`{isFeatureEnabled && <NewComponent />}`). For larger features, conditionally import components (`React.lazy` with flag check) or routes. Avoid complex branching logic deep within shared components; prefer to flag at higher levels."}
- **Strategy for Code Cleanup (Post-Flag Retirement):** {e.g., "Once a flag is fully rolled out (100% users) and deemed permanent, or fully removed, all conditional logic, old code paths, and the flag itself MUST be removed from the codebase within {N, e.g., 2} sprints. This is a mandatory tech debt item."}
- **Testing Flagged Features:** {How are different flag variations tested? e.g., "QA team uses a debug panel to toggle flags. Automated E2E tests run with specific flag configurations."}

## Frontend Security Considerations

{This section highlights mandatory frontend-specific security practices, complementing the main Architecture Document. AI Agent MUST adhere to these guidelines.}

- **Cross-Site Scripting (XSS) Prevention:**
  - Framework Reliance: {e.g., "React's JSX auto-escaping MUST be relied upon for rendering dynamic content. Vue's `v-html` MUST be avoided unless content is explicitly sanitized."}
  - Explicit Sanitization: {If direct DOM manipulation is unavoidable (strongly discouraged), use {specific sanitization library/function like DOMPurify}. Specify its configuration.}
  - Content Security Policy (CSP): {Is a CSP implemented? How? e.g., "CSP is enforced via HTTP headers set by the backend/CDN as defined in the main Architecture doc. Frontend MAY need to ensure nonce usage for inline scripts if `unsafe-inline` is not allowed." Link to CSP definition if available.}
- **Cross-Site Request Forgery (CSRF) Protection (if applicable for session-based auth):**
  - Mechanism: {e.g., "Backend uses synchronizer token pattern. Frontend ensures tokens are included in state-changing requests if not handled automatically by HTTP client or forms." Refer to main Architecture Document for backend details.}
- **Secure Token Storage & Handling (for client-side tokens like JWTs):**
  - Storage Mechanism: {**MUST specify exact mechanism**: e.g., In-memory via state management (e.g., Redux/Zustand store, cleared on tab close), `HttpOnly` cookies (if backend sets them and frontend doesn't need to read them), `sessionStorage`. **`localStorage` is STRONGLY DISCOURAGED for token storage.**}
  - Token Refresh: {Describe client-side involvement, e.g., "Interceptor in `apiClient.ts` handles 401 errors to trigger token refresh endpoint."}
- **Third-Party Script Security:**
  - Policy: {e.g., "All third-party scripts (analytics, ads, widgets) MUST be vetted for necessity and security. Load scripts asynchronously (`async/defer`)."}
  - Subresource Integrity (SRI): {e.g., "SRI hashes MUST be used for all external scripts and stylesheets loaded from CDNs where the resource is stable."}
- **Client-Side Data Validation:**
  - Purpose: {e.g., "Client-side validation is for UX improvement (immediate feedback) ONLY. **All critical data validation MUST occur server-side** (as defined in the main Architecture Document)."}
  - Implementation: {e.g., "Use {form_library_name like Formik/React Hook Form} for form validation. Rules should mirror server-side validation where appropriate."}
- **Preventing Clickjacking:**
  - Mechanism: {e.g., "Primary defense is `X-Frame-Options` or `frame-ancestors` CSP directive, set by backend/CDN. Frontend code should not rely on frame-busting scripts."}
- **API Key Exposure (for client-side consumed services):**
  - Restriction: {e.g., "API keys for services like Google Maps (client-side JS SDK) MUST be restricted (e.g., HTTP referrer, IP address, API restrictions) via the service provider's console."}
  - Backend Proxy: {e.g., "For keys requiring more secrecy or involving sensitive operations, a backend proxy endpoint MUST be created; frontend calls the proxy, not the third-party service directly."}
- **Secure Communication (HTTPS):**
  - Mandate: {e.g., "All communication with backend APIs MUST use HTTPS. Mixed content (HTTP assets on HTTPS page) is forbidden."}
- **Dependency Vulnerabilities:**
  - Process: {e.g., "Run `npm audit --audit-level=high` (or equivalent) in CI. High/critical vulnerabilities MUST be addressed before deployment. Monitor Dependabot/Snyk alerts."}

## Browser Support and Progressive Enhancement

{This section defines the target browsers and how the application should behave in less capable or non-standard environments.}

- **Target Browsers:** {e.g., "Latest 2 stable versions of Chrome, Firefox, Safari, Edge. Specific versions can be listed if required by project constraints. Internet Explorer (any version) is NOT supported." MUST be explicit.}
- **Polyfill Strategy:**
  - Mechanism: {e.g., "Use `core-js@3` imported at the application entry point. Babel `preset-env` is configured with the above browser targets to include necessary polyfills."}
  - Specific Polyfills (if any beyond `core-js`): {List any other polyfills required for specific features, e.g., `smoothscroll-polyfill`.}
- **JavaScript Requirement & Progressive Enhancement:**
  - Baseline: {e.g., "Core application functionality REQUIRES JavaScript enabled in the browser." OR "Key content (e.g., articles, product information) and primary navigation MUST be accessible and readable without JavaScript. Interactive features and enhancements are layered on top with JavaScript (Progressive Enhancement approach)." Specify the chosen approach.}
  - No-JS Experience (if Progressive Enhancement): {Describe what works without JS. e.g., "Users can view pages and navigate. Forms may not submit or will use standard HTML submission."}
- **CSS Compatibility & Fallbacks:**
  - Tooling: {e.g., "Use Autoprefixer (via PostCSS) configured with the target browser list to add vendor prefixes."}
  - Feature Usage: {e.g., "Avoid CSS features not supported by >90% of target browsers unless a graceful degradation or fallback is explicitly defined and tested (e.g., using `@supports` queries)."}
- **Accessibility Fallbacks:** {Consider how features behave if certain ARIA versions or advanced accessibility features are not supported by older assistive technologies within the support matrix.}

## Change Log

| Change | Date | Version | Description | Author |
| ------ | ---- | ------- | ----------- | ------ |
