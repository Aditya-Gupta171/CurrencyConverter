const BASE_URL =
  "https://api.currencyapi.com/v3/latest?apikey=cur_live_4QROSdof6BGFk4trf7wA0i5ibUs3P0z9ddtc5TdS";

const fromcurr = document.querySelector(".from select");
const tocurr = document.querySelector(".to select");
const msg = document.querySelector(".msg"); 

const dropdowns = document.querySelectorAll(".dropdown select");
for (let select of dropdowns) {
  for (let currcode in countryList) {
    let newOption = document.createElement("option");
    newOption.innerText = currcode;
    newOption.value = currcode;
    if (select.name === "from" && currcode === "USD") {
      newOption.selected = "selected";
    } else if (select.name === "to" && currcode === "INR") {
      newOption.selected = "selected";
    }
    select.append(newOption);
  }

  select.addEventListener("change", (evt) => {
    updateflag(evt.target);
  });
}

const updateflag = (element) => {
  let currcode = element.value;
  let countryCode = countryList[currcode];
  let newsrc = `https://flagsapi.com/${countryCode}/flat/64.png`;
  let img = element.parentElement.querySelector("img");
  img.src = newsrc;
};

const btn = document.querySelector("#get-rate");
btn.addEventListener("click", async (evt) => {
  evt.preventDefault();
  let amount = document.querySelector(".amount input"); 
  let amtval = amount.value;
  if (amtval === "" || amtval < 1) {
    amtval = 1;
    amount.value = "1";
  }

  let fromCurrency = fromcurr.value;
  let toCurrency = tocurr.value;
  const url = `${BASE_URL}&base_currency=${fromCurrency}&currencies=${toCurrency}`;
  let response = await fetch(url);
  let data = await response.json();
  let rate = data.data[toCurrency].value;
  let finalAmount = amtval * rate;
  msg.innerText = `${amtval} ${fromCurrency} = ${finalAmount} ${toCurrency}`;

});
