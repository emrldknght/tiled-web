function TGrid(props) {

  const cells = (j) => [...Array(props.tileSrc.wc).keys()]
    .map(i => <div className='cell' key={`grid_cell_${i}_${j}`}>{i}</div>)

  const gridRows = [...Array(props.tileSrc.hc).keys()]
    .map((i) => <div className='row' key={`grid_row_${i}`}>{cells(i)}</div>);

  return(
    <div className='t-grid'>
      {gridRows}
    </div>
  )
}

function TImg(props) {

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

  const onLoadTrigger = async (trigger, img) => {
    console.log(`loaded! from ${trigger}`, img);
    if(!props.tileSrc.loaded) {
      await updateImD(img);
      console.log('uid updated!');
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

export function TilerComponent(props) {

  const p = {
    '--tile-root': `url(${props.tileUrl})`,
    '--tile-dim': `${props.tileDim}px`,
  };

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

  return(
    <div className="tiler" style={p}>
      <b>Tiler</b>
      <div className="content">
        <div className="layer">
          <TImg
            tileSrc={props.tileSrc}
            setTileSrc={props.setTileSrc}
            tileUrl={props.tileUrl}
            tileDim={props.tileDim}
          />
          {/*
          {(props.tileUrl && props.tileDim) ? (
            <img
              alt='tiling-source'
              src={props.tileUrl}
              ref={handleImgRef}
            />
            ) : (
            <span>Loading...</span>
            )
          }
          */}
        </div>
        <div className="layer grid-base">
          <TGrid tileSrc={props.tileSrc}/>
        </div>
        <div className="info-tooltip">Info:
          {JSON.stringify(props.tileSrc)}
        </div>
      </div>
    </div>
  )
}