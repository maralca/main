function Loading(id){
	var whereLoad;
	var load;

	load = '<div class="spinner">'
		+'<div class="rect1"></div>'
		+'<div class="rect2"></div>'
		+'<div class="rect3"></div>'
		+'<div class="rect4"></div>'
		+'<div class="rect5"></div>'
	+'</div>';
	
    container = document.createElement("div");
    container.className = "loading";
    container.innerHTML = load;

	whereLoad = document.getElementById(id);
	if(whereLoad == null){

	}
	if(whereLoad.firstChild !=null){
		whereLoad.insertBefore(container,whereLoad.firstChild);
	}
	else{
		whereLoad.appendChild(container);
	}

	blocker = document.createElement("div");
	blocker.id = "BLOCKER";
	blocker.className = "blocker";

	whereLoad.appendChild(blocker);

	if(XtrGraficoUtil.isset(window.MutationObserver)){
		new MutationObserver(ocupar).observe(whereLoad,{ 
			attributes: true, 
			childList: true, 
			characterData: true 
		});
	}
	else{
		document.addEventListener("DOMSubtreeModified",ocupar);
	}

	this.addLoading=addLoading;
	this.removeLoading=removeLoading;

	return this;

	function ocupar(){
		var bounding;
		setTimeout(function(){
			bounding = whereLoad.getBoundingClientRect();

			blocker.style.setProperty("width",bounding.width+"px");
			blocker.style.setProperty("height",bounding.height+"px");
			blocker.style.setProperty("top",bounding.top+"px");
			blocker.style.setProperty("left",bounding.left+"px");

			container.style.setProperty("width",bounding.width+"px");
			container.style.setProperty("height",bounding.height+"px");
			container.style.setProperty("top",bounding.top+"px");
			container.style.setProperty("left",bounding.left+"px");
		},30);
	}

	function blur(){
		unblur(whereLoad);
		whereLoad.className += " blockme";
	}
	function unblur(){
		whereLoad.className = whereLoad.className.replace(" blockme","");
	}
	function show(element){
		element.className = element.className.replace(" hide","");
	}
	function hide(element){
		show(element);
		element.className += " hide";
	}
	function addLoading(){
		show(container);
		show(blocker);
		blur();
	}
	function removeLoading(){
		hide(container);
		hide(blocker);
		unblur();
	}
}