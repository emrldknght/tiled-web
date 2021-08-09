export function DebugOut<T>({data}: {data: T}) {
  return (
    <div className="debug-out">
      {JSON.stringify(data)}
    </div>
  )
}