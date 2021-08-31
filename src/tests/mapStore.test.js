import {MapEntity} from "../store/MapStore";
import {mockMap} from "../mock/mockMap";

test('set map', () => {
    const mapStore = new MapEntity();
    mapStore.setMap(mockMap);

    expect(mapStore.mapData).toStrictEqual(mockMap);
})

function sum(a, b) {
    return a + b;
}
test('adds 1 + 2 to equal 3', () => {
    expect(sum(1, 2)).toBe(3);
});

const exampleMap = [
    [0, 1],[0, 1]
];

test('get mapData()', () => {
    const mapStore = new MapEntity();
    mapStore.setMap(exampleMap);
    expect(mapStore.mapData).toStrictEqual(exampleMap);
})

test('set active layer', () => {
    const mapStore = new MapEntity();
    mapStore.setActiveLayer('new');
    expect(mapStore.activeLayer).toBe('new');
})

test('setActiveLayer', () => {
    const mapStore = new MapEntity();
    mapStore.setActiveLayer('active');
    expect(mapStore.activeLayer).toBe('active');
})

test('set map layer', () => {
    const mapStore = new MapEntity();
    mapStore.setMap([[0, 1],[4, 7],[3, 2]]);
    mapStore.setMapLayer('map', [[0, 1]]);
    expect(mapStore.mapData).toStrictEqual([[0, 1]]);
})

test('selection', () => {
    const mapStore = new MapEntity();
    mapStore.setMap([[0, 1],[4, 7]]);
    mapStore.setHl(1, 1);
    expect(mapStore.selection).toStrictEqual([[-1, -1],[-1, 1]]);


    expect(mapStore.isHl(1, 1)).toBe(true);
})

test('setTileDim', () => {
    const mapStore = new MapEntity();
    mapStore.setTileDim(12);
    expect(mapStore.tileDim).toBe(12);
})

test('setXY', () => {
    const m = new MapEntity()
    m.setXY(4, 6);
    expect(m.curX).toBe(4);
    expect(m.curY).toBe(6);
})

test('setRow', () => {
    const mapStore = new MapEntity();
    mapStore.setMap(exampleMap);
    mapStore.setRow(0, [3, 3]);
    expect(mapStore.mapData).toStrictEqual([
        [3, 3],[0, 1]
    ]);
})

test('map expand to 1 left 1 down', () => {
    const mapStore = new MapEntity();
    mapStore.setMap([[0, 1],[0, 1]]);
    mapStore.mapExpand('expand', 8)
    expect(mapStore.mapData).toStrictEqual([[0, 1, 0], [0, 1, 0], [0, 0, 0]]);
})