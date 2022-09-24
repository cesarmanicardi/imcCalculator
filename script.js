const data = [
    {
      min: 0,
      max: 18.4,
      classification: "Less than 18,5",
      info: "Underweight",
      obesity: "0",
    },
    {
      min: 18.5,
      max: 24.9,
      classification: "Between 18,5 and 24,9",
      info: "Normal",
      obesity: "0",
    },
    {
      min: 25,
      max: 29.9,
      classification: "Between 25,0 and 29,9",
      info: "Overweight",
      obesity: "I",
    },
    {
      min: 30,
      max: 39.9,
      classification: "Between 30,0 and 39,9",
      info: "Obesity",
      obesity: "II",
    },
    {
      min: 40,
      max: 99,
      classification: "Greater than 40,0",
      info: "Severe obesity",
      obesity: "III",
    },
  ];

/*selecting elements*/
const imcTable = document.querySelector("#imc-table");
const heightInput = document.querySelector("#height");
const weightInput = document.querySelector("#weight");
const btnCalculator = document.querySelector("#btn-calculate");
const btnClear = document.querySelector("#btn-clear");
const calcContainer = document.querySelector("#front-part");
const resultContainer = document.querySelector("#results-container");
const imcNumber = document.querySelector("#imc-result");
const imcInfo = document.querySelector("#imc-info");
const backBtn = document.querySelector(".btn-back");

/*functions*/
function createTable(data) {
    data.forEach((item) => {
      const div = document.createElement("div");
      div.classList.add("table-data");
  
      const classification = document.createElement("p");
      classification.innerText = item.classification;
  
      const info = document.createElement("p");
      info.innerText = item.info;
  
      const obesity = document.createElement("p");
      obesity.innerText = item.obesity;
  
      div.appendChild(classification);
      div.appendChild(info);
      div.appendChild(obesity);
  
      imcTable.appendChild(div);
    });
}


function clearInputs(){
    heightInput.value = "";
    weightInput.value = "";
    imcNumber.classList = "";
    imcInfo.classList = "";
}


function validDigits(text){
    return text.replace(/[^0-9,]/g, "");
}

function calcImc(weight, height){
    const imc = (weight / (height * height)).toFixed(1);
    return imc;
}

function showOrHideResults(){
    calcContainer.classList.toggle("hide");
    resultContainer.classList.toggle("hide");
}

/*start*/
createTable(data);

/* events */
[heightInput, weightInput].forEach((el) => {
    el.addEventListener("input", (e) => {
        const updatedValue = validDigits(e.target.value);

        e.target.value = updatedValue;
    });
});

btnCalculator.addEventListener("click", (e) => {
    e.preventDefault();

    const weight = +weightInput.value.replace(",", ".");
    const height = +heightInput.value.replace(",", ".");

    if(!weight || !height) return;

    const imc = calcImc(weight, height);

    let info

    data.forEach((item) => {
        if(imc >= item.min && imc <= item.max){
            info = item.info;
        }
    });

    console.log(info);
    if(!info) return;

    imcNumber.innerText = imc;
    imcInfo.innerText = info;

    switch(info){
        case "Underweight":
            imcNumber.classList.add("attention");
            imcInfo.classList.add("attention");
            break;
        case "Normal":
            imcNumber.classList.add("good");
            imcInfo.classList.add("good");
            break;
        case "Overweight":
            imcNumber.classList.add("attention");
            imcInfo.classList.add("attention");
            break;
        case "Obesity":
            imcNumber.classList.add("caution");
            imcInfo.classList.add("caution");
            break;
        case "Severe obesity":
            imcNumber.classList.add("danger");
            imcInfo.classList.add("danger");
            break;
    }

    showOrHideResults();
})


btnClear.addEventListener("click", (e) => {
    e.preventDefault();
    clearInputs();
})

backBtn.addEventListener("click", () => {
    clearInputs();
    showOrHideResults();
})