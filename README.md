# Users Directory - FE Coding Challenge

A modern React TypeScript application that showcases a user directory with advanced filtering, pagination, and search capabilities powered by the RandomUser API.

## Features

- **User Listing**: Browse users with a responsive grid layout
- **Advanced Pagination**: Intelligent pagination component that displays page numbers efficiently
- **Gender Filtering**: Filter users by gender with persistent filter state
- **Real-time Search**: Search users by name, email, or username with debounced input
- **User Profiles**: Click any user to view their detailed profile page
- **Responsive Design**: Fully responsive design using Tailwind CSS
- **Google Maps Integration**: View user locations on Google Maps from profile page
- **Nationality Flags**: Display user nationality with flag icons
- **Type-Safe**: Built entirely with TypeScript for maximum type safety

## Tech Stack

- **Framework**: React 18 with TypeScript
- **Routing**: React Router v6
- **Styling**: Tailwind CSS with PostCSS
- **UI Components**: Lucide React icons
- **Build Tool**: Vite
- **API**: RandomUser API (https://randomuser.me/api/)

## Setup Instructions

### Prerequisites
- Node.js 16+ installed
- npm or yarn package manager

### Installation

1. Clone the repository:
```bash
git clone https://github.com/yourusername/users-directory.git
cd users-directory
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open your browser and navigate to the provided local URL

### Build for Production

```bash
npm run build
```

The build artifacts will be stored in the `dist/` directory.

## Project Structure

```
src/
├── api/
│   └── userApi.ts          # RandomUser API client
├── components/
│   ├── GenderFilter.tsx     # Gender filter button group
│   ├── Pagination.tsx       # Smart pagination component
│   ├── SearchBar.tsx        # Search input with debouncing
│   └── UserCard.tsx         # User card component for listing
├── pages/
│   ├── UserListing.tsx      # Main user listing page
│   └── UserProfile.tsx      # Detailed user profile page
├── types/
│   └── index.ts            # TypeScript type definitions
├── App.tsx                 # Main app component with routing
├── App.css                 # Global styles and Tailwind directives
└── index.tsx               # Entry point
```

## Component Overview

### UserCard
Displays a user summary card with profile picture, basic info, and email/phone/location details. Links to full profile page.

### SearchBar
Implements real-time search with 300ms debouncing to filter users by first name, last name, email, or username. Updates parent state on query change.

### GenderFilter
Button group allowing users to filter by male, female, or all genders. Filter state persists when navigating away and returns to listing page.

### Pagination
Smart pagination component that displays relevant page numbers. Shows ellipsis (...) for large page ranges to avoid cluttering the UI. Includes previous/next navigation buttons.

### UserListing
Main page displaying the filtered and paginated user list. Combines search, filter, and pagination components. Fetches 100 users from API and manages all state locally for filtering/searching.

### UserProfile
Detailed user profile page showing:
- Profile picture with gradient header
- Contact information (email, phone, cell)
- Location details with street address
- Timezone information
- Date of birth and registration date
- Nationality flag
- Account UUID and username
- Coordinates with Google Maps link

## Search Implementation

The search functionality uses a **client-side filtering approach**:

1. **Initial Load**: Fetch 100 users from the API (based on selected gender filter)
2. **Debounced Search**: Search input is debounced by 300ms to avoid excessive re-renders
3. **Real-time Filtering**: Users array is filtered based on search query matching:
   - Full name (first + last name)
   - Email address
   - Username
4. **Case-Insensitive**: Search is case-insensitive for better UX
5. **Preserved Filters**: Gender filters work in combination with search

This approach provides instant feedback without additional API calls and works seamlessly with pagination.

## API Integration

The app uses the RandomUser API to fetch random user data:

```typescript
GET https://randomuser.me/api/?results=100&gender=male
```

**Parameters:**
- `results`: Number of users to fetch (default: 100)
- `gender`: Filter by gender (optional: 'male' or 'female')

The API client is abstracted into `src/api/userApi.ts` for maintainability and testability.

## Styling Approach

The project uses **Tailwind CSS** utility-first approach for all styling:
- Responsive grid layouts with `grid-cols-1 md:grid-cols-2 lg:grid-cols-3`
- Consistent spacing using Tailwind spacing scale
- Hover effects for interactive elements
- Gradient backgrounds for visual hierarchy
- Shadow and rounded utilities for depth

## Type Safety

All components use **strict TypeScript types** throughout:
- No `any` types used anywhere
- Full type definitions for API responses
- Proper return types on all functions
- React.FC generic typing for components
- Discriminated unions for type safety

## Bonus Features Implemented

✅ **Google Maps**: Click "View on Google Maps" on profile page to see user location  
✅ **Nationality Flags**: Flag icons displayed on profile page using flagcdn.com API

## Performance Considerations

- **Debounced Search**: 300ms debounce prevents excessive re-renders
- **Memoized Filtering**: `useMemo` hook used for expensive filter operations
- **Code Splitting**: React Router enables automatic code splitting
- **Optimized Rendering**: Components re-render only when their props change

## Known Limitations

- Data is fetched fresh on gender filter change
- Search happens client-side only (suitable for current data size)
- API response includes random users each time

## Browser Compatibility

- Chrome/Edge (latest)
- Firefox (latest)
- Safari (latest)
- iOS Safari (latest)

## Future Enhancements

- Add sorting options (by name, age, registration date)
- Implement favorites/bookmarking
- Add export to CSV functionality
- Create user comparison feature
- Add infinite scroll as alternative to pagination
- Implement user follow functionality

## License

MIT

## Submission Notes

This project was built as part of a FE coding challenge with emphasis on:
- Component reusability and composition
- Clear project structure and organization
- Type safety throughout the codebase
- Modern React best practices
- Performance optimization
- Comprehensive documentation