import {mAppState} from "./store/mStore";
import {Button} from "@blueprintjs/core";
import React from "react";
import {mapEntity} from "./components/MapComponent";

export function TopControlPanel() {
  const saveDataW = () => mAppState.saveData();
  const saveMapFileW = () => mapEntity.saveMapFile();
  const logoutW = () => {
    // logout();
    mAppState.logout();
  }

  return (
    <div className="row">
      <Button icon="floppy-disk" text="Save" small onClick={saveDataW}/>
      <Button icon="download" text="Save Local File" small onClick={saveMapFileW}/>
      <div style={{flexGrow: 1}}>&nbsp;</div>
      <Button icon="log-out" text="Quit" small onClick={logoutW}/>
    </div>
  )
}