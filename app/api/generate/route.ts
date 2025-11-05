import { NextResponse } from 'next/server';
import OpenAI from 'openai';

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY || '',
});

export async function POST(request: Request) {
  try {
    const { image } = await request.json();

    if (!image) {
      return NextResponse.json(
        { error: 'No image provided' },
        { status: 400 }
      );
    }

    if (!process.env.OPENAI_API_KEY) {
      return NextResponse.json(
        { error: 'OpenAI API key not configured' },
        { status: 500 }
      );
    }

    // Enhanced prompt in Vietnamese style
    const prompt = `A photorealistic outdoor portrait of a young Vietnamese woman standing next to tall, lush blooming wild sunflowers (dã quỳ). The flowers are bright golden yellow, resembling large daisies with elongated petals and deep orange centers, surrounded by serrated green leaves. She wears a soft white-blue áo dài (Vietnamese traditional dress), elegantly holding a wide-brimmed conical hat (nón lá) in her hand, creating a harmonious and graceful appearance. Her straight shoulder-length hair frames her gentle face; the skin is bright, smooth, and healthy with a subtle closed-mouth smile. She stands gracefully beside a classic white bicycle, with a wicker basket filled with freshly picked wild sunflowers. The scene evokes a peaceful, nostalgic, and poetic atmosphere, recreating the natural beauty of wild sunflowers blooming along a rustic country road. Lighting: soft golden sunset light, natural backlighting, cinematic depth of field, warm gentle tones. Style: photorealistic photography, full focus, sharp details, natural facial proportions preserved, authentic Vietnamese countryside aesthetic, professional portrait photography.`;

    const response = await openai.images.generate({
      model: 'dall-e-3',
      prompt: prompt,
      n: 1,
      size: '1024x1024',
      quality: 'hd',
      style: 'natural',
    });

    const imageUrl = response.data?.[0]?.url;

    if (!imageUrl) {
      return NextResponse.json(
        { error: 'Failed to generate image' },
        { status: 500 }
      );
    }

    return NextResponse.json({ imageUrl });
  } catch (error) {
    console.error('Error generating image:', error);
    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Failed to generate portrait' },
      { status: 500 }
    );
  }
}
