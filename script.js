var startSession;
var startTimeClick;

var currentTime;

document.addEventListener("DOMContentLoaded", function() {
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
        var timeToClear = currentTime - (1 * 60 * 1000); // clearing for 1 hour (div by 60 for 1 min)
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
        const isEqual = localStorage.getItem("startSession") === "true";
        if (isEqual) { // clear history unlimited # of times until session is stopped
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
        alert(localStorage.getItem("startSession"));

    });

    document.getElementById('stop').addEventListener('click', function() {
        start = new Boolean(false); // stop recording urls
        localStorage.setItem("startSession", startSession);
    });

    function deleteHistoryRange(startTime, endTime) {
        chrome.history.deleteRange({startTime: startTime, endTime: endTime}, function() {
            alert('History cleared successfully.');
        }); 
    }
    
    function addUrl() {
        var url = 'https://www.cnn.com'
        chrome.history.addUrl({url: url}, function() {});
        chrome.tabs.update({url: url}, function() {}); // navigate to another tab; unable to revisit previous tab
    }
});
