import {action, configure, makeObservable, observable } from "mobx";
import {eraseCred, saveCred} from "../lib/creds";

configure({ enforceActions: 'always' })

export class MAppState {
  @observable auth = false;

  @observable st = -3;

  @observable error: string = '';

  constructor() {
    makeObservable(this);
  }

  @action
  login(login: string, pass: string) {
    // console.log('login!');
    if(login === 'yoba' && pass === 'aboy') {
      // console.log('logging');
      saveCred(login, pass)
      this.auth = true;
    }
  }
  @action
  logout() {
    eraseCred();
    this.auth = false;
  }

}

export const mAppState = new MAppState();


