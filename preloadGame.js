class preloadGame extends Phaser.Scene{
    constructor(){
      super("PreloadGame");
    }
    preload(){
      // load all assets tile sprites

      // load spritesheet
      
    }
    create(){
      this.scene.start("PlayGame");
    }
}
