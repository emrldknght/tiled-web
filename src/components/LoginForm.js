import {bindActionCreators} from "redux";
import {doAuth} from "../store/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {getCred} from "../lib/creds";
import {Button} from "@blueprintjs/core";

function LoginForm({ children, auth, doAuth }) {

  useEffect(() => {
    const init = async () => {
      // console.log('init')
      const credentials = await getCred();
      if(credentials) {
        doAuth(credentials.login, credentials.pass);
      }
    }
    init();
  }, [doAuth])


  const [login, setLogin] = useState('yoba');
  const [pass, setPass] = useState('aboy');

  const setLoginV = e => setLogin(e.target.value);
  const setPassV = e => setPass(e.target.value);

  const doAuthW = async e => {
    e.preventDefault();
    // console.log(login, pass);
    await doAuth(login, pass);
    // console.log('ll', auth);
  }

  return(
    (!auth) ? (
      <form className="login-form">
        <div className="col">
          {/* Is Auth : {JSON.stringify(auth)} */}
          <label htmlFor="login">Login:</label>
          <input type="text" name="login" value={login} onChange={setLoginV}/>
          <label htmlFor="pass">Password:</label>
          <input type="password" name="pass" value={pass} onChange={setPassV}/>

          <Button icon="key" text="Enter" onClick={doAuthW} small />
        </div>
      </form>
    ) : (
      <div>
        {children}
      </div>
    )
  )
}
function mapStateToProps(state) {
  return {
    auth: state.auth
  }
}
const mapDispatchToProps = (dispatch) => bindActionCreators(
  {
    doAuth
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(LoginForm)