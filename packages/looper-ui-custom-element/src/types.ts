export type Menu = {
    hideSubmenu: () => void; 
    initShowSubmenu: (modalDiv: Element, button: Element, beforeShow: () => void) => void;
}

export type Looper = {
    exportData: any;
    record: (config:any) => Promise<string>;
    getLastUpdateTime: () => number;
    setLineColor: (color: string) => void;
    getLineColor: () => string;
}


export type Io = {
    gists: {
        save: (exportData: any) => Promise<any>
    }
}
