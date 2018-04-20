export interface SystemSettings {
    system?: {
        APIid?: string;
        v?: string | number;
        debug?: boolean;
    };
}
export declare function setSettings(systemSettings: SystemSettings): void;
export declare function debug(text: string, obj?: object): void;
export declare function log(msg: string): void;
export declare function error(text: string, obj?: object): void;
export declare function info(msg: string): void;
export declare function success(msg: string): void;
