
window.addEventListener("load", onVrViewLoad);

function onVrViewLoad(){
	var vrView = new VRView.Player("#vrview",{
		image: "img/sample-360.jpg"
	})
}
