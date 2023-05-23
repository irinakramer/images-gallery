import React from 'react';
import { Card, Button, Nav } from 'react-bootstrap';

const ImageCard = ({ image, deleteImage, removeImage, saveImage }) => {
  const authorName = image.user?.name;
  const authorPortfolioUrl = image.user?.portfolio_url;

  return (
    <Card style={{ width: '18rem' }}>
      <Card.Img variant="top" src={image.urls.small} />
      <Card.Body>
        <Card.Title>{image.title?.toUpperCase()}</Card.Title>
        <Card.Text>{image.description || image.alt_description}</Card.Text>
        {image.saved && (
          <Button
            variant="primary"
            onClick={() => {
              deleteImage(image.id);
            }}
          >
            Delete
          </Button>
        )}
        {!image.saved && (
          <>
            <Button
              variant="secondary"
              className="me-2"
              onClick={() => saveImage(image.id)}
            >
              Save
            </Button>
            <Button variant="light" onClick={() => removeImage(image.id)}>
              Remove
            </Button>
          </>
        )}
      </Card.Body>
      <Card.Footer className="text-muted text-center">
        {authorPortfolioUrl && (
          <Nav.Link href={authorPortfolioUrl} target="_blank">
            {authorName}
          </Nav.Link>
        )}

        {!authorPortfolioUrl && authorName}
      </Card.Footer>
    </Card>
  );
};

export default ImageCard;
