/**
 * @returns {Promise<Object>} quote information 
 */
const fetchQuote = async () => {
    const res = await fetch(import.meta.env.VITE_URL_API);
    const data = await res.json();
    return data[0];
};

/**
 * @param {HTMLDivElement} element
 */
export const BreakingbadApp = async (element) => {
    document.querySelector('#app-title').innerHTML = 'Breakingbad App';
    element.innerHTML = 'Loading...';

    const quoteLabel = document.createElement('blockquote');
    const authorLabel = document.createElement('h3');
    const nextQuoteButton = document.createElement('button');
    nextQuoteButton.innerText = 'Next Quote';

    const renderQuote = (data) => {
        quoteLabel.innerHTML = data.quote;
        authorLabel.innerHTML = data.author;
        element.replaceChildren(quoteLabel, authorLabel, nextQuoteButton);
    };

    nextQuoteButton.addEventListener('click', async () => {
        element.innerHTML = 'Loading...';
        const quote = await fetchQuote();
        renderQuote(quote);
    });

    fetchQuote().then(renderQuote);
};