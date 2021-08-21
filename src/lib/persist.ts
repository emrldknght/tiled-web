import {LSKeys} from "../LocalState";
import {reaction} from "mobx";

export function persist<T>(ctx: T, key: keyof T, ls: LSKeys) {
    const saved = localStorage.getItem(ls)
    if(saved) {
        if(typeof ctx[key] === 'boolean') {
            const v: boolean = (saved === 'true');
            ctx[key] = (v as unknown) as T[keyof T];
        }
    }
    reaction(() => ctx[key], (val, prev, r) => {
        console.log(val, prev, r);
        localStorage.setItem(ls, JSON.stringify(val));
    })
}

export function persistStrict<T>(ctx: T, key: keyof T, actionName: keyof T, ls: LSKeys) {
    const saved = localStorage.getItem(ls)
    if(saved) {
        if(typeof ctx[key] === 'boolean') {
            const v: boolean = (saved === 'true');

            const action = ctx[actionName];
            if(typeof  action === 'function') {
                const a = action.bind(ctx, v);
                a();
            }
        }
    }
    reaction(() => ctx[key], (val, prev, r) => {
        console.log(val, prev, r);
        localStorage.setItem(ls, JSON.stringify(val));
    })
}