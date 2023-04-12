const setBackgroundImage = async () => {
    const apiKey = '6vpFja9hWeUY46qrRMFDBgNSiHVNmgc8am5qP9vqKMFiV1Wh4F4TZY7m';
    const url = `https://api.pexels.com/v1/search?query=inspiration&per_page=40`;
  
    try {
      const response = await fetch(url, {
        headers: {
          'Authorization': apiKey
        }
      });
      const data = await response.json();
      const randomIndex = Math.floor(Math.random() * data.photos.length);
      const imageUrl = data.photos[randomIndex].src.large;
      document.body.style.backgroundImage = `url(${imageUrl})`;
    } catch (error) {
      console.error(`Error fetching background image: ${error}`);
    }
  };
  
  const searchForm = document.getElementById('search-form');
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  
  const displaySearchResults = (quotes) => {
    searchResults.innerHTML = '';
  
    if (quotes.length === 0) {
      const noResults = document.createElement('p');
      noResults.textContent = 'No results found.';
      searchResults.appendChild(noResults);
      return;
    }
  
    quotes.forEach((quote) => {
      const quoteDiv = document.createElement('div');
      quoteDiv.classList.add('quote-container');
  
      const quoteText = document.createElement('p');
      quoteText.classList.add('quote-text');
      quoteText.textContent = `"${quote.q}"`;
  
      const quoteAuthor = document.createElement('p');
      quoteAuthor.classList.add('quote-author');
      quoteAuthor.textContent = `- ${quote.a}`;
  
      quoteDiv.appendChild(quoteText);
      quoteDiv.appendChild(quoteAuthor);
  
      searchResults.appendChild(quoteDiv);
    });
  };
  
  const searchQuotes = async (query) => {
    const url = `https://zenquotes.io/api/search/${query}`;
  
    try {
      const response = await fetch(url);
      const quotes = await response.json();
      displaySearchResults(quotes);
    } catch (error) {
      console.error(`Error fetching search results: ${error}`);
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage();
  
    searchForm.addEventListener('submit', (event) => {
      event.preventDefault();
      const query = searchInput.value.trim();
      if (query) {
        searchQuotes(query);
      }
    });
  });
  
  const fetchQuote = async () => {
    const url = 'https://api.quotable.io/random';
  
    try {
      const response = await fetch(url);
      const data = await response.json();
      const quoteText = document.querySelector('.quote-text');
      const quoteAuthor = document.querySelector('.quote-author');
      quoteText.textContent = `"${data.content}"`;
      quoteAuthor.textContent = `- ${data.author}`;
    } catch (error) {
      console.error(`Error fetching quote: ${error}`);
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    setBackgroundImage();
  
    const fetchQuoteButton = document.querySelector('#fetch-quote');
    fetchQuoteButton.addEventListener('click', () => {
      fetchQuote();
    });
  });
  