export default function decorate(block) {
  const observer = new MutationObserver((mutations, observerInstance) => {
    const mainContainer = document.querySelector('.columns.typ-magazine.block');

    if (mainContainer) {
      observerInstance.disconnect(); // Stop observing when element is found
      console.log('Main container found, proceeding with decoration.');

      const cols = [...block.firstElementChild.children];
      block.classList.add(`columns-${cols.length}-cols`);

      // Setup image columns
      [...block.children].forEach((row) => {
        [...row.children].forEach((col) => {
          const pic = col.querySelector('picture');
          if (pic) {
            const picWrapper = pic.closest('div');
            if (picWrapper && picWrapper.children.length === 1) {
              // Picture is only content in column
              picWrapper.classList.add('columns-img-col');
            }
          }
        });
      });

      // Setting up class names for magazine
      const magazineWrapper = mainContainer.querySelector('.columns.typ-magazine.block > div');
      if (magazineWrapper) {
        magazineWrapper.classList.add('magazine-wrapper');
        console.log("Going in 2");

        // Add class to the first inner div (image container)
        const imageContainer = magazineWrapper.querySelector('.columns-img-col');
        if (imageContainer) {
          imageContainer.classList.add('magazine-image-container');

          // Add class to the picture element inside the image container
          const picture = imageContainer.querySelector('picture');
          if (picture) {
            picture.classList.add('magazine-image');
          } else {
            console.warn("Picture element not found inside image container");
          }
        } else {
          console.warn("Image container not found inside magazine wrapper");
        }
      } else {
        console.error("Magazine wrapper not found inside main container");
      }

      // Add class to the h2 elements
      const headings = mainContainer.querySelectorAll('h2');
      headings.forEach((heading, index) => {
        heading.classList.add('magazine-heading', `heading-${index + 1}`);
      });

      // Add class to the paragraph elements
      const paragraphs = mainContainer.querySelectorAll('p');
      paragraphs.forEach((paragraph, index) => {
        paragraph.classList.add('magazine-paragraph', `paragraph-${index + 1}`);
      });

      // Add class to the button container
      const buttonContainer = mainContainer.querySelector('.button-container');
      if (buttonContainer) {
        buttonContainer.classList.add('magazine-button-container');

        // Add class to the anchor link inside the button container
        const link = buttonContainer.querySelector('a');
        if (link) {
          link.classList.add('magazine-link');
        } else {
          console.warn("Link element not found inside button container");
        }
      } else {
        console.warn("Button container not found in main container");
      }
    }
  });

  // Observe the entire document for added nodes
  observer.observe(document.body, {
    childList: true,
    subtree: true,
  });
}
