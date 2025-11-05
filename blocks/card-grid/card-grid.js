import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create a <ul> list to hold all the cards
  const ul = document.createElement('ul');
  
  // Get all rows except the first one (which is the block name)
  const rows = [...block.children].slice(1);
  
  rows.forEach((row) => {
    // Create the <li> for each card
    const li = document.createElement('li');
    li.classList.add('card-item');

    // Get the cells
    const [imageCell, titleCell, subtitleCell] = row.children;

    // 1. Create the Image wrapper
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('card-image');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      imageWrapper.append(createOptimizedPicture(img.src, img.alt, true, [{ width: '400' }]));
    }

    // 2. Create the Text wrapper
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('card-text');

    const title = document.createElement('h3');
    title.textContent = titleCell.textContent;

    const subtitle = document.createElement('p');
    subtitle.textContent = subtitleCell.textContent;

    textWrapper.append(title, subtitle);

    // 3. Assemble the card
    li.append(imageWrapper, textWrapper);
    ul.append(li);
  });

  // Clean up the original table and add the new list
  block.textContent = '';
  block.append(ul);
}