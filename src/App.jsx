import { useState, useEffect } from "react";
import "./App.css";
import Blogs from "./components/Blogs/Blogs.jsx";
import Navbar from "./components/Navbar/Navbar.jsx";
import Swal from "sweetalert2";

function App() {
  const [bookmarked, setBookmarked] = useState([]);
  const [readingCount, setReadingCount] = useState(0);
  const [readBlogs, setReadBlogs] = useState(new Set());

  // Load saved data from localStorage
  useEffect(() => {
    const savedBookmarks = localStorage.getItem("bookmarked");
    const savedReadingTime = localStorage.getItem("readingCount");
    const savedReadBlogs = localStorage.getItem("readBlogs");

    if (savedBookmarks) setBookmarked(JSON.parse(savedBookmarks));
    if (savedReadingTime) setReadingCount(Number(savedReadingTime));
    if (savedReadBlogs) setReadBlogs(new Set(JSON.parse(savedReadBlogs)));
  }, []);

  // Save data to localStorage
  useEffect(() => {
    localStorage.setItem("bookmarked", JSON.stringify(bookmarked));
    localStorage.setItem("readingCount", readingCount.toString());
    localStorage.setItem("readBlogs", JSON.stringify([...readBlogs]));
  }, [bookmarked, readingCount, readBlogs]);

  const handleBookmark = (blog) => {
    const blogId = String(blog.id);

    if (readBlogs.has(blogId)) {
      Swal.fire({
        position: "center",
        icon: "warning",
        title: "Already Read!",
        text: "Cannot bookmark after reading",
        showConfirmButton: false,
        timer: 1500,
        background: "#fff1f2",
        color: "#d6408a",
      });
      return;
    }

    setBookmarked((prev) => {
      const isBookmarked = prev.some((item) => String(item.id) === blogId);

      if (isBookmarked) {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Removed from bookmarks!",
          showConfirmButton: false,
          timer: 1500,
          background: "#fff1f2",
          color: "#d6408a",
        });
        return prev.filter((item) => String(item.id) !== blogId);
      } else {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "Added to bookmarks!",
          showConfirmButton: false,
          timer: 1500,
          background: "#fff1f2",
          color: "#d6408a",
        });
        return [...prev, blog];
      }
    });
  };

  const handleMarkAsRead = (time, id) => {
    const blogId = String(id);

    if (readBlogs.has(blogId)) return;

    setReadingCount((prev) => prev + time);
    setReadBlogs((prev) => new Set(prev).add(blogId));
    setBookmarked((prev) => prev.filter((item) => String(item.id) !== blogId));

    Swal.fire({
      position: "center",
      icon: "success",
      title: `Added ${time} mins to reading time`,
      showConfirmButton: false,
      timer: 1500,
      background: "#fff1f2",
      color: "#d6408a",
    });
  };

  return (
    <div className="min-h-screen bg-pink-50">
      <Navbar readingTime={readingCount} bookmarkedCount={bookmarked.length} />

      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-3/4">
            <Blogs
              handleBookmark={handleBookmark}
              handleMarkAsRead={handleMarkAsRead}
              readBlogs={readBlogs}
              bookmarked={bookmarked}
            />
          </div>

          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-2xl shadow-cute sticky top-4 border-2 border-pink-200">
              <div className="mb-6 text-center">
                <h2 className="text-xl font-bold text-pink-600 mb-2">
                  📖 Total Reading:{" "}
                  <span className="text-purple-600">{readingCount}</span> mins
                </h2>
                <h2 className="text-xl font-bold text-pink-600">
                  ❤️ Saved:{" "}
                  <span className="text-purple-600">{bookmarked.length}</span>
                </h2>
              </div>

              {bookmarked.length > 0 ? (
                <div>
                  <h3 className="font-semibold text-lg mb-3 text-center text-pink-500">
                    🌟 Your Saved Stories
                  </h3>
                  <div className="space-y-3 max-h-[400px] overflow-y-auto cute-scrollbar">
                    {bookmarked.map((marked) => (
                      <div
                        key={marked.id}
                        className="p-3 bg-pink-100 rounded-xl hover:bg-pink-200 transition-all"
                      >
                        <h4 className="font-medium text-pink-800">
                          {marked.title}
                        </h4>
                        <div className="flex justify-between items-center mt-2 text-xs text-pink-600">
                          <span>👤 {marked.author}</span>
                          <span>📅 {marked.posted_date}</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="text-center py-4">
                  <p className="text-pink-400">No saved stories yet</p>
                  <div className="mt-2 text-4xl">📚</div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
