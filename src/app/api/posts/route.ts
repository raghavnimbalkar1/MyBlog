// src/app/api/posts/route.ts
import { NextResponse, NextRequest } from 'next/server';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import jwt from 'jsonwebtoken';

const JWT_SECRET = process.env.JWT_SECRET;
if (!JWT_SECRET) {
  throw new Error('Please define JWT_SECRET in your .env.local');
}

export async function GET() {
  try {
    await dbConnect();
    const posts = await Post.find({}).sort({ createdAt: -1 });
    return NextResponse.json({ posts });
  } catch (error) {
    console.error('Error fetching posts:', error);
    return NextResponse.json({ message: 'Error fetching posts' }, { status: 500 });
  }
}

export async function POST(request: NextRequest) {
  // Connect to the database
  try {
    await dbConnect();
  } catch (dbError) {
    console.error('Database connection error:', dbError);
    return NextResponse.json({ message: 'Database connection error' }, { status: 500 });
  }

  try {
    // Retrieve the token from cookies instead of the Authorization header.
    const token = request.cookies.get('token')?.value;
    if (!token) {
      return NextResponse.json({ message: 'Missing token' }, { status: 401 });
    }
    
    try {
      jwt.verify(token, JWT_SECRET);
    } catch (tokenError) {
      console.error('JWT verification error:', tokenError);
      return NextResponse.json({ message: 'Invalid token' }, { status: 401 });
    }

    // Parse the request body safely.
    let payload;
    try {
      payload = await request.json();
    } catch (parseError) {
      console.error('Error parsing JSON in request:', parseError);
      return NextResponse.json({ message: 'Invalid JSON in request' }, { status: 400 });
    }

    const { title, content } = payload;
    if (!title || !content) {
      return NextResponse.json({ message: 'Title and content are required' }, { status: 400 });
    }

    let post;
    try {
      post = await Post.create({ title, content });
    } catch (createError) {
      console.error('Error creating post in DB:', createError);
      return NextResponse.json({ message: 'Error creating post in DB' }, { status: 500 });
    }

    return NextResponse.json({ post }, { status: 201 });
  } catch (error) {
    console.error('Unexpected error in POST /api/posts:', error);
    return NextResponse.json({ message: 'Unexpected error' }, { status: 500 });
  }
}