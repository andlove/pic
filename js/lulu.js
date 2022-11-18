new spine.SpinePlayer("player-container", {
 skelUrl: "https://cdn.jsdelivr.net/gh/andlove/pic/2d/c010/c010_00.skel",
 atlasUrl: "https://cdn.jsdelivr.net/gh/andlove/pic/2d/c010/c010_00.atlas",
  rawDataURIs: {
 "raptor-pma.png": "https://cdn.jsdelivr.net/gh/andlove/pic/2d/c010/c010_00.png"
 },
 animation: "shy",
 showControls: false, // Hide the player controls
 alpha: true, // Enable player translucency
 backgroundColor: "#00000000", // Background is fully transparent
 //animations: ["shy", "think", "action"] // The user can only select one of these three animations
 success: (player) => {
		document.getElementById("player-container").addEventListener("click", event => {
	    player.setAnimation("action", false); 
      //set the walk animation to play once
      //player.addAnimation("shy"); 
      player.addAnimation("delight"); 
	  });
  }
});
