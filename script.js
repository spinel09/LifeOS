console.log("LifeOS lancé !");

let money = 0;

function addmoney(){
    
    let input = document.getElementById("moneyInput");

    money += Number(input.value);

    document.getElementById("moneyDisplay").innerText = money + "€";

    input.value = "";
}