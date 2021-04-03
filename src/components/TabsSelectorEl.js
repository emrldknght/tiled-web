export function TabsSelectorEl(props) {
  const isActive = () => {
    return (props.active === props.tab) ? 'active' : '';
  }
  return (
    <span data-tab={props.tab} className={isActive()}>{props.text}</span>
  )
}