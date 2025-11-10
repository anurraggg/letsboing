export default function decorate(block) {
    block.classList.add('sitemap');
  
    // Support both table and plain HTML input
    const table = block.querySelector('table, div > table');
    const sections = [];
  
    if (table) {
      const rows = table.querySelectorAll('tr');
      rows.forEach((row, index) => {
        if (index === 0) return; // skip header
        const cells = row.querySelectorAll('td');
        if (cells.length >= 2) {
          const heading = cells[0].innerText.trim();
          const linksRaw = cells[1].innerHTML.trim();
          sections.push({ heading, linksRaw });
        }
      });
    } else {
      // fallback: parse existing content if no table found
      const headings = [...block.querySelectorAll('h3, h4, strong, b')];
      headings.forEach((h) => {
        const nextSiblings = [];
        let el = h.nextElementSibling;
        while (el && !['H3', 'H4', 'STRONG', 'B'].includes(el.tagName)) {
          nextSiblings.push(el);
          el = el.nextElementSibling;
        }
        sections.push({
          heading: h.textContent.trim(),
          linksRaw: nextSiblings.map((s) => s.outerHTML).join(''),
        });
      });
    }
  
    // Rebuild sitemap HTML
    const sitemapWrapper = document.createElement('div');
    sitemapWrapper.className = 'sitemap__wrapper';
  
    sections.forEach((section) => {
      const sectionDiv = document.createElement('div');
      sectionDiv.className = 'sitemap__section';
  
      const heading = document.createElement('h3');
      heading.className = 'sitemap__heading';
      heading.textContent = section.heading;
  
      const linksContainer = document.createElement('div');
      linksContainer.className = 'sitemap__links';
      linksContainer.innerHTML = section.linksRaw;
  
      sectionDiv.append(heading, linksContainer);
      sitemapWrapper.append(sectionDiv);
    });
  
    block.innerHTML = '';
    block.append(sitemapWrapper);
  
    // Style external links differently
    const links = block.querySelectorAll('a');
    links.forEach((link) => {
      const url = link.getAttribute('href');
      if (url && !url.startsWith('/') && !url.includes(window.location.hostname)) {
        link.classList.add('external-link');
        link.setAttribute('target', '_blank');
        link.setAttribute('rel', 'noopener noreferrer');
      }
    });
  }
  