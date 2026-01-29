# Contentful-driven mini marketing site: Next.js + Contentful Mini Production App

## Objective
This project demonstrates real-world working knowledge of Next.js (App Router), TypeScript, Contentful (Delivery API), Tailwind CSS, and shadcn/ui by building a Contentful-driven mini marketing site.

## Features Implemented

### 1. Home (`/`)
- Content sourced from Contentful.
- Hero section with heading, subheading, and a Call-to-Action (CTA) button.
- Displays the latest 3 blog posts (title + excerpt).

### 2. Blog List (`/blog`)
- Lists all blog posts with title, excerpt, and published date.
- Includes an **easy-to-use search filter** to find posts by keywords.
- Displays empty state if no posts are found.

### 3. Blog Detail (`/blog/[slug]`)
- Renders individual blog posts dynamically from Contentful by their `slug`.
- Displays title, published date, cover image, and a rich text body.
- Implements **custom rich text renderers** for better styling of content like unordered lists.
- Shows a 404 page if a post slug is not found.
- Sets SEO metadata (title + description) dynamically.

## Tech Stack
- **Next.js (App Router)**
- **TypeScript** (with strict type safety)
- **Contentful** (Content Delivery API)
- **Tailwind CSS**
- **shadcn/ui** (components like Card, Button, Badge)
- `next/image` for image optimization
- `revalidate` for performance (Incremental Static Regeneration)

## Contentful Setup
This project connects to Contentful to fetch blog content. To set it up:

1.  **Content Model**: Ensure you have a Content Type with the **API Identifier** `blogPost`.
    *   It should have the following fields (API IDs in parentheses):
        *   `title` (short text, required)
        *   `slug` (short text, required, unique)
        *   `excerpt` (long text)
        *   `content` (rich text)
        *   `coverImage` (media)
        *   `publishedDate` (date)

    ![Contentful BlogPost Content Model Screenshot]("https://github.com/user-attachments/assets/3df40433-e566-4c3b-8b25-e335b2ca5276")

2.  **Content**: Create and **publish at least 3 blog posts** of type `blogPost`.

3.  **API Keys**: Obtain your **Space ID** and **Content Delivery API (CDA) Access Token** from Contentful.

4.  **Environment Variables**: Create a `.env.local` file in the project root with the following:
    ```env
    CONTENTFUL_SPACE_ID=YOUR_CONTENTFUL_SPACE_ID
    CONTENTFUL_ENVIRONMENT_ID=master
    CONTENTFUL_CDA_TOKEN=YOUR_CONTENTFUL_CDA_TOKEN
    ```

## Local Development

1.  Clone the repository.
2.  Install dependencies:
    ```bash
    npm install
    ```
3.  Run the development server:
    ```bash
    npm run dev
    ```
4.  Open [http://localhost:3000](http://localhost:3000) in your browser.

## Deployed URL
[Link to your Vercel deployment]

## GitHub Repository
[Link to your GitHub repository](https://github.com/Chirag-Tank1971/Contentful-driven-mini-marketing-site.git)
