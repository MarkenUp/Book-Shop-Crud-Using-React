import React, { useState } from "react";
import axios from "axios";

const Update = ({ book, closeModal, updateBooks }) => {
  const [updatedBook, setUpdatedBook] = useState({
    title: book.title,
    desc: book.desc,
    price: book.price,
    cover: book.cover,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUpdatedBook((prevBook) => ({
      ...prevBook,
      [name]: value,
    }));
  };

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:8800/books/${book.Id}`, updatedBook);
      updateBooks(updatedBook);
      closeModal();
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="flex items-center justify-center h-full">
      <div className="p-8 rounded">
        <h2 className="text-2xl font-bold mb-4">Edit Book</h2>
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Title:
        </label>
        <input
          type="text"
          name="title"
          value={updatedBook.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Description:
        </label>
        <textarea
          name="desc"
          value={updatedBook.desc}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        ></textarea>
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Price:
        </label>
        <input
          type="number"
          name="price"
          value={updatedBook.price}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focuse:border-blue-500"
        />
        <label className="block text-sm font-semibold text-gray-600 mb-1">
          Cover:
        </label>
        <input
          type="text"
          name="cover"
          value={updatedBook.cover}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-md focus:outline-none focus:border-blue-500"
        />
        <div className="flex justify-center items-center mt-4">
          <button
            onClick={handleUpdate}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Update
          </button>
        </div>
      </div>
    </div>
  );
};

export default Update;
