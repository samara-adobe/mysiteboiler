export default async function decorate(block) {
  const customdata = block.querySelector('a[href$=".json"]');

  if (!customdata) {
    console.error('JSON link not found');
    return;
  }

  const url = customdata.href;

  try {
    // Fetch the JSON data from the link
    const response = await fetch(url);
    const data = await response.json();

    // Check if data exists
    if (!data || !data.data) {
      block.innerHTML = '<p>No data available</p>';
      return;
    }

    // Pagination variables
    let currentPage = 1;
    const itemsPerPage = 10;
    const totalItems = data.data.length;
    const totalPages = Math.ceil(totalItems / itemsPerPage);

    // Function to render the table
    const renderTable = (pageData) => {
      block.innerHTML = ''; // Clear previous content

      const table = document.createElement('table');
      table.classList.add('table');

      // Create and append the header row
      const headerRow = document.createElement('tr');
      const headers = ['Title', 'Description'];

      headers.forEach(headerText => {
        const header = document.createElement('th');
        header.textContent = headerText;
        header.classList.add('table-header');
        headerRow.appendChild(header);
      });

      table.appendChild(headerRow);

      // Populate the table rows with page data
      pageData.forEach(item => {
        const row = document.createElement('tr');
        const titleCell = document.createElement('td');
        const descriptionCell = document.createElement('td');

        titleCell.textContent = item.Title;
        descriptionCell.textContent = item.Description;

        titleCell.classList.add('table-cell');
        descriptionCell.classList.add('table-cell');

        row.appendChild(titleCell);
        row.appendChild(descriptionCell);
        table.appendChild(row);
      });

      block.appendChild(table);
    };

    // Function to handle pagination
    const renderPagination = (page) => {
      block.innerHTML = ''; // Clear previous content before re-rendering

      const start = (page - 1) * itemsPerPage;
      const end = Math.min(start + itemsPerPage, totalItems);
      const pageData = data.data.slice(start, end);

      // Render the table for the current page
      renderTable(pageData);

      // Add pagination controls
      const pagination = document.createElement('div');
      pagination.classList.add('pagination-controls');

      const prevButton = document.createElement('button');
      prevButton.textContent = 'Previous';
      prevButton.disabled = page === 1;
      prevButton.addEventListener('click', () => {
        currentPage--;
        renderPagination(currentPage);
      });

      const nextButton = document.createElement('button');
      nextButton.textContent = 'Next';
      nextButton.disabled = page === totalPages;
      nextButton.addEventListener('click', () => {
        currentPage++;
        renderPagination(currentPage);
      });

      const pageIndicator = document.createElement('span');
      pageIndicator.textContent = `Page ${page} of ${totalPages}`;

      pagination.appendChild(prevButton);
      pagination.appendChild(pageIndicator);
      pagination.appendChild(nextButton);

      block.appendChild(pagination);
    };

    // Initially render the table and pagination for page 1
    renderPagination(currentPage);
  } catch (error) {
    console.error('Error fetching or rendering table data:', error);
    block.innerHTML = '<p>Error loading data</p>';
  }
}
