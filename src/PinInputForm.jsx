import { useState } from "react";

export default function PinInputForm({ onSubmit }) {
  const [student_id, setStudent_id] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(student_id);
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="p-4 max-w-sm mx-auto">
        <label className="block mb-2 text-lg font-bold">Enter Student ID</label>
        <input
          type="text"
          value={student_id}
          onChange={(e) => setStudent_id(e.target.value)}
          placeholder="e.g. 1234-AB"
          className="border rounded p-2 w-full mb-4"
          required
        />
        <button
          type="submit"
          className="p-2 w-full border-solid border-blue-900 border-2 bg-blue-900 text-gray-100 hover:text-blue-900 hover:bg-gray-100 gray duration-300 cursor-pointer px-4 py-2 rounded font-bold "
        >
          Get Result
        </button>
      </form>
    </>
  );
}
