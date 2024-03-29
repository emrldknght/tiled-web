import {observer} from "mobx-react";
import {useContext} from "react";
import {RootContext} from "../../store/RootStore";

export const TImg = observer(function TImg() {

  const rootState = useContext(RootContext);
  const mapState = rootState.mapStore
  const tilerState = rootState.tilerStore;

  const tileUrl = mapState.tileUrl;
  const tileDim = mapState.tileDim;
  const tileSrc = tilerState.tileSrc;

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
      tilerState.setTileSrcR(newState);
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
})