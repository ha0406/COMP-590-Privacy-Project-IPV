var startTimeClick;
// var startSession;

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

    const startButton = document.getElementById('start');
    const stopButton = document.getElementById('stop');
    let startSession = JSON.parse(localStorage.getItem("startSession")) || false;

    // Function to update button visibility based on session state
    function updateButtonVisibility() {
        if (startSession) {
            // If session is active (startSession is true), show stop button
            startButton.style.display = 'none';
            stopButton.style.display = 'inline-block';
        } else {
            // If session is not active (startSession is false), show start button
            stopButton.style.display = 'none';
            startButton.style.display = 'inline-block';
        }
    }

    // Initial update of button visibility based on startSession
    updateButtonVisibility();

    // Event listener for start button click
    startButton.addEventListener('click', function() {
        startSession = true; // Start recording URLs
        localStorage.setItem("startSession", JSON.stringify(startSession));
        updateButtonVisibility(); // Update button visibility after session start
        // Start background function
        chrome.runtime.sendMessage({ action: "startAddingHistory" }, function(response) {
            console.log('Session started.');
        });
    });

    // Event listener for stop button click
    stopButton.addEventListener('click', function() {
        startSession = false; // Stop recording URLs
        localStorage.setItem("startSession", JSON.stringify(startSession));
        updateButtonVisibility(); // Update button visibility after session stop
        // Stop background function
        chrome.runtime.sendMessage({ action: "stopAddingHistory" }, function(response) {
            console.log('Session stopped.');
        });
    });

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

    /*document.getElementById('start').addEventListener('click', function() {
        startSession = true; // start recording urls
        startTimeClick = (new Date()).getTime(); // when start was clicked
        localStorage.setItem("startTimeClick", startTimeClick);
        localStorage.setItem("startSession", startSession);
        // start background function
        chrome.runtime.sendMessage({action: "startAddingHistory"}, function(response) {});
    });*/

    function deleteHistoryRange(startTime, endTime) {
        chrome.history.deleteRange({startTime: startTime, endTime: endTime}, function() {
            alert('History cleared successfully.');
        }); 
    }

    /*document.getElementById('stop').addEventListener('click', function() {
        //for sending a message
        startSession = false; // stop recording urls
        localStorage.setItem("startSession", startSession);
        // stop background function
        chrome.runtime.sendMessage({action: "stopAddingHistory"}, function(response) {});
    });*/

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
        // alert(randomInterval + urls[randomIndex])

        chrome.history.addUrl({url: urls[randomIndex]}, function() {});
        // chrome.tabs.update({url: urls[randomIndex]}, function() {}); // navigate to another tab; unable to revisit previous tab
    }  
    
    document.getElementById('showIPVResources').addEventListener('click', function() {
        document.querySelector('.page').style.display = 'none'; // Hide main page
        document.getElementById('ipvResourcesContainer').style.display = 'block'; // Show IPV resources
    });
    
    document.getElementById('backButton').addEventListener('click', function() {
        document.querySelector('.page').style.display = 'block'; // Show main page
        document.getElementById('ipvResourcesContainer').style.display = 'none'; // Hide IPV resources
    });
    
});

