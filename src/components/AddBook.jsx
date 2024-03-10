import React, { useState } from "react";
import axios from "axios";

const AddBook = ({ closeModal, updateBooks }) => {
  const [addBook, setAddBook] = useState({
    title: "",
    desc: "",
    price: null,
    cover: "",
  });

  const handleChange = (e) => {
    setAddBook((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleClick = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:8800/books", addBook);
      closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-8 rounded">
        <h1 className="text-2xl font-bold mb-4">Add New Book</h1>
        <input
          type="text"
          placeholder="Title"
          onChange={handleChange}
          name="title"
          className="w-full border border-gray-300 rounded py-2 px-3 mb-3"
        />
        <input
          type="text"
          placeholder="Description"
          onChange={handleChange}
          name="desc"
          className="w-full border border-gray-300 rounded py-2 px-3 mb-3"
        />
        <input
          type="number"
          placeholder="price"
          onChange={handleChange}
          name="price"
          className="w-full border border-gray-300 rounded py-2 px-3 mb-3"
        />
        <input
          type="text"
          placeholder="cover"
          onChange={handleChange}
          name="cover"
          className="w-full border border-gray-300 rounded py-2 px-3 mb-3"
        />

        <button
          onClick={handleClick}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded block mx-auto mt-3"
        >
          Add
        </button>
      </div>
    </div>
  );
};

export default AddBook;
