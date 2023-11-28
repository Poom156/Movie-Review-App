import React from 'react';
import { Routes, Route, Link } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";

//imports from components
import Home from './components/home.js';
import AddReview from "./components/add-review.js";
import Login from "./components/login.js";
import Movie from "./components/movie.js";
import MoviesList from "./components/movies-list.js";

//imports from bootstrap
import { Nav, Navbar } from 'react-bootstrap';

function App() {

  const [user, setUser] = React.useState(null)

  async function login (user = null) {
    setUser(user)
  }

  async function logout() {
    setUser(null)
  }

  return (
    <div className="App">
      <Navbar bg='light' expand='lg'>
        <Navbar.Brand href='/'>Movie Reviews</Navbar.Brand>
        <Navbar.Toggle aria-controls='basic-navbar-nav' />
        <Navbar.Collapse id='basic-navbar-nav'>
          <Nav className='mr-auto'>
            <Nav.Link>
              <Link to={"/movies"}>Movies</Link>
            </Nav.Link>
            <Nav.Link>
              { user ? (<button onClick={logout}>Logout User</button>) : (<Link to={"/login"}>Login</Link>)}
            </Nav.Link>
          </Nav>
        </Navbar.Collapse>
      </Navbar>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path="/movies" element={<MoviesList />} />
        <Route path="/movies/:id/review" element={<AddReview user={user} />} />
        <Route path="/movies/:id/" element={<Movie user={user} />} />
        <Route path="/login" element={<Login user={user} login={login} />} />
      </Routes>
    </div>
  );

}

export default App;


