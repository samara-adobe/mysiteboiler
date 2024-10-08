export default function decorate(block) {
  async function fetchAndPopulateCards() {
    try {
      // Use a proxy if needed to bypass CORS for local development.
      // Replace 'YOUR_PROXY_SERVER_URL' with your proxy server address if needed.
      const response = await fetch('https://main--mysiteboiler--samara-adobe.aem.live/magazines.json', {
        mode: 'no-cors'});
  
      // Check for a successful response
      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }
  
      const data = await response.json();
      populateCards(data);
    } catch (error) {
      console.error('Error fetching or populating cards:', error);
    }
  }
  
  function populateCards(data) {
    // Ensure data structure is valid
    const magazines = data?.data || [];
  
    const cardsWrapper = document.querySelector('.cards-wrapper');
    if (!cardsWrapper) {
      console.warn('Cards wrapper element not found.');
      return;
    }
  
    // Create the container for the cards
    const cardsContainer = document.createElement('ul');
    cardsContainer.classList.add('cards');
  
    magazines.forEach((magazine) => {
      // Destructure magazine properties
      const { title, description, imageUrl, link } = magazine;
  
      // Create card elements
      const cardElement = document.createElement('li');
  
      // Image Section
      const imageDiv = document.createElement('div');
      imageDiv.classList.add('cards-card-image');
  
      const imageLink = document.createElement('a');
      imageLink.href = link;
      imageLink.title = title;
  
      const picture = document.createElement('picture');
      const source = document.createElement('source');
      source.type = 'image/webp';
      source.srcset = `${imageUrl}?format=webply&optimize=medium`;
  
      const img = document.createElement('img');
      img.loading = 'lazy';
      img.alt = title;
      img.src = `${imageUrl}?format=jpeg&optimize=medium`;
  
      picture.appendChild(source);
      picture.appendChild(img);
      imageLink.appendChild(picture);
      imageDiv.appendChild(imageLink);
  
      // Body Section
      const bodyDiv = document.createElement('div');
      bodyDiv.classList.add('cards-card-body');
  
      const buttonContainer = document.createElement('p');
      buttonContainer.classList.add('button-container');
  
      const strongElement = document.createElement('strong');
      const buttonLink = document.createElement('a');
      buttonLink.href = link;
      buttonLink.title = title;
      buttonLink.classList.add('button', 'primary');
      buttonLink.textContent = title;
  
      strongElement.appendChild(buttonLink);
      buttonContainer.appendChild(strongElement);
  
      const descriptionParagraph = document.createElement('p');
      descriptionParagraph.textContent = description;
  
      bodyDiv.appendChild(buttonContainer);
      bodyDiv.appendChild(descriptionParagraph);
  
      // Assemble the card
      cardElement.appendChild(imageDiv);
      cardElement.appendChild(bodyDiv);
  
      // Add the card to the container
      cardsContainer.appendChild(cardElement);
    });
  
    // Append the cards container to the wrapper
    cardsWrapper.appendChild(cardsContainer);
  }
  
  
  console.log("000");
  
  // Execute the function to fetch data and populate cards when the document is loaded

    console.log("111");
    fetchAndPopulateCards();
  
}