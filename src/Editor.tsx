import React, {useContext, useEffect, useState} from "react";
import {TabsK} from "./components/Tabs";
import {TilerComponent} from "./components/TilerComponent";
import FileExplorer from "./FileExplorer";
import {Tabs, Tab} from "@blueprintjs/core";
import {mAppState} from "./store/mStore";
import {observer} from "mobx-react";
import {StoreContext} from "./store/StoreContext";
import {CharComponent} from "./components/CharComponent";
import {charAppState, CharContext} from "./store/CharContext";
import {WeaponsComponent} from "./components/WeaponsComponent";
import {Col} from "./components/Col";
import {IEContext, ItemEditor, itemEditorState} from "./components/items/ItemEditor";
import {TopControlPanel} from "./TopControlPanel";
import {SpellEditor, SpellEditorContext, spellEditorState} from "./components/magic/SpellEditor";
import {LSKeys, useLState} from "./LocalState";
import {MapEditorComponent} from "./components/MapEditorComponent";
import {mockMap} from "./mockMap";
import {RootContext} from "./store/RootStore";

// const initialTileSrc = {w:0, wc: 0, h: 0, hc:0, loaded: false}



export const Editor = observer(function Editor() {
  const [tab, setTab] = useLState(TabsK.spellEditor, LSKeys.Tab);
  const state = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  // const [tileSrc, setTileSrc] = useState(initialTileSrc);

  const rootStore = useContext(RootContext);
  const map = rootStore.mapStore;

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
    // map.fetchMapFile('map1')
    setLoading(true);
    map.setMap(mockMap);
    map.setTileDim(48);

    // mAppState.setMap(mockMap);
    mAppState.setTileDim(48);
  }, [map])

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



  // const saveDataW = () => mAppState.saveData()
  // const saveMapFileW = () => mAppState.saveMapFile();

  return (
    <div className="col">
      <div className="error">{state.error}</div>
      <div className="row">
        <RootContext.Provider value={rootStore}>
        <FileExplorer/>
          {!(state.error) ?
            <div className="col">
              <TopControlPanel />
              {/*
              <div className="row">
                <Button icon="floppy-disk" text="Save" small onClick={saveDataW}/>
                <Button icon="download" text="Save Local File" small onClick={saveMapFileW}/>
                <div style={{flexGrow: 1}}>&nbsp;</div>
                <Button icon="log-out" text="Quit" small onClick={logoutW}/>
              </div>
              */}
              <Tabs id="mainTabs" onChange={setActiveTab} selectedTabId={tab}>
                <Tab id={TabsK.mapEditor} title="Map Editor" panel={
                  (tab === TabsK.mapEditor)
                    ?
                    <MapEditorComponent />
                    : undefined
                }/>
                <Tab id={TabsK.tiler} title="Tiler" panel={
                  (tab === TabsK.tiler)
                    ?
                    <div className="col">
                      <TilerComponent />
                    </div>
                    : undefined
                }/>
                <Tab id={TabsK.charEditor} title="Char Editor" panel={
                  (tab === TabsK.charEditor)
                    ?
                    <div className="col">
                      <CharContext.Provider value={charAppState}>
                        <CharComponent />
                      </CharContext.Provider>
                      <WeaponsComponent />
                    </div>
                    : undefined
                } />
                <Tab id={TabsK.itemEditor} title="Item Editor" panel={
                  (tab === TabsK.itemEditor)
                    ?
                    <Col>
                      <IEContext.Provider value={itemEditorState}>
                        <ItemEditor />
                      </IEContext.Provider>
                    </Col>
                    : undefined
                } />
                <Tab id={TabsK.spellEditor} title="Spell Editor" panel = {
                    (tab === TabsK.spellEditor)
                    ?
                    <SpellEditorContext.Provider value={spellEditorState}>
                        <SpellEditor />
                    </SpellEditorContext.Provider>
                    : undefined
                } />
              </Tabs>
            </div>  :
            ''
          }
        </RootContext.Provider>
      </div>
    </div>
  )
})