export default class View{
    static colors = {
        '1': 'cyan',
        '2': 'blue',
        '3': 'orange',
        '4': 'white',
        '5': 'green',
        '6': 'purple',
        '7': 'red'
    };

    constructor (element, width, height, rows, columns, second = false, callBack){
        this.element = element;
        this.width = width;
        this.height = height;

        this.second = second;
        if (!second) {
            this.callBack = callBack;
        }

        this.canvas = document.createElement('canvas');
        this.canvas.width = this.width;
        this.canvas.height = this.height;
        this.context = this.canvas.getContext('2d');

        this.playfieldBorderWidth = 4; //описание ирового поля
        this.playfieldX = this.playfieldBorderWidth;
        this.playfieldY = this.playfieldBorderWidth;
        this.playfieldWidth = this.width * 2 / 3 - 20;
        this.playfieldHeight = this.height;
        this.playfieldInnerWidth = this.playfieldWidth - this.playfieldBorderWidth * 2;
        this.playfieldInnerHeight = this.playfieldHeight - this.playfieldBorderWidth * 2;

        this.blockWidth = this.playfieldInnerWidth / columns;
        this.blockHeight = this.playfieldInnerHeight / rows;

        this.panelX = this.playfieldWidth + 10;
        this.panelY = 0;
        this.panelWidth = this.width / 3;
        this.panelHeight = this.height;

        this.element.appendChild(this.canvas);
    }


    renderMainScreen(state){ //отрисовка
        if (!this.second) {
            this.callBack(state);
        }
        this.clearScreen();
        this.renderActiveCoordinates(state);
        this.renderPlayfield(state);
        // this.renderActiveCoordinates(state);
        this.renderPanel(state);
    }

    renderStartScreen(){
        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Waiting player...', this.width / 2, this.height / 2);
    }

    renderPauseScreen(){
        this.context.fillStyle = 'rgba(0,0,0,0.75)';
        this.context.fillRect(0, 0, this.width, this.height);

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('Press ENTER to Resume', this.width / 2, this.height / 2);
    }

    renderEndScreen({ score }){
        this.clearScreen();

        this.context.fillStyle = 'white';
        this.context.font = '18px "Press Start 2P"';
        this.context.textAlign = 'center';
        this.context.textBaseline = 'middle';
        this.context.fillText('GAME OVER', this.width / 2, this.height / 2 - 48);
        this.context.fillText(`Score: ${score}`, this.width / 2, this.height / 2);
    }

    clearScreen(){ //удаление предыдущего места фигурки
        this.context.clearRect(0, 0, this.width, this.height);
    }

    renderPlayfield({ playfield }){
        for (let y = 0; y < playfield.length; y++){
            for (let x = 0; x < playfield[y].length; x++){
                const block = playfield[y][x];

                if (block) {
                    this.renderBlock(
                        (x * this.blockWidth), 
                        (y * this.blockHeight), 
                        this.blockWidth, 
                        this.blockHeight, 
                        View.colors[block]
                    );
                }
            }
        }

        this.context.strokeStyle = 'white'; //
        this.context.lineWidth = this.playfieldBorderWidth;//
        this.context.strokeRect(0, 0, this.playfieldWidth, this.playfieldHeight);//
        
    }

    renderPanel({ level, score, lines, nextPiece }) {
        this.context.textAlign = 'start';
        this.context.textBaseline = 'top';
        this.context.fillStyle = 'white';
        if (this.second) {
            this.context.font = '8px "Press Start 2P"';
        } else {
            this.context.font = '14px "Press Start 2P"';
        }
    
        this.context.fillText(`Score: ${score}`, this.panelX, this.panelY + 0);
        this.context.fillText(`Lines: ${lines}`, this.panelX, this.panelY + 24);
        this.context.fillText(`Level: ${level}`, this.panelX, this.panelY + 48);
        this.context.fillText(`Next:`, this.panelX, this.panelY + 96);
    
        if (nextPiece && nextPiece.blocks) { // Проверка наличия nextPiece и nextPiece.blocks
            for (let y = 0; y < nextPiece.blocks.length; y++) {
                for (let x = 0; x < nextPiece.blocks[y].length; x++) {
                    const block = nextPiece.blocks[y][x];
    
                    if (block) {
                        this.renderBlock(
                            this.panelX + x * this.blockWidth * 0.5,
                            this.panelY + 100 + y * this.blockHeight * 0.5,
                            this.blockWidth * 0.5,
                            this.blockHeight * 0.5,
                            View.colors[block]
                        );
                    }
                }
            }
        }
    }
    getActiveCoordinates({ playfield }) {
        const activeCoordinates = [];

        for (let y = 0; y < playfield.length; y++) {
            for (let x = 0; x < playfield[y].length; x++) {
                const block = playfield[y][x];

                if (block) {
                    activeCoordinates.push({ x, y });
                }
            }
        }

        return activeCoordinates;
    }

    renderActiveCoordinates(state) {
        const activeCoordinates = this.getActiveCoordinates(state);

        activeCoordinates.forEach(coord => {
            this.renderBlock(
                coord.x * this.blockWidth,
                this.playfieldY + coord.y * this.blockHeight,
                this.blockWidth,
                this.blockHeight,
                'gray'
            );
        });
    }

    renderBlock (x, y, width, height, color) {
        this.context.fillStyle = color;
        this.context.strokeStyle = 'black'
        this.context.lineWidth = 2;

        this.context.fillRect(x, y, width, height); //отступ от края
        this.context.strokeRect(x, y, width, height);
    }

    updateLeaderboard(leaderboard) {
        const tableBody = document.getElementById('leaderboard-body');
        tableBody.innerHTML = ''; // Очищаем текущее содержимое таблицы

        leaderboard.forEach((entry, index) => {
            const row = tableBody.insertRow();
            const cellRank = row.insertCell(0);
            const cellName = row.insertCell(1);
            const cellScore = row.insertCell(2);

            cellRank.innerHTML = index + 1;
            cellName.innerHTML = entry.playerName;
            cellScore.innerHTML = entry.score;
        });
    }
}