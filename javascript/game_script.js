var number_turns = 0;
var playerTurn = 'X';
var allowed = 'big_cell';
var illegal = [0];
var testing = false;
var goto = false;

main();

function winner() {
    if (winner != undefined) {
        Game_end(winner);
    } 
}

function makemove(element, parent) {
    for (i = 0; i < illegal.length; i++) {
        if (element.className.includes(illegal[i])) testing = true;
        if (parent.includes(illegal[i])) goto = true;
    }
    if (goto == true) {
        tempAlert('Invalid move - Please Try Again',2000);
        goto = false;
        main();
    }
    else if (playerTurn == 'X' && parent.includes(allowed) == true && goto == false) {
        const newElement = document.createElement('div');
        newElement.setAttribute("class", "small_field moves_X");
        element.appendChild(newElement);
        const player_turn = document.getElementById('player_turn');
        player_turn.innerHTML = "It is Player 2's turn";
        number_turns += 1;
        playerTurn = 'O';
        next_move(element, testing);
        winning_small(element);
        testing = false;
        main();
    }
    else if (playerTurn == 'O' && parent.includes(allowed) == true && goto == false) {
        const newElement = document.createElement('div');
        newElement.setAttribute("class", "small_field moves_O");
        element.appendChild(newElement);
        number_turns += 1;
        playerTurn = 'X';
        const player_turn = document.getElementById('player_turn');
        player_turn.innerHTML = "It is Player 1's turn";
        next_move(element, testing);
        winning_small(element);
        testing = false;
        main();
    }
    else if (parent.includes(allowed) == false && goto == false) {
        condition = true;
        next_move(element, condition)
        tempAlert('Invalid move - Please Try Again',2000);
        testing = false;
        main();
     }

}

function main() {
    winner(player_turn);
    const numberturns = document.getElementById('number_turns');
    numberturns.textContent = number_turns;
    if (number_turns != 0) {
        if (number_turns > 1){
            var nr = document.getElementsByClassName("yellow").length;
            for (i = 0; i < nr; i++) document.getElementsByClassName("yellow")[i].classList.remove("yellow");
        }
        if (illegal.length != 1 && allowed != 'big_cell') {
            for (i = 0; i < document.getElementsByClassName(allowed).length; i++) document.getElementsByClassName(allowed)[i].classList.add('yellow');
        }
        if (illegal.length == 1) {
            for (i = 0; i < document.getElementsByClassName(allowed).length; i++) document.getElementsByClassName(allowed)[i].classList.add('yellow');
        }

    }
    document.onclick = function(evt) {
        var evt=window.event || evt; // window.event for IE
        if (!evt.target) evt.target=evt.srcElement; // extend target property for IE
        makemove(evt.target, evt.target.parentElement.parentElement.className);
      }
}

function tempAlert(msg,duration)
{
 var el = document.createElement("div");
 el.setAttribute('class','alert');
 el.setAttribute("style","position:absolute;top:40%;left:20%;background-color:white;");
 el.innerHTML = msg;
 setTimeout(function(){
  el.parentNode.removeChild(el);
 },duration);
 document.body.appendChild(el);
}

function next_move(element, condition) {
    var position_rel = element.getAttribute("data-fieldnr") % 9;
    if (condition = true) allowed = "big_cell";
    if (position_rel == 0) allowed = "big_cell cell top left";
    else if (position_rel == 1) allowed = "big_cell cell top center";
    else if (position_rel == 2) allowed = "big_cell cell top right";
    else if (position_rel == 3) allowed = "big_cell cell middle left";
    else if (position_rel == 4) allowed = "big_cell cell middle center";
    else if (position_rel == 5) allowed = "big_cell cell middle right";
    else if (position_rel == 6) allowed = "big_cell cell bottom left";
    else if (position_rel == 7) allowed = "big_cell cell bottom center";
    else if (position_rel == 8) allowed = "big_cell cell bottom right";
}

function winning_small(element) {
    var parent = element.parentElement;
    if (parent.getElementsByClassName("top left")[0].firstElementChild && parent.getElementsByClassName("top center")[0].firstElementChild && parent.getElementsByClassName("top right")[0].firstElementChild) {
        if (parent.getElementsByClassName("top left")[0].firstElementChild.className.includes("moves_X") && parent.getElementsByClassName("top center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("top right")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += [parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3]];
        }
        if (parent.getElementsByClassName("top left")[0].firstElementChild.className.includes("moves_O") && parent.getElementsByClassName("top center")[0].firstElementChild.className.includes("moves_O") && parent.getElementsByClassName("top right")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal[illegal.length] = parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("top left")[0].firstElementChild && parent.getElementsByClassName("middle left")[0].firstElementChild && parent.getElementsByClassName("bottom left")[0].firstElementChild) {
        if (parent.getElementsByClassName("top left")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle left")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom left")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("top left")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle left")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom left")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("top left")[0].firstElementChild && parent.getElementsByClassName("middle center")[0].firstElementChild && parent.getElementsByClassName("bottom right")[0].firstElementChild) {
        if (parent.getElementsByClassName("top left")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom right")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("top left")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom right")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("top center")[0].firstElementChild && parent.getElementsByClassName("middle center")[0].firstElementChild && parent.getElementsByClassName("bottom center")[0].firstElementChild) {
        if (parent.getElementsByClassName("top center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom center")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("top center")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom center")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("top right")[0].firstElementChild && parent.getElementsByClassName("middle right")[0].firstElementChild && parent.getElementsByClassName("bottom right")[0].firstElementChild) {
        if (parent.getElementsByClassName("top right")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle right")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom right")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("top right")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle right")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom right")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("top right")[0].firstElementChild && parent.getElementsByClassName("middle center")[0].firstElementChild && parent.getElementsByClassName("bottom left").firstElementChild) {
        if (parent.getElementsByClassName("top right")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom left")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("top right")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom left")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("middle left")[0].firstElementChild && parent.getElementsByClassName("middle center")[0].firstElementChild && parent.getElementsByClassName("middle right")[0].firstElementChild) {
        if (parent.getElementsByClassName("middle left")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("middle right")[0].firstElementChild.className.includes('moves_X')) {
            parent.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("middle left")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle center")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("middle right")[0].firstElementChild.className.includes('moves_O')) {
            parent.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    if (parent.getElementsByClassName("bottom left")[0].firstElementChild && parent.getElementsByClassName("bottom center")[0].firstElementChild && parent.getElementsByClassName("bottom right")[0].firstElementChild) {
        if (parent.getElementsByClassName("bottom left")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom center")[0].firstElementChild.className.includes('moves_X') && parent.getElementsByClassName("bottom right")[0].firstElementChild.className.includes('moves_X')) {
            element.parentElement.classList.add("done_X");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
        if (parent.getElementsByClassName("bottom left")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom center")[0].firstElementChild.className.includes('moves_O') && parent.getElementsByClassName("bottom right")[0].firstElementChild.className.includes('moves_O')) {
            element.parentElement.classList.add("done_O");
            illegal += ' ' + parent.parentElement.classList[2] + ' ' + parent.parentElement.classList[3];
        }
    }
    
}

function Game_end() {

}