import {ReactNode} from "react";

type Props = { children: ReactNode, className?: string };
export function Row({ children, className = '' }: Props) {
  return(
    <div className={`row ${className}`}>
      {children}
    </div>
  )
}