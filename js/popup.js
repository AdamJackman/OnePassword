//Hashing Variables
var length = 10;

//User Variables
var userID = 2;
var username = "Adam";
var site = "facebook";
var salt;

window.onload = function(){ 
	// OnLoad setup
    document.getElementById("passBut").onclick = calcPass; 
    document.getElementById("lenset").onclick = setNewLength; 
};

function getLength(){

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


function calcPass(){

	$("#passOut").val("");
	var userInp = $("#passIn").val();

    //These are the three variables that are essential to the hashing process
    // might want to use something like this later for the salt - 
    //var salt = CryptoJS.lib.WordArray.random(128/8);
   
    //TEST CODE
    requestUserID();
    requestSalt(); 
    var userPass = userInp;

    //Create the pass with the salt, the length, and the given password

    var key = CryptoJS.PBKDF2(userPass, salt, { keySize: 128/32 });
    var sizedPass = key.toString().substring(0,length);
    //Place the password in the passOut box
	$("#passOut").val(sizedPass);
}

function requestSalt(){

	// var myRequest = new XMLHttpRequest();
	// myRequest.onreadystatechange=function(){
	// 	alert(myRequest.responseText);
	// 	if(myRequest.readyState==4 && myRequest.status==200){
	// 		alert('success');
	// 		alert(myRequest.responseText);
	// 		//temporary response
	// 		document.getElementById('passOut').innerHTML=myRequest.responseText;
	// 	}
	// }
	// myRequest.open("GET", "http://www.google.com", true);
	// myRequest.send();
	// alert('after request');

	var amazURL = "http://ec2-54-152-110-181.compute-1.amazonaws.com/index.php";
	var amazURLcall = "http://ec2-54-152-110-181.compute-1.amazonaws.com/index.php?jsoncallback=?"

	$.ajax({
	    type: 'GET',
	    url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/index.php?jsoncallback=?",
	    success: function(response){
	        alert("responded salt:  " + response['salt']);
	        salt = response['salt'];
	    },
	    error: function(){
	    	alert('not good');
	    }
    });

}

function requestUserID(){
	alert("old user ID" + userID)
	$.ajax({
	    type: 'GET',
	    url: "http://ec2-54-152-110-181.compute-1.amazonaws.com/reqID.php?jsoncallback=?",
	    success: function(response){
	        alert("responded userID:  " + response['userID']);
	        userID = response['userID'];
	    },
	    error: function(){
	    	alert('not good');
	    }
		});
}