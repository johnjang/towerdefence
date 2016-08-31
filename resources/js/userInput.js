//create a canvas for the game
var canvas = document.getElementById("gameCanvas");
canvas.style.display = "block";
var ctx = canvas.getContext("2d");
canvas.style.cursor = "none";
var boundary = [[0,0],[canvas.width,canvas.height]];

var generateRandomPoint = function() {
    var xPos = Math.random() * (canvas.width-10); //random xPos inside the background
    var yPos = Math.random() * (canvas.height-10-100);    //random yPos inside the background
    xPos = Math.floor(xPos);
    yPos = Math.floor(yPos);
    return [xPos, yPos];
};

(function() {
    window.cursor = {
        xPos:0, //current mouse pos-xaxis
        yPos:0, //current mouse pos-yaxis
        click:false, //if user is clicking, it is true
        cxPos:0, //click mouse pos-xaxis
        cyPos:0  //click mouse pos-yaxis
    }

    canvas.addEventListener("mousemove", function(e) {
        cursor["xPos"] = e.clientX;
        cursor["yPos"] = e.clientY;
    }, false);
    canvas.addEventListener("mousedown", function(e) {
        var rect = canvas.getBoundingClientRect();
        var x = e.clientX - rect.left;
        var y = e.clientY - rect.top;
        cursor["cxPos"] = x; 
        cursor["cyPos"] = y; 
        cursor["click"] = true;
    }, false);
    canvas.addEventListener("mouseup", function(e) {
        cursor["click"] = false;
    }, false);

})();

(function() {
    var pressedKeys = {};
    
    function setKey(event, status) {
        var code = event.keyCode;
        var key;
        switch(code) {
            case 37:
            case 65:
                key = 'LEFT'; 
                break;
            case 38:
            case 87:
                key = 'UP'; 
                break;
            case 39:
            case 68:
                key = 'RIGHT'; 
                break;
            case 40:
            case 83:
                key = 'DOWN'; 
                break;
            case 49:
            case 97:
                key = '1'; 
                break;
            case 50:
            case 98:
                key = '2'; 
                break;
            case 51:
            case 99:
                key = '3'; 
                break;
            case 52:
            case 100:
                key = '4'; 
                break;
            default:
                //do nothing
        }
        pressedKeys[key] = status;
    }

    document.addEventListener('keydown', function(e) {
        setKey(e, true);
    });

    document.addEventListener('keyup', function(e) {
        setKey(e, false);
    });
    window.input = {
        isDown: function(key) {
            return pressedKeys[key.toUpperCase()];
        }
    };
    
})();
