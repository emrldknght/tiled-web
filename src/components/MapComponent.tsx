import {MapRow} from "./map/MapRow";
import React, {createContext, CSSProperties, useContext} from "react";
import {observer} from "mobx-react";
import {StoreContext} from "../store/StoreContext";
import {LSKeys, useLState} from "../LocalState";
import {ToolPaletteContext} from "./ToolPalette";
import {action, makeObservable, observable, toJS} from "mobx";
import {PanelMode} from "./map/MapDimensions";
import {getAction} from "../lib/dimensions";
import {DebugOut} from "./common/DebugOut";
import {fetchMap, Path} from "../lib/api";
import {ApiError, AppState, isApiError, MapFile} from "../types";
import {saveJson} from "../lib/saveJson";

const prepareData = (state: MapEntity) => {
  const data = {
    mapData: state.mapData,
    tileDim: state.tileDim,
    tileUrl: (state.tileUrl || '').replace(/^.*([\\/:])/, '')
    // tileUrl: (state.tileUrl || '').replace(/^.*(\\|\/|\:)/, '')
  }
  return JSON.stringify(data);
};

export const MapComponent = observer(function MapComponent() {
  const appState = useContext(StoreContext);
  const mapState = useContext(MapContext);

  const tileUrl = mapState.tileUrl;
  const tileDim = mapState.tileDim;

  // const mapData = state.mapData;

  const brushId =  appState.palette.selectedTile;
  const x = mapState.curX;
  const y = mapState.curY;

  const tools = useContext(ToolPaletteContext);
  const currentTool = tools.currentTool;


  const mapData2 = mapState.mapData;

  // const u = props.tileUrl ? `--tile-root: url(${props.tileUrl});` : '';
  const p: CSSProperties & { '--tile-root': string, '--tile-dim': string } = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  const [showGrid, setShowGrid] = useLState(true, LSKeys.MapGrid);
  const [showCellInfo, setShowCellInfo] = useLState(true, LSKeys.MapCellInfo);

  const tm = mapData2.map((row, y) =>
      <MapRow
          key={`mr_${y}`}
          data={row} y={y}
          showCellInfo={showCellInfo}
      />);

  // const setTile = () => { setMapTile(2, 2, 0); }

  const pokeTile = (e: React.MouseEvent<HTMLDivElement>) => {
    let t = e.target as HTMLElement;
    if(!t) return;

    if (!t.classList.contains('cell')) {
      const c = t.closest('.cell');
      if(!c) return;
      t = c as HTMLElement;
    }

    let {x: xS, y: yS} = t.dataset;
    console.log(xS, yS);
    if(xS === undefined || yS === undefined) return;

    const x = parseInt(xS);
    const y = parseInt(yS);

    const applyPencil = (x:number, y: number) => {
      // const _x = parseInt(x || '');
      // const _y = parseInt(y || '');
      console.log('poke', e.target, x, y, brushId);
      // if (!isNaN(_x) && !isNaN(_y)) {
      // mAppState.setMapTile(x, y, brushId);
      mapState.setMapTile(x ,y, brushId);
      // }
    }
    // console.log('ct', currentTool);

    switch (currentTool) {
      case "Pencil":
        applyPencil(x, y);
        break;
      case "Bucket":
        console.log('will fill');
        mapState.pokeCell(x, y);
        break;
    }
  }

  const showGridK = () => (showGrid) ? 'show-grid' : '';
  const toggleShowGrid = () => setShowGrid(!showGrid);

  const toggleShowCellInfo = () => setShowCellInfo(!showCellInfo);

  return (
      <div className={`map ${showGridK()}`}
           style={p}
      >
        <div className="col">
          <b>Map Editor</b>
          <DebugOut data={mapData2} />
          <div className="row">
            <label>
              <input type="checkbox" checked={showGrid}
                     onChange={toggleShowGrid}/>Show Grid
            </label>
            <label>
              <input type="checkbox" checked={showCellInfo}
                     onChange={toggleShowCellInfo}/>Show Info
            </label>
            <div>x: {x} y: {y}</div>
            {/*
          BID: {brushId}
          <button onClick={setTile}>Set!</button>
          From store{JSON.stringify(mapData)}
           */}
          </div>
        </div>
        <div className={`mapWrapper`} onClick={pokeTile} >{tm}</div>
      </div>
  )
})

