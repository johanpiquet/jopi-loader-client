import { readFileSync } from "node:fs";
let gIsSourceWatchingEnabled;
let gIsBrowserRefreshEnabled;
let gWebSocketUrl;
let gRefreshHtmlSnipped;
export function isSourceWatchingEnabled() {
    if (gIsSourceWatchingEnabled === undefined) {
        gIsSourceWatchingEnabled = process.env.JOPIN_SOURCE_WATCHING_ENABLED === '1';
    }
    return gIsSourceWatchingEnabled;
}
export function isBrowserRefreshEnabled() {
    if (gIsBrowserRefreshEnabled === undefined) {
        gIsSourceWatchingEnabled = process.env.JOPIN_BROWSER_REFRESH_ENABLED === '1';
    }
    return gIsBrowserRefreshEnabled;
}
function getWebSocketUrl() {
    if (getWebSocketUrl === undefined) {
        gWebSocketUrl = process.env.JOPIN_WEBSOCKET_URL;
    }
    return gWebSocketUrl;
}
export function getBrowserRefreshHtmlSnippet() {
    if (gRefreshHtmlSnipped)
        return gRefreshHtmlSnipped;
    let scriptFile = readFileSync(import.meta.resolve("./deps/browserRefreshScript.js"), "utf8");
    scriptFile = scriptFile.replaceAll("JOPIN_WEBSOCKET_URL", getWebSocketUrl());
    gRefreshHtmlSnipped = `<script type="text/javascript">${scriptFile}</script>`;
    return gRefreshHtmlSnipped;
}
//# sourceMappingURL=index.js.map