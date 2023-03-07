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

  const url = process.env.REACT_APP_URL;

  const { id } = params;
  const getBlogPosts = async () => {
    try {
      const res = await fetch(url + "/blogPosts");
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
          <div className="d-flex w-100 align-items-center justify-content-between">
            <h1 className="blog-details-title">{blog.title}</h1>
            <a
              onClick={(e) => e.stopPropagation()}
              href={url + `/blogPosts/${id}/pdf/download`}
              style={{
                padding: "0.2rem 0.5rem",
                borderRadius: "2rem",
                boxShadow: "0px 0px 1px 1px grey",
                textDecoration: "none",
                color: "black",
              }}
            >
              <svg width="16px" height="16px" viewBox="0 0 24 24" fill="none">
                <path
                  d="M9.163 2.819C9 3.139 9 3.559 9 4.4V11H7.803c-.883 0-1.325 0-1.534.176a.75.75 0 0 0-.266.62c.017.274.322.593.931 1.232l4.198 4.401c.302.318.453.476.63.535a.749.749 0 0 0 .476 0c.177-.059.328-.217.63-.535l4.198-4.4c.61-.64.914-.96.93-1.233a.75.75 0 0 0-.265-.62C17.522 11 17.081 11 16.197 11H15V4.4c0-.84 0-1.26-.164-1.581a1.5 1.5 0 0 0-.655-.656C13.861 2 13.441 2 12.6 2h-1.2c-.84 0-1.26 0-1.581.163a1.5 1.5 0 0 0-.656.656zM5 21a1 1 0 0 0 1 1h12a1 1 0 1 0 0-2H6a1 1 0 0 0-1 1z"
                  fill="#000000"
                />
              </svg>
              <span>PDF</span>
            </a>
          </div>

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
