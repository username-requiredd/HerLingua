import { NextResponse } from 'next/server';
import dbConnect from '@/lib/dbconnect';
import User from '@/models/User';

export async function GET(request, { params }) {
  try {
    await dbConnect();

    const { id } = params;

    const user = await User.findById(id).select('-password -__v');
    
    if (!user) {
      return NextResponse.json(
        { success: false, error: 'User not found' },
        { status: 404 }
      );
    }

    return NextResponse.json({ success: true, data: user });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}