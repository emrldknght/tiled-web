import React, {useEffect, useState} from "react";
import {Tabs} from "./components/Tabs";
import {fetchMapFile} from "./lib/fetchMapFile";
import {TabsSelector} from "./components/TabsSelector";
import {MapComponent} from "./components/MapComponent";

export function Editor() {
  const [mapData, setMapData] = useState([]);
  const [tab, setTab] = useState(Tabs.tiler)

  useEffect(() => {
    async function init() {
      const md = await fetchMapFile();
      console.log('md', md);
      if(md && md.mapData) {
        // console.log('setting map data');
        setMapData(md.mapData)
      } else {
        console.warn('mapData not defined');
      }
    }
    init();

  }, [])

  const setActiveTab = e => {
    const t = e.target.dataset.tab;
    console.log(t);
    setTab(t);
  }

  return(
    <div className="col">
      <TabsSelector setActive={setActiveTab} active={tab}/>
      {/*
      <div className="row" onClick={setActiveTab}>Tabs selector:
        <span data-tab={Tabs.mapEditor}>Map editor</span>|
        <span data-tab={Tabs.tiler}>Tiler</span>
      </div>
      */}
      <div className="row">
        { (tab === Tabs.mapEditor) &&
        <div className="col">
          <b>Map Editor</b>
          <MapComponent data={mapData}/>
        </div>
        }
        { (tab === Tabs.tiler) &&
        <div className="col">
          <div className="tiler">
            <b>Tiler</b>
            <div className="content">
              <div className="layer">
                <img
                  alt='tiling-source'
                  src='https://hydragames.neocities.org/assets/images/World_A2.png'
                />
              </div>
              <div className="layer grid-base">&nbsp;</div>
              <div className="info-tooltip">Info:</div>
            </div>
          </div>
        </div>
        }
      </div>
    </div>
  )
}