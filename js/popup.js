var length = 10;

window.onload = function(){ 
	// OnLoad setup
    document.getElementById("passBut").onclick = calcPass; 
    document.getElementById("lenset").onclick = setNewLength; 
};

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
	//Might want to do a little more error checking than this
	var lencar =  document.getElementById("inpBox");
	//var len = lencar.val();
	var len = $("#inpBox").val();
	alert(len);
	if(len>25 || len<1){
		alert("Invalid length entered");
	}
	else{
		length = len;	
	}
	location.href= "";
	/*
	lenDiv.remove(lenbut);
	inpLi.remove(leninp);
	inpLi.remove(lenLab);	
	lenDiv.remove(inpLi);
	$('body').remove(lenDiv);
	*/
}

function randomSymbol(){
	//Can be used as a way to retrieve a single random symbol - for symbolic demands
	possible = "!@#$%^&*()_+-=[]\\;',./{}|:<>?";
	text = "";
	text += possible.charAt(Math.floor(Math.random() * possible.length));
	return text;
}


function calcPass(){
	// TODO: Cryptography
//	var hash = CryptoJS.MD5("Message");
//	alert(hash);
	$("#passOut").val("");
	var userInp = $("#passIn").val();

    //These are the three variables that are essential to the hashing process
    // might want to use something like this later for the salt - var salt = CryptoJS.lib.WordArray.random(128/8);
    var salt = "test";
    //var length = 10;
    var userPass = userInp;

    //Create the pass with the salt, the length, and the given password

    var key = CryptoJS.PBKDF2(userPass, salt, { keySize: 128/32 });
    var sizedPass = key.toString().substring(0,length);

	$("#passOut").val(sizedPass);
}