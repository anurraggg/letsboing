import { readBlockConfig, decorateIcons } from '../../scripts/aem.js';
import { loadFragment, loadBlock, decorateBlock } from '../../scripts/aem.js';

/**
 * Loads and decorates the footer
 * @param {Element} block The footer block element
 */
export default async function decorate(block) {
  const cfg = readBlockConfig(block);
  block.textContent = '';

  // 1. Fetch the footer content from '/footer'
  const footerPath = cfg.footer || '/footer';
  const fragment = await loadFragment(footerPath);

  if (!fragment) {
    console.warn('Could not load footer fragment at', footerPath);
    return;
  }

  // 2. Find and decorate the sections
  const sections = fragment.querySelectorAll(':scope > div');
  
  if (sections.length > 0) {
    sections[0].classList.add('footer-logos');
  }
  if (sections.length > 1) {
    sections[1].classList.add('footer-form');
  }
  if (sections.length > 2) {
    sections[2].classList.add('footer-links');
  }
  if (sections.length > 3) {
    sections[3].classList.add('footer-bottom');
  }

  // 3. Load all nested blocks
  // This finds the 'form' and 'columns' blocks inside the fragment
  const blocksToLoad = [];
  const nestedBlocks = fragment.querySelectorAll(':scope > div [class]');
  nestedBlocks.forEach((nestedBlock) => {
    decorateBlock(nestedBlock);
    blocksToLoad.push(loadBlock(nestedBlock));
  });
  
  // Wait for all nested blocks to be loaded and decorated
  await Promise.all(blocksToLoad);

  // 4. Decorate icons
  await decorateIcons(fragment);
  
  // 5. Append the decorated fragment to the footer block
  block.append(fragment);
}