import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {DoAuth, doAuth} from "../store/actions";
import {connect} from "react-redux";
import React, {useEffect, useState} from "react";
import {getCred} from "../lib/creds";
import {Button} from "@blueprintjs/core";
import {AppState} from "../store/initState";

type Props = {
  children: JSX.Element,
  auth: boolean,
  doAuth: DoAuth
}

function LoginForm({children, auth, doAuth}: Props) {

  useEffect(() => {
    const init = async () => {
      // console.log('init')
      const credentials = await getCred();
      if (credentials) {
        doAuth(credentials.login, credentials.pass);
      }
    }
    init();
  }, [doAuth])


  const [login, setLogin] = useState('yoba');
  const [pass, setPass] = useState('aboy');

  const setLoginV = (e: React.ChangeEvent<HTMLInputElement>) => setLogin(e.target.value);
  const setPassV = (e: React.ChangeEvent<HTMLInputElement>) => setPass(e.target.value);

  const doAuthW = async (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    // console.log(login, pass);
    await doAuth(login, pass);
    // console.log('ll', auth);
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
}

function mapStateToProps(state: AppState) {
  return {
    auth: state.auth
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    doAuth
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)