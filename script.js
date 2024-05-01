var startSession;
var startTimeClick;

var currentTime;
var randomInterval;
var stopRandomInterval;

// TODO: 
// - create way to pause session so that certain items are not deleted
// - loop through headlines (from CNN API to get headlines) to load new websites
// - take in user input for time or keywords to delete
// - change color of buttons based on whether session is started/stopped

document.addEventListener('DOMContentLoaded', function() {
    const refreshButton = document.getElementById("refreshButton");
    // const newsTable = document.getElementById("newsTable").getElementsByTagName('tbody')[0];

    // Function to fetch top headlines
    // function fetchTopHeadlines() {
    //     // You can use any API here to fetch headlines. I'll provide a dummy example.
    //     // Replace this URL with the actual API endpoint you'll be using.
    //     const apiURL = 'https://newsapi.org/v2/top-headlines?sources=cnn&pageSize=5&apiKey=b984b082eb954c73b3bf7ebfa1700aec';

    //     fetch(apiUrl)
    //         .then(response => response.json())
    //         .then(data => {
    //             // Clear existing table rows
    //             newsTable.innerHTML = "";

    //             // Populate table with top 5 headlines
    //             for (let i = 0; i < Math.min(5, data.length); i++) {
    //                 const headline = data[i];
    //                 const row = `<tr>
    //                                 <td>${i + 1}</td>
    //                                 <td>${headline.title}</td>
    //                             </tr>`;
    //                 newsTable.innerHTML += row;
    //             }
    //         })
    //         .catch(error => console.error("Error fetching headlines:", error));
    // }

    // // Initial fetch when the page loads
    // fetchTopHeadlines();

    // // Add event listener to refresh button
    // refreshButton.addEventListener("click", fetchTopHeadlines);

    document.getElementById('clearHistory1hr').addEventListener('click', function() {
        currentTime = (new Date()).getTime();
        var timeToClear = currentTime - (1 * 60 * 60 * 1000); // clearing for 1 hour (div by 60 for 1 min)
        deleteHistoryRange(timeToClear, currentTime);
        addUrl();        
    });

    document.getElementById('clearHistory6hr').addEventListener('click', function() {
        currentTime = (new Date()).getTime();
        var timeToClear = currentTime - (6 * 60 * 60* 1000);
        deleteHistoryRange(timeToClear, currentTime);
        addUrl();        
    });

    document.getElementById('clearHistory24hr').addEventListener('click', function() {
        currentTime = (new Date()).getTime();
        var timeToClear = currentTime - (24 * 60 * 60* 1000);
        deleteHistoryRange(timeToClear, currentTime);
        addUrl();        
    });

    document.getElementById('clearHistoryAll').addEventListener('click', function() {
        chrome.history.deleteAll();
        addUrl();        
    });

    document.getElementById('clearHistoryRange').addEventListener('click', function() {
        // store variables in local storage so they can be accessed after we nagivate away from the extension (visit another page, reload)
        const isEqual = localStorage.getItem("startSession") === "true";
        if (isEqual) { // checking if we have started session
            currentTime = (new Date()).getTime();
            deleteHistoryRange(parseInt(localStorage.getItem("startTimeClick")), currentTime);
            addUrl();
        }
        else {
            alert('nothing to remove'); // must turn on session
        } 
    });

    document.getElementById('start').addEventListener('click', function() {
        startSession = new Boolean(true); // start recording urls
        startTimeClick = (new Date()).getTime(); // when start was clicked
        localStorage.setItem("startTimeClick", startTimeClick);
        localStorage.setItem("startSession", startSession);
        // start background function
        chrome.runtime.sendMessage({action: "startAddingHistory"}, function(response) {});
    });

    function deleteHistoryRange(startTime, endTime) {
        chrome.history.deleteRange({startTime: startTime, endTime: endTime}, function() {
            alert('History cleared successfully.');
        }); 
    }

    document.getElementById('stop').addEventListener('click', function() {
        //for sending a message
        start = new Boolean(false); // stop recording urls
        localStorage.setItem("startSession", startSession);
        // stop background function
        chrome.runtime.sendMessage({action: "stopAddingHistory"}, function(response) {});
    });

    document.getElementById('submitButtonTime').addEventListener('click', function() {
        var userInputTime = document.getElementById('quantity').value;
        currentTime = (new Date()).getTime();
        var timeToClear = currentTime - (userInputTime * 60 * 1000); // clearing for 1 hour (div by 60 for 1 min)
        deleteHistoryRange(timeToClear, currentTime);
    });
    
    document.getElementById('submitButtonKeyword').addEventListener('click', function() {
        var userInputKeyword = document.getElementById('keyword').value;
        deleteHistoryItems(userInputKeyword);
    });

    function deleteHistoryRange(startTime, endTime) {
        chrome.history.deleteRange({startTime: startTime, endTime: endTime}, function() {
            alert('History cleared successfully.');
        }); 
    }

    function deleteHistoryItems(keyword) {
        // maxResults = 0 returns all results (for some reason...); must include startTime to search for ALL history items!!!
        chrome.history.search({text: keyword, startTime: 0, maxResults: 0}, function(historyItems) {
            historyItems.forEach(function(historyItems) {
                chrome.history.deleteUrl({url: historyItems.url}, function() {
                    console.log(historyItems.url);
                });
            });
        });
    }
    
    function addUrl() {
        const urls = [];
        urls.push("https://www.cnn.com", "https://www.nbc.com", "https://www.cbs.com", "https://www.nytimes.com", "https://www.washingtonpost.com");
        var randomIndex = Math.floor(Math.random() * 5);
        alert(randomInterval + urls[randomIndex])

        var url = 'https://www.cnn.com'
        chrome.history.addUrl({url: urls[randomIndex]}, function() {});
        // chrome.tabs.update({url: urls[randomIndex]}, function() {}); // navigate to another tab; unable to revisit previous tab
    }   
});