// Fetch available countries from the API
fetch("https://date.nager.at/api/v3/AvailableCountries")
  .then((response) => response.json())
  .then((countries) => {
    
    const select= document.getElementById("countrySelect"); // Create a new select element
    

    // Loop through each country and create an option element
    countries.forEach((country) => {
      const option = document.createElement("option");
      option.value = country.countryCode;
      option.textContent = country.name;
      select.appendChild(option);
    });

    // getting button using DOM and using event listener to fetch info and display details after pressing button
    document.getElementById("butn").addEventListener("click", () => {
      let code = select.value;
      let holiday = fetch(
        `https://date.nager.at/api/v3/publicholidays/2024/${code}`
      );
      holiday
        .then((data) => data.json())
        .then((holidays) => {
          const tdata = document.getElementById("tbody");
          tdata.innerHTML="";
          holidays.forEach((holiday) => {
          const newrow = document.createElement("tr");
          newrow.innerHTML = `
            <td>${holiday.date}</td>
            <td>${holiday.name}</td>
            <td>${holiday.localName}</td>
            `;
            tbody.appendChild(newrow);
        });
    })
    // using catch to handle the errors
        .catch((error) => console.error("Error fetching countries:", error));

    });
  })
  .catch((error) => console.error("Error fetching countries:", error));

