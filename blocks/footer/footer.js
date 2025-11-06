export default function decorate(block) {
  const columns = block.querySelectorAll(':scope > div');
  if (columns.length === 3) {
    const [left, middle, right] = columns;

    // Middle column form enhancement
    const emailInput = middle.querySelector('input[type="email"]');
    const registerButton = middle.querySelector('button');

    if (emailInput && registerButton) {
      const form = document.createElement('div');
      form.classList.add('footer-form');
      form.append(emailInput, registerButton);
      middle.prepend(form);
    }

    // Add class for right links
    right.classList.add('footer-links');
  }
}
