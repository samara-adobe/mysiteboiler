export default function decorate(block) {
  const cols = [...block.firstElementChild.children];
  block.classList.add(`columns-${cols.length}-cols`);

  // setup image columns
  [...block.children].forEach((row) => {
    [...row.children].forEach((col) => {
      const pic = col.querySelector('picture');
      if (pic) {
        const picWrapper = pic.closest('div');
        if (picWrapper && picWrapper.children.length === 1) {
          // picture is only content in column
          picWrapper.classList.add('columns-img-col');
        }
      }
    });
  });

  //setting up class names for magazine
    // Add a class to the main container
    const mainContainer = document.querySelector('.columns.typ-magazine.block');

    const magazineWrapper = document.querySelector('.columns.typ-magazine.block > div');
    magazineWrapper.classList.add('magazine-wrapper');
  
    // Add class to the first inner div (image container)
    const imageContainer = magazineWrapper.querySelector('.columns-img-col');
    imageContainer.classList.add('magazine-image-container');
    

    // Add class to the picture element inside the image container
    const picture = imageContainer.querySelector('picture');
    picture.classList.add('magazine-image');
  
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
    buttonContainer.classList.add('magazine-button-container');
  
    // Add class to the anchor link inside the button container
    const link = buttonContainer.querySelector('a');
    link.classList.add('magazine-link');

    
}
