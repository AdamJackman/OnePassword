window.onload = function(){ 
    document.getElementById("passBut").onclick = calcPass; 
};

function calcPass(){
	// TODO: Cryptography
	var inp = $("#passIn").val();
	$("#passOut").val(inp);
}
