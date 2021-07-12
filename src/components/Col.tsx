import {ReactNode} from "react";

type Props = { children: ReactNode, className?: string }
export function Col({ children, className = '' }: Props) {
  return(
    <div className={`col ${className}`}>
      {children}
    </div>
  )
}