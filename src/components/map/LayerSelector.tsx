import React, {useContext} from "react";
import {FontAwesomeIcon} from "@fortawesome/react-fontawesome";
import {faEye, faEyeSlash} from "@fortawesome/free-solid-svg-icons";
import {RootContext} from "../../store/RootStore";

type LayerSelectorProps = {name: string, handleClick: (name: string) => void, selected: string }
export function LayerSelector({name, handleClick, selected}: LayerSelectorProps) {
    const state = useContext(RootContext);
    const vis = state.mapStore.visibleLayers[name];

    const toggleShow = (e: React.MouseEvent) => {
        e.stopPropagation();

        state.mapStore.setLayerVis(name, !vis);
        return false;
    }

    return(
        <div
            key={name}
            onClick={handleClick.bind(null, name)}
            className={selected}
        >
                    <span className="eye" onClick={toggleShow}>
                        <FontAwesomeIcon icon={(vis)? faEye : faEyeSlash} size="2x"/>
                    </span>
            {name}
        </div>
    )
}