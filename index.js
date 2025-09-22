import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import process from 'node:process';
import "jopi-node-space";
const nWebSocket = NodeSpace.webSocket;
let gIsSourceWatchingEnabled;
let gIsBrowserRefreshEnabled;
let gWebSocketUrl;
let gRefreshHtmlSnippet;
let gWebSocket;
export function isSourceWatchingEnabled() {
    if (gIsSourceWatchingEnabled === undefined) {
        gIsSourceWatchingEnabled = process.env.JOPIN_SOURCE_WATCHING_ENABLED === '1';
    }
    return gIsSourceWatchingEnabled;
}
export function isBrowserRefreshEnabled() {
    if (gIsBrowserRefreshEnabled === undefined) {
        gIsBrowserRefreshEnabled = process.env.JOPIN_BROWSER_REFRESH_ENABLED === '1';
    }
    return gIsBrowserRefreshEnabled;
}
function getWebSocketUrl() {
    if (gWebSocketUrl === undefined) {
        gWebSocketUrl = process.env.JOPIN_WEBSOCKET_URL;
    }
    return gWebSocketUrl;
}
async function getWebSocket() {
    if (gWebSocket)
        return gWebSocket;
    gWebSocket = await nWebSocket.openConnection(getWebSocketUrl());
    return gWebSocket;
}
export function declareApplicationStopping() {
    if (gWebSocket) {
        gWebSocket.close();
    }
}
export function getBrowserRefreshHtmlSnippet() {
    if (gRefreshHtmlSnippet)
        return gRefreshHtmlSnippet;
    let filePath = import.meta.resolve("./deps/browserRefreshScript.js");
    filePath = fileURLToPath(filePath);
    let scriptFile = readFileSync(filePath, "utf8");
    scriptFile = scriptFile.replaceAll("JOPIN_WEBSOCKET_URL", getWebSocketUrl());
    scriptFile = scriptFile.replace("export {};", "");
    gRefreshHtmlSnippet = `<script type="text/javascript">${scriptFile}</script>`;
    return gRefreshHtmlSnippet;
}
export function mustWaitServerReady() {
    if (!isBrowserRefreshEnabled())
        return;
    getWebSocket().then((ws) => {
        nWebSocket.sendMessage(ws, "mustWaitServerReady");
    });
}
export function askRefreshingBrowser() {
    if (!isBrowserRefreshEnabled())
        return;
    getWebSocket().then((ws) => {
        nWebSocket.sendMessage(ws, "askRefreshingBrowser");
    });
}
export function declareServerReady() {
    if (!isBrowserRefreshEnabled())
        return;
    getWebSocket().then((ws) => {
        nWebSocket.sendMessage(ws, "declareServerReady");
    });
}
/**
 * Returns a hash which is used for asset name generation.
 */
export function getAssetsHash() {
    return gAssetHash;
}
// Allow it to be uniq even if the loader is in his own worker
// (which doesn't allow random value)
let gAssetHash = process.env.JOPI_RESOURCE_HASH || process.pid.toString(16).toUpperCase();
//# sourceMappingURL=index.js.map