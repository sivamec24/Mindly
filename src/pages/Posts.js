import { useEffect, useState } from "react";
import axios from "axios";

const API_URL = "http://localhost:3001/posts";

function Posts() {
  const [posts, setPosts] = useState([]);
  const [search, setSearch] = useState("");
  const [username, setUsername] = useState("");
  const [body, setBody] = useState("");
  const [editId, setEditId] = useState(null);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await axios.get(API_URL);
      setPosts(response.data.reverse());
    };
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!username || !body) return;

    const newPost = { username, body, likes: 0, comments: 0 };

    if (editId) {
      await axios.put(`${API_URL}/${editId}`, newPost);
    } else {
      await axios.post(API_URL, newPost);
    }

    const response = await axios.get(API_URL);
    setPosts(response.data.reverse());
    setUsername("");
    setBody("");
    setEditId(null);
  };

  const handleDelete = async (id) => {
    await axios.delete(`${API_URL}/${id}`);
    const response = await axios.get(API_URL);
    setPosts(response.data.reverse());
  };

  const handleEdit = (post) => {
    setUsername(post.username);
    setBody(post.body);
    setEditId(post.id);
  };

  return (
    <section className="Posts">
      <form className="postForm" onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <textarea
          placeholder="What's on your mind?"
          value={body}
          onChange={(e) => setBody(e.target.value)}
        ></textarea>
        <button type="submit">{editId ? "Update" : "Post"}</button>
      </form>

      <input
        className="searchInput"
        type="text"
        placeholder="Search posts"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      {posts
        .filter((post) =>
          post.body.toLowerCase().includes(search.toLowerCase())
        )
        .map((post) => (
          <div className="postCard" key={post.id}>
            <h4>@{post.username}</h4>
            <p>{post.body}</p>
            <p>❤️ {post.likes} Likes</p>
            <p>💬 {post.comments} Comments</p>
            <button className="editBtn" onClick={() => handleEdit(post)}>Edit</button>
            <button className="deleteBtn" onClick={() => handleDelete(post.id)}>Delete</button>
          </div>
        ))}
    </section>
  );
}
export default Posts;
