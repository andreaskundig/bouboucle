export type Menu = {
    hideSubmenu: () => void; 
}

export type Looper = {
    exportData: any;
    record: (config:any) => Promise<string>;
}

// export type Io = {
//     gists: {
//         save: (exportData: any) => Promise<any>
//     }
// }