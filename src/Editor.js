import React, {useEffect, useState} from "react";
import {Tabs} from "./components/Tabs";
import {fetchMapFile} from "./lib/fetchMapFile";
import {TabsSelector} from "./components/TabsSelector";
import MapComponent from "./components/MapComponent";
import TilerComponent from "./components/TilerComponent";
import {saveJson} from "./lib/saveJson";
import CellPalette from "./components/CellPalette";
import {palData} from "./lib/palData";
import {logout, paletteSelectTile, setMapDataR, setTileDimR, setTileUrlR, spt} from "./store/actions";
import {connect} from "react-redux";
import {bindActionCreators} from "redux";
import {TabContent} from "./components/TabContent";
import FileExplorer from "./FileExplorer";

import fontawesome from '@fortawesome/fontawesome'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckSquare, faCoffee, faSave, faFileAlt } from '@fortawesome/fontawesome-free-solid'
fontawesome.library.add(faCheckSquare, faCoffee, faSave, faFileAlt);



const initialTileSrc = {w:0, wc: 0, h: 0, hc:0, loaded: false}

function Editor({ setMapDataR, setTileUrlR, setTileDimR, logout }) {
  const [mapData, setMapData] = useState([]);
  const [tileUrl, setTileUrl] = useState('');
  const [tileDim, setTileDim] = useState('');

  const [tab, setTab] = useState(Tabs.mapEditor)
  const [tileSrc, setTileSrc] = useState(initialTileSrc);

  const [selectedTile, setSelectedTile] = useState(-1);

  useEffect(() => {
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
    <div className="row">
      <FileExplorer />
      <div className="col">
        <div className="row">
          <button >
            <FontAwesomeIcon icon="save" />
            &nbsp;Save
          </button>
          <button onClick={saveJson.bind(null, prepareData())}>
            <FontAwesomeIcon icon="file-alt" />
            &nbsp;
            Save Local File
          </button>
          <div style={{ flexGrow: 1 }}>&nbsp;</div>
          <button onClick={logout} >
            <FontAwesomeIcon icon="door-closed" />
            &nbsp;
            Quit
          </button>
        </div>
        <TabsSelector setActive={setActiveTab} active={tab} />
        <div className="row">
          <TabContent tabActive={tab} tabName={Tabs.mapEditor}>
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
          </TabContent>
          <TabContent tabActive={tab} tabName={Tabs.tiler}>
            <div className="col">
              <TilerComponent />
            </div>
          </TabContent>
        </div>
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
    logout
  },
  dispatch
)
export default connect(mapStateToProps, mapDispatchToProps)(Editor)