import React, { useState, useEffect } from "react";
import axios from "axios";

const Activities = () => {
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    const fetchActivities = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("http://localhost:5000/api/activities", {
          headers: { Authorization: token },
        });
        setActivities(res.data);
      } catch (error) {
        alert("Failed to fetch activities: " + error.response.data);
      }
    };

    fetchActivities();
  }, []);

  return (
    <div>
      <h1>My Activities</h1>
      {activities.map((activity) => (
        <div key={activity._id}>
          <h2>{activity.title}</h2>
          <p>{activity.description}</p>
        </div>
      ))}
    </div>
  );
};

export default Activities;
