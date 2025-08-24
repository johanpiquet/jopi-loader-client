import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
let gIsSourceWatchingEnabled;
let gIsBrowserRefreshEnabled;
let gWebSocketUrl;
let gRefreshHtmlSnippet;
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
//# sourceMappingURL=index.js.map