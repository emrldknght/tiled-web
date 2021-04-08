import {TImg} from "./tiler/TImg";
import {TGrid} from "./tiler/TGrid";
import {useState} from "react";

export function TilerComponent(props) {

  const p = {
    '--tile-root': `url(${props.tileUrl})`,
    '--tile-dim': `${props.tileDim}px`,
  };

  const [selectedTile, setSelectedTile] = useState(-1);
  const selectTile = (x, y) => { console.log(`select it x${x}y${y}`) }

  /*
  const handleImgRef = async input => {
    if(!input) return;
    const img = input;

    img.onload = onLoadTrigger.bind(this, 'onload', img);
    if(img.complete) await onLoadTrigger('oncomplete', img);
  }
  const onLoadTrigger = async (trigger, img) => {
    console.log(`loaded! from ${trigger}`, img);
    if(!props.tileSrc.loaded) {
      await updateImD(img);
      console.log('uid updated!');
    }
  }

  const updateImD = async (img) => {
    console.log('uid', img.width);

    const w = img.width;
    const h = img.height;
    const d = props.tileDim;

    console.log(w,h,d);

    const newState = {
      w: w,
      wc: w / d,
      h: h,
      hc: h / d,
      loaded: true
    };
    await props.setTileSrc(prevState => ({...prevState, ...newState}));
  }
   */

  // const [showActive, setShowActive] = useState(false);

  return(
    <div className="tiler" style={p}>
      <b>Tiler</b><input type="checkbox" />
      <div className="content">
        <div className="layer grid-base">
          {(props.tileSrc.loaded) ? (
            <TGrid
              tileSrc={props.tileSrc}
              selectTile={selectTile}
            />
            ) : <span>Loading...</span>
          }
        </div>
        <div className="layer tile-base">
          <TImg
            tileSrc={props.tileSrc}
            setTileSrc={props.setTileSrc}
            tileUrl={props.tileUrl}
            tileDim={props.tileDim}
          />
        </div>
        <div className="info-tooltip">Info:
          {JSON.stringify(props.tileSrc)}
        </div>
      </div>
    </div>
  )
}