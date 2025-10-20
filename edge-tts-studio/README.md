# Edge-TTS: Audiobook & Podcast Studio

A premium, production-ready web application for generating audiobooks and podcasts using 551 neural voices from Edge-TTS.

## Features

### 🎙️ Voice Library
- Browse and search 551 premium neural voices
- Filter by language, region, gender, and personality traits
- Preview voices with real-time TTS
- Favorite voices for quick access

### 📚 Audiobook Generator
- Upload PDF or EPUB files
- Configure TTS parameters (rate, pitch, volume)
- Concurrent processing with configurable workers (1-10, default: 3)
- Generate chapter-wise and complete audiobook files
- SSML support for advanced text processing

### 🎧 Podcast Generator
- AI-powered script generation with multiple model options
- Dual-host podcast format with stereo output
- Overview or Detailed modes
- Page range selection

## Tech Stack

- **Frontend**: Next.js 15, React, TypeScript, Tailwind CSS
- **Backend**: Next.js API Routes, Supabase
- **Database**: Supabase Postgres
- **Design**: Premium custom design system (Graphite/Teal/Gold)

## Getting Started

```bash
# Install dependencies
npm install

# Set up environment variables
cp .env.local.example .env.local
# Edit .env.local with your Supabase credentials

# Run development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser.

## Environment Variables

Create a `.env.local` file:

```bash
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key
SUPABASE_SERVICE_ROLE_KEY=your_service_role_key
GROQ_API_KEY=your_groq_key
OPENAI_API_KEY=your_openai_key
ANTHROPIC_API_KEY=your_anthropic_key
GOOGLE_AI_API_KEY=your_google_ai_key
```

## Database Setup

Run the SQL schema in your Supabase project:

```sql
-- See supabase/schema.sql for complete schema
```

## Deploy on Vercel

```bash
vercel deploy --prod --yes --token $VERCEL_TOKEN --name edge-tts-studio
```

## License

MIT License
