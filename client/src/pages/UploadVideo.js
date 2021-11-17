import { useState } from "react";
import { useHistory } from "react-router-dom";

const UploadVideo = () => {
  const history = useHistory();
  const [data, setData] = useState({
    title: "",
    video: "",
    discription: "",
  });
  const handleChange = (name) => (e) => {
    const value = name === "video" ? e.target.files[0] : e.target.value;
    setData({ ...data, [name]: value });
  };
  const handleSubmit = async () => {
    try {
      let formData = new FormData();
      formData.append("video", data.video);
      formData.append("title", data.title);
      formData.append("discription", data.discription);
      const res = await fetch(`http://localhost:5000/upload_video`, {
        method: "POST",
        body: formData,
      });
      if (res.ok) {
        setData({ title: "", video: "", discription: "" });
        history.replace("/");
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div style={{ maxWidth: 500, margin: "auto" }}>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Enter Title"
          type="text"
          name="title"
          value={data.title}
          onChange={handleChange("title")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          placeholder="Discription"
          type="text"
          name="discription"
          value={data.discription}
          onChange={handleChange("discription")}
        />
      </div>
      <div className="mb-3">
        <input
          className="form-control"
          type="file"
          name="video"
          onChange={handleChange("video")}
        />
      </div>
      <div className="text-center">
        <button
          className="btn btn-primary"
          type="submit"
          onClick={handleSubmit}
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default UploadVideo;
