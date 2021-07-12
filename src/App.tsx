import './App.css';
import {Editor} from "./Editor";
import {LoginForm} from "./components/LoginForm";
import {Helmet} from "react-helmet";
import {gs} from "./lib/genStyles";
import React, {useContext} from "react";
import {observer} from "mobx-react";
import {StoreContext} from "./store/StoreContext";
import {StoreView} from "./components/StoreView";


export const App = observer(function App() {
  const state = useContext(StoreContext);
  const pal = state.palette.data

  return (
    <div className="App">
        <Helmet>
          <title>SteamQuest Map editor v 0.1</title>
          <style>{gs(pal)}</style>
        </Helmet>
        <StoreView/>
        {/*
          <div style={{ border: '1px solid lime' }}>{gs(pal)}</div>
        */}
        <LoginForm>
          {/*<div>Styles:{JSON.stringify(gs(pal))}</div>*/}
          <Editor/>
        </LoginForm>
    </div>
  );
})