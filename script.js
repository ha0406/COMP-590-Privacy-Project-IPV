document.addEventListener("DOMContentLoaded", function() {
    const refreshButton = document.getElementById("refreshButton");
    const newsTable = document.getElementById("newsTable").getElementsByTagName('tbody')[0];

    // Function to fetch top headlines
    function fetchTopHeadlines() {
        // You can use any API here to fetch headlines. I'll provide a dummy example.
        // Replace this URL with the actual API endpoint you'll be using.
        const apiURL = 'https://newsapi.org/v2/top-headlines?sources=cnn&pageSize=5&apiKey=b984b082eb954c73b3bf7ebfa1700aec';

        fetch(apiUrl)
            .then(response => response.json())
            .then(data => {
                // Clear existing table rows
                newsTable.innerHTML = "";

                // Populate table with top 5 headlines
                for (let i = 0; i < Math.min(5, data.length); i++) {
                    const headline = data[i];
                    const row = `<tr>
                                    <td>${i + 1}</td>
                                    <td>${headline.title}</td>
                                </tr>`;
                    newsTable.innerHTML += row;
                }
            })
            .catch(error => console.error("Error fetching headlines:", error));
    }

    // Initial fetch when the page loads
    fetchTopHeadlines();

    // Add event listener to refresh button
    refreshButton.addEventListener("click", fetchTopHeadlines);
});
