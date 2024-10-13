var game;
window.onload = function(){
  let gameConfig = {
    type: Phaser.CANVAS,
    width: 800,
    height: 600,
    pixelArt: true,
    physics: {
      default: "arcade",
      arcade: {
          gravity: {
            y: 0
          }
      }
    },
    scene: [preloadGame, playGame]
  }
  game = new Phaser.Game(gameConfig);
}
