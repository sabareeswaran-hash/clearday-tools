"use strict";

const formatNumber = (value) => new Intl.NumberFormat(undefined, {
  maximumFractionDigits: 6
}).format(value);

document.querySelectorAll("form[data-calculator]").forEach((form) => {
  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const data = new FormData(form);
    const result = form.querySelector("output");
    const number = (name) => Number(data.get(name));
    let message = "";

    if (form.dataset.calculator === "percentage") {
      const percent = number("percent");
      const amount = number("amount");
      message = `${formatNumber(percent)}% of ${formatNumber(amount)} = ${formatNumber(amount * percent / 100)}`;
    } else if (form.dataset.calculator === "discount") {
      const price = number("price");
      const discount = number("discount");
      if (discount < 0 || discount > 100) {
        result.textContent = "Enter a discount from 0% to 100%.";
        return;
      }
      const saving = price * discount / 100;
      message = `You save ${formatNumber(saving)}. Sale price: ${formatNumber(price - saving)}.`;
    } else if (form.dataset.calculator === "length") {
      const factors = { mm: 0.001, cm: 0.01, m: 1, km: 1000 };
      const value = number("value");
      const converted = value * factors[data.get("from")] / factors[data.get("to")];
      const labels = { mm: "mm", cm: "cm", m: "m", km: "km" };
      message = `${formatNumber(value)} ${labels[data.get("from")]} = ${formatNumber(converted)} ${labels[data.get("to")]}`;
    }

    result.textContent = message;
  });
});

const textInput = document.querySelector("#text-to-count");
if (textInput) {
  const wordCount = document.querySelector("#word-count");
  const charCount = document.querySelector("#char-count");
  const updateCounts = () => {
    const text = textInput.value;
    const trimmed = text.trim();
    wordCount.textContent = trimmed ? String(trimmed.split(/\s+/u).length) : "0";
    charCount.textContent = String(text.length);
  };
  textInput.addEventListener("input", updateCounts);
  updateCounts();
}

const year = document.querySelector("#current-year");
if (year) year.textContent = String(new Date().getFullYear());
