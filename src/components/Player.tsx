import {CSSProperties, useEffect, useState} from "react";

export function Player() {
    const [x, setX] = useState(9);
    const [y, setY] = useState(130);

    const speed = .3;

    let up = false;
    let down = false;
    let right = false;
    let left = false;

    const move = (x: number ,y: number) => {
        const el = document.getElementById('player-1');
        if(!el) return;

        const sx = el.style.getPropertyValue('--x');
        const cx = parseFloat(sx.substr(0, sx.length - 2))

        console.log(sx, 'cx', cx, (cx + x), (cx + x).toString());

        const sy = el.style.getPropertyValue('--y');
        const cy = parseFloat(sy.substr(0, sy.length - 2))

        el.style.setProperty('--x', (cx + x).toString() + 'px');
        el.style.setProperty('--y', (cy + y).toString() + 'px');
    }

    window.addEventListener('keydown', (e) => {
        const key = e.key;
        // console.log(key);
        switch (key) {
            case 'w':
                up = true;
                break;
            case 'a':
                left = true;
                break;
            case 's':
                down = true;
                break;
            case 'd':
                right = true;
                break;
        }
    })
    window.addEventListener('keyup', (e) => {
        const key = e.key;
        // console.log(key);
        switch (key) {
            case 'w':
                up = false;
                break;
            case 'a':
                left = false;
                break;
            case 's':
                down = false;
                break;
            case 'd':
                right = false;
                break;
        }
    })

    function render() {
        if(up) move(0 , -speed)
        if(left) move(-speed, 0)
        if(down) move(0, speed)
        if(right) move(speed, 0);
        requestAnimationFrame(render)
    }
    render();

    useEffect(() => {

    })

    const dim = '30px';
    const styles = {
        '--x': x + 'px',
        '--y': y + 'px',
        backgroundColor: 'pink',
        position: 'absolute',
        width: dim,
        height:  dim,
        zIndex: 9,
        backgroundImage: 'url(./human.png)',
        display: 'flex',
        backgroundSize: `calc(8 * ${dim})`,
        top: 'var(--y)',
        left: 'var(--x)'
    } as CSSProperties

    return (
        <div id="player-1" className="player" style={styles}>

        </div>
    )
}