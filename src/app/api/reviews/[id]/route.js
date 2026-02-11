import dbConnect from '@/lib/dbConnect';
import Review from '@/models/Review';
import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function PUT(request, context) {
  try {
    console.log('PUT /api/reviews/[id] - Starting...');
    await dbConnect();
    
    // Handle both sync and async params
    const paramsObj = context.params instanceof Promise ? await context.params : context.params;
    const { id } = paramsObj;
    
    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }

    console.log('Updating review status for ID:', id);
    
    // Use Mongoose update to benefit from connection queuing and schema validation
    // Using { new: true } to get the updated document
    const updatedReview = await Review.findByIdAndUpdate(
      id,
      { isApproved: true },
      { new: true, runValidators: true }
    ).lean();
    
    console.log('Update result:', updatedReview);
    
    if (!updatedReview) {
      return NextResponse.json({ success: false, message: 'Review not found' }, { status: 404 });
    }

    return NextResponse.json({ success: true, data: updatedReview }, { status: 200 });
  } catch (error) {
    console.error('Error in PUT /api/reviews/[id]:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}

export async function DELETE(request, context) {
  try {
    await dbConnect();
    
    const paramsObj = context.params instanceof Promise ? await context.params : context.params;
    const { id } = paramsObj;

    if (!id) {
      return NextResponse.json({ success: false, message: 'ID required' }, { status: 400 });
    }
    
    const deletedReview = await Review.findByIdAndDelete(id).lean();

    if (!deletedReview) {
      return NextResponse.json(
        { success: false, message: 'Review not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: {} }, { status: 200 });
  } catch (error) {
    console.error('Error in DELETE /api/reviews/[id]:', error);
    return NextResponse.json({ success: false, message: error.message }, { status: 400 });
  }
}
