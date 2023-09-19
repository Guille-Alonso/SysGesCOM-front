import { Card } from "react-bootstrap";

const GifCard = ({image, title}) => {
  return ( 
    <Card className="m-1" style={{ width: '16rem'}}>
      <Card.Img variant="top" src={image} style={{ height: '11rem'}}/>
      <Card.Body>
        <Card.Title>{title}</Card.Title>
      </Card.Body>
    </Card>
  );
}
 
export default GifCard;