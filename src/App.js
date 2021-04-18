// import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from "./Editor";
import LoginForm from "./components/LoginForm";
import {Helmet} from "react-helmet";
import {gs} from "./lib/genStyles";
import {connect} from "react-redux";

function App({pal}) {
  return (
    <div className="App">
      <Helmet>
        <title>SteamQuest Map editor v 0.1</title>
        <style>{gs(pal)}</style>
      </Helmet>
      <LoginForm>
        <div>Styles:{JSON.stringify(gs(pal))}</div>
        <Editor />
      </LoginForm>

      {/*
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p>
          Edit <code>src/App.js</code> and save to reload.
        </p>
        <a
          className="App-link"
          href="https://reactjs.org"
          target="_blank"
          rel="noopener noreferrer"
        >
          Learn React
        </a>
      </header>
      */}
    </div>
  );
}
function mapStateToProps(state) {
  return {
    pal: state.palette.data
  }
}

export default connect(mapStateToProps)(App);
