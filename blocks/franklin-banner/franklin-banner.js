import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Select the franklin-banner-wrapper and add a custom class
  const bannerWrapper = document.querySelector('.franklin-banner-wrapper');
  
  if (bannerWrapper) {
    bannerWrapper.classList.add('another-custom-class'); // Add your custom class here
  }

  // Select the first div inside the .franklin-banner and add a class
  const franklinBannerFirstDiv = document.querySelector('.franklin-banner > div');
  
  if (franklinBannerFirstDiv) {
    franklinBannerFirstDiv.classList.add('banner-content'); // Add your class here
  }

  // Select the top div inside the first-inner-div and add a class
  const franklinBannerSecondTopDiv = franklinBannerFirstDiv.querySelector('div');
  
  if (franklinBannerSecondTopDiv) {
    franklinBannerSecondTopDiv.classList.add('image-wrap'); // Add your class here
  }

  // Select the bottom div inside the first-inner-div using :nth-of-type(2)
  const franklinBannerSecondBtmDiv = franklinBannerFirstDiv.querySelector('div:nth-of-type(2)');
  
  if (franklinBannerSecondBtmDiv) {
    franklinBannerSecondBtmDiv.classList.add('text-wrap'); // Add your class for title div here

    // Select the h2 inside the bottom div and add a class
    const bannerTitle = franklinBannerSecondBtmDiv.querySelector('h2');
    if (bannerTitle) {
      bannerTitle.classList.add('title'); // Add your class to the h2
    }
  }

  // Select the image inside the franklin-banner and add a class
  const imageElement = document.querySelector('.franklin-banner img');
  
  if (imageElement) {
    imageElement.classList.add('image'); // Add your class to the image
  }

  // Append the modified bannerWrapper back to the block
  block.append(bannerWrapper);
}
