import { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Row, Col } from 'react-bootstrap';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Header from './components/Header';
import Search from './components/Search';
import ImageCard from './components/ImageCard';
import Welcome from './components/Welcome';
import Spinner from './components/Spinner';

const API_URL = process.env.REACT_APP_API_URL || 'http://127.0.0.1:5050';

const App = () => {
  const [word, setWord] = useState('');
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(true);

  const getSavedImages = async () => {
    try {
      const res = await axios.get(`${API_URL}/images`);

      setImages(res.data || []);
      setLoading(false);

      toast.success('Saved images downloaded');
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  useEffect(() => {
    let ignore = false;

    if (!ignore) getSavedImages();

    return () => {
      ignore = true;
    };
  }, []);

  const handleSearchSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.get(`${API_URL}/new-image?query=${word}`);
      setImages([{ ...res.data, title: word }, ...images]);

      toast.info(`New image ${word.toUpperCase()} was found`);
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }

    setWord('');
  };

  const handleDeleteImage = async (id) => {
    try {
      const res = await axios.delete(`${API_URL}/images/${id}`);

      if (res.data?.deleted_id) {
        const deletedImage = images.find((i) => i.id === id);
        toast.warn(`Image ${deletedImage.title.toUpperCase()} was deleted`);

        setImages(images.filter((image) => image.id !== id));
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  const handleRemoveImage = (id) => {
    setImages(images.filter((image) => image.id !== id));
  };

  const handleSaveImage = async (id) => {
    const imageToBeSaved = images.find((image) => image.id === id);
    imageToBeSaved.saved = true;

    try {
      const res = await axios.post(`${API_URL}/images`, imageToBeSaved); // axios converts to json
      if (res.data?.inserted_id) {
        setImages(
          images.map((image) =>
            image.id === id ? { ...image, saved: true } : image
          )
        );

        toast.info(`New image ${imageToBeSaved.title.toUpperCase()} was saved`);
      }
    } catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  };

  return (
    <div className="App">
      <Header title="Images Gallery" />
      {loading ? (
        <Spinner />
      ) : (
        <>
          <Search
            word={word}
            setWord={setWord}
            handleSubmit={handleSearchSubmit}
          />
          <Container className="mt-4">
            {images.length ? (
              <Row xs={1} md={2} lg={3}>
                {images.map((image, i) => (
                  <Col key={i} className="pb-3">
                    <ImageCard
                      image={image}
                      deleteImage={handleDeleteImage}
                      removeImage={handleRemoveImage}
                      saveImage={handleSaveImage}
                    />
                  </Col>
                ))}
              </Row>
            ) : (
              <Welcome />
            )}
          </Container>
        </>
      )}
      <ToastContainer position="bottom-right" />
    </div>
  );
};

export default App;
