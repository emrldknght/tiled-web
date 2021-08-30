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

test('set active layer', () => {
    const mapStore = new MapEntity();
    mapStore.setActiveLayer('new');
    expect(mapStore.activeLayer).toBe('new');
})

test('set map layer', () => {
    const mapStore = new MapEntity();
    mapStore.setMap([[0, 1],[4, 7],[3, 2]]);
    mapStore.setMapLayer('map', [[0, 1]]);
    expect(mapStore.mapData).toStrictEqual([[0, 1]]);
})

test('map expand to 1 left 1 down', () => {
    const mapStore = new MapEntity();
    mapStore.setMap([[0, 1],[0, 1]]);
    mapStore.mapExpand('expand', 8)
    expect(mapStore.mapData).toStrictEqual([[0, 1, 0], [0, 1, 0], [0, 0, 0]]);
})