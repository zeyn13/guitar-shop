# VibeStrings – Guitar Shop Assignment

This is a 3-page guitar shop web application built as part of the **Software Engineer Intern Assignment** using **React** and **Apollo Client**. The app allows users to browse guitar brands, explore models, and view detailed specifications of selected guitars — all with internationalization (i18n) support and responsive design.

## Features

- **Brands Page** – Browse available guitar brands.
- **Models Page** – View all models for a selected brand with:
  - Search
  - Type filter (All, Electric, Acoustic, Bass)
  - Pagination
- **Details Page** – See specifications and musicians for a selected guitar.
- **Multi-language support** – English, Macedonian, Albanian.
- **Mobile responsive** – Optimized view for mobile screens.
- **GraphQL + Apollo Client** – Fully integrated with live GraphQL API.


## Technologies Used

- React
- Apollo Client
- GraphQL
- Tailwind CSS
- React Router
- Headless UI
- Context API (for language switching)

---

## Setup Instructions

### 1. Clone the Repository

```bash
git clone https://github.com/zeyn13/guitar-shop.git
cd guitar-shop

2. Install Dependencies
npm install

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.
```

##GraphQL API
All guitar data is fetched from a live hosted GraphQL API:
https://graphql-api-brown.vercel.app/api/graphql


##Pages Overview
/ – Brands Page
Displays a list of guitar brands. Clicking a brand navigates to the models.

/brand/:brandId – Models Page
Lists all models of the selected brand, including:

- Type filters (All, Electric, Acoustic, Bass)
- Search input
- Pagination
- Language switcher

/brand/:brandId/guitar/:guitarId – Guitar Details
Shows detailed specs and musicians related to a specific guitar. Tabs available:

- Specification
- Who plays it?

##Language Support
Supports three languages via a custom LanguageContext:

- English (EN)
- Macedonian (MK)
- Albanian (SQ)

Language is stored in localStorage and persists between sessions.

##Folder Structure

src/
├── components/
│   └── FilterDropdown.js
├── context/
│   └── LanguageContext.js
├── pages/
│   ├── BrandsPage.js
│   ├── ModelsPage.js
│   └── GuitarDetailsPage.js
├── App.js
├── index.js


##Author
Zeynep LIKA
GitHub: [https://github.com/zeyn13/guitar-shop.git]
Email: likazeynep@gmail.com

](https://github.com/zeyn13)
