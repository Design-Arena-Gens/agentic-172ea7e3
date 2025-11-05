# Vietnamese Portrait Generator - Tạo Chân Dung Áo Dài & Hoa Dã Quỳ

A web application that generates photorealistic Vietnamese portraits featuring traditional áo dài and wild sunflowers (dã quỳ) using AI.

## Features

- 🌻 Upload face reference image
- 👘 Generate portraits with Vietnamese traditional áo dài
- 🚲 Beautiful countryside scenes with wild sunflowers
- 📸 Cinematic quality with sunset lighting
- ⬇️ Download generated portraits

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file with your OpenAI API key:
```
OPENAI_API_KEY=your_openai_api_key_here
```

3. Run development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000)

## Deploy to Vercel

### Prerequisites

You need to set up an OpenAI API key secret in Vercel:

```bash
# Add OpenAI API key as a Vercel secret
vercel secrets add openai_api_key "your_actual_openai_api_key_here" --token $VERCEL_TOKEN
```

### Deployment

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN
```

The app will be available at: https://agentic-172ea7e3.vercel.app

## Tech Stack

- Next.js 14
- React 18
- TypeScript
- Tailwind CSS
- OpenAI DALL-E 3 API

## How It Works

1. User uploads a face reference image
2. Click "Tạo Chân Dung" (Generate Portrait) button
3. AI generates a photorealistic portrait with:
   - Vietnamese woman in white-blue áo dài
   - Traditional conical hat (nón lá)
   - Wild sunflowers (dã quỹ) background
   - Classic white bicycle
   - Golden sunset lighting
   - Cinematic depth of field

## Environment Variables

- `OPENAI_API_KEY` - Your OpenAI API key for DALL-E 3

## License

MIT
