export function CellPalette(props) {
  const p = {
    '--tile-root': `url(${props.tileUrl})`,
    '--tile-dim': `${props.tileDim}px`,
  };

  const tapTile = (e) => {
    const id = e.target.dataset.id;
    console.log('tap', id);
    if(id) props.setSelectedTile(id)
  }
  /*
  const k = Object.keys(props.data).map(item => {
    const t = props.data[item].type;
    return(<div key={`pal-cell-${item}`} data-id={item} className={`cell cell-map ${t}`}>{item}</div>)
  })
   */
  const k = props.data.map(item => {
    const t = item.type;
    return(<div key={`pal-cell-${item.id}`} data-id={item.id}
                className={`cell cell-map ${t}`}>{item.id}</div>
    )
  })
  return(
    <div className="cell-palette col" style={p}>
      <div className="row">Palette:</div>
      <div className="row">{JSON.stringify(props.data)}</div>
      <div className="row">
        <div className="row" onClick={tapTile}>
          {k}
          <div className="cell cell-map grass">A</div>
          <div className="cell cell-map water">B</div>
        </div>
        <div className="row">
          Controls:{props.selectedTile}
        </div>
      </div>
    </div>
  )
}