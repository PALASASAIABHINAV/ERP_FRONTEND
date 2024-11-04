import React, { useState, useEffect } from "react";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import Data from "./Data";

function Feedback() {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch("http://localhost:3008/api/feedback/result");
        const feedbackData = await res.json();
        setData(feedbackData);
      } catch (err) {
        console.error("Error fetching feedback:", err);
      }
    };
    fetchData();
  }, []);

  useGSAP(() => {
    gsap.from(".headding", {
      opacity: 0,
      duration: 1,
    });
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await fetch("http://localhost:3008/api/feedback", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          fName: document.getElementById("fName").value,
          cName: document.getElementById("cName").value,
          cSkills: document.getElementById("cSkills").value,
        }),
      });

      // Refresh data after submission
      const res = await fetch("http://localhost:3008/api/feedback/result");
      const newData = await res.json();
      setData(newData);
    } catch (err) {
      console.error("Error submitting feedback:", err);
    }
  };

  return (
    <div className="w-full h-[85vh]  mx-auto overflow-scroll  p-4 bg-white shadow-md rounded-lg">
      <h1 className="headding text-center text-red-500 font-bold font-[oswald] text-4xl  mt-6 tracking-wide">
        Feedback
      </h1>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label
            htmlFor="fName"
            className="block text-sm font-bold text-red-700"
          >
            Faculty Name:
          </label>
          <input
            type="text"
            id="fName"
            required
            className="mt-1 font-bold p-2 border border-black rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="cName"
            className="block text-sm font-bold text-red-700"
          >
            Course Name:
          </label>
          <input
            type="text"
            id="cName"
            required
            className="mt-1 font-bold p-2 border border-black rounded-md w-full"
          />
        </div>
        <div>
          <label
            htmlFor="cSkills"
            className="block text-sm font-bold text-red-700"
          >
            CSkills:
          </label>
          <select
            id="cSkills"
            className="mt-1 p-2 border border-black rounded-md w-full"
          >
            <option></option>
            <option value="Excellent">Excellent</option>
            <option value="Good">Good</option>
            <option value="Need to Improve">Average</option>
          </select>
        </div>
        <center>
          <button
            type="submit"
            className="mt-2 w-[15%] font-bold bg-red-600 text-white py-2 px-4 rounded-md hover:bg-red-800"
          >
            Submit
          </button>
        </center>
      </form>
      <Data data1={data} />
    </div>
  );
}

export default Feedback;
