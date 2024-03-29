// from https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
import React from "react";

export enum LSKeys {
    Tab = 'tiled-active-tab',
    MapGrid = 'map-grid',
    MapCellInfo = 'map-cell-info',
    Map3DView = 'map-3d-view'
}

export function useLState<T>(defaultValue: T, key: LSKeys) {
    const [value, setValue] = React.useState(() => {
        const kept = localStorage.getItem(key);
        return kept !== null
            ? JSON.parse(kept)
            : defaultValue
    })
    React.useEffect(() => {
        localStorage.setItem(key, JSON.stringify(value))
    }, [key, value])

    return [value, setValue]
}