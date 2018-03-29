import { CookieService } from 'angular2-cookie/core';
export declare class DebugModeService {
    private _cookieservice;
    cookieKey: string;
    constructor(_cookieservice: CookieService);
    debugEnabled(): boolean;
}
