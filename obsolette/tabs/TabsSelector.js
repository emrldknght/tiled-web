import {TabsK} from "../../src/components/Tabs";
import {TabsSelectorEl} from "./TabsSelectorEl";

export function TabsSelector({active, setActive}) {

  const t = [
    {tab: TabsK.mapEditor, text: 'Map editor'},
    {tab: TabsK.tiler, text: 'Tiler'},
  ]

  return(
    <div className="tabs-selector col" onClick={setActive}>
      {/*<div>Tabs selector:</div>*/}
      <div className="row">
        {
          t.map((i, j) => {
            return(
              <TabsSelectorEl tab={i.tab} active={active} text={i.text} key={`ts_${j}`}/>
            )
          })
        }
        {/*
        <TabsSelectorEl tab={Tabs.mapEditor} active={props.active} text='Map editor' />
        |
        <TabsSelectorEl tab={Tabs.tiler} active={props.active} text ='Tiler' />
        */}
      </div>
    </div>
  )
}