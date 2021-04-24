import {connect} from "react-redux";
import {SetTileSrcR, setTileSrcR} from "../../store/actions";
import {AnyAction, bindActionCreators, Dispatch} from "redux";
import {AppState, TileSrc} from "../../store/initState";

type Props = {
  tileUrl: string | null,
  tileDim: number | null,
  tileSrc: TileSrc,
  setTileSrcR: SetTileSrcR
}

function TImg({tileUrl, tileDim, tileSrc, setTileSrcR}: Props) {

  // if(!tileSrc.loaded) return(<div>Image Loading...</div>);

  const updateImD = async (img: HTMLImageElement) => {
    // console.log('uid', img.width);

    const w = img.width;
    const h = img.height;
    const d = tileDim || 1;

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

  const onLoadTrigger = async (trigger: string, img: HTMLImageElement) => {
    // console.log(`loaded! from ${trigger}`, img);
    if (!tileSrc.loaded) {
      await updateImD(img);
      // console.log('uid updated!');
    }
  }
  const handleImgRef = async (input: HTMLImageElement) => {
    if (!input) return;
    const img = input;

    img.onload = onLoadTrigger.bind(null, 'onload', img);
    if (img.complete) await onLoadTrigger('oncomplete', img);
  }

  return (
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

function mapStateToProps(state: AppState) {
  return {
    tileSrc: state.tileSrc,
    tileUrl: state.tileUrl,
    tileDim: state.tileDim
  }
}

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    setTileSrcR,
  },
  dispatch
)

export default connect(mapStateToProps, mapDispatchToProps)(TImg);