import TImg from "./tiler/TImg";
import TGrid from "./tiler/TGrid";
import {connect} from "react-redux";
import React from "react";

function TilerComponent({tileUrl, tileDim, tileSrc}) {

  const p = {
    '--tile-root': `url(${tileUrl})`,
    '--tile-dim': `${tileDim}px`,
  };

  // const [selectedTile, setSelectedTile] = useState(-1);
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
          <TGrid selectTile={selectTile} />
        </div>
        <div className="layer tile-base">
          <TImg />
        </div>
        <div className="info-tooltip">Info:{JSON.stringify(tileSrc)}</div>
      </div>
    </div>
  )
}

function mapStateToProps(state) {
  return {
    tileSrc: state.tileSrc,
    tileUrl: state.tileUrl,
    tileDim: state.tileDim
  }
}
const mapDispatchToProps = (dispatch) => {
  return {

  }
}

export default connect(mapStateToProps, mapDispatchToProps)(TilerComponent);