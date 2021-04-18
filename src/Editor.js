import React, {useEffect, useState} from "react";
import {TabsK} from "./components/Tabs";
import MapComponent from "./components/MapComponent";
import TilerComponent from "./components/TilerComponent";
import CellPalette from "./components/CellPalette";
import {palData} from "./store/palData";
import {fetchMapFileA, logout, saveMapFile, setMapDataR, setTileDimR, setTileUrlR} from "./store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import FileExplorer from "./FileExplorer";

import { Button, Tabs, Tab } from "@blueprintjs/core";

// const initialTileSrc = {w:0, wc: 0, h: 0, hc:0, loaded: false}

function Editor({ setMapDataR, setTileUrlR, setTileDimR, logout, saveMapFile }) {
  const [tab, setTab] = useState(TabsK.tiler)
  // const [tileSrc, setTileSrc] = useState(initialTileSrc);

  const [selectedTile, setSelectedTile] = useState(-1);

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
  }, [setMapDataR, setTileDimR, setTileUrlR])

  const setActiveTab = e => {
    console.log(e);
    setTab(e)
    /*
    return;
    const t = e.target.dataset.tab;
    console.log(t);
    setTab(t);
     */
  }

  return(
    <div className="row">
      <FileExplorer />
      <div className="col">
        <div className="row">
          <Button icon="floppy-disk"  text="Save" small/>
          <Button icon="download" text="Save Local File" small onClick={saveMapFile}/>
          <div style={{ flexGrow: 1 }}>&nbsp;</div>
          <Button icon="log-out" text="Quit" small onClick={logout}/>
        </div>
        <Tabs id="mainTabs" onChange={setActiveTab} selectedTabId={tab}>
          <Tab id={TabsK.mapEditor} title="Map Editor" panel={
            <div className="row">
              <div className="col">
                <b>Map Editor</b>
                <MapComponent />
              </div>
              <div className="col">
                <b>Palette</b>
                <CellPalette data={palData}
                             selectedTile={selectedTile} setSelectedTile={setSelectedTile}
                />
              </div>
            </div>
          }/>
          <Tab id={TabsK.tiler} title="Tiler" panel={
            <div className="col">
              <TilerComponent />
            </div>
          }/>

        </Tabs>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {

  }
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
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setMapDataR,
    setTileUrlR,
    setTileDimR,
    logout,
    fetchMapFileA,
    saveMapFile
  },
  dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Editor)