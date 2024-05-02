document.addEventListener('DOMContentLoaded', function() {
    const headlinesContainer = document.getElementById('headlinesContainer');
  
    // Array of example headlines
    const headlines = [
      "GOP-led Arizona Senate to vote on repealing 1864 abortion ban - CBS News",
      "United Methodists repeal longstanding ban on LGBTQ clergy - The Associated Press",
      "UCLA cancels classes Wednesday after fights between protesters - The Associated Press",
      "Elon Musk is throwing his weight around Tesla, comes in like a wrecking ball - Electrek",
      "New Florida six-week abortion ban will be felt beyond the state - BBC.com",
      "China Releases CGI Video of Moon Base and It Contains Something Very Strange - Futurism",
      "Rabbit CEO Defends $200 AI Doohickey, Says 'It's Not an App' - Gizmodo",
      "Kuo: Apple Watch Ultra to Get 'Almost No' Hardware Upgrades This Year - MacRumors",
      "Ryan Gosling and Mikey Day return as Beavis and Butt-Head at 'The Fall Guy' premiere - USA TODAY",
      "Knicks vs. 76ers: Tom Thibodeau's late-game decision burns New York in the worst way - CBS Sports",
      "Federal Reserve issues FOMC statement - Federal Reserve",
      "Officials warn of risks to 'certain groups' of people amid bird flu outbreak in cows - POLITICO",
      "FDA says multistate E. coli outbreak tied to walnuts - Fox Business",
      "Ford recalls 242,669 Mavericks, NHTSA says - Detroit Free Press"
    ];
  
    // Function to shuffle array elements randomly
    function shuffleArray(array) {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    }
  
    // Shuffle the headlines array randomly
    const shuffledHeadlines = shuffleArray(headlines);
  
    // Display a random selection of 5 headlines
    const selectedHeadlines = shuffledHeadlines.slice(0, 6);
  
    // Iterate over the selected headlines and create <p> elements
    let i = 1
    selectedHeadlines.forEach(headline => {  
      const headlineElement = document.createElement('p');
      headlineElement.textContent = i + ". " + headline;
      headlinesContainer.appendChild(headlineElement);
      i += 1
    });
  });