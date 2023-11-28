import React, {useState, useEffect} from 'react';
import MovieDataService from '../services/movies.js';
import moment from 'moment';
import { Link, useParams } from 'react-router-dom';
import { Card, Col, Container, Row, Image, Button } from 'react-bootstrap';

const Movie = ({ user }) => {
  const { id } = useParams();

  const [movie, setMovie] = useState({
    id: null,
    title: " ",
    rated: " ",
    reviews: []
  })

  const getMovie = (id) => {
    MovieDataService.get(id)
    .then(response => {
      setMovie(response.data)
      console.log(response.data)
    })
    .catch(error => {
      console.log(error);
    })
  }

  useEffect(() => {
    getMovie(id)
  }, [id])

  const deleteReview = (reviewId, index) => {
    MovieDataService.deleteReview(reviewId, id)
      .then(response => {
        setMovie((prevState) => {
          prevState.reviews.splice(index, 1)
          return({
            ...prevState
          })
        })
      })
      .catch(error => {
        console.log(error)
      })
  }

  return (
    <div>
      <Container>
        <Row>
          <Col>
            <Image src={movie.poster+"/100px250"} fluid />
          </Col>
          <Col>
          <Card>
            <Card.Header as="h5">{movie.title}</Card.Header>
            <Card.Body>
              <Card.Text>
                {movie.plot}
              </Card.Text>
              {user && 
              <Link to={`/movies/${id}/review`}>
                  Add Review
              </Link>}
            </Card.Body>
          </Card>
          <br></br>
          <h2>Reviews</h2>
          <br></br>
          {movie.reviews.map((review, index) =>{
            return (
              <Card key={index}>
                <Card.Body>
                  <h5>{review.name + " reviewed on "} {moment(review.date).format("Do MMMM YYYY")}</h5>
                  <p>{review.review}</p>
                  {user && user.id === review.user_id && 
                    <Row>
                      <Col><Link to={{
                        pathname: `/movies/${id}/review`,
                        state: {currentReview: review}}}>Edit</Link>                        
                      </Col>
                      <Col><Button variant='link' onClick={() => deleteReview(review._id, index)}>Delete</Button></Col>
                    </Row>
                  }
                </Card.Body>
              </Card>
            )
          })}
          </Col>
        </Row>
      </Container>
    </div>
  )
}

export default Movie