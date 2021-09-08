type DPri = string | number | boolean;
type DNode = { [key: string]: DNode | DNode[] | DPri | DPri[] | null }
type DT = DNode | DNode[] | DPri | DPri[] | null;

const data: DNode = {
    "action": "get_map_data",
    "data": {
        "mapWidth": "1500",
        "mapHeight": "1000",
        "zoom": "2",
        "categories": [
            {"id": "shops", "title": "Магазины", "color": "#1E3E7B", "show": "true"},
            {"id": "catering", "title": "Кафе и рестораны", "color": "#1E3E7B", "show": "true"},
            {"id": "services", "title": "Услуги", "color": "#1E3E7B", "show": "true"},
            {"id": "leisure", "title": "Досуг и развлечения", "color": "#1E3E7B", "show": "true"}],
        "levels": [{
            "id": "1",
            "name": "0",
            "title": "1 этаж",
            "map": "svg/m51-floor-1.svg",
            "minimap": "svg/m51-floor-1.png",
            "locations": [{
                "name": "accent",
                "title": "Accent",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/545/50_50_1/9ks0w8148lcubin966jms99343jrssr6.JPG",
                "link": "/shops/accent",
                "floor": "1",
                "id": "127",
                "x": "0.3554",
                "y": "0.5923",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Кожгалантерея и аксессуары",
                "__sid": "8",
                "thumbnail_w": 50,
                "thumbnail_h": 25
            }, {
                "name": "zarina",
                "title": "Zarina",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/b4d/50_50_1/wy7ibr0f5w6s57e32asg8t0rhx9292r2.gif",
                "link": "/shops/zarina",
                "floor": "1",
                "id": "103",
                "x": "0.4615",
                "y": "0.5466",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Одежда",
                "__sid": "3",
                "thumbnail_w": 50,
                "thumbnail_h": 8
            }, {
                "name": "riv-gosh",
                "title": "РИВ ГОШ",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/517/50_50_1/3cdkof9ox2h6vbzdxal13dpgkcfvxb1n.jpg",
                "link": "/shops/riv-gosh",
                "floor": "1",
                "id": "102",
                "x": "0.5436",
                "y": "0.5288",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Парфюмерия и косметика",
                "__sid": "13",
                "thumbnail_w": 50,
                "thumbnail_h": 14
            }, {
                "name": "o-key",
                "title": "О'КЕЙ",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/ed0/50_50_1/oeoho4sux0xpxpb6e6t27zs7qcjeuehx.jpg",
                "link": "/shops/o-key",
                "floor": "1",
                "id": "148",
                "x": "0.6698",
                "y": "0.3197",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Продуктовый гипермаркет",
                "__sid": "2",
                "thumbnail_w": 50,
                "thumbnail_h": 24
            }, {
                "name": "pantyulpan",
                "title": "ПанТюльпан",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/4a2/50_50_1/lw44ysdxse5sdd35enw3uawva8vnbrux.png",
                "link": "/shops/pantyulpan",
                "floor": "1",
                "id": "146",
                "x": "0.6575",
                "y": "0.5030",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Цветы",
                "__sid": "11",
                "thumbnail_w": 50,
                "thumbnail_h": 28
            }, {
                "name": "natura-siberica",
                "title": "Natura Siberica",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/866/50_50_1/fgsevknbtou7tatr7zt7j56axj4cp62m.JPG",
                "link": "/shops/natura-siberica",
                "floor": "1",
                "id": "101",
                "x": "-1",
                "y": "-1",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Парфюмерия и косметика",
                "__sid": "13",
                "thumbnail_w": 46,
                "thumbnail_h": 50
            }, {
                "name": "cozy-home",
                "title": "COZY HOME ",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/a96/50_50_1/pufjiphwdxq35soandq0tce0fbcleh5u.jpg",
                "link": "/shops/cozy-home",
                "floor": "1",
                "id": "104",
                "x": "0.4144",
                "y": "0.5379",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Товары для дома",
                "__sid": "9",
                "thumbnail_w": 50,
                "thumbnail_h": 16
            }, {
                "name": "eldorado",
                "title": "ЭЛЬДОРАДО",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/928/50_50_1/yrvo281f7p9k7ae3nniq155t8myyn2dr.png",
                "link": "/shops/eldorado",
                "floor": "1",
                "id": "108",
                "x": "0.0887",
                "y": "0.5198",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Электроника и связь",
                "__sid": "10",
                "thumbnail_w": 50,
                "thumbnail_h": 19
            }, {
                "name": "drugie-podarki",
                "title": "ДРУГИЕ ПОДАРКИ",
                "category": "shops",
                "thumbnail": "/upload/iBlock/361/6n61a8jea17qxk235lhok3xlt5l11hw6.jpg",
                "link": "/shops/drugie-podarki",
                "floor": "1",
                "id": "111",
                "x": "0.2507",
                "y": "0.6124",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Cувениры и подарки",
                "__sid": "12",
                "thumbnail_w": 50,
                "thumbnail_h": 50
            }, {
                "name": "familia",
                "title": "FAMILIA",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/0cf/50_50_1/utgp10xa7izl9kwxrkvj65yhgrk84lxh.png",
                "link": "/shops/familia",
                "floor": "1",
                "id": "105",
                "x": "0.3536",
                "y": "0.5291",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Одежда",
                "__sid": "3",
                "thumbnail_w": 50,
                "thumbnail_h": 20
            }, {
                "name": "kari",
                "title": "KARI",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/ce9/50_50_1/f8znazyxnwqahox0kdibytcv3pbu7zp9.jpg",
                "link": "/shops/kari",
                "floor": "1",
                "id": "110",
                "x": "0.1651",
                "y": "0.6154",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Обувь",
                "__sid": "5",
                "thumbnail_w": 50,
                "thumbnail_h": 14
            }, {
                "name": "schastlivyy-vzglyad",
                "title": "Счастливый взгляд",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/1d5/50_50_1/xoyf8smu72kh1a3yfz60vpxt895b8eoz.jpg",
                "link": "/shops/schastlivyy-vzglyad",
                "floor": "1",
                "id": "109",
                "x": "0.1298",
                "y": "0.5933",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Аптека и оптика",
                "__sid": "6",
                "thumbnail_w": 50,
                "thumbnail_h": 19
            }, {
                "name": "khobbi-gipermarket-leonardo",
                "title": "Хобби-Гипермаркет Леонардо",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/d32/50_50_1/i1mbv3vuqcloyqzh266kgfhyfnth67na.jpg",
                "link": "/shops/khobbi-gipermarket-leonardo",
                "floor": "1",
                "id": "107",
                "x": "0.2347",
                "y": "0.4921",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Товары для хобби и творчества",
                "__sid": "7",
                "thumbnail_w": 50,
                "thumbnail_h": 17
            }]
        }, {
            "id": "2",
            "name": "0",
            "title": "2 этаж",
            "map": "svg/m51-floor-2.svg",
            "minimap": "svg/m51-floor-2.png",
            "locations": []
        }, {
            "id": "3",
            "name": "0",
            "title": "3 этаж",
            "map": "svg/m51-floor-3.svg",
            "minimap": "svg/m51-floor-3.png",
            "locations": [{
                "name": "kidrum",
                "title": "КИДРУМ",
                "category": "leisure",
                "thumbnail": "/upload/resize_cache/iBlock/734/50_50_1/9e4429svq9xedrvlu84is7pcrh2ypwxo.png",
                "link": "/leisure/kidrum",
                "floor": "3",
                "id": "121",
                "x": "-1",
                "y": "-1",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": null,
                "__sid": "18",
                "thumbnail_w": 50,
                "thumbnail_h": 39
            }, {
                "name": "belted",
                "title": "BELTED",
                "category": "shops",
                "thumbnail": "/upload/resize_cache/iBlock/14e/50_50_1/8lwb8pasrwusrle81g6ebc0ah8t049j2.jpg",
                "link": "/shops/belted",
                "floor": "3",
                "id": "339",
                "x": "-1",
                "y": "-1",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": "Кожгалантерея и аксессуары",
                "__sid": "8",
                "thumbnail_w": 50,
                "thumbnail_h": 16
            }]
        }, {
            "id": "4",
            "name": "0",
            "title": "4 этаж",
            "map": "svg/m51-floor-4.svg",
            "minimap": "svg/m51-floor-4.png",
            "locations": [{
                "name": "severnoe-siyanie",
                "title": "Северное Сияние",
                "category": "leisure",
                "thumbnail": "/upload/resize_cache/iBlock/8f9/50_50_1/47uwbqtiasyhn3bdkn4lfkiz3kltqhj2.jpg",
                "link": "/leisure/severnoe-siyanie",
                "floor": "4",
                "id": "404",
                "x": "-1",
                "y": "-1",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": null,
                "__sid": "18",
                "thumbnail_w": 50,
                "thumbnail_h": 38
            }, {
                "name": "makdonalds",
                "title": "Макдоналдс",
                "category": "catering",
                "thumbnail": null,
                "link": "/catering/makdonalds",
                "floor": "4",
                "id": "405",
                "x": "-1",
                "y": "-1",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": null,
                "__sid": "16"
            }, {
                "name": "voobrazhulya",
                "title": "Воображуля",
                "category": "services",
                "thumbnail": null,
                "link": "/services/voobrazhulya",
                "floor": "4",
                "id": "405",
                "x": "-1",
                "y": "-1",
                "highlight-color": "#964A97",
                "pin": "hidden",
                "zoom": "1",
                "description": null,
                "__sid": "14"
            }]
        }],
        "sections": {
            "18": ["4", "3"],
            "8": ["1", "3"],
            "3": ["1"],
            "13": ["1"],
            "2": ["1"],
            "11": ["1"],
            "9": ["1"],
            "10": ["1"],
            "12": ["1"],
            "5": ["1"],
            "6": ["1"],
            "7": ["1"],
            "16": ["4"],
            "14": ["4"]
        }
    }
};
const path = ['data', 'sections', '-1'];

const isDNode = (d: DT): d is DNode => {
    return typeof d === "object" && d !== null;
}

export const walker = (path: string[], data: DNode ): DT => {
    const key = path.shift();
    if(key === undefined) {
        return `key is null`;
    }

    const val = data[key];
    if(val === null) {
        return `val is null`;
    }

    if(path.length > 0) {
        if(!isDNode(val)) {
            return `can't parse value of type ${typeof val}`;
        }
        return walker(path, val);
    } else {
        return val;
    }

}

const v = walker(path, data);
console.log(v);