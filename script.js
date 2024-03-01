"use strict";

// * SELECTED ELEMENTS -

const currencyAmount = document.getElementById("currency_amount");
const currencyFrom = document.getElementById("currency_from");
const currencyTo = document.getElementById("currency_to");
const convertMsg = document.getElementById("converted");
const convertBtn = document.querySelector("button");
const dropMenu = document.querySelectorAll("select");

// * FUNCTIONS -

const updateExchange = async () => {
	try {
		const currTo = currencyTo.value.toLowerCase();
		const currFrom = currencyFrom.value.toLowerCase();
		const url = `https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/${currFrom}/${currTo}.json`;
		const response = await fetch(url);
		const data = await response.json();
		let currAmount = currencyAmount.value;
		if (currAmount === "" || currAmount <= 0) {
			currAmount = 1;
			currencyAmount.value = 1;
		}
		const currConverted = (currAmount * data[currTo]).toFixed(2);
		convertMsg.textContent = `${currAmount} ${currencyFrom.value} = ${currConverted} ${currencyTo.value}`;
	} catch (error) {
		alert(error.message);
	}
};

dropMenu.forEach((dropDown) => {
	for (const curCode in country_list) {
		const newOption = document.createElement("option");
		newOption.textContent = curCode;
		newOption.value = curCode;
		if (
			(dropDown.id === "currency_from" && curCode === "USD") ||
			(dropDown.id === "currency_to" && curCode === "INR")
		) {
			newOption.selected = "selected";
		}
		dropDown.appendChild(newOption);
	}

	dropDown.addEventListener("change", (e) => {
		const changed = e.target;
		const countryCode = country_list[changed.value];
		const image = changed.parentElement.querySelector("img");
		image.src = `https://flagsapi.com/${countryCode}/flat/24.png`;
		image.alt = countryCode;
		updateExchange();
	});
});

convertBtn.addEventListener("click", (e) => {
	e.preventDefault();
	updateExchange();
});

window.addEventListener("load", updateExchange);
