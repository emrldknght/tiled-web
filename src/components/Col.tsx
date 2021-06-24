import {ReactNode} from "react";

export function Col({ children }: { children: ReactNode }) {
  return(
    <div className="col">
      {children}
    </div>
  )
}