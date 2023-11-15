function logSubmit(event) {
  event.preventDefault();

  document.getElementById("header").style.display = "none";
  let nickname = document.getElementById("name").value.toUpperCase();

  //console.log(nickname);


  mainBody.innerHTML = `<div id="waldoExp" class="center" >
    <h1 style="color: #EE2A24; text-align: center">
        <strong> WHERE'S </strong> </h1>
    <h1 style="color: #00AEEF; text-align: center">
        <strong> ${nickname}? </strong> </h1> </div>`;
}

const form = document.getElementById("infoForm");
const mainBody = document.getElementById("mainBod");
form.addEventListener("submit", logSubmit);



// Variables to store user information
let ipAddress, country, region, city, timezone, currency, organisationName;

// Getting user's location
fetch("http://ip-api.com/json/?fields=45674495")
  .then((response) => {
    // Check if the request was successful (status code 200)
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }

    // Parse response.body (convert to JSON), pass to next
    return response.json();
  })
  // data = deserialized response body
  .then((data) => {
    // Store values in variables
    ipAddress = data.query;
    country = data.country;
    region = data.regionName;
    city = data.city;
    timezone = data.timezone;
    currency = data.currency;
    organisationName = data.org;

    console.log("IP Address:", ipAddress);
    console.log("Country:", country);
    console.log("Region:", region);
    console.log("City:", city);
    console.log("Timezone:", timezone);
    console.log("Currency:", currency);
    console.log("Organisation:", organisationName);

  })
  .catch((error) => {
      console.error("Error fetching IP information:", error);
  });

