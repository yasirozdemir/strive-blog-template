import React, { useEffect, useState } from "react";
import { Container, Image } from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import BlogAuthor from "../../components/blog/blog-author/BlogAuthor";
import BlogLike from "../../components/likes/BlogLike";
import "./styles.css";
const Blog = (props) => {
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const params = useParams();
  const navigate = useNavigate();

  const url = new URL("http://localhost:3001/blogPosts");

  const { id } = params;
  const getBlogPosts = async () => {
    try {
      const res = await fetch(url.href);
      if (res.ok) {
        const blogPostsData = await res.json();
        const blog = blogPostsData?.find((post) => post.id === id);
        if (blog) {
          setBlog(blog);
          setLoading(false);
        } else {
          navigate("/404");
        }
      } else {
        console.log("error");
        navigate("/404");
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogPosts();
    // eslint-disable-next-line
  }, []);

  if (loading) {
    return <div>loading</div>;
  } else {
    return (
      <div className="blog-details-root">
        <Container>
          <Image className="blog-details-cover" src={blog.cover} fluid />
          <h1 className="blog-details-title">{blog.title}</h1>

          <div className="blog-details-container">
            <div className="blog-details-author">
              <BlogAuthor {...blog.author} />
            </div>
            <div className="blog-details-info">
              <div>{blog.createdAt}</div>
              <div>{`${blog.readTime.value} ${blog.readTime.unit} read`}</div>
              <div
                style={{
                  marginTop: 20,
                }}
              >
                <BlogLike defaultLikes={["123"]} onChange={console.log} />
              </div>
            </div>
          </div>

          <div
            dangerouslySetInnerHTML={{
              __html: blog.content,
            }}
          ></div>
        </Container>
      </div>
    );
  }
};

export default Blog;
