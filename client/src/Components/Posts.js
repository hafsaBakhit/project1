import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { getPosts } from "../Feature/PostSlice";
import { Table } from "reactstrap";
import moment from "moment";


const Posts = () => {
  const posts = useSelector((state) => state.posts.posts);
  const email = useSelector((state) => state.user.user.email);

  const navigate = useNavigate();
  const dispatch = useDispatch();
    useEffect(() => {
    dispatch(getPosts());
  }, []);
  return (
  


    <div className="postsContainer">
      <Table className="table table-striped">
        <thead></thead>
        <tbody>
          {posts.map((post) => (
            <tr key={post._id}>
              {/* Ensure to add a unique key for each row */}
              <td>{post.email}</td>
              <td>
                <p> {moment(post.createdAt).fromNow()}</p>
                <td>
                {post.postMsg}
                </td>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>


      <h1>Display Posts</h1>
    </div> /* End of posts */
  );
};

export default Posts;
