import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function POST(request) {
  try {
    await dbConnect();

    const body = await request.json();
    const review = await Review.create(body);

    return NextResponse.json({ success: true, data: review }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}

export async function GET(request) {
  try {
    await dbConnect();
    
    const { searchParams } = new URL(request.url);
    const showAll = searchParams.get('all') === 'true';
    
    const query = showAll ? {} : { isApproved: true };

    const reviews = await Review.find(query).sort({ createdAt: -1 });

    return NextResponse.json({ success: true, data: reviews }, { status: 200 });
  } catch (error) {
    return NextResponse.json({ success: false, error: error.message }, { status: 400 });
  }
}
