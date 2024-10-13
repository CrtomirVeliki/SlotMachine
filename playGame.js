

class playGame extends Phaser.Scene {
    constructor() {
        super("PlayGame" );
        this.winText = null;
    }

    preload() {
        // Load symbols for the reels
        this.load.image("symbol1", "images/sedem.png");
        this.load.image("symbol2", "images/banana.png");
        this.load.image("symbol3", "images/lubenica.png");
        this.load.image("symbol4", "images/limona.png");
        this.load.image("symbol5", "images/bar.png");
    }

    create() {
        // Set up the 3x3 grid for the slot machine
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

        // Loop through all three rows
        for (let row = 0; row < 3; row++) {
            const firstSymbol = this.reels[row][0].texture.key;
            win = true;

            // Check if all symbols in the current row match
            for (let col = 1; col < 3; col++) {
                if (this.reels[row][col].texture.key !== firstSymbol) {
                    win = false;
                    break;
                }
            }

            // If a win is found, exit the loop early
            if (win) {
                this.displayWinText("You Win!");
                break;
            }
        }

        if (!win) {
            this.displayWinText("No Win!");
        }
    }

    // Method to display win/no-win text
    displayWinText(message) {
        // Remove the previous win text if it exists
        if (this.winText) {
            this.winText.destroy();
        }

        // Display the new win/no-win message
        this.winText = this.add.text(330, 400, message, { fontSize: "32px", color: message === "You Win!" ? "#00ff00" : "#ff0000" });
    }

    // Method to clear text before the next spin
    clearWinText() {
        if (this.winText) {
            this.winText.destroy();
            this.winText = null; // Reset reference to null
        }
    }
}


