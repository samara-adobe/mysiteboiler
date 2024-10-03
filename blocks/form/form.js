function createSelect(fd) {
  const select = document.createElement('select');
  select.id = fd.Name;

  if (fd.Placeholder) {
    const placeholderOption = document.createElement('option');
    placeholderOption.textContent = fd.Placeholder;
    placeholderOption.setAttribute('selected', '');
    placeholderOption.setAttribute('disabled', '');
    select.append(placeholderOption);
  }

  fd.Options.split(',').forEach((optionText) => {
    const option = document.createElement('option');
    option.textContent = optionText.trim();
    option.value = optionText.trim();
    select.append(option);
  });

  if (fd.Mandatory === 'true') {
    select.setAttribute('required', 'required');
  }

  return select;
}

function constructPayload(form) {
  const payload = {};
  [...form.elements].forEach((fe) => {
    if (fe.type === 'checkbox') {
      if (fe.checked) payload[fe.id] = fe.value;
    } else if (fe.id) {
      payload[fe.id] = fe.value;
    }
  });
  return payload;
}

async function submitForm(form) {
  const payload = constructPayload(form);
  payload.timestamp = new Date().toJSON();

  try {
    const response = await fetch('https://main--mysiteboiler--samara-adobe.hlx.page/feedback-responses', {
      method: 'POST',
      cache: 'no-cache',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ data: payload }),
    });

    const result = await response.text();
    return result;
  } catch (error) {
    console.error('Form submission error:', error);
    throw new Error('Form submission failed');
  }
}

function createButton(fd) {
  const button = document.createElement('button');
  button.textContent = fd.Label;
  button.classList.add('button');

  if (fd.Type === 'submit') {
    button.addEventListener('click', async (event) => {
      const form = button.closest('form');
      if (form.checkValidity()) {
        event.preventDefault();
        button.setAttribute('disabled', '');

        const response = await submitForm(form);

        const redirectTo = fd.Value || window.location.href; // Use Value for redirection URL
        window.location.href = redirectTo;
      }
    });
  }

  return button;
}

function createHeading(fd, el) {
  const heading = document.createElement(el);
  heading.textContent = fd.Label;
  return heading;
}

function createInput(fd) {
  const input = document.createElement('input');
  input.type = fd.Type;
  input.id = fd.Name;
  input.setAttribute('placeholder', fd.Placeholder);

  if (fd.Mandatory === 'true') {
    input.setAttribute('required', 'required');
  }

  return input;
}

function createTextArea(fd) {
  const textarea = document.createElement('textarea');
  textarea.id = fd.Name;
  textarea.setAttribute('placeholder', fd.Placeholder);

  if (fd.Mandatory === 'true') {
    textarea.setAttribute('required', 'required');
  }

  return textarea;
}

function createLabel(fd) {
  const label = document.createElement('label');
  label.setAttribute('for', fd.Name);
  label.textContent = fd.Label;

  if (fd.Mandatory === 'true') {
    label.classList.add('required');
  }

  return label;
}

export async function createForm(formURL) {
  const { pathname } = new URL(formURL);

  try {
    const response = await fetch(pathname);
    const json = await response.json();
    const form = document.createElement('form');

    form.dataset.action = pathname.split('.json')[0];

    json.data.forEach((fd) => {
      const fieldWrapper = document.createElement('div');
      fieldWrapper.className = `form-${fd.Type}-wrapper field-wrapper`;

      switch (fd.Type) {
        case 'select':
          fieldWrapper.append(createLabel(fd));
          fieldWrapper.append(createSelect(fd));
          break;
        case 'heading':
          fieldWrapper.append(createHeading(fd, 'h3'));
          break;
        case 'legal':
          fieldWrapper.append(createHeading(fd, 'p'));
          break;
        case 'text-area':
          fieldWrapper.append(createLabel(fd));
          fieldWrapper.append(createTextArea(fd));
          break;
        case 'submit':
          fieldWrapper.append(createButton(fd));
          break;
        default:
          fieldWrapper.append(createLabel(fd));
          fieldWrapper.append(createInput(fd));
      }

      form.append(fieldWrapper);
    });

    return form;

  } catch (error) {
    console.error('Error creating form:', error);
    throw new Error('Failed to create form');
  }
}

export default async function decorate(block) {
  const formlink = block.querySelector('a[href$=".json"]');

  if (formlink) {
    const formURL = formlink.href;
    const form = await createForm(formURL);
    block.innerHTML = '';
    block.append(form);
  } else {
    console.error('No form link found');
  }
}
