export function TImg(props) {

  const updateImD = async (img) => {
    // console.log('uid', img.width);

    const w = img.width;
    const h = img.height;
    const d = props.tileDim;

    // console.log(w,h,d);

    const newState = {
      w: w,
      wc: w / d,
      h: h,
      hc: h / d,
      loaded: true
    };
    await props.setTileSrc(prevState => ({...prevState, ...newState}));
  }

  const onLoadTrigger = async (trigger, img) => {
    // console.log(`loaded! from ${trigger}`, img);
    if(!props.tileSrc.loaded) {
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
      {(props.tileUrl && props.tileDim) ? (
        <img
          className="tiling-source-img"
          alt='tiling-source'
          src={props.tileUrl}
          ref={handleImgRef}
        />
      ) : (
        <span>Loading...</span>
      )
      }
    </div>
  )
}