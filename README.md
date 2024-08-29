# BILLIONARE WANNABE APP

**Author**: dominicpam89

> (ofcourse, who else, this is my github repository, duh 🌝)

**Project Description**:
Billionaire Wannabe is a React Vite project that displays trending cryptocurrencies and NFTs. The app fetches data from the CoinGecko API for trending coins and displays it with a graph using the Recharts library. Trending NFTs are also displayed, but without a graph, as the data is not provided by the API. Mainly the goals why i build this prjoject:

-  It's fun!
-  Showcasing my skills (since i build this only in 4 days, duh!)
-  Frontend showcase
-  A little backend showcase (don't worry your grace, i will showcasing on different hundred projects of mine 👾👾👾!)

## FEATURES

-  **Trending Coins**: Display trending cryptocurrencies with a graph showing market trends.
-  **Trending NFTs**: Display trending NFTs without a graph.
-  **User Authentication**: Implemented using Firebase for user sign-in, registration, and profile management.
-  **Responsive Design**: Fully responsive, mobile-first design.
-  **State Management**: Handled through a custom global context using React's context API.

## INSTALLATION

### Prerequisites

-  Nodejs v16 or higher
-  npm or yarn

### Clone the Repository

`git clone https://github.com/dominicpam89/billionare-wannabe.git
cd billionaire-wannabe`

### Install Dependencies

`npm install`

## USAGES

### Development Server

To run the development server:
`npm run dev`

The app will be available at http://localhost:5173
(duh)

### Build for Production

To build the app for production:
`npm run build`

## AVAILABLE SCRIPTS

-  **npm run dev** | Starts the development server
-  **npm run build** | Builds the app for production
-  **npm run lint** | Lints the project files
-  **npm run preview** | Previews the production build
-  **npm run test** | Runs the tests using Vitest

## API INTEGRATIONS

You need to establish your own firebase environments, and coingecko API,
in the environment variables.

## PROJECT STRUCTURE

The project follows a modular structure:

src/
│
├── components/ # Reusable UI components
├── lib/
│ ├── context/ # React Context
│ ├── definition/ # TypeScript type definitions
│ └── hooks/ # Custom hooks
│ └── services/ # API service classes (e.g., Auth, CoinGecko)
└── App.tsx # Main application component

It's not covering all folders and files, but i guess it's self explanatory

## CONTRIBUTING

Contributions are welcome! Please fork the repository and submit a pull request.
