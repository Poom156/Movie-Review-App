import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Form, Button } from 'react-bootstrap';

const Login = (props) => {
  const [name, setName] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();

  const onChangeName = (e) => {
    const newName = e.target.value;
    setName(newName);
  }

  const onChangeId = (e) => {
    const newId = e.target.value;
    setId(newId);
  }

  const login = () => {
    props.login({ name: name, id: id });
    navigate('/movies');
  }

  return (
    <div>
      <Form>
        <Form.Group>
          <Form.Label>Username</Form.Label>
          <Form.Control
            type='text'
            placeholder='Enter username'
            value={name}
            onChange={onChangeName}
          />
        </Form.Group>
        <Form.Group>
          <Form.Control
            type='text'
            placeholder='Enter id'
            value={id}
            onChange={onChangeId}
          />
        </Form.Group>
        <Button variant='primary' onClick={login}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
