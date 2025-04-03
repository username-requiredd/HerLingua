import { NextResponse } from 'next/server';
import User from '@/models/User';
import dbConnect from '@/lib/dbconnect';
import bcrypt from 'bcryptjs';

await dbConnect();

export async function GET() {
  try {
    const users = await User.find({}).select('-password -__v');
    return NextResponse.json({ success: true, data: users });
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}

export async function POST(request) {
  try {
    const body = await request.json();
    const { name, email, password, gender, progressStatus } = body;

    if (!name || !email || !password) {
      return NextResponse.json(
        { success: false, error: 'Name, email and password are required' },
        { status: 400 }
      );
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return NextResponse.json(
        { success: false, error: 'Email already in use' },
        { status: 400 }
      );
    }

    const user = await User.create({
      name,
      email,
      password,
      gender: gender || 'prefer-not-to-say',
      progressStatus: progressStatus || 'not-started'
    });

    const userWithoutPassword = user.toObject();
    delete userWithoutPassword.password;
    delete userWithoutPassword.__v;

    return NextResponse.json(
      { success: true, data: userWithoutPassword },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { success: false, error: error.message },
      { status: 500 }
    );
  }
}