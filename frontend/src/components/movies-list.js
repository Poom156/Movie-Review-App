import React, {useState, useEffect} from "react";
import MovieDataService from "../services/movies.js";
import { Link } from "react-router-dom";
import { Button, Card, Col, Container, Form, Row } from "react-bootstrap";

const MoviesList = () => {
  const [movies, setMovies] = useState([]);
  const [searchTitle, setSearchTitle] = useState(" ");
  const [searchRating, setSearchRating] = useState(" ");
  const [ratings, setRatings] = useState(["All Ratings"]);

  const [currentPage, setCurrentPage] = useState(0);
  const [entriesPerPage, setEntriesPerPage] = useState(0);
  const [currentSearchMode, setCurrentSearchMode] = useState(" ");

  
  useEffect(() => {
    setCurrentPage(0)
  }, [currentSearchMode])

  useEffect(() => {
    retrieveMovies()
    retrieveNextPage()
    retrieveRatings()
  }, [currentPage])

  const retrieveNextPage = () => {
    if (currentSearchMode === "findByTitle") {
      findByTitle()
    } else if (currentSearchMode === "findByRating") {
      findByRating()
    } else {
      retrieveMovies()
    }
  }
  
  const retrieveMovies = () => {
    setCurrentSearchMode(" ")
    MovieDataService.getAll(currentPage).then(response => {
      console.log(response.data)
      setMovies(response.data.movies)
      setCurrentPage(response.data.page)
      setEntriesPerPage(response.data.entries_per_page)
    })
    .catch( error =>{
      console.log(error)
    })
  }
  
  const retrieveRatings = () => {
    MovieDataService.getRatings()
    .then(response =>{
      console.log(response.data)
      setRatings(["All Ratings"].concat(response.data))
    })
    .catch( error => {
      console.log(error)
    })
  }

  
  //Search form
  
  const onChangeSearchTitle = error => {
    const searchTitle = error.target.value
    setSearchTitle(searchTitle);
  }

  const onChangeSearchRating = error => {
    const searchRating = error.target.value
    setSearchRating(searchRating);
  }

  const find =(query, by) => {
    MovieDataService.find(query,by,currentPage)
    .then(response => {
      console.log(response.data)
      setMovies(response.data.movies)
    })
    .catch(error =>{
      console.log(error)
    })
  }

  const findByTitle = () => {
    setCurrentSearchMode("findByTitle")
    find(searchTitle, "title")
  }

  const findByRating = () => {
    setCurrentSearchMode("findByRating")
    if (searchRating === "All Ratings") {
      retrieveMovies()
    }
    else {
      find(searchRating, "rated")
    }
  }

  return (
    <div className="App">
      <Container>
        <Form>
          <Row>
          <Col>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Search by title"
                value={searchTitle}
                onChange={onChangeSearchTitle}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={findByTitle}
              >
              Search
            </Button>
          </Col>
          <Col>
            <Form.Group>
              <Form.Control as="select" onChange={onChangeSearchRating}>
                {ratings.map(rating =>{
                  return(
                    <option value={rating}>{rating}</option>
                  )
                })}
              </Form.Control>
            </Form.Group>
            <Button
              variant="primary"
              type="button"
              onClick={findByRating}
            >
              Search
            </Button>
          </Col>
          </Row>
        </Form>

        <Row>
          {movies.map((movie) => {
            return(
              <Col>
                <Card style={{ width: '18rem'}}>
                  <Card.Img src={movie.poster+"/100px180"} />
                  <Card.Body>
                    <Card.Title>{movie.title}</Card.Title>
                    <Card.Text>
                      Rating: {movie.rated}
                    </Card.Text>
                    <Card.Text>{movie.plot}</Card.Text>
                    <Link to={"/movies/"+movie._id}>View Reviews</Link>
                  </Card.Body>
                </Card>
              </Col>
            )
          })}
        </Row>
        <br />
        Showing page: {currentPage}
        <Button
          variant="link"
          onClick={() => {setCurrentPage(currentPage - 1)}}
        >
          Back
        </Button>
        <Button
          variant="link"
          onClick={() => {setCurrentPage(currentPage + 1)}}
        >
          Next
        </Button>
      </Container>
    </div>
  )

}

export default MoviesList