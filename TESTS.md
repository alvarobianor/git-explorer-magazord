# Unit Tests

This project uses **Vitest** and **React Testing Library** for unit tests.

## 📋 **Test Coverage**

### **Tested Components:**

1. **RepositoryCard** (`src/components/RepositoryCard.test.tsx`)
   - ✅ Component snapshot
   - ✅ Header rendering (owner/name)
   - ✅ Description rendering
   - ✅ Stats rendering (stars/forks/language)
   - ✅ Link behavior (target="\_blank", rel="noopener")
   - ✅ Conditional rendering logic

2. **RepositoryList** (`src/components/RepositoryList.test.tsx`)
   - ✅ Loading skeletons during data fetch
   - ✅ Rendering list of repositories
   - ✅ Empty state handling
   - ✅ Total pages calculation logic
   - ✅ Search query status message
   - ✅ Starred tab integration

3. **RepositoryFilters** (`src/components/RepositoryFilters.test.tsx`)
   - ✅ Change handlers for search, type, and language filters
   - ✅ Correct label/value mapping
   - ✅ Component snapshot

4. **SearchForm** (`src/components/SearchForm.test.tsx`)
   - ✅ Input updates on change
   - ✅ Form submission and navigation logic
   - ✅ Store integration (setCurrentUser, resetFilters)
   - ✅ Form validation (prevents empty search)

5. **UserProfile** (`src/components/user-profile.test.tsx`)
   - ✅ Profile header (name, bio, role)
   - ✅ Info items (location, company, website, instagram)
   - ✅ Website URL auto-formatting
   - ✅ Component snapshots

6. **Layout** (`src/components/layout.test.tsx`)
   - ✅ App-wide layout structure
   - ✅ Sticky header with navigation
   - ✅ Sidebar and content slot rendering
   - ✅ Component snapshots

7. **FeatureHighlights** (`src/components/FeatureHighlights.test.tsx`)
   - ✅ Static content rendering
   - ✅ Component snapshot

### **UI Elements:**

8. **Basic UI Components** (`src/components/ui/basic-ui.test.tsx`)
   - ✅ **Button**: Variants, sizes, disabled state, click handlers
   - ✅ **Input**: Placeholder, value, disabled state
   - ✅ **Avatar**: Image loading, fallback display
   - ✅ UI snapshots

9. **Pagination** (`src/components/ui/pagination.test.tsx`)
   - ✅ Pagination links and interaction handlers
   - ✅ Active state styling/attributes
   - ✅ Component snapshot

10. **Tabs** (`src/components/ui/tabs.test.tsx`)
    - ✅ Trigger active state styling
    - ✅ Click event handling
    - ✅ Content rendering
    - ✅ UI snapshot

11. **Skeletons** (`src/components/ui/skeleton.test.tsx`)
    - ✅ Base skeleton animation
    - ✅ Profile skeleton structure
    - ✅ Repository Card skeleton structure
    - ✅ UI snapshots

### **Logic & Infrastructure:**

12. **Custom Hooks** (`src/hooks/useGithubData.test.tsx`)
    - ✅ **useUser**: Fetching user data with cache/retry settings
    - ✅ **useUserRepositories**: Filter and pagination parameters
    - ✅ **useStarredRepositories**: Starred repositories fetching
    - ✅ QueryClient integration tests

13. **githubService** (`src/services/github.service.test.ts`)
    - ✅ API call parameters for user data
    - ✅ Repository fetch with custom filters (mocked axios)
    - ✅ Starred repositories fetch

14. **useAppStore** (`src/store/useAppStore.test.ts`)
    - ✅ Initial state verification
    - ✅ User, page, and tab updates
    - ✅ Reset logic for filters and pagination

15. **Helpers** (`src/utils/helpers.test.ts`)
    - ✅ Date formatting (relative time)
    - ✅ Number and byte formatting
    - ✅ GitHub username validation
    - ✅ Debounce and string utilities

## 🚀 **Commands**

```bash
# Run all tests
npm test -- --run

# Run tests in watch mode
npm test

# Run tests with UI
npm run test:ui

# Generate coverage report
npm run test:coverage
```

## 📊 **Current Results**

```
 Test Files  15 passed (15)
      Tests  78 passed (78)
```

## 🛠️ **Technologies**

- **Vitest** - Modern and fast test runner
- **React Testing Library** - Component behavior verification
- **Axios Mock Adapter** - Simulating API responses
- **jsdom** - Browser environment simulation
