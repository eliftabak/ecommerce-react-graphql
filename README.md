## Setup Instructions

Before starting, ensure Node.js (v20.x) and pnpm (v8.x) are installed. To run the app:

1. Extract the zip file.
2. Inside the project folder, install dependencies with `pnpm install`.
3. Start the app using `pnpm start`.

The client runs at `http://localhost:5173`, and the GraphQL playground at `http://localhost:4040`.

## Technical Decisions and Strategy

### State Management

State is managed using React Hooks for local component state and Apollo Client for global GraphQL state, prioritizing simplicity and performance.

### UI Toolkit

Tailwind CSS is used for styling due to its utility-first approach, which accelerates development and ensures design consistency.