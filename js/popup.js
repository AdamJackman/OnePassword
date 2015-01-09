window.onload = function(){ 
	// OnLoad setup
    document.getElementById("passBut").onclick = calcPass; 
};

function calcPass(){
	// TODO: Cryptography
//	var hash = CryptoJS.MD5("Message");
//	alert(hash);

    //These are the three variables that are essential to the hashing process
    // might want to use something like this later for the salt - var salt = CryptoJS.lib.WordArray.random(128/8);
    var salt = "hello";
    var length = 5;
    var userPass = "a";

    //Create the pass with the salt, the length, and the given password

    var key = CryptoJS.PBKDF2(userPass, salt, { keySize: 128/32 });
    var sizedPass = key.toString().substring(0,length);

	//var inp = $("#passIn").val();
	$("#passOut").val(sizedPass);
}