import {MapEntity} from "../../store/MapStore";

const getMinMax = (d: number[] | number[][], v: number) => {
    const min = Math.max(v - 1, 0);
    const max = Math.min(d.length - 1, v + 1);
    return [min, max]
}

const getSelectionValue = (x: number, y: number, ctx: MapEntity) => ctx.selection[y][x];
const getCellValue = (x: number, y: number, ctx: MapEntity) => ctx.mapData[y][x];

function getSur(ctx: MapEntity, x: number, y: number, v: number) {
    const [minY, maxY] = getMinMax(ctx.mapData, y);
    const [minX, maxX] = getMinMax(ctx.mapData[0], x);

    for (let _y = minY; _y <= maxY; _y++) {
        for (let _x = minX; _x <= maxX; _x++) {

            const sameVal = getCellValue(_x, _y, ctx) === v;
            const notInSelection = getSelectionValue(_x, _y, ctx) === -1;
            const notCenter = !(_x === x && _y === y);

            if (sameVal && notInSelection && notCenter) {
                ctx.setHLC(_x, _y, v);
                getSur(ctx, _x, _y, v);
            }
        }
    }
}

export function selectMapArea(x: number, y: number, ctx: MapEntity) {
    const v = ctx.mapData[y][x];
    ctx.setHLC(x, y, v);
    getSur(ctx, x, y, v)
}