export class MapEntity {
  constructor() {
    makeObservable(this)
  }

  @observable error: string = '';

  @observable mapData: number[][] = [];
  @observable selection: number[][] = [];

  @action
  setMap(data: number[][]) {
    this.mapData = data as number[][];
    this.resetHl();
  }

  @action resetHl() {
    const hl = this.mapData.map(row => row.map(cell => -1));
    this.selection = hl as number[][];
  }

  @action
  setHl(x: number, y: number) {
    this.resetHl();
    this.selection[y][x] = 1;
  }

  isHl(x: number, y: number) {
    return this.selection[y][x] !== -1;
  }

  @action
  setMapTile(x: number, y: number, id: number) {
    console.log('smt', x, y, id);
    this.mapData[y][x] = id;
  }

  @action
  mapExpand(mode: PanelMode, dimActive: number) {
    let action = getAction(dimActive, mode);
    console.log(action, typeof action);
    if(typeof action === 'function') action(this.mapData);
    this.resetHl();
  }

  @observable tileUrl: string | null = null;
  @observable tileDim: number | null = null;

  @action
  setTileUrl(url: string) {
    this.tileUrl = `${Path}/tilesets/${url}`;
  }

  @action
  setTileDim(dim: number) {
    this.tileDim = dim;
  }

  @observable curX = -1;
  @observable curY = -1;
  @action
  setXY(x: number, y: number) {
    this.curX = x;
    this.curY = y;
  }

  @action setHLC(x: number, y: number, v: number) {
    this.selection[y][x] = v;
  }

  @action
  pokeCell(x: number, y: number) {
    //set hl
    const v = this.mapData[y][x];

    const getMinMax = (d: number[] | number[][], v: number) => {
      const min = Math.max(v - 1, 0);
      const max = Math.min(d.length - 1, v + 1);
      return [min, max]
    }
    const getH = (x: number, y: number) => this.selection[y][x];
    // const addH = (x: number, y: number, v: number) => this.hl[y][x] = v;
    const getV = (x: number, y: number) => this.mapData[y][x];

    this.setHLC(x, y, v);

    const self = this;
    function getSur(ctx: MapEntity, x: number, y: number, v: number) {
      const [minY, maxY] = getMinMax(ctx.mapData, y);
      const [minX, maxX] = getMinMax(ctx.mapData[0], x);

      for (let _y = minY; _y <= maxY; _y++) {
        for (let _x = minX; _x <= maxX; _x++) {

          const isV = getV(_x, _y) === v;
          const notH = getH(_x, _y) === -1;
          const notCenter = !(_x === x && _y === y);

          // console.log(_x, _y, 'v', isV, notH);

          if (isV && notH && notCenter) {
            console.log('set!');
            self.setHLC(_x, _y, v);
            getSur(ctx, _x, _y, v);
          }
        }
      }
    }
    getSur(this, x, y, v)
  }

  async fetchMapFile(mapId: string) {
    const md: MapFile | ApiError = await fetchMap(mapId);// fetchMapFile();
    console.log('mda', md);
    if(isApiError(md)) {
      this.error = md.error;
      return;
    }
    if(md) {
      this.setMap(md.mapData)
      this.setTileUrl(md.tileUrl);
      this.setTileDim(md.tileDim);
    }
  }

  saveMapFile() {
    const content = prepareData(toJS(this));
    console.log('save->', content);
    saveJson(content);
  }

}
export const mapEntity = new MapEntity();
export const MapContext = createContext<MapEntity>(mapEntity);