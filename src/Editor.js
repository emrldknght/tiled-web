import React, {useEffect, useState} from "react";
import {Tabs} from "./components/Tabs";
import {fetchMapFile} from "./lib/fetchMapFile";
import {TabsSelector} from "./components/TabsSelector";
import {MapComponent} from "./components/MapComponent";
import {TilerComponent} from "./components/TilerComponent";
import {saveJson} from "./lib/saveJson";
import {CellPalette} from "./components/CellPalette";
import {palData} from "./lib/palData";


const initialTileSrc = {w:0, wc: 0, h: 0, hc:0, loaded: false}

export function Editor() {
  const [mapData, setMapData] = useState([]);
  const [tileUrl, setTileUrl] = useState('');
  const [tileDim, setTileDim] = useState('');

  const [tab, setTab] = useState(Tabs.tiler)
  const [tileSrc, setTileSrc] = useState(initialTileSrc);

  const [selectedTile, setSelectedTile] = useState(-1);

  useEffect(() => {
    async function init() {
      const md = await fetchMapFile();
      // console.log('md', md);
      if(md) {
        // console.log('setting map data');
        if(md.mapData) setMapData(md.mapData);
        if(md.tileUrl) setTileUrl(md.tileUrl);
        if(md.tileDim) setTileDim(md.tileDim);
      } else {
        console.warn('data error');
      }
    }
    init();

  }, [])

  const setActiveTab = e => {
    const t = e.target.dataset.tab;
    console.log(t);
    setTab(t);
  }

  const prepareData = () => JSON.stringify({
    mapData,
    tileDim,
    tileUrl
  });

  return(
    <div className="col">
      <div className="row">
        <button onClick={saveJson.bind(null, prepareData())}>Save Local File</button>
      </div>
      <TabsSelector setActive={setActiveTab} active={tab}/>
      {/*
      <div className="row" onClick={setActiveTab}>Tabs selector:
        <span data-tab={Tabs.mapEditor}>Map editor</span>|
        <span data-tab={Tabs.tiler}>Tiler</span>
      </div>
      */}
      <div className="row">
        { (tab === Tabs.mapEditor) &&
        <div className="row">
          <div className="col">
            <b>Map Editor</b>
            <MapComponent
              mapData={mapData}
              tileUrl={tileUrl}
              tileDim={tileDim}
            />
          </div>
          <div className="col">
            <b>Palette</b>
            <CellPalette data={palData}
              selectedTile={selectedTile} setSelectedTile={setSelectedTile}
              tileUrl={tileUrl} tileDim={tileDim}
            />
          </div>
        </div>
        }
        { (tab === Tabs.tiler) &&
        <div className="col">
          <TilerComponent
            tileSrc={tileSrc} setTileSrc={setTileSrc}
            tileUrl={tileUrl} tileDim={tileDim}
          />
        </div>
        }
      </div>
    </div>
  )
}