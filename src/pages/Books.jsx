import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdClose } from "react-icons/md";
import { AddBook, Update } from "../components";

const Books = () => {
  const [books, setBooks] = useState([]);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedBook, setSelectedBook] = useState(null);
  const [updateModalOpen, setUpdateModalOpen] = useState(false);

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const updateBooks = (newBook) => {
    setBooks([...books, newBook]);
  };

  // Function to set the selected book when the Update button is clicked
  const handleUpdateClick = (book) => {
    setSelectedBook(book);
    openUpdateModal();
  };

  // Function to open the Update modal
  const openUpdateModal = () => {
    setUpdateModalOpen(true);
  };

  // Function to close the Update modal
  const closeUpdateModal = () => {
    setUpdateModalOpen(false);
    setSelectedBook(null);
  };

  useEffect(() => {
    const fetchAllBooks = async () => {
      try {
        const res = await axios.get("http://localhost:8800/books");
        setBooks(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchAllBooks();
  }, []);

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:8800/books/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div className="mt-10">
      <div>
        <h1 className="ml-20 font-bold text-3xl">Book Shop</h1>
        <div className="flex flex-wrap mt-10 lg:flex-row-reverse gap-4 justify-center">
          {books.map((book) => (
            <div
              className="max-w-xs bg-white p-6 rounded-lg shadow-md w-full lg:w-1/5 mb-4 lg:mb-0"
              key={book.id}
            >
              {book.cover && (
                <img
                  className="w-full h-40 object-cover mb-4 rounded-md"
                  src={`./images/${book.cover}`}
                  alt=""
                />
              )}
              <h2 className="text-xl font-semibold mb-2">{book.title}</h2>
              <p className="text-gray-600 mb-4">{book.desc}</p>
              <span className="text-green-500 font-bold text-md">
                &#8369;{book.price}
              </span>
              <div className="flex justify-between mt-4">
                <button
                  onClick={() => handleUpdateClick(book)}
                  className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
                <div className="gap-1">
                  <button
                    onClick={() => handleDelete(book.Id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
                  >
                    Delete
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
        <div className="flex items-center justify-center mt-10">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
            onClick={openModal}
          >
            Add New Book
          </button>

          {/* is Modal Open */}
          {modalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-md relative">
                <button
                  className="absolute top-2 right-5 text-xl text-gray-600 hover:text-gray-800"
                  onClick={closeModal}
                >
                  <MdClose />
                </button>
                <AddBook closeModal={closeModal} updateBooks={updateBooks} />
              </div>
            </div>
          )}

          {updateModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
              <div className="bg-white p-8 rounded shadow-md relative">
                <button
                  className="absolute top-2 right-5 text-xl text-gray-600 hover:text-gray-800"
                  onClick={closeUpdateModal}
                >
                  <MdClose />
                </button>
                <Update
                  book={selectedBook}
                  closeModal={closeUpdateModal}
                  updateBooks={updateBooks}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Books;
