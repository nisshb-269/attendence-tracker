function calculate(element) {
    const row = element.closest("tr");
    const conducted = row.children[1].children[0].value;
    const attended = row.children[2].children[0].value;
    const percentCell = row.children[3];

    if (!conducted || conducted == 0) {
        percentCell.innerText = "0%";
        percentCell.className = "percent bad";
    } else {
        const percent = Math.round((attended / conducted) * 100);
        percentCell.innerText = percent + "%";
        percentCell.className = "percent " + (percent >= 75 ? "good" : "bad");
    }

    saveData();
}

function addRow() {
    const table = document.getElementById("tableBody");
    const row = table.insertRow();

    row.innerHTML = `
        <td><input type="text" placeholder="Subject" oninput="saveData()"></td>
        <td><input type="number" oninput="calculate(this)"></td>
        <td><input type="number" oninput="calculate(this)"></td>
        <td class="percent">0%</td>
    `;

    saveData();
}

/* ---------- LOCAL STORAGE ---------- */

function saveData() {
    const rows = document.querySelectorAll("#tableBody tr");
    let data = [];

    rows.forEach(row => {
        data.push({
            subject: row.children[0].children[0].value,
            conducted: row.children[1].children[0].value,
            attended: row.children[2].children[0].value
        });
    });

    localStorage.setItem("attendanceData", JSON.stringify(data));
}

function loadData() {
    const data = JSON.parse(localStorage.getItem("attendanceData"));
    const table = document.getElementById("tableBody");

    if (!data || data.length === 0) {
        addRow();
        return;
    }

    table.innerHTML = "";

    data.forEach(item => {
        const row = table.insertRow();
        row.innerHTML = `
            <td><input type="text" value="${item.subject}" oninput="saveData()"></td>
            <td><input type="number" value="${item.conducted}" oninput="calculate(this)"></td>
            <td><input type="number" value="${item.attended}" oninput="calculate(this)"></td>
            <td class="percent">0%</td>
        `;
        calculate(row.children[1].children[0]);
    });
}

window.onload = loadData;

