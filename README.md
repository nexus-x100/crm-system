# Customer Support CRM System

A fully functional web-based customer support ticketing system built with React and Supabase.

## Live Demo
[https://crm-system-wine-xi.vercel.app](https://crm-system-wine-xi.vercel.app)

## Tech Stack
- **Frontend:** React, Tailwind CSS
- **Backend/Database:** Supabase (PostgreSQL)
- **Deployment:** Vercel

## Features
- Create support tickets with customer info
- List all tickets with clean table view
- Search by name, email, ticket ID
- Filter by status (Open, In Progress, Closed)
- View and update ticket details
- Add notes/comments to tickets
- Dark/Light mode toggle

## Setup Instructions

### 1. Clone the repository
git clone https://github.com/nexus-x100/crm-system.git
cd crm-system

### 2. Install dependencies
npm install

### 3. Set up environment variables
cp .env.example .env
Add your Supabase URL and anon key to .env

### 4. Run the app
npm start