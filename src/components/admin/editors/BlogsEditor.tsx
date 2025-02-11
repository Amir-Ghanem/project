import { useState, useEffect } from 'react';
import { Plus, X } from 'lucide-react';
import { blogsApi } from '../../../lib/api/blog';

interface BlogData {
  id: string;
  title: string;
  content: string;
  publishDate: string;
  isPublished: boolean;
  summary: string;
  author: string;
  image: File | null;
  imageUrl: string | null;
  htmlContent : string | null;
  status: 'new' | 'existing';
}

export function BlogsEditor() {
  const [blogs, setBlogs] = useState<BlogData[]>([]);

  useEffect(() => {
    const fetchBlogs = async () => {
      const response = await blogsApi.getAll();
      if (response.isSuccess && response.newsList?.items) {
        setBlogs(
          response.newsList.items.map(item => ({
            id: item.id,
            title: item.title,
            content: item.content,
            publishDate: item.publishDate,
            isPublished: item.isPublished,
            summary: item.summary,
            author: item.author,
            imageUrl: item.images?.[0] ?? null,
            image: null,
            htmlContent : '<h1>Test</h1>',
            status: 'existing',
          }))
        );
      } else {
        console.error('Failed to fetch blogs:', response.errors);
      }
    };
    fetchBlogs();
  }, []);

  const addBlog = () => {
    const newBlog: BlogData = {
      id: Date.now().toString(),
      title: '',
      content: '',
      publishDate: new Date().toISOString(),
      isPublished: false,
      summary: '',
      author: '',
      image: null,
      imageUrl: null,
      status: 'new',
      htmlContent:'<h1>Test</h1>'
    };
    setBlogs([...blogs, newBlog]);
  };

  const removeBlog = async (id: string) => {
    const response = await blogsApi.delete(id);
    if (response.isSuccess) {
      setBlogs(blogs.filter(blog => blog.id !== id));
    }
  };

  const updateBlog = (id: string, field: keyof BlogData, value: string | boolean | File) => {
    setBlogs(blogs.map(blog => (blog.id === id ? { ...blog, [field]: value } : blog)));
  };

  const saveChanges = async () => {
    for (const blog of blogs) {
      const formData = new FormData();
      formData.append('Id', blog.id);
      formData.append('title', blog.title);
      formData.append('content', blog.content);
      formData.append('publishDate', blog.publishDate);
      formData.append('isPublished', blog.isPublished.toString());
      formData.append('summary', blog.summary);
      formData.append('author', blog.author);
      formData.append('htmlContent', blog.htmlContent??'<h1>Test</h1>');

      if (blog.image) {
        formData.append('images', blog.image);
      }

      if (blog.status === 'new') {
        await blogsApi.create(formData);
      } else {
        await blogsApi.update(formData);
      }
    }

    alert('Changes saved!');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-xl font-semibold">Blog Editor</h2>
        <button
          onClick={addBlog}
          className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
        >
          <Plus className="w-4 h-4" />
          Add Blog
        </button>
      </div>

      <div className="space-y-4 grid grid-cols-1 md:grid-cols-2 gap-4">
        {blogs.map(blog => (
          <div key={blog.id} className="bg-gray-50 p-4 rounded-lg relative">
            <button
              onClick={() => removeBlog(blog.id)}
              className="absolute top-2 right-2 p-1 hover:bg-gray-200 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>

            <div className="grid gap-4">
              {/* Image */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Image</label>
                {blog.imageUrl && (
                  <div className="mb-2">
                    <img
                      src={`http://35.180.224.195:2712/${blog.imageUrl}`}
                      alt="Blog"
                      className="w-full h-auto rounded-lg border"
                    />
                  </div>
                )}
                <input
                  type="file"
                  accept="image/*"
                  onChange={e => {
                    const file = e.target.files?.[0];
                    if (file) {
                      updateBlog(blog.id, 'image', file);
                    }
                  }}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Title */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  value={blog.title}
                  onChange={e => updateBlog(blog.id, 'title', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter blog title"
                />
              </div>

              {/* Content */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Content</label>
                <textarea
                  value={blog.content}
                  onChange={e => updateBlog(blog.id, 'content', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter blog content"
                />
              </div>

              {/* Summary */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Summary</label>
                <input
                  type="text"
                  value={blog.summary}
                  onChange={e => updateBlog(blog.id, 'summary', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter blog summary"
                />
              </div>

              {/* Author */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Author</label>
                <input
                  type="text"
                  value={blog.author}
                  onChange={e => updateBlog(blog.id, 'author', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                  placeholder="Enter author name"
                />
              </div>

              {/* Publish Date */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Publish Date</label>
                <input
                  type="datetime-local"
                  value={new Date(blog.publishDate).toISOString().slice(0, 16)}
                  onChange={e => updateBlog(blog.id, 'publishDate', e.target.value)}
                  className="w-full p-2 border rounded-lg"
                />
              </div>

              {/* Is Published */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Is Published</label>
                <input
                  type="checkbox"
                  checked={blog.isPublished}
                  onChange={e => updateBlog(blog.id, 'isPublished', e.target.checked)}
                  className="mr-2"
                />
                <span>{blog.isPublished ? 'Published' : 'Unpublished'}</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-end">
        <button
          className="px-4 py-2 bg-teal-500 text-white rounded-lg hover:bg-teal-600"
          onClick={saveChanges}
        >
          Save Changes
        </button>
      </div>
    </div>
  );
}
