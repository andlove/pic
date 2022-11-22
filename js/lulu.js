new spine.SpinePlayer("player-container", {
 skelUrl: "https://cdn.jsdelivr.net/gh/andlove/pic/2d/c141/c141_00.skel",
 atlasUrl: "https://cdn.jsdelivr.net/gh/andlove/pic/2d/c141/c141_00.atlas",
 animation: "good",
 showControls: false, // Hide the player controls
 alpha: true, // Enable player translucency
 backgroundColor: "#00000000", 
 //animations: ["shy", "think", "action"] 
 success: (player) => {
   document.getElementById("player-container").addEventListener('mouseout', (event) => {
    player.addAnimation("delight");
    player.addAnimation("good");
  });
   document.getElementById("player-container").addEventListener('mouseover', (event) => {
    player.setAnimation("shy");
  });
   document.getElementById("player-container").addEventListener("click", event => {
    player.setAnimation("action", false); 
    player.addAnimation("good"); 
  });
  }
});
