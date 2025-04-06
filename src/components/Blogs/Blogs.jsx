import { useState, useEffect } from "react";
import Blog from "../Blog/Blog.jsx";
import Swal from "sweetalert2";

const Blogs = ({ handleBookmark, handleMarkAsRead, readBlogs, bookmarked }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const response = await fetch("/blogs.json");
        if (!response.ok) throw new Error("Failed to fetch");
        const data = await response.json();
        setBlogs(data);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        Swal.fire({
          title: "Error!",
          text: "Failed to load blogs. Please try again later.",
          icon: "error",
          confirmButtonText: "OK",
          background: "#fff1f2",
          color: "#d6408a",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-pink-500"></div>
      </div>
    );
  }

  if (!blogs.length && !loading) {
    return (
      <div className="text-center py-10">
        <p className="text-pink-500 text-xl">No blogs found</p>
      </div>
    );
  }

  return (
    <div>
      <h1 className="text-3xl font-bold mb-6 text-pink-700 flex items-center gap-2">
        <span>All Stories</span>
        <span className="text-sm bg-pink-200 text-pink-700 px-3 py-1 rounded-full">
          {blogs.length} found
        </span>
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Blog
            key={blog.id}
            blog={blog}
            handleBookmark={handleBookmark}
            handleMarkAsRead={handleMarkAsRead}
            readBlogs={readBlogs}
            bookmarked={bookmarked}
          />
        ))}
      </div>
    </div>
  );
};

export default Blogs;
