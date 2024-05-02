var historyTimeout;
chrome.runtime.onInstalled.addListener(function() {
    console.log('Extension Installed');
});

chrome.runtime.onInstalled.addListener(function (details) {
    if (details.reason === "install") {
        let array = new Uint32Array(1);
        crypto.getRandomValues(array);
        let pin = array[0] % 10000; // Ensures it's a four-digit number
        pin = pin.toString().padStart(4, '0'); // Ensures the PIN is always four digits

        // Store the PIN
        chrome.storage.local.set({'pin': pin}, function() {
            console.log("PIN stored successfully:", pin);
            // Using Chrome's notification API to notify the user
            chrome.notifications.create('', {
                type: 'basic',
                iconUrl: 'news.png',
                title: 'PIN Set',
                message: 'Your new PIN is: ' + pin + ' To access the secret IPV resources, input your PIN into the suggestions box. If you forget your pin, reinstall this extension.',
                requireInteraction: true  // This keeps the notification open until the user interacts with it.
            });
        });
    }
});


// waits for action before adding history/stopping history
chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
    sendResponse();
    if (message.action === 'startAddingHistory') {
        addHistory();
    } else if (message.action === 'stopAddingHistory') {
        clearTimeout(historyTimeout);
        console.log('stop adding history items')
    }
});

function addHistory() {
    // create random interval to add history items
    randomInterval = Math.floor(Math.random() * 5000);
    // add items at random interval
    historyTimeout = setTimeout(function() {
        const urls = [];
        urls.push("https://www.cnn.com", "https://www.nbc.com", "https://www.cbs.com", "https://www.nytimes.com", "https://www.washingtonpost.com");
        var randomIndex = Math.floor(Math.random() * 5);
        console.log(randomInterval + " " + urls[randomIndex]); // verify that new time/item is added
        // add to history
        chrome.history.addUrl({url: urls[randomIndex]}, function() {});

        addHistory();
    }, randomInterval);
};







































// chrome.runtime.onInstalled.addListener(function() {
//     console.log('Extension Installed');
// });

// //for listening any message which comes from runtime
// chrome.runtime.onMessage.addListener(messageReceived);

// function messageReceived(msg, sender, sendResponse) {
// //    console.log(msg);
//    sendResponse("received");
//    alert(msg)

//     if (message.action == 'loopFunction') {
//         console.log("msg: " + message);
//         loopFunction();
//     }
// //    addUrl();
// }

// function loopFunction() {
//     alert('reached here')
//     randomInterval = Math.floor(Math.random() * 5000);
//     localStorage.setItem("randomInterval", randomInterval);
//     // if stoprandominterval is false:
//     setTimeout(function() {
//         addUrl();
//         loop();
//     }, localStorage.getItem("randomInterval"));
// };

// function addUrl() {
//     const urls = [];
//     urls.push("https://www.cnn.com", "https://www.nbc.com", "https://www.cbs.com", "https://www.nytimes.com", "https://www.washingtonpost.com");
//     var randomIndex = Math.floor(Math.random() * 5);
//     alert(randomInterval + urls[randomIndex])

//     var url = 'https://www.cnn.com'
//     chrome.history.addUrl({url: urls[randomIndex]}, function() {});
//     // chrome.tabs.update({url: urls[randomIndex]}, function() {}); // navigate to another tab; unable to revisit previous tab
// }   

// // function addUrl() {
// //     const urls = [];
// //     urls.push("https://www.cnn.com", "https://www.nbc.com", "https://www.cbs.com", "https://www.nytimes.com", "https://www.washingtonpost.com");
// //     var randomIndex = Math.floor(Math.random() * 5);
// //     alert(randomInterval + urls[randomIndex])

// //     var url = 'https://www.cnn.com'
// //     chrome.history.addUrl({url: urls[randomIndex]}, function() {});
// //     // chrome.tabs.update({url: urls[randomIndex]}, function() {}); // navigate to another tab; unable to revisit previous tab
// // }

// // chrome.browserAction.onClicked.addListener(function(tab) {

// //     var port = chrome.extension.connect({
// //         name: "Sample Communication"
// //     });
// //     port.postMessage("Hi BackGround");
// //     port.onMessage.addListener(function(msg) {
// //         console.log("message recieved" + msg);
// //     });

// // });
