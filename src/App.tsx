// import React, { useState, useEffect } from 'react';
import './App.css';
import Editor from "./Editor";
import LoginForm from "./components/LoginForm";
import {Helmet} from "react-helmet";
import {gs} from "./lib/genStyles";
import {connect} from "react-redux";
import {PalCell} from "./store/palData";

function App({pal}: { pal: PalCell[] }) {
    return (
        <div className="App">
            <Helmet>
                <title>SteamQuest Map editor v 0.1</title>
                <style>{gs(pal)}</style>
            </Helmet>
            <LoginForm>
                {/*<div>Styles:{JSON.stringify(gs(pal))}</div>*/}
                <Editor/>
            </LoginForm>
        </div>
    );
}
function mapStateToProps(state: { palette: { data: PalCell[]; }; }) {
  return {
    pal: state.palette.data
  }
}

export default connect(mapStateToProps)(App);
