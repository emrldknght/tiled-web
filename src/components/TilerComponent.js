import {useEffect, useState} from "react";

const initGridState = {

}

const removeIndex = (array, index) => {
  delete array[index];
  array = array.filter(function(element) {
    return element !== undefined
  });
  return array;
}

const cellKey = (i, j) => `k_${i}_${j}`;

function TGrid(props) {
  const [activeTiles, setActiveTiles] = useState([cellKey(2, 0)]);


  useEffect(() => {
    console.log('init grid', props.tileSrc);

    const tt = [...Array(props.tileSrc.hc).keys()]
      .map(row => [...Array(props.tileSrc.wc).keys()])
      .map(item => false)
    ;
    // setActiveTiles(tt);
  }, [])

  const handleChange = (i, j) => {
    console.log('set', i, j)
    if(isChecked(i, j)) {
      // console.log('in array');
      const index = activeTiles.indexOf(cellKey(i, j));
      if(index !== -1) {
        const newState = removeIndex(activeTiles, index);
        setActiveTiles(newState);
      }
    } else {
      setActiveTiles(oldState => [...oldState, ...[cellKey(i, j)]])
    }
  }

  const isChecked = (i, j) => activeTiles.includes(cellKey(i, j));

  const cells = (j) => [...Array(props.tileSrc.wc).keys()]
    .map(i => {

      const p = {
        '--ox': -i,
        '--oy': -j,
      };

      return(
        <div className='cell grid-cell' data-x={i} key={`grid_cell_${i}_${j}`} style={p}>
          <div className="col">
            <span>{`(${i},${j})`}</span>
            <input type="checkbox"  checked={isChecked(i, j)}  onChange={handleChange.bind(null, i, j)}/>
          </div>
        </div>)
    })

  const gridRows = [...Array(props.tileSrc.hc).keys()]
    .map((i) => <div className='row' key={`grid_row_${i}`}>
      {cells(i)}
    </div>);

  return(
    <div className='t-grid'>
      {gridRows}
    </div>
  )
}

function TImg(props) {

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

  // const [showActive, setShowActive] = useState(false);

  return(
    <div className="tiler" style={p}>
      <b>Tiler</b><input type="checkbox" />
      <div className="content">
        <div className="layer grid-base">
          {(props.tileSrc.loaded) ? (
            <TGrid
              tileSrc={props.tileSrc}
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