/*
 * @author: Kardo Jõeleht
 */

window.onload = function(){
	var links = document.getElementsByClassName("delete_confirm");
	for(var i=0; i<links.length; i++){
		links[i].addEventListener("click", confirmDeletion);
	}
}

function confirmDeletion(event){
	if(!confirm("Are you sure?")){
		event.preventDefault();
	}
}