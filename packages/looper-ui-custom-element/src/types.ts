export type Dimension = {
    width: number; 
    height: number;
}

export type Timing = {
    lifetime: number; 
    beat: number;
}

export type Menu = {
    hideSubmenu: () => void; 
    initShowSubmenu: (modalDiv: Element, button: Element, beforeShow: () => void) => void;
}

export type Looper = {
    exportData: any;
    clear: () => void,
    record: (config:any) => Promise<string>;
    getLastUpdateTime: () => number;
    setLineColor: (color: string) => void;
    getLineColor: () => string;
    setStrokeWidth: (strokeWidth: number) => void;
    getStrokeWidth: () => number;
    getBeat: () => number;
    setBeat: (beat: number) => void;
    getLifetime: () => number;
    setLifetime: (lifetime: number) => void;
    makeTimingDemo: (canvas: HTMLCanvasElement, timings: Timing[][], dimension: Dimension) => Looper;
    getSpeed: () => number;
    setSpeed: (speed: number) => void;
    getDimension: () => Dimension;
    start: () => void;
    scale: (dimension: Dimension) => void;
    importData: (importData: ImportData) => void;
}

export type ImportData = {
    width: number;
    height: number;
    speed: number;
    foregroundUrl: string;
    lineData: number[][];
}

export type Io = {
    gists: {
        save: (exportData: any) => Promise<any>
    }
}
