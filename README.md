# Auraroom v3 API Server

Auraroom API Server is a Node.js application that serves as the backend for the Auraroom platform. It provides endpoints for managing fruit names, premium subscriptions, and room management functionalities.

## Features

- **Fruit Names Management:** CRUD operations for managing fruit names in the Auraroom platform.
- **Premium Subscription:** Handling subscription plans, upgrades, and user management related to premium features.
- **Room Management:** Create, update, and manage rooms for users to interact anonymously.

## Installation

To run the Auraroom API Server locally or in a production environment, follow these steps:

1. **Clone the repository:**

   ```bash
   git clone https://github.com/collinsadi/auraroom_v3_api_server.git
   cd auraroom_v3_api_server
   ```

2. **Install dependencies:**

   ```bash
   npm install
   ```

3. **Configure environment variables:**
   Create a `.env` file based on `.env.example` and configure necessary variables such as database connection strings, API keys, etc.

4. **Start the server:**
   ```bash
   npm start
   ```

## Usage

Once the server is running, it will listen on the specified port for incoming API requests. Frontend applications, including web and mobile clients, can interact with the API to perform various actions within the Auraroom platform, such as managing fruit names, handling premium subscriptions, and creating/managing rooms.
