import { createOptimizedPicture } from '../../scripts/aem.js';

export default function decorate(block) {
  // Create a <ul> list to hold all the cards
  const ul = document.createElement('ul');
  
  // Get all rows except the first one (which is the block name)
  const rows = [...block.children];
  
  rows.forEach((row) => {
    // Create the <li> for each card
    const li = document.createElement('li');
    li.classList.add('blog-card');

    // Extract content from all 5 cells
    const [imageCell, timeCell, titleCell, descCell, linkCell] = row.children;

    // 1. Build the Image
    const imageWrapper = document.createElement('div');
    imageWrapper.classList.add('blog-card-image');
    const picture = imageCell.querySelector('picture');
    if (picture) {
      const img = picture.querySelector('img');
      // Eager load the first few images, lazy load the rest
      const eager = rows.indexOf(row) < 3; 
      imageWrapper.append(createOptimizedPicture(img.src, img.alt, eager, [{ width: '400' }]));
    }

    // 2. Build the Text Content Wrapper
    const textWrapper = document.createElement('div');
    textWrapper.classList.add('blog-card-text');

    // 3. Build the Time
    const time = document.createElement('p');
    time.classList.add('blog-card-time');
    time.textContent = timeCell.textContent;

    // 4. Build the Title (with Link)
    const title = document.createElement('h3');
    title.classList.add('blog-card-title');
    const link = document.createElement('a');
    // Get the link from the 5th column
    link.href = linkCell.querySelector('a')?.href || linkCell.textContent.trim();
    link.textContent = titleCell.textContent;
    title.append(link);

    // 5. Build the Description
    const desc = document.createElement('p');
    desc.classList.add('blog-card-description');
    desc.textContent = descCell.textContent;

    // 6. Assemble the card
    textWrapper.append(time, title, desc);
    li.append(imageWrapper, textWrapper);
    ul.append(li);
  });

  // Clean up the original table and add the new list
  block.textContent = '';
  block.append(ul);
}