export function DebugOut({data}: {data: any}) {
  return (
    <div className="debug-out">
      {JSON.stringify(data)}
    </div>
  )
}