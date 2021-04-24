export function TabContent({tabActive, tabName, children}) {
  return(
    (tabActive === tabName) &&
    <div className="tab">
      {children}
    </div>
  )
}