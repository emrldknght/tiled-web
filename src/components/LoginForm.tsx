import React, {useContext, useEffect, useState} from "react";
import {getCred} from "../lib/creds";
import {Button} from "@blueprintjs/core";
import {mAppState} from "../store/mStore";
import {observer} from "mobx-react";
import {StoreContext} from "../store/StoreContext";

type Props = {
  children: JSX.Element,
  // auth: boolean,
  // doAuth: DoAuth
}

export const LoginForm = observer(function LoginForm ({children}: Props) {

  const state = useContext(StoreContext);
  const auth = state.auth;

  useEffect(() => {
    const init = async () => {
      // console.log('init')
      const credentials = await getCred();
      if (credentials) {
        mAppState.login(credentials.login, credentials.pass);
      }
    }
    init();
  }, [])


  const [login, setLogin] = useState('yoba');
  const [pass, setPass] = useState('aboy');

  const setLoginV = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
  const setPassV = (e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value);

  const doAuthW = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();

    mAppState.login(login, pass);
  }

  return (
    (!auth) ? (
      <form className="login-form">
        <div className="col">
          <label htmlFor="login">Login:</label>
          <input type="text" name="login" value={login} onChange={setLoginV}/>
          <label htmlFor="pass">Password:</label>
          <input type="password" name="pass" value={pass} onChange={setPassV}/>
          <Button icon="key" text="Enter" onClick={doAuthW} small/>
        </div>
      </form>
    ) : (
      <div>
        {children}
      </div>
    )
  )
})