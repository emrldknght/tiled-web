import React from "react";
import {IconProp} from "@fortawesome/fontawesome-svg-core";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {PalToolType} from "../ToolPalette";

type ToolButtonProps = {
    name: string,
    tool: PalToolType,
    activeTool: PalToolType,
    handle: (e: React.MouseEvent) => void,
    icon: IconProp
}
export function ToolButton({ name, tool, activeTool, handle, icon }: ToolButtonProps) {
    return(
        <div className={`tool-icon ${(activeTool === tool) ? 'active' : ''}`}
             data-tool={tool}
             onClick={handle}
        >
            <FontAwesomeIcon icon={icon} size="2x"/>
            <span className="name">{name}</span>
        </div>
    )
}