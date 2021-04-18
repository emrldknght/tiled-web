import {connect} from "react-redux";
import {setTileSrcR} from "../../store/actions";
import {bindActionCreators} from "redux";

function TImg({tileUrl, tileDim, tileSrc, setTileSrcR }) {

  // if(!tileSrc.loaded) return(<div>Image Loading...</div>);

  const updateImD = async (img) => {
    // console.log('uid', img.width);

    const w = img.width;
    const h = img.height;
    const d = tileDim;

    // console.log(w,h,d);

    const newState = {
      w: w,
      wc: Math.floor(w / d),
      h: h,
      hc: Math.floor(h / d),
      loaded: true
    };
    const updateData = async () => {
      setTileSrcR(newState);
    }
    await updateData();
  }

  const onLoadTrigger = async (trigger, img) => {
    // console.log(`loaded! from ${trigger}`, img);
    if(!tileSrc.loaded) {
      await updateImD(img);
      // console.log('uid updated!');
    }
  }
  const handleImgRef = async input => {
    if(!input) return;
    const img = input;

    img.onload = onLoadTrigger.bind(this, 'onload', img);
    if(img.complete) await onLoadTrigger('oncomplete', img);
  }

  return(
    <div>
      {(tileUrl && tileDim) ? (
        <img
          className="tiling-source-img"
          alt='tiling-source'
          src={tileUrl}
          ref={handleImgRef}
        />
      ) : (
        <span>Img is Loading...</span>
      )
      }
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
const mapDispatchToProps = dispatch => bindActionCreators(
  {
    setTileSrcR,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(TImg);