//Hashing Variables
var length = 10;

//User Variables
var userID = 2;
var username = "Adam";
var site = "facebook";
var salt = "default";

window.onload = function(){ 
	// OnLoad setup
    document.getElementById("passBut").onclick = calcPass; 
    document.getElementById("lenset").onclick = setNewLength; 

    //Grab current site
    getCurrentSite();
    //Might not be needed later
    
    //calcPass();
    
};

function getLength(){

}

function getCurrentSite(){
	//alert("currSite");
	chrome.tabs.getSelected(null,function(tab) {
    site = tab.url;
	});
}

function setNewLength(){
	//Get the div to addTo
	var addTo = document.getElementById("mainDiv");
	//create the elements to enter the length into
	var lenDiv = document.createElement('div');
	lenDiv.setAttribute('id', "lenBox");
	var inpLi = document.createElement('li');
	inpLi.setAttribute('id', "inpLi");
	var lenLab = document.createElement('label');
	lenLab.setAttribute('id', "labBox");
	lenLab.innerHTML = "Input the desired length";
	var leninp = document.createElement('input');
	leninp.setAttribute('id', "inpBox");
	leninp.setAttribute('placeholder', "1 - 25");
	var lenbut = document.createElement('button');
	lenbut.setAttribute('id', 'inpBut');
	lenbut.setAttribute('class', 'btn btn-default navbar-btn pull-right');
	lenbut.setAttribute('type', 'button');
	lenbut.innerHTML = "Set New Length";
	lenbut.onclick = setLength;

	//Create the input box in this

	//Append the childen
	$('body').append(lenDiv);
	lenDiv.appendChild(inpLi);
	inpLi.appendChild(lenLab);
	inpLi.appendChild(leninp);
	lenDiv.appendChild(lenbut);
}

function setLength(){
	//TODO: Add more error checking
	var lencar =  document.getElementById("inpBox");
	//Set the new length
	var len = $("#inpBox").val();
	if(len>25 || len<1){
		alert("Invalid length entered");
	}
	else{
		length = len;	
	}
	//remove the set length box
	$('#lenBox').remove();
	alert(len);
	alert(length);

}

function randomSymbol(){
	//Can be used as a way to retrieve a single random symbol - for symbolic demands
	possible = "!@#$%^&*()_+-=[]\\;',./{}|:<>?";
	text = "";
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}

function randomNumber(){
	//Can be used as a way to retrieve a single random symbol - for symbolic demands
	possible = "123456789";
	text = "";
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}


function calcPass(){

	//Get the user 
	$("#passOut").val("");
	var userInp = $("#passIn").val();

    //These are the three variables that are essential to the hashing process
    // might want to use something like this later for the salt - 
    //var salt = CryptoJS.lib.WordArray.random(128/8);
	//alert(site);

    requestUserID();
    requestSalt();
    //requestCurrentSite();

    var userPass = userInp;

    //Create the pass with the salt, the length, and the given password
    var key = CryptoJS.PBKDF2(userPass, salt, { keySize: 128/32 });
    var sizedPass = key.toString().substring(0,length);

    //Check here if any number or symbol needs to be added
    
    //Place the password in the passOut box
	$("#passOut").val(sizedPass);
}

function requestSalt(){

	$.ajax({
	    type: 'GET',
	    url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/reqSalt.php?jsoncallback=?",
	    timeout: 3000,
	    success: function(response){
	        //alert("responded salt:  " + response['salt']);
	        salt = response['salt'];
	    },
	    error: function(){
	    	alert('connection error');
	    }
    });

}

function requestUserID(){
	//alert("old user ID" + userID);
	$.ajax({
	    type: 'GET',
	    url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/reqID.php?jsoncallback=?",
	    timeout: 3000,
	    success: function(response){
	        //alert("responded userID:  " + response['userID']);
	        userID = response['userID'];
	    },
	    error: function(){
	    	alert('connection error');
	    }
		});
}