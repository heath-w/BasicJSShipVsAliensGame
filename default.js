var step = 1;
var stepInterval = 5;
var maxNumberOfMissiles = 5;
var numberOfMissiles = 0;
var maxNumberOfAliens = 10;
var numberOfAliens = 2;

var intervals = {
    intervalHorizontal: undefined,
    intervalVertical: undefined,
    intervalMissles: []
};

var prevDirection = {
    left: false,
    up: false,
    right: false,
    down: false
};

var ship = document.getElementById("ship");
var boom = document.getElementById("boom");
var testAlien = document.getElementById("test");
(function () {
    var alienOne = document.createElement("div");
    var alienTwo = document.createElement("div");

    alienOne.className = "alien";
    alienTwo.className = "alien";

    alienOne.style.top = "100px";
    alienTwo.style.top = "100px";

    alienOne.style.left = "10px";
    alienTwo.style.left = "100px";
    
    alienOne.style.height = "20px";
    alienTwo.style.height = "20px";

    var alienOne = document.body.appendChild(alienOne);
    var alienTwo = document.body.appendChild(alienTwo);
    console.log(alienOne);
    
    console.log(document.body);
})();

(function () {
    console.log("wow");

    setInterval(function () {
        checkImpact();
    }, 30);

})();

function checkImpact() {
    var missiles = document.body.getElementsByClassName("missile");
    numberOfMissiles = missiles.length;
    var aliens = document.body.getElementsByClassName("alien");

    for (var i = 0; i < numberOfMissiles; i++) {
        var missileTop = parseInt(missiles[i].style.top, 10);
        for (var j = 0; j < numberOfAliens; j++) {
            var alienBottom = (aliens[j].offsetTop);// + parseInt(aliens[j].style.height, 10));
            
            if ( missileTop <= alienBottom ) {
                console.log(missileTop + "<=" + alienBottom + " == BOOM!!!!!!!");   
                boom.style.visibility = "visible";
            } else {
                console.log(missileTop + "<=" + alienBottom);      
            }
        }
    }
}

document.onkeydown = function (e) {
    e = e || window.event;

    switch (e.keyCode) {
        case 96:
            //keypad 0            
            break;
        case 17:
            //right ctrl
            stop();
            break;
        case 32:
            //space
            shoot();
            break;
        case 37:
            left();
            break;
        case 39:
            right();
            break;
            /*            
        case 40:
            down();
            break;
        case 38:
            up();
            break;        
*/
    }
};

function shoot() {
    if (numberOfMissiles >= maxNumberOfMissiles) {
        return;
    }

    var m = document.createElement("div");
    var missile = document.body.appendChild(m);
    missile.className = "missile";
    missile.style.top = ship.offsetTop - 10 + "px";
    missile.style.left = ship.offsetLeft + 11 + "px";
    missile.interval = setInterval(function () {
        if (parseInt(missile.style.top, 10) < document.body.clientHeight) {
            missile.style.top = missile.offsetTop - 5 + "px";
        }
        if (missile.offsetTop < 0) {
            clearInterval(missile.interval);
            document.body.removeChild(missile);
        }
    }, 30);
}

function stop() {
    clearInterval(intervals.intervalHorizontal);
    clearInterval(intervals.intervalVertical);
    prevDirection.left = prevDirection.up = prevDirection.right = prevDirection.down = false;
}

function left() {
    if (prevDirection.left) {
        clearInterval(intervals.intervalHorizontal);
        prevDirection.left = false;
    } else {
        clearInterval(intervals.intervalHorizontal);
        intervals.intervalHorizontal = setInterval(function () {
            if (ship.offsetLeft <= 0) {
                clearInterval(intervals.intervalHorizontal);
            } else {
                ship.style.left = ship.offsetLeft - step + "px";
            }
        }, stepInterval);
        prevDirection.left = true;
        prevDirection.right = false;
    }
}

function right() {
    if (prevDirection.right) {
        clearInterval(intervals.intervalHorizontal);
        prevDirection.right = false;
    } else {
        clearInterval(intervals.intervalHorizontal);
        intervals.intervalHorizontal = setInterval(function () {
            if ((ship.offsetLeft + ship.offsetWidth) >= document.body.clientWidth) {
                clearInterval(intervals.intervalHorizontal);
            } else {
                ship.style.left = ship.offsetLeft + step + "px";
            }
        }, stepInterval);
        prevDirection.right = true;
        prevDirection.left = false;
    }
}

function up() {
    if (prevDirection.up) {
        clearInterval(intervals.intervalVertical);
        prevDirection.up = false;
    } else {
        clearInterval(intervals.intervalVertical);
        intervals.intervalVertical = setInterval(function () {
            ship.style.top = ship.offsetTop - step + "px";
        }, 100);
        prevDirection.up = true;
        prevDirection.down = false;
    }
}

function down() {
    if (prevDirection.down) {
        clearInterval(intervals.intervalVertical);
        prevDirection.down = false;
    } else {
        clearInterval(intervals.intervalVertical);
        intervals.intervalVertical = setInterval(function () {
            ship.style.top = ship.offsetTop + step + "px";
        }, 100);
        prevDirection.down = true;
        prevDirection.up = false;
    }
}
