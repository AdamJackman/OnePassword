//Hashing Variables
var length = 10;
var newSaltLength = 10;

//User Variables
var userID = 1;
var username = "adam";
var site = "default";
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
	lenDiv.setAttribute('class', "Box");
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
	else if(len>0 && len<26){
		newSaltLength = len;	
	}
	else{
		alert("Not a recognised format");
	}
	//remove the set length box
	$('#lenBox').remove();
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
	//begins the chain of commands to calculate the password
    requestUserID();
}

function finishPass(){
	$("#passOut").val("");
	var userInp = $("#passIn").val();
    var userPass = userInp;
    //Create the pass with the salt, the length, and the given password
    var key = CryptoJS.PBKDF2(userPass, salt, { keySize: 128/32 });
    var sizedPass = key.toString().substring(0,length);
    //Check here if any number or symbol needs to be added

    //alert(sizedPass);
    //Place the password in the passOut box
	$("#passOut").val(sizedPass);
}


function requestSalt(){
	//sends the current site looking for the specific salt
	$.ajax({
	    type: 'GET',
	    url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/reqSalt.php?jsoncallback=?",
	    timeout: 3000,
	    data: {
	    	"site": site,
	    	"userID": userID
	    },
	    success: function(response){
	        salt = response['salt'];
	        //alert("site is: " + site + " salt is: " + salt + " id is: " + userID);

	        // ------ MUST ALSO RETRIEVE THE LEN VARIABLE AND PUT IT INT HE LENGTH VARIABLE -------

	        if(response['salt'] == 'none'){
	        	newEntry();
	        }
	        else{
	        	finishPass();	
	        }
	    },
	    error: function(){
	    	alert('connection error');
	    }
    });
}

function requestUserID(){
	$.ajax({
	    type: 'GET',
	    url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/reqID.php?jsoncallback=?",
	    timeout: 3000,
	    data: {
	    	"username": username
	    },
	    success: function(response){
	        userID = response['userid'];

	        if(userID == 0){
	        	//user does not exist
	        	alert("User Not Recognised: Please use the options menu to create a new user");
	        }
	        else{
	        	requestSalt();	
	        }
	    },
	    error: function(){
	    	alert('connection error');
	    }
		});
}

function insertUsername(newName){
	$.ajax({
		type: 'GET',
		url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/insUser.php?jsoncallback=?",
		timeout: 3000,
		data:{
			"username": newName
		},
		success: function(response){
			//Tell the user that everything is done
			alert("Done");
		},
		error: function(){
			alert("connection error");
		}
	});
}


//Shouldn't be needed but just as a safety precaution a counter to check that there is not an infinite loop
var counter = 0;

function newEntry(){

	// ------------------------------ CREATE THE NEW SALT ---------------------------------
	var rawsalt = CryptoJS.lib.WordArray.random(128/8);
	var salt = rawsalt.toString().substring(0,24);
	
	//Safety Check to avoid infinite loop
	if (counter > 10) {
		return;
	};

	//Insert the new Entry into the Database
	$.ajax({
		type: 'GET',
		url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/insSalt.php?jsoncallback=?",
		timeout: 3000,
		data:{
			"userID": userID,
			"site": site,
			"salt": salt,
			"len": newSaltLength,
			"reqSym": reqSym,
			"reqNum": reqNum
		},
		success: function(response){
			alert("New Site Use Detected - Secure Entry Made");
			//recall the requestSalt Function
			requestSalt();
			counter=0;

		},
		error: function(){
			counter = counter + 1 ;
		}
	})
	
	


	


}