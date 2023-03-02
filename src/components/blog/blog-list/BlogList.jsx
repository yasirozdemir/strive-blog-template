import React, { useEffect, useState } from "react";
import { Col, Row } from "react-bootstrap";
import BlogItem from "../blog-item/BlogItem";

const BlogList = (props) => {
  const [blogPosts, setBlogPosts] = useState([]);
  const url = new URL("http://localhost:3001/blogPosts");

  const getBlogPosts = async () => {
    try {
      const res = await fetch(url.href);
      if (res.ok) {
        const blogPostsData = await res.json();
        setBlogPosts(blogPostsData);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBlogPosts();
    // eslint-disable-next-line
  }, []);

  return (
    <Row>
      {blogPosts &&
        blogPosts.map((post) => (
          <Col
            key={post.id}
            md={4}
            style={{
              marginBottom: 50,
            }}
          >
            <BlogItem {...post} />
          </Col>
        ))}
    </Row>
  );
};

export default BlogList;
