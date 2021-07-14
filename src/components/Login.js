import React, { useState } from "react";
import { Redirect } from 'react-router-dom';

import { connect } from "react-redux";
import { login } from "../actions/auth";

import { useForm } from "react-hook-form";
import styled from "styled-components";
import LoadingIndicator from "./LoadingIndicator";

const Row = styled.div`
  height: calc(100vh - 100px);
`;

const Form = styled.form`
    width:300px;
`;



function Login(props) {
  const { isLoggedIn, message, dispatch, history } = props;
  const [isLoading, setIsLoading] = useState(false);
  const { register, handleSubmit, formState: { errors } } = useForm();
  const onSubmit = (data) => {
    setIsLoading(true);
    dispatch(login(data.login, data.password)).then(() => {
      history.push("/");
      window.location.reload();
    }).finally(() => {
      setIsLoading(false);
    });
  };

  if (isLoggedIn) {
    return <Redirect to="/" />;
  }

  return (
    <div className="container">
      <Row className="row justify-content-center align-items-center">
        <Form className="form-login" onSubmit={handleSubmit(onSubmit)}>
          <div className="form-group">
            <label htmlFor="login">Логин</label>
            <input className="form-control" id="login" {...register("login", { required: true })} />
            {errors.login && <span className="text-danger">Логин не указан</span>}
          </div>
          <div className="form-group">
            <label htmlFor="password">Пароль</label>
            <input className="form-control" id="password" {...register("password", { required: true })} />
            {errors.password && <span className="text-danger">Пароль не указан</span>}
          </div>
          {message && <div class="alert alert-danger" role="alert">
            {message}
          </div>}
          <input type="submit" className="btn btn-primary" value="Войти" />
        </Form>
      </Row>
      {isLoading && <LoadingIndicator />}
    </div >
  );
}

function mapStateToProps(state) {
  const { isLoggedIn } = state.auth;
  const { message } = state.authMessage;
  return {
    isLoggedIn,
    message
  };
}

export default connect(mapStateToProps)(Login);