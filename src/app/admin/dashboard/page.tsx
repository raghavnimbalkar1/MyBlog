// src/app/admin/dashboard/page.tsx
'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function Dashboard() {
  const router = useRouter();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [message, setMessage] = useState('');
  const [posts, setPosts] = useState<any[]>([]);

  // Function to fetch posts from the API
  const fetchPosts = async () => {
    try {
      const res = await fetch('/api/posts');
      const data = await res.json();
      setPosts(data.posts || []);
    } catch (error) {
      console.error('Error fetching posts:', error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setMessage('');

    const res = await fetch('/api/posts', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, content }),
    });

    if (res.ok) {
      const data = await res.json();
      setMessage('Post created successfully!');
      setTitle('');
      setContent('');
      fetchPosts(); // Refresh post list
    } else {
      const data = await res.json();
      setMessage(data.message || 'Error creating post.');
    }
  };

  // Handle deletion of a post
  const handleDelete = async (id: string) => {
    const res = await fetch(`/api/posts/${id}`, { method: 'DELETE' });
    if (res.ok) {
      setMessage('Post deleted successfully!');
      fetchPosts(); // Refresh list
    } else {
      const data = await res.json();
      setMessage(data.message || 'Error deleting post.');
    }
  };

  // Handle editing a post (for simplicity, we'll use prompt dialogs)
  const handleEdit = async (id: string, currentTitle: string, currentContent: string) => {
    const newTitle = prompt('Edit title:', currentTitle);
    const newContent = prompt('Edit content:', currentContent);
    if (!newTitle || !newContent) return;
    const res = await fetch(`/api/posts/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title: newTitle, content: newContent }),
    });
    if (res.ok) {
      setMessage('Post updated successfully!');
      fetchPosts();
    } else {
      const data = await res.json();
      setMessage(data.message || 'Error updating post.');
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-gray-800 mb-4">Admin Dashboard</h1>
      <p className="mb-8">
        Welcome to your admin dashboard. Here you can manage your blog posts.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4 max-w-xl">
        <div>
          <label className="block text-gray-700">Title</label>
          <input
            type="text"
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div>
          <label className="block text-gray-700">Content</label>
          <textarea
            className="w-full border border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-orange-500"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            required
          ></textarea>
        </div>
        <button
          type="submit"
          className="bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600 transition"
        >
          Create Post
        </button>
      </form>

      {message && <p className="mt-4 text-lg text-green-600">{message}</p>}

      <h2 className="text-2xl font-serif text-gray-800 mt-8 mb-4">Existing Posts</h2>
      {posts.length > 0 ? (
        <ul className="space-y-4">
          {posts.map((post) => (
            <li key={post._id.toString()} className="bg-gray-100 p-4 rounded shadow">
              <h3 className="text-xl font-semibold">{post.title}</h3>
              <p className="text-gray-600">{post.content.substring(0, 100)}...</p>
              <div className="mt-2 flex space-x-4">
                <button
                  onClick={() =>
                    handleEdit(post._id.toString(), post.title, post.content)
                  }
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600 transition"
                >
                  Edit
                </button>
                <button
                  onClick={() => handleDelete(post._id.toString())}
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition"
                >
                  Delete
                </button>
              </div>
            </li>
          ))}
        </ul>
      ) : (
        <p>No posts available.</p>
      )}
    </div>
  );
}