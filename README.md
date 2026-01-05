
**URL**: https://lovable.dev/projects/8497d4cb-5bf7-4dfb-bb1d-1af0859759aa
Simply visit the [Lovable Project](https://lovable.dev/projects/8497d4cb-5bf7-4dfb-bb1d-1af0859759aa) and start prompting.
The only requirement is having Node.js & npm installed - [install with nvm](https://github.com/nvm-sh/nvm#installing-and-updating)
Follow these steps:

```sh
# Step 1: Clone the repository using the project's Git URL.
git clone <YOUR_GIT_URL>

# Step 2: Navigate to the project directory.
cd <YOUR_PROJECT_NAME>

# Step 3: Install the necessary dependencies.
npm i

# Step 4: Start the development server with auto-reloading and an instant preview.
npm run dev
```
## What technologies are used for this project?

This project is built with:

- Vite
- TypeScript
- React
- shadcn-ui
- Tailwind CSS

## Mapping & Routing

This app includes an integrated mapping feature at the `/mapping` route:

- Visualizes Memphis community pickup points and employment centers on a Leaflet map.
- Lets users choose a pickup and employment destination, then draws a route between them.
- Recenters the map and opens an info popup based on the last changed selection (pickup or dropoff).
- Uses shared data (`memphisLocations`, `predeterminedRoutes`) and `RouteContext` for route state.

Access it via the **MAP** item in the top navigation or directly at `/mapping` while the dev server is running.


Simply open [Lovable](https://lovable.dev/projects/8497d4cb-5bf7-4dfb-bb1d-1af0859759aa) and click on Share -> Publish.
