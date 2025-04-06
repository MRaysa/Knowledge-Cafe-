import { FaBookmark, FaHeart } from "react-icons/fa";

const Blog = ({
  blog,
  handleBookmark,
  handleMarkAsRead,
  readBlogs,
  bookmarked,
}) => {
  const isRead = readBlogs.has(String(blog.id));
  const isBookmarked = bookmarked.some(
    (item) => String(item.id) === String(blog.id)
  );

  return (
    <div className={`mb-8 ${isRead ? "opacity-80" : ""}`}>
      <div
        className={`bg-white rounded-2xl overflow-hidden shadow-cute hover:shadow-cute-hover transition-all duration-500 ${
          isRead ? "border-2 border-green-200" : "border-2 border-pink-200"
        }`}
      >
        <figure className="relative h-48 overflow-hidden">
          <img
            src={blog.cover}
            alt="Blog Cover"
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-110"
          />
          <button
            onClick={() => handleBookmark(blog)}
            className={`absolute top-3 right-3 p-2 rounded-full transition-all duration-300 ${
              isBookmarked
                ? "bg-pink-500 text-white hover:bg-pink-600"
                : "bg-pink-100/90 hover:bg-pink-200"
            } ${isRead ? "cursor-not-allowed opacity-50" : ""}`}
            aria-label={isBookmarked ? "Remove bookmark" : "Add bookmark"}
            disabled={isRead}
          >
            <FaBookmark className="text-xl" />
          </button>
        </figure>

        <div className="p-5">
          <h2 className="text-xl font-bold mb-2 text-pink-800">{blog.title}</h2>
          <p className="text-pink-500 text-sm mb-4">⏰ {blog.posted_date}</p>

          <div className="flex items-center gap-3 mb-4">
            <img
              className="w-10 h-10 rounded-full object-cover border-2 border-pink-300"
              src={blog.author_img}
              alt="Author"
            />
            <div>
              <h3 className="font-medium text-pink-700">{blog.author}</h3>
              <p className="text-pink-400 text-sm">✨ Author</p>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 my-3">
            {blog.hashtags.map((has, index) => (
              <span
                key={index}
                className="text-xs bg-pink-100 px-3 py-1 rounded-full text-pink-600"
              >
                #{has}
              </span>
            ))}
          </div>

          <button
            onClick={() => handleMarkAsRead(blog.reading_time, blog.id)}
            disabled={isRead}
            className={`w-full mt-4 py-2 px-4 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 ${
              isRead
                ? "bg-green-100 text-green-700 cursor-not-allowed"
                : "bg-gradient-to-r from-pink-400 to-purple-400 hover:from-pink-500 hover:to-purple-500 text-white hover:shadow-lg"
            }`}
          >
            <FaHeart />
            {isRead
              ? "Already Read"
              : `Mark as read (${blog.reading_time} min)`}
          </button>
        </div>
      </div>
    </div>
  );
};

export default Blog;
