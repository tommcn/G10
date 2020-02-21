window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
    createTable();
});

var current_turn = "red";
var nb_turns = 1;

function createTable()
{
    current_turn = "red";
    nb_turns = 1;

    var table = document.createElement('table');
    var rows = document.getElementById("rows").value;
    var cols = document.getElementById("cols").value;

    nb_rows = rows;
    nb_cols = cols;
    for (var i = 0; i < nb_rows; i++){
        var tr = document.createElement('tr');   
        for (var j = 0; j < nb_cols; j++)
        {
            var td = document.createElement('td');
            var button = `<button id='${i}-${j}' onclick='eat(${i}, ${j})'>Eat</button><p class="coord">(${j+1}; ${i+1})</p>`;
            td.innerHTML = button;
            td.style.backgroundColor = "white";
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    table.setAttribute("id", "choc_table");
    document.getElementById("chocolate").innerHTML = "";
    document.getElementById("chocolate").appendChild(table);
    document.getElementById(`${rows-1}-${0}`).parentElement.style.backgroundColor = "black";

}

function eat(x, y)
{
    console.log(x, y);
    var table = document.getElementById('choc_table');
    var sel_color = document.getElementById(`${x}-${y}`).parentElement.style.backgroundColor;
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            if (r <= x && c >= y)
            {
                var bac_color = document.getElementById(`${r}-${c}`).parentElement.style.backgroundColor;

                if (sel_color == "black")
                {
                    alert(`${current_turn} lost!`);
                    return 0;
                } else if (bac_color != "red" && bac_color != "blue")
                {
                    document.getElementById(`${x}-${y}`).parentElement.style.backgroundColor = current_turn;
                    document.getElementById(`${r}-${c}`).parentElement.style.backgroundColor = current_turn;

                    var new_el = document.createElement("p");
                    new_el.innerText = nb_turns;
                    new_el.setAttribute("id", `${r}-${c}`);

                    document.getElementById(`${r}-${c}`).parentNode.replaceChild(new_el, document.getElementById(`${r}-${c}`));
                    
                }             
            }
        }
    }

    if (current_turn == "red")
    {
        current_turn = "blue";
    } else {
        current_turn = "red";
    }
    var new_el = document.createElement("p");
    new_el.innerText = nb_turns;
    new_el.setAttribute("id", `${x}-${y}`);

    document.getElementById(`${x}-${y}`).parentNode.replaceChild(new_el, document.getElementById(`${x}-${y}`));

    addHistory();
    // alert(current_turn + " has no more options");
    nb_turns = nb_turns + 1;

}


function GetCellValues() {
    var table = document.getElementById('choc_table');
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            console.log(table.rows[r].cells[c].innerHTML);
        }
    }
}

function addHistory()
{
    var add = document.getElementById("choc_table");
    var out = add.cloneNode(true);
    out.removeAttribute("id");
    out.setAttribute("class", "history");

    document.body.appendChild(out);
    var br = document.createElement("br");
    document.body.appendChild(br);
}

function enterFull()
{
    elem = document.getElementById("chocolate");
    if (elem.requestFullscreen) {
        elem.requestFullscreen();
    }
}