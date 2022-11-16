

import React, { useRef, useEffect } from "react";
import paper from 'paper';
// @ts-ignore
import { makeLooper } from '@andreaskundig/looper';
// @ts-ignore
// import * as Looper from '@andreaskundig/looper';
// const makeLooper: any = (Looper as any).makeLooper;

interface BouboucleRunnerProps {
    animData: any;
}

const BouboucleRunner: React.FunctionComponent<BouboucleRunnerProps> = ({animData}) => {
    const canvasRef = useRef(null);

    useEffect(() => {
        const graphics = {canvas: canvasRef.current, paper:paper};
        const looper: any = makeLooper({graphics});
        looper.importData(animData);
        looper.start();
    }, [animData]);

    return (
        <div>
            <canvas ref={canvasRef} ></canvas>
        </div>
    );
}

export default BouboucleRunner;
