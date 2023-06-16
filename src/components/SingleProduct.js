import { Card } from 'react-bootstrap';

const SingleProduct = ({product}) => {

  const { title, description, thumbnail } = product;
  return (
    <Card style={{ width: '18rem' }} className='m-2'>
      <Card.Img variant="top" src={thumbnail} />
      <Card.Body>
        <Card.Title>{title}</Card.Title>
        <Card.Text>{description}</Card.Text>
      </Card.Body>
    </Card>
  );
};

export default SingleProduct;