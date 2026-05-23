let money = localStorage.getItem("money");
let xp = localStorage.getItem("xp");
let level = localStorage.getItem("level");
let tasks = JSON.parse(localStorage.getItem("tasks")) || [];
let completedTasks = localStorage.getItem("completedTasks");


if(completedTasks === null){
    completedTasks = 0;
}else{
    completedTasks = Number(completedTasks);
}




if(money === null){
    money = 0;
}else{
    money= Number(money);
}

if(xp === null){
    xp = 0;
}else{
    xp= Number(xp);
}

if(level === null){
    level = 1;
}else{
    level= Number(level);
}

updateDisplay();



function addMoney(){
    let input = document.getElementById("moneyInput");

    let amount = Number(input.value);

    money += amount;

    xp += amount;

    if(xp >= level * 100){
        xp = 0;
        level++;
    }

    localStorage.setItem("money", money);
    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);

    updateDisplay();

    input.value = "";
}

function updateDisplay(){

    document.getElementById("moneyDisplay").innerText = money + "€";

    document.getElementById("xpDisplay").innerText = "xp : " + xp;

    document.getElementById("levelDisplay").innerText ="Niveau : " +level;

    let percent = (xp / (level * 100)) * 100;

    document.getElementById("xpFill").style.width = percent + "%";

    document.getElementById("statsMoney").innerText = "Argent Gagné : " + money + "€";
    document.getElementById("statsTasks").innerText = "Taches terminées : " + completedTasks;
    document.getElementById("statsLevel").innerText = "Niveau actuel : " + level;

    let travelGoal = 3000;

    let travelPercent = (money / travelGoal) * 100;

    if(travelPercent > 100){
        travelPercent = 100;
    }

    document.getElementById("travelFill").style.width = travelPercent + "%";

    document.getElementById("travelText").innerText = money + "€ / " + travelGoal + "€"


}


renderTasks();



function addTask(){
    let taskInput = document.getElementById("taskInput");

    let taskText = taskInput.value;

    if(taskText === ""){
        return;
    }
    
    tasks.push(taskText);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    renderTasks();

    taskInput.value = "";

}

function completeTask(index){
   tasks.splice(index, 1);

   localStorage.setItem("tasks", JSON.stringify(tasks));

   xp += 25;

   completedTasks++;

   if(xp >= level * 100){
        xp = 0;
        level++;
    }

    localStorage.setItem("xp", xp);
    localStorage.setItem("level", level);
    localStorage.setItem("completedTasks", completedTasks);



    

    updateDisplay();

    renderTasks();
}

function renderTasks(){

    let taskList = document.getElementById("taskList");

    taskList.innerHTML = ""; 
    tasks.forEach((task, index) => {
        
        let taskDiv = document.createElement("div"); 

        taskDiv.classList.add("task");

        taskDiv.innerHTML= `
        <span>${task}</span>
        <button onclick="completeTask(${index})">✓</button>
        `;

        taskList.appendChild(taskDiv);
    });
}