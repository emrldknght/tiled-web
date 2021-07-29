import {observer} from "mobx-react";
import {useContext, useState} from "react";
import {Button, Divider, Intent} from "@blueprintjs/core";
import {DebugOut} from "../common/DebugOut";
import {MapContext} from "../MapComponent";

const DIM_BUTTONS = [
  'arrow-top-left',
  'arrow-up',
  'arrow-top-right',
  'arrow-left',
  'array',
  'arrow-right',
  'arrow-bottom-left',
  'arrow-down',
  'arrow-bottom-right',
];
const EXPAND = [0,1,2,3,4,5,6,7,8];
const SHRINK = [8,7,6,5,4,3,2,1,0];

export type PanelMode = 'expand' | 'shrink';
type PanelProps = { active: number, handleClick: (i: number) => void, order: number[] }

function Panel({ active, handleClick, order }: PanelProps) {
  return(
    <div className="row">
      <div className="dim-buttons">
        {
          order.map((b, i) => {
            const iconName = (DIM_BUTTONS[b] as any);
            return (
              <Button intent={(i === active) ? Intent.PRIMARY : undefined}
                      icon={iconName} key={`bd_${i}`} small
                      onClick={handleClick.bind(null, i)}
              />)
          })
        }
      </div>

    </div>
  )
}

export const MapDimensionsComponent = observer(function MapDimensionsComponent () {
  const mapState = useContext(MapContext);

  const mapData = mapState.mapData;

  const w = mapData.length; // .length || 1;
  const h = (mapData.length > 0) ? mapData[0].length : 0; // [0].length || 1;

  const [panelMode, setPanelMode] = useState<PanelMode>('expand')
  const [dimActive, setDimActive] = useState<number>(4);
  const handleClick = (i: number) => setDimActive(i);

  const handleMode = (mode: PanelMode) => {
    setPanelMode(mode)
  }

  const handleAction = () => {
    console.log('a!:', panelMode, dimActive);
    mapState.mapExpand(panelMode, dimActive);

    /*
    const a = (panelMode === 'expand') ? 'add' : 'del';
    const actions: RowActions | ColActions = modify[a];
    let action = getAction(dimActive, actions);
    console.log(action, typeof action);
    if(typeof action === 'function') action(mapData);
     */
  }

  return(
    <div className="map-dimensions-palette">
      <b>Map Dimensions:</b>
      <div className="col">
        <div className="row">
          <DebugOut data={{w, h, [panelMode]: dimActive }} />
        </div>
        <div className="row">
          <div className="col" style={{justifyContent: 'space-around'}}>
            <Button icon="expand-all"
                    onClick={handleMode.bind(null, 'expand')}
                    intent={(panelMode === 'expand') ? Intent.PRIMARY : undefined}
            />
            <Button icon="collapse-all"
                    onClick={handleMode.bind(null, 'shrink')}
                    intent={(panelMode === 'shrink') ? Intent.PRIMARY : undefined}
            />
          </div>
          <Divider />
          <div className="row">
            <Panel active={dimActive} handleClick={handleClick}
                   order={ (panelMode === 'expand') ? EXPAND : SHRINK }/>
            <Divider />
            <Button text={panelMode} onClick={handleAction}/>
          </div>
        </div>
      </div>
    </div>
  )
})