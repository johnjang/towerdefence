//This function will load all the images given in the address and 
// call the callBackFunction() when the job is done.
// imgAddress: array of string or a string of address containing the file
// callBackFunction: Function to callback when loading all images are done
// returnObject: the cache object where the images are stored
//
//

function loadAudios(audAddress, callBackFunction, returnObject) {
    var loaded = 0;
    audAddress.forEach(function(address) {
        loadAudio(address);
    });
    function loadAudio(address) {
        var audio = new Audio();
        audio.addEventListener('canplaythrough', isReady, false);
        audio.src = address;
        returnObject[address] = audio;
    }
    function isReady(){
        loaded++;
        if(loaded == audAddress.length) {
            callBackFunction();
        }
    }
}


function loadImages(imgAddress, callBackFunction, returnObject) {
    //Check if the address is an array or a single address
    if(imgAddress instanceof Array) {
        imgAddress.forEach(function(address) {
            loadImage(address);
        });
    }
    else {
        loadImage(imgAddress);
    }

    function loadImage(address) {
        var img = new Image;
        img.onload = function() {
            returnObject[address] = img;
            if(isReady()) {
                callBackFunction();
            }
        };
        returnObject[address] = false;
        img.src = address;
    }

    function isReady() {
        for(var i in returnObject) {
            if(returnObject.hasOwnProperty(i) &&
                    !returnObject[i]) {
                return false;
            }
        }
        return true;
    }
}
