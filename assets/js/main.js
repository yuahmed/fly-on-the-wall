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
