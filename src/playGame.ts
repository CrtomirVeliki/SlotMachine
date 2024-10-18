import symbol1 from '../images/sedem.png';
import symbol2 from '../images/banana.png';
import symbol3 from '../images/lubenica.png';
import symbol4 from '../images/limona.png';
import symbol5 from '../images/bar.png';


export default class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame" );
        this.winText = null;
    }

    preload() {
        // Load symbols for the reels
        this.load.image("symbol1", symbol1);
        this.load.image("symbol2", symbol2);
        this.load.image("symbol3", symbol3);
        this.load.image("symbol4", symbol4);
        this.load.image("symbol5", symbol5);
    }

    create() {
      
        // Set up the 3x3 grid 
        this.createReels();
        this.createSpinButton();
    }

    createReels() {
        // Create a 3x3 grid for symbols
        this.reels = [];

        const startX = 330;
        const startY = 200;
        const reelWidth = 75;
        const reelHeight = 75;

        for (let row = 0; row < 3; row++) {
            this.reels[row] = [];
            for (let col = 0; col < 3; col++) {
                const symbol = this.add.sprite(
                    startX + col * reelWidth,
                    startY + row * reelHeight,
                    "symbol1"
                );
                this.reels[row][col] = symbol;
            }
        }
    }

    createSpinButton() {
        // Create a spin button
        const spinButton = this.add.text(365, 450, "SPIN", {
            fontSize: "32px",
            color: "#fff",
        }).setInteractive();

        spinButton.on("pointerdown", () => {
            this.spinReels();
        });
    }

    spinReels() {
        this.clearWinText();
        // Start spinning the reels
        const symbols = ["symbol1", "symbol2", "symbol3", "symbol4", "symbol5"];
        for (let row = 0; row < 3; row++) {
            for (let col = 0; col < 3; col++) {
                // Randomize the symbol for each reel
                const randomSymbol = Phaser.Math.Between(0, symbols.length - 1);
                this.reels[row][col].setTexture(symbols[randomSymbol]);
            }
        }

        // Check if the player wins
        this.checkWinCondition();
    }

    checkWinCondition() {
        let win = false;

        // Loop through rows
        for (let row = 0; row < 3; row++) {
            const firstSymbol = this.reels[row][0].texture.key;
            win = true;

            // Check if symbols  match
            for (let col = 1; col < 3; col++) {
                if (this.reels[row][col].texture.key !== firstSymbol) {
                    win = false;
                    break;
                }
            }

            // If a win, exit the loop
            if (win) {
                this.displayWinText("You Win!");
                break;
            }
        }

        if (!win) {
            this.displayWinText("No Win!");
        }
    }

    // Display win/no-win text
    displayWinText(message) {
        // Remove text if it exists
        if (this.winText) {
            this.winText.destroy();
        }

        // Display the new win/no-win message
        this.winText = this.add.text(330, 400, message, { fontSize: "32px", color: message === "You Win!" ? "#c9ff00" : "#0f00ff" });
    }

    // Clear text before the next spin
    clearWinText() {
        if (this.winText) {
            this.winText.destroy();
            this.winText = null; // Reset reference to null
        }
    }
}


