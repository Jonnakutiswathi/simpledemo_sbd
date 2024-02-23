// Copyright (c) Microsoft Corporation.
// Licensed under the MIT license.

// tslint:disable-next-line:no-var-requires
const packageJson = require("../../package.json");
//const appConfig = require("../../appConfig.json");

/**
 * Defines the application information
 */
export interface IAppInfo {
    /** The app name */
    name: string;
    /** The app version */
    version: string;
    /** The app description */
    description: string;
    enableAPIVersionSelection: boolean;
}

/**
 * Gets current application info
 */
//export const appInfo = packageJson as IAppInfo;

export const appInfo = { ...packageJson, enableAPIVersionSelection: true } as IAppInfo;

