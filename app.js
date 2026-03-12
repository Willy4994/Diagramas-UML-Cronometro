let startTime;
let elapsedTime = 0;
let timerInterval;
let times = []; // Aquí guardamos los objetos de competidores

const display = document.getElementById('display');
const resultsTable = document.getElementById('resultsTable');

// Función para formatear el tiempo
function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);
    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);
    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);
    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);
    return `${mm.toString().padStart(2, "0")}:${ss.toString().padStart(2, "0")}.${ms.toString().padStart(2, "0")}`;
}

// Iniciar cronómetro
document.getElementById('startBtn').onclick = () => {
    startTime = Date.now() - elapsedTime;
    timerInterval = setInterval(() => {
        elapsedTime = Date.now() - startTime;
        display.innerHTML = timeToString(elapsedTime);
    }, 10);
    document.getElementById('captureBtn').disabled = false;
};

// Capturar llegada (La parte clave de tu tarea)
document.getElementById('captureBtn').onclick = () => {
    const currentCapture = elapsedTime;
    let diff = 0;

    if (times.length > 0) {
        // Diferencia respecto al primero (índice 0)
        diff = currentCapture - times[0];
    }

    times.push(currentCapture);
    renderTable(currentCapture, diff);
};

function renderTable(time, diff) {
    const row = `<tr>
        <td>${times.length}</td>
        <td>${timeToString(time)}</td>
        <td>${diff === 0 ? "---" : "+" + timeToString(diff)}</td>
    </tr>`;
    resultsTable.innerHTML += row;
}

// Reiniciar
document.getElementById('resetBtn').onclick = () => {
    clearInterval(timerInterval);
    display.innerHTML = "00:00:00.00";
    elapsedTime = 0;
    times = [];
    resultsTable.innerHTML = "";
    document.getElementById('captureBtn').disabled = true;
};
