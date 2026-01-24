function calculate(element) {
    const row = element.parentElement.parentElement;
    const conducted = row.children[1].children[0].value;
    const attended = row.children[2].children[0].value;
    const percentCell = row.children[3];

    if (conducted == 0) {
        percentCell.innerText = "0%";
        percentCell.className = "percent bad";
        return;
    }

    const percent = Math.round((attended / conducted) * 100);
    percentCell.innerText = percent + "%";

    percentCell.className = "percent " + (percent >= 75 ? "good" : "bad");
}

function addRow() {
    const table = document.getElementById("tableBody");
    const row = table.insertRow();

    row.innerHTML = `
        <td><input type="text" placeholder="Subject"></td>
        <td><input type="number" value="0" oninput="calculate(this)"></td>
        <td><input type="number" value="0" oninput="calculate(this)"></td>
        <td class="percent">0%</td>
    `;
}
