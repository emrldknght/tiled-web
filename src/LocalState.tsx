// from https://www.joshwcomeau.com/react/persisting-react-state-in-localstorage/
import React from "react";

export const LSKeys: {[key: string]: string} = {
    Tab: 'tiled-active-tab'
}

export function useLState(defaultValue: any, key: string) {
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