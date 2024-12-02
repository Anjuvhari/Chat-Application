import React, { useState } from "react";
import axios from "axios";

const CreateActivity = () => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const handleCreateActivity = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      await axios.post(
        "http://localhost:5000/api/activities",
        { title, description },
        { headers: { Authorization: token } }
      );
      alert("Activity created successfully!");
    } catch (error) {
      alert("Failed to create activity: " + error.response.data);
    }
  };

  return (
    <form onSubmit={handleCreateActivity}>
      <h1>Create Activity</h1>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <textarea
        placeholder="Description"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      ></textarea>
      <button type="submit">Create</button>
    </form>
  );
};

export default CreateActivity;
