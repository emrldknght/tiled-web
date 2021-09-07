import React, {CSSProperties, useEffect, useState} from "react";

type UIBType = { handlePress: (e: React.MouseEvent)=> void, dataName: string}

const getP = (num: number): CSSProperties => {
    return { '--p': `${num}%` } as CSSProperties
}

function UIButton({ handlePress, dataName}: UIBType) {
    const [bs, setBs] = useState(0);
    const [intervalId, setIntervalId] = useState(0);

    const hp = (e: React.MouseEvent) => {
        const iterate = () => {
            setBs(bs => bs + 2);
        }

        const newIntervalId = window.setInterval(iterate, 50);
        setIntervalId(newIntervalId);

        handlePress(e);
    }

    useEffect(() => {
        if(bs >= 100){
            window.clearInterval(intervalId);
            setIntervalId(0);
        }
    },[bs, intervalId])

    const progress = getP(bs);

    return (
        <button style={progress} onClick={hp} data-name={dataName}>
            <div className="col">
                <span>{dataName}</span>
                <span>{bs}</span>
            </div>
        </button>
    )
}

export function TestUI() {
    const [msg, setMsg] = useState('Test');

    const handleKey = (key: string) => {
        setMsg(key);
    }
    const handlePress = (e: React.MouseEvent) => {
        const t = e.target as HTMLButtonElement;
        const n = t.dataset.name ?? '';
        setMsg(n);
    }

    useEffect(() => {
        window.addEventListener('keydown', (e) => {
            handleKey(e.key)
        })
    }, [])

    return(
        <div>
            <h1>Test UI</h1>
            <div className="col">
                <div>Message:{msg}</div>
                <div className="ui-buttons row">
                    <UIButton handlePress={handlePress} dataName={'1'} />
                    <UIButton handlePress={handlePress} dataName={'2'} />
                    <UIButton handlePress={handlePress} dataName={'3'} />
                </div>
            </div>
        </div>
    )
}