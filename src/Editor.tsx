import React, {useEffect, useState} from "react";
import {TabsK} from "./components/Tabs";
import MapComponent from "./components/MapComponent";
import TilerComponent from "./components/TilerComponent";
import CellPalette from "./components/CellPalette";
import {
  fetchMapFileA,
  logout, saveData,
  saveMapFile,
} from "./store/actions";
import {connect} from "react-redux";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import FileExplorer from "./FileExplorer";

import {Button, Tabs, Tab} from "@blueprintjs/core";
import {AppState} from "./store/initState";

// const initialTileSrc = {w:0, wc: 0, h: 0, hc:0, loaded: false}

type Props = {
  logout: () => void,
  saveMapFile: () => void,
  saveData: () => void
}

function Editor({logout, saveMapFile, saveData}: Props) {
  const [tab, setTab] = useState(TabsK.tiler)
  // const [tileSrc, setTileSrc] = useState(initialTileSrc);

  useEffect(() => {
    /*
    async function init() {
      const md = await fetchMapFile();
      // console.log('md', md);
      if(md) {
        // console.log('setting map data');
        if(md.mapData) {
          setMapData(md.mapData);
          setMapDataR(md.mapData)
        }
        if(md.tileUrl) {
          setTileUrl(md.tileUrl);
          setTileUrlR(md.tileUrl);
        }
        if(md.tileDim) {
          setTileDim(md.tileDim);
          setTileDimR(md.tileDim);
        }
      } else {
        console.warn('data error');
      }
    }
     */
    // init();
    fetchMapFileA();
  }, [])

  const setActiveTab = (e: string) => {
    // console.log(e);
    setTab(e)
    /*
    return;
    const t = e.target.dataset.tab;
    console.log(t);
    setTab(t);
     */
  }

  return (
    <div className="row">
      <FileExplorer/>
      <div className="col">
        <div className="row">
          <Button icon="floppy-disk" text="Save" small onClick={saveData}/>
          <Button icon="download" text="Save Local File" small onClick={saveMapFile}/>
          <div style={{flexGrow: 1}}>&nbsp;</div>
          <Button icon="log-out" text="Quit" small onClick={logout}/>
        </div>
        <Tabs id="mainTabs" onChange={setActiveTab} selectedTabId={tab}>
          <Tab id={TabsK.mapEditor} title="Map Editor" panel={
            <div className="row">
              <MapComponent/>
              <CellPalette/>
            </div>
          }/>
          <Tab id={TabsK.tiler} title="Tiler" panel={
            <div className="col">
              <TilerComponent/>
            </div>
          }/>

        </Tabs>
      </div>
    </div>
  )
}

function mapStateToProps(state: AppState) {
  return {}
}

/*
const mapDispatchToProps = dispatch => {
  return {
    setMapDataR: data => dispatch(setMapDataR(data)),
    setTileUrlR: url => dispatch(setTileUrlR(url)),
    setTileDimR: dim => dispatch(setTileDimR(dim)),
  }
}
 */
const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    logout,
    fetchMapFileA,
    saveMapFile,
    saveData
  },
  dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Editor)