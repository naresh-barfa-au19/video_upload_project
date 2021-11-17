import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
const Home = () => {
  const [videoData, setUsers] = useState();

  useEffect(() => {
    const fetchUsers = async () => {
      const res = await fetch(`http://localhost:5000/upload_video`);

      const data = await res.json();
      setUsers(data);
    };
    fetchUsers();
  }, []);

  const handleDelete = async (_id) => {
    console.log(_id);
    try {
      const res = await fetch(`http://localhost:5000/${_id}`, {
        method: "DELETE",
      });
      console.log(" inside try");
      if (res.ok) {
        const updatedUsers = videoData.filter((data) => data._id !== _id);
        setUsers(updatedUsers);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="row">
      {videoData?.map((vidData) => (
        <div className="col-3 card me-3 mt-2 p-0" key={vidData._id}>
          <video controls>
            <source src={vidData.url} type="video/mp4"></source>
          </video>
          <div className="p-2">
            <h3>{vidData.title}</h3>
            <div>{vidData.discription}</div>
            <div>{vidData.created_at}</div>
            <div className="d-flex justify-content-between align-items-center">
              <button
                className="btn btn-danger btn-sm"
                onClick={() => handleDelete(vidData._id)}
                type="submit"
              >
                Delete video
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Home;
