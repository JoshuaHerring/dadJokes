"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
function getJoke() {
    return __awaiter(this, void 0, void 0, function* () {
        let valid = false;
        let quote = '';
        let response = ["Well this is awkward this is not suppose to happen..."];
        while (!valid) {
            let rawdata = yield fetch("https://icanhazdadjoke.com/slack");
            let jsondata = yield rawdata.json();
            quote = jsondata.attachments[0].text;
            quote = quote.trim();
            if (quote.split("?").length > 1) {
                response = quote.split("?");
                console.log("question mark");
                valid = true;
            }
            else if (quote.split(".").length > 2) {
                response = quote.split(".");
                console.log("two parter");
                valid = true;
            }
            else {
                console.log("poor");
            }
            if (response.length > 2 || quote[quote.length - 1] == '"' || quote[quote.length - 1] == '?') {
                valid = false;
            }
        }
        console.log(quote);
        displayQuote(response);
    });
}
function displayQuote(quote) {
    let quoteContainer = document.getElementById("quoteContainer");
    let lead = document.getElementById("lead");
    if (lead)
        lead.innerHTML = "";
    let punch = document.getElementById("punch");
    if (punch)
        punch.innerHTML = "";
    for (let i = 0; i < quote.length - 1; i++) {
        if (lead)
            lead.innerHTML += quote[i];
    }
    if (punch) {
        punch.innerHTML = quote[quote.length - 1];
        console.log(punch.innerHTML);
    }
}
getJoke();
let button = document.getElementById("funny");
button === null || button === void 0 ? void 0 : button.addEventListener("click", () => {
    let punch = document.getElementById("punch");
    punch === null || punch === void 0 ? void 0 : punch.classList.remove("invisible");
});
let newJoke = document.getElementById("new");
newJoke === null || newJoke === void 0 ? void 0 : newJoke.addEventListener("click", () => {
    let punch = document.getElementById("punch");
    punch === null || punch === void 0 ? void 0 : punch.classList.add("invisible");
    getJoke();
});
