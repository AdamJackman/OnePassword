//Hashing Variables
var length = 10;

//User Variables
var userID = 2;
var username = "Adam";
var site = "facebook";
var salt = "default";
var reqSym = false;
var reqNum = false;

window.onload = function(){ 
	// OnLoad setup
    document.getElementById("passBut").onclick = calcPass; 
    document.getElementById("lenset").onclick = setNewLength; 
	document.getElementById("symset").onclick = setNewSymbReq;
    document.getElementById("numset").onclick = setNewNumbReq;

    //Grab current site
    getCurrentSite();
    //Might not be needed later
    
    //calcPass();
    
};

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

//These functions will be used to force in symbols and numbers if they are missing from the output
function setNewSymbReq(){
	var addTo = document.getElementById("mainDiv");
	//create the elements to enter the length into
	var lenDiv = document.createElement('div');
	lenDiv.setAttribute('id', "symBox");
	lenDiv.setAttribute('class', "Box");


	var li1 = document.createElement('li');
	var li2 = document.createElement('li');

	var lab1 = document.createElement('label');
	lab1.innerHTML = "Require a Symbol:   ";

	var lab2 = document.createElement('label');
	lab2.innerHTML = "Do not require a Symbol:   ";

	var radio = document.createElement('input');
	radio.setAttribute("type", "radio");
	radio.setAttribute("name", "check");
	radio.setAttribute('id', "onBut");

	var radio2 = document.createElement('input');
	radio2.setAttribute("type", "radio");
	radio2.setAttribute("name", "check");
	radio2.setAttribute('id', "offBut");

	var lenbut = document.createElement('button');
	lenbut.setAttribute('id', 'inpBut');
	lenbut.setAttribute('class', 'btn btn-default navbar-btn pull-right');
	lenbut.setAttribute('type', 'button');
	lenbut.innerHTML = "Set New Requirement";
	lenbut.onclick = setSymbReq;

	//Add the elements
	$('body').append(lenDiv);
	lenDiv.appendChild(li1);
	lenDiv.appendChild(li2);
	li1.appendChild(radio);
	li1.appendChild(lab1);
	li2.appendChild(radio2);
	li2.appendChild(lab2);
	
	
	lenDiv.appendChild(lenbut);
}

function setSymbReq(){
	//Set the variable
	if(document.getElementById('onBut').checked){
		reqSym = true;
	}
	else{
		reqSym = false;
	}
	//tear down
	$('#symBox').remove();
}

function setNewNumbReq(){
	var addTo = document.getElementById("mainDiv");
	//create the elements to enter the length into
	var lenDiv = document.createElement('div');
	lenDiv.setAttribute('id', "numBox");
	lenDiv.setAttribute('class', "Box");

	var li1 = document.createElement('li');
	var li2 = document.createElement('li');

	var lab1 = document.createElement('label');
	lab1.innerHTML = "Require a Number:   ";

	var lab2 = document.createElement('label');
	lab2.innerHTML = "Do not require a Number:   ";

	var radio = document.createElement('input');
	radio.setAttribute("type", "radio");
	radio.setAttribute("name", "check");
	radio.setAttribute('id', "onBut");

	var radio2 = document.createElement('input');
	radio2.setAttribute("type", "radio");
	radio2.setAttribute("name", "check");
	radio2.setAttribute('id', "offBut");

	var lenbut = document.createElement('button');
	lenbut.setAttribute('id', 'inpBut');
	lenbut.setAttribute('class', 'btn btn-default navbar-btn pull-right');
	lenbut.setAttribute('type', 'button');
	lenbut.innerHTML = "Set New Requirement";
	lenbut.onclick = setNumbReq;

	//Add the elements
	$('body').append(lenDiv);
	lenDiv.appendChild(li1);
	lenDiv.appendChild(li2);
	li1.appendChild(radio);
	li1.appendChild(lab1);
	li2.appendChild(radio2);
	li2.appendChild(lab2);
	
	
	lenDiv.appendChild(lenbut);
}
function setNumbReq(){
		//Set the variable
	if(document.getElementById('onBut').checked){
		reqNum = true;
	}
	else{
		reqNum = false;
	}
	//tear down
	$('#numBox').remove();
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