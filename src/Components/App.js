import React, { useState, useEffect } from "react";
import fetchImages from "../services/images/ApiImg";
import Container from "./Container";
import Searchbar from "./Searchbar";
import ImageGallery from "./ImageGallery";
import Button from "./Button/Button";
import LoaderComponent from "./Loader";
import Modal from "./Modal";
import ErrorComponent from "./Error";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { animateScroll as scroll } from "react-scroll";
import "./App.css";

const App = () => {
  const [query, setQuery] = useState("");
  const [images, setImages] = useState([]);
  const [page, setPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [largeImageURL, setLargeImageURL] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    setImages([]);
    setPage(1);
    setError(null);
  }, [query]);

  const handleChange = (e) => {
    setQuery(e.target.value);
  };

  const toggleLoader = () => {
    setIsLoading((prev) => !prev);
  };

  const renderImages = async () => {
    if (!query.trim()) {
      return toast.info("Please enter a value for search images!");
    }

    toggleLoader();

    try {
      const request = await fetchImages(query, page);
      setImages((prev) => [...prev, ...request]);
      setPage((prev) => prev + 1);

      if (request.length === 0) {
        setError(`No results found for ${query}!`);
      }
    } catch (error) {
      setError("Something wrong. Try again.");
    } finally {
      toggleLoader();
    }
  };

  const onLoadMore = () => {
    renderImages();
    scroll.scrollToBottom();
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    renderImages();
  };

  const toggleModal = () => {
    setShowModal((prev) => !prev);
  };

  const onOpenModal = (e) => {
    setLargeImageURL(e.target.dataset.source);
    toggleModal();
  };

  return (
    <Container>
      <Searchbar
        onHandleSubmit={handleSubmit}
        onHandleChangeQuery={handleChange}
        query={query}
      />

      {error && <ErrorComponent texterror={error} />}

      {isLoading && <LoaderComponent />}

      {images.length > 0 && !error && (
        <ImageGallery images={images} onOpenModal={onOpenModal} />
      )}

      {!isLoading && images.length > 0 && !error && (
        <Button onLoadMore={onLoadMore} />
      )}

      {showModal && (
        <Modal onToggleModal={toggleModal} largeImageURL={largeImageURL} />
      )}

      <ToastContainer />
    </Container>
  );
};

export default App;
