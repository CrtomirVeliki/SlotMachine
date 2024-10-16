
export default class preloadGame extends Phaser.Scene{
    constructor(){
      super("PreloadGame");
    }
    preload(){
      this.load.image("background", "../images/background.jpg")
      
    }
    create(){
      this.scene.start("PlayGame");
    }
}
