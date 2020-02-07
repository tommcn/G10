window.addEventListener('DOMContentLoaded', (event) => {
    console.log('DOM fully loaded and parsed');
});

var current_turn = "red";
var nb_turns = 1;

function createTable()
{
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
            var button = `<button id='${i}-${j}' onclick='eat(${i}, ${j})'>Eat</button>`;
            td.innerHTML = button;
            tr.appendChild(td);
        }
        table.appendChild(tr);
    }
    console.log(table);
    table.setAttribute("id", "choc_table");
    document.getElementById("chocolate").innerHTML = "";
    document.getElementById("chocolate").appendChild(table);
    document.getElementById(`${rows-1}-${0}`).parentElement.style.backgroundColor = "black";

}

function eat(x, y)
{
    var table = document.getElementById('choc_table');
    document.getElementById(`${x}-${y}`).parentElement.style.backgroundColor = current_turn;
    
    for (var r = 0, n = table.rows.length; r < n; r++) {
        for (var c = 0, m = table.rows[r].cells.length; c < m; c++) {
            if (r <= x && c >= y)
            {
                var bac_color = document.getElementById(`${r}-${c}`).parentElement.style.backgroundColor;
                
                if (bac_color == "black")
                {
                    alert(`${current_turn} lost!`);
                    break;
                }
                else if (bac_color != "red" && bac_color != "blue" && bac_color != "black")
                {
                    document.getElementById(`${r}-${c}`).parentElement.style.backgroundColor = current_turn;
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
    addHistory();
    
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
