// src/app/page.tsx
import React from 'react';
import Link from 'next/link';
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';

export const revalidate = 10; // Optional: revalidate every 10 seconds

export default async function Home() {
  // Connect to MongoDB and fetch posts
  await dbConnect();
  const posts = await Post.find({}).sort({ createdAt: -1 }).lean();

  return (
    <div className="max-w-6xl mx-auto px-4 py-8 bg-background text-foreground">
      <h1 className="text-4xl font-serif mb-8 text-center">
        Welcome to My Blog
      </h1>
      {posts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {posts.map((post: any) => (
            <Link key={post._id.toString()} href={`/posts/${post._id.toString()}`}>
              <div className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition cursor-pointer">
                <h2 className="text-2xl font-serif mb-2 text-foreground">
                  {post.title}
                </h2>
                <p className="text-neutral">
                  {post.content.substring(0, 150)}...
                </p>
                <p className="text-sm mt-4 text-neutral">
                  Posted on {new Date(post.createdAt).toLocaleDateString()}
                </p>
              </div>
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-neutral">No posts found.</p>
      )}
    </div>
  );
}