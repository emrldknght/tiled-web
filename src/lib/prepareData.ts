import {MapEntity} from "../store/MapStore";

export const prepareData = (state: MapEntity) => {
    const data = {
        mapData: state.mapData,
        tileDim: state.tileDim,
        tileUrl: (state.tileUrl || '').replace(/^.*([\\/:])/, '')
        // tileUrl: (state.tileUrl || '').replace(/^.*(\\|\/|\:)/, '')
    }
    return JSON.stringify(data);
};