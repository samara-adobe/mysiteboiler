import { fetchPlaceholders } from '../../scripts/aem.js';

export async function createMagz(magURL) {
  try {
    const response = await fetch(magURL);
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const jsdata = await response.json();
    const cardsContainer = populateCards(jsdata);
    return cardsContainer;
  } catch (error) {
    console.error('Error creating magazine cards:', error);
    throw new Error('Failed to create magazine cards');
  }
}

function populateCards(data) {
  // data
  const magazines = data?.data || [];
  console.log("Magazines data:", magazines);

  if (magazines.length === 0) {
    console.warn('No magazine data available.');
    const noDataMessage = document.createElement('p');
    noDataMessage.textContent = 'No magazines available.';
    return noDataMessage;
  }

  // container for the cards
  const cardsContainer = document.createElement('ul');
  cardsContainer.classList.add('cards');

  magazines.forEach((magazine) => {
    const { title, description, image, path } = magazine;
    console.log("data", title, description, image,  path);

    // card elements
    const cardElement = document.createElement('li');

    // Image Section
    const imageDiv = document.createElement('div');
    imageDiv.classList.add('cards-card-image');

    const elePara = document.createElement('p');
  

    const imageLink = document.createElement('a');
    imageLink.href = path;
    imageLink.title = title;

    const picture = document.createElement('picture');
    const source = document.createElement('source');
    source.type = 'image/webp';
    source.srcset = `${image}?format=webply&optimize=medium`;

    const img = document.createElement('img');
    img.loading = 'lazy';
    img.alt = title;
    img.src = `${image}?format=jpeg&optimize=medium`;

    picture.appendChild(source);
    picture.appendChild(img);
    imageLink.appendChild(picture);
    imageDiv.appendChild(elePara);
    elePara.appendChild(imageLink);

    // Body Section
    const bodyDiv = document.createElement('div');
    bodyDiv.classList.add('cards-card-body');

    const buttonContainer = document.createElement('p');
    buttonContainer.classList.add('button-container');

    const strongElement = document.createElement('strong');
    const buttonLink = document.createElement('a');
    buttonLink.href = path;
    buttonLink.title = title;
    buttonLink.classList.add('button', 'primary');
    buttonLink.textContent = title;

    strongElement.appendChild(buttonLink);
    buttonContainer.appendChild(strongElement);

    const descriptionParagraph = document.createElement('p');
    descriptionParagraph.textContent = description;

    bodyDiv.appendChild(buttonContainer);
    bodyDiv.appendChild(descriptionParagraph);

    cardElement.appendChild(imageDiv);
    cardElement.appendChild(bodyDiv);

    // Add the card to the container
    cardsContainer.appendChild(cardElement);
  });

  return cardsContainer;
}

export default async function decorate(block) {
  const magzinelink = block.querySelector('a[href$=".json"]');

  if (magzinelink) {
    const magURL = magzinelink.href;
    try {
      const cardsContainer = await createMagz(magURL);
      block.innerHTML = '';
      block.appendChild(cardsContainer);
    } catch (error) {
      block.textContent = 'Failed to load magazines.';
      console.error('Error decorating magazine-json block:', error);
    }
  } else {
    console.error('No JSON link found for magazines.');
  }
}
