
export default class preloadGame extends Phaser.Scene{
    constructor(){
      super("PreloadGame");
    }
    preload(){
      
      
    }
    create(){
      this.scene.start("PlayGame");
    }
}
