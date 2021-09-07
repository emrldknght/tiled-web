import React, {useContext, useEffect, useState} from "react";

import {TilerComponent} from "./components/TilerComponent";
import FileExplorer from "./FileExplorer";

import {observer} from "mobx-react";
import {StoreContext} from "./store/StoreContext";
import {CharComponent} from "./components/CharComponent";
import {charAppState, CharContext} from "./store/CharContext";
import {WeaponsComponent} from "./components/WeaponsComponent";
import {Col} from "./components/Col";
import {IEContext, ItemEditor, itemEditorState} from "./components/items/ItemEditor";
import {TopControlPanel} from "./TopControlPanel";
import {SpellEditor, SpellEditorContext, spellEditorState} from "./components/magic/SpellEditor";

import {MapEditorComponent} from "./components/MapEditorComponent";
import {mockMap} from "./mock/mockMap";
import {RootContext} from "./store/RootStore";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import {Nav} from "./components/router/Nav";
import {Routes} from "./components/router/Routes";
import {TestUI} from "./components/TestUI";

export const Editor = observer(function Editor() {

  const state = useContext(StoreContext);
  const [loading, setLoading] = useState(false);
  // const [tileSrc, setTileSrc] = useState(initialTileSrc);

  const rootStore = useContext(RootContext);
  const map = rootStore.mapStore;
  const tiler = rootStore.tilerStore;
  const pal = rootStore.paletteStore;

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
    setLoading(true);
    map.fetchMapFile('map1').then(() => setLoading(false));
    // map.setMap(mockMap);
    // map.setTileDim(48);

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
    <div className={`col ${loading ? 'loading' : ''}`}>
      <div className="error">{state.error}</div>
      <div className="row">
        <RootContext.Provider value={rootStore}>
          <FileExplorer/>
          {!(state.error) ?
            <div className="col">
              <TopControlPanel />
              <Router>
                <Nav />
                <Switch>
                  <Route path={Routes.MapEditor}>
                      <MapEditorComponent />
                  </Route>
                  <Route path={Routes.Tiler}>
                      <div className="col">
                        <TilerComponent />
                      </div>
                  </Route>
                  <Route path={Routes.CharEditor}>
                      <div className="col">
                        <CharContext.Provider value={charAppState}>
                          <CharComponent />
                        </CharContext.Provider>
                        <WeaponsComponent />
                      </div>
                  </Route>
                  <Route path={Routes.ItemEditor}>
                      <Col>
                        <IEContext.Provider value={itemEditorState}>
                          <ItemEditor />
                        </IEContext.Provider>
                      </Col>
                  </Route>
                  <Route path={Routes.SpellEditor}>
                      <SpellEditorContext.Provider value={spellEditorState}>
                          <SpellEditor />
                      </SpellEditorContext.Provider>
                  </Route>
                  <Route path={Routes.TestUI}>
                      <TestUI />
                  </Route>
                </Switch>
              </Router>
            </div>  :
            ''
          }
        </RootContext.Provider>
      </div>
      <footer>
        <small>
          application is running in <b>{process.env.NODE_ENV}</b> mode.
          RAA:"{process.env.REACT_APP_API}"
        </small>
      </footer>
    </div>
  )
})