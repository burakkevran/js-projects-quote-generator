const quoteContainer = document.getElementById('quote-container');
const quoteText = document.getElementById('quote');
const quoteAuthor = document.getElementById('author');
const twitterButton = document.getElementById('twitter');
const newQuoteButton = document.getElementById('new-quote');
const loader = document.getElementById('loader');

let apiQuotes = [];

//Show Loading
function loading() {
    loader.hidden = false;
    quoteContainer.hidden = true;
}
//Hide Loading
function complete() {
    loader.hidden = true;
    quoteContainer.hidden = false;
}

//Return New Quote
function newQuote() {
    const quote = apiQuotes[Math.floor(Math.random() * apiQuotes.length)];
    setQuote(quote);
}
//Return New Local Quote
function newLocalQuote() {
    const quote = localQuotes[Math.floor(Math.random() * apiQuotes.length)];
    setQuote(quote);
}

//A setQuote Helper function
function setQuote (quote) {
    //Check quote length
    (quote.text.length > 100)? quoteText.classList.add('long-quote'):quoteText.classList.remove('long-quote');
    quoteText.textContent= quote.text;
    quoteAuthor.textContent = (quote.author) ? quote.author : 'Unknown';
}

//Get Quotes from API
async function getQuotes() {
    loading();
    const apiURL = 'https://type.fit/api/quotes';
    try {
        const response = await fetch(apiURL);
        apiQuotes = await response.json();
        newQuote();
    } catch (error) {
        newLocalQuote();
    } finally {
        complete();
    }
}

//Tweet Quote
function tweetQuote() {
    const twitterURL = `https://twitter.com/intent/tweet?text=${quoteText.textContent} - ${quoteAuthor.textContent}`;
    window.open(twitterURL, '_blank');
}

//Event Listeners
newQuoteButton.addEventListener('click', newQuote);
twitterButton.addEventListener('click', tweetQuote);

//On Load
getQuotes();

