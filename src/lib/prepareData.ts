type Data = {
    mapData: number[][],
    tileDim: number | null,
    tileUrl: string | null
}

export const prepareData = (state: Data) => {
    const data = {
        mapData: state.mapData,
        tileDim: state.tileDim,
        tileUrl: (state.tileUrl || '').replace(/^.*([\\/:])/, '')
        // tileUrl: (state.tileUrl || '').replace(/^.*(\\|\/|\:)/, '')
    }
    return JSON.stringify(data);
};