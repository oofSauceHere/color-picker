// get screenshot (should be more receptive to changes)
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if(message.query == "image") {
        chrome.tabs.captureVisibleTab(dataUrl => { 
            console.log(dataUrl);
            sendResponse({url:dataUrl});
        });
    }
    return true;
});