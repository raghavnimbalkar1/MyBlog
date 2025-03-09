// src/app/post/[id]/page.tsx
import dbConnect from '@/lib/mongodb';
import Post from '@/lib/models/Post';
import { notFound } from 'next/navigation';

// This function pre-generates a list of post IDs for static generation.
export async function generateStaticParams() {
  await dbConnect();
  const posts = await Post.find({}, '_id').lean();
  return posts.map((post) => ({
    id: post._id.toString(),
  }));
}

// The main component to display an individual post
export default async function PostPage({
  params,
}: {
  params: { id: string };
}) {
  await dbConnect();
  const post = await Post.findById(params.id).lean();

  if (!post) {
    return notFound(); // If no post is found, Next.js shows a 404 page.
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8">
      <h1 className="text-4xl font-serif text-gray-800 mb-4">{post.title}</h1>
      <p className="text-gray-500 mb-4">
        {new Date(post.createdAt).toLocaleDateString()}
      </p>
      <div className="prose max-w-none">
        <p>{post.content}</p>
      </div>
    </div>
  );
}