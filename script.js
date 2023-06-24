function createTableRow(data) {
    const { id, image, name, symbol, current_price, total_volume } = data;
  
    const tableRow = document.createElement('tr');
    tableRow.innerHTML = `
      <td><img src="${image}" alt="${name}" width="30"></td>
      <td>${name}</td>
      <td>${id}</td>
      <td>${symbol}</td>
      <td>${current_price}</td>
      <td>${total_volume}</td>
    `;
  
    return tableRow;
  }
  // Fetch data using .then approach
  function fetchUsingThen() {
    fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false')
      .then(response => response.json())
      .then(data => {
        const coinTableBody = document.getElementById('coinTableBody');
        coinTableBody.innerHTML = ''; // Clear previous data
  
        data.forEach(coin => {
          const tableRow = createTableRow(coin);
          coinTableBody.appendChild(tableRow);
        });
      })
      .catch(error => console.log('Error fetching data:', error));
  }
  
  // Fetch data using async/await approach
  async function fetchUsingAsyncAwait() {
    try {
      const response = await fetch('https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false');
      const data = await response.json();
  
      const coinTableBody = document.getElementById('coinTableBody');
      coinTableBody.innerHTML = ''; // Clear previous data
  
      data.forEach(coin => {
        const tableRow = createTableRow(coin);
        coinTableBody.appendChild(tableRow);
      });
    } catch (error) {
      console.log('Error fetching data:', error);
    }
  }
  
  // Search button functionality
  const searchButton = document.getElementById('searchButton');
  searchButton.addEventListener('click', () => {
    const searchInput = document.getElementById('searchInput');
    const searchText = searchInput.value.toLowerCase();
  
    const coinTableBody = document.getElementById('coinTableBody');
    const tableRows = coinTableBody.getElementsByTagName('tr');
  
    for (let i = 0; i < tableRows.length; i++) {
      const name = tableRows[i].getElementsByTagName('td')[1].innerText.toLowerCase();
  
      if (name.includes(searchText)) {
        tableRows[i].style.display = '';
      } else {
        tableRows[i].style.display = 'none';
      }
    }
  });
  
  // Sort button functionality..
  const sortButton = document.getElementById('sortButton');
  sortButton.addEventListener('click', () => {
    const coinTableBody = document.getElementById('coinTableBody');
    const tableRows = Array.from(coinTableBody.getElementsByTagName('tr'));
  
    tableRows.sort((row1, row2) => {
      const marketCap1 = parseFloat(row1.getElementsByTagName('td')[4].innerText.replace(/[^0-9.-]+/g, ''));
      const marketCap2 = parseFloat(row2.getElementsByTagName('td')[4].innerText.replace(/[^0-9.-]+/g, ''));
  
      return marketCap2 - marketCap1;
    });
  
    coinTableBody.innerHTML = ''; // Clear previous data
  
    tableRows.forEach(row => {
      coinTableBody.appendChild(row);
    });
  });
  
  // Initial data fetch using .then approach
  fetchUsingThen();