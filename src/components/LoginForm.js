import {bindActionCreators} from "redux";
import {doAuth} from "../store/actions";
import {connect} from "react-redux";
import {useEffect, useState} from "react";
import {fetchMapFile} from "../lib/fetchMapFile";
import {getCred} from "../lib/creds";

function LoginForm({ children, auth, doAuth }) {

  const init = async () => {
    const credentials = await getCred();
    if(credentials) {
      doAuth(credentials.login, credentials.pass);
    }
  }

  useEffect(() => {
    init();
  }, [])


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
      <form onSubmit={doAuthW}>
        <div className="col">
          Is Auth : {JSON.stringify(auth)}
          <label> Login:
            <input type="text" name="login" value={login} onChange={setLoginV}/>
          </label>
          <label> Password:
            <input type="password" name="pass" value={pass} onChange={setPassV}/>
          </label>
          <input type="submit"/>
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