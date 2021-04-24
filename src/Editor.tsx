import React, {useEffect, useState} from "react";
import {TabsK} from "./components/Tabs";
import {MapComponent} from "./components/MapComponent";
import {TilerComponent} from "./components/TilerComponent";
import {CellPalette} from "./components/CellPalette";
import FileExplorer from "./FileExplorer";

import {Button, Tabs, Tab} from "@blueprintjs/core";
import {mAppState} from "./store/mStore";
import {observer} from "mobx-react";

// const initialTileSrc = {w:0, wc: 0, h: 0, hc:0, loaded: false}

export const Editor = observer(()  => {
  const [tab, setTab] = useState(TabsK.mapEditor)
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
    // fetchMapFileA();
    mAppState.fetchMapFile()
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

  const logoutW = () => {
    // logout();
    mAppState.logout();
  }

  return (
    <div className="row">
      <FileExplorer/>
      <div className="col">
        <div className="row">
          <Button icon="floppy-disk" text="Save" small onClick={mAppState.saveData}/>
          <Button icon="download" text="Save Local File" small onClick={mAppState.saveMapFile}/>
          <div style={{flexGrow: 1}}>&nbsp;</div>
          <Button icon="log-out" text="Quit" small onClick={logoutW}/>
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
              <TilerComponent />
            </div>
          }/>

        </Tabs>
      </div>
    </div>
  )
})