// eslint-disable-next-line no-unused-vars
export default function decorate(block) {
  // Extract rows (each pair of key/value)
  const rows = block.querySelectorAll(':scope > div');
  if (!rows.length) {
    console.warn('⚠️ Newsletter-signup: No rows found in block.');
    return;
  }

  // Collect all key/value pairs
  const data = {};
  rows.forEach((row) => {
    const cells = row.querySelectorAll(':scope > div');
    if (cells.length >= 2) {
      let key = cells[0].textContent.trim().toLowerCase();
      const value = cells[1].textContent.trim();

      // Normalize key variations
      key = key.replace(/\s+/g, '_');
      if (key === 'titlelogo') key = 'title_logo';
      if (key === 'titletext') key = 'title_text';
      if (key === 'terms') key = 'terms';
      if (key === 'terms_text') key = 'terms';
      if (key === 'privacy_policy') key = 'privacy';
      data[key] = value;
    }
  });

  console.table(data); // helpful debug output

  // Build structure
  block.classList.add('newsletter-signup');
  block.innerHTML = ''; // Clear existing content

  // --- LEFT SECTION: Logos ---
  const leftContainer = document.createElement('div');
  leftContainer.classList.add('left-logos');

  const logo1 = document.createElement('img');
  logo1.src = data.logo1 || '/icons/aashirvad-logo.png';
  logo1.alt = 'Aashirvaad Logo';

  const fssaiImg = document.createElement('img');
  fssaiImg.src = data.fssai || '/icons/fssai-license.png';
  fssaiImg.alt = 'FSSAI License';

  leftContainer.append(logo1, fssaiImg);

  // --- CENTER SECTION: Form ---
  const centerContainer = document.createElement('div');
  centerContainer.classList.add('center-form');

  const title = document.createElement('h2');
  title.classList.add('title');

  const titleLogo = document.createElement('img');
  titleLogo.src = data.title_logo || '/icons/aashirvad-logo.png';
  titleLogo.alt = 'AASHIRVAAD';
  title.appendChild(titleLogo);

  const titleText = document.createElement('span');
  titleText.textContent = data.title_text || 'In Your Inbox';
  title.appendChild(titleText);

  centerContainer.appendChild(title);

  const emailInput = document.createElement('input');
  emailInput.type = 'email';
  emailInput.placeholder = 'Enter your Email ID';
  emailInput.classList.add('email-input');
  centerContainer.appendChild(emailInput);

  const checkboxRow = document.createElement('div');
  checkboxRow.classList.add('checkbox-row');

  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.id = 'terms-checkbox';

  const label = document.createElement('label');
  label.htmlFor = 'terms-checkbox';
  label.textContent =
    'By clicking "Register Now", you agree to the Privacy Policy and to receive marketing emails from the Aashirvaad community';

  checkboxRow.append(checkbox, label);
  centerContainer.appendChild(checkboxRow);

  const registerBtn = document.createElement('button');
  registerBtn.classList.add('register-btn');
  registerBtn.textContent = 'Register Now';
  registerBtn.addEventListener('click', () => {
    if (checkbox.checked && emailInput.value) {
      console.log('Registering:', emailInput.value);
      alert('Subscribed! (Demo)');
    } else {
      alert('Please check terms and enter your email.');
    }
  });
  centerContainer.appendChild(registerBtn);

  // --- RIGHT SECTION: Links ---
  const rightContainer = document.createElement('div');
  rightContainer.classList.add('right-links');

  // Left column (Terms, Privacy, Sitemap)
  const leftColumn = document.createElement('div');
  leftColumn.classList.add('left-column');
  const leftLinks = [
    data.terms || 'Terms of Use',
    data.privacy || 'Privacy Policy',
    data.sitemap || 'Sitemap',
  ];
  leftLinks.forEach((text) => {
    const span = document.createElement('span');
    span.textContent = text;
    leftColumn.appendChild(span);
  });

  // Separator
  const separator = document.createElement('div');
  separator.classList.add('separator');

  // Right column (Contact, About)
  const rightColumn = document.createElement('div');
  rightColumn.classList.add('right-column');
  const rightLinks = [
    data.products || 'Our Products',
    data.contact || 'Contact Us',
    data.about || 'About Us',
  ];
  rightLinks.forEach((text) => {
    const span = document.createElement('span');
    span.textContent = text;
    rightColumn.appendChild(span);
  });

  rightContainer.append(leftColumn, separator, rightColumn);

  // --- Assemble full layout ---
  block.append(leftContainer, centerContainer, rightContainer);
}
