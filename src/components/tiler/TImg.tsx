import {observer} from "mobx-react";
import {useContext} from "react";
import {mAppState} from "../../store/mStore";
import {StoreContext} from "../../store/StoreContext";

export const TImg = observer(() => {

  const state = useContext(StoreContext);
  const tileUrl = state.tileUrl;
  const tileDim = state.tileDim;
  const tileSrc = state.tileSrc;

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
      mAppState.setTileSrcR(newState);
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