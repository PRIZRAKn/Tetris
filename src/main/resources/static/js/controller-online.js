export default class Controller{
    constructor(game, view, secondPlayer = false){
        this.game = game;
        this.view = view;
        this.intervalId = null;
        this.isPlaying = false;

        if (secondPlayer) {
            this.isPlaying = true;
            this.updateView();
        } else {
            document.addEventListener('keydown', this.handleKeyDown.bind(this));
            document.addEventListener('keyup', this.handleKeyUp.bind(this));
            this.view.renderStartScreen();
        }
    }

    update(){
        this.game.movePieceDown();
        this.updateView();
    }

    play(){
        this.isPlaying = true;
        this.startTimer();
        this.updateView();
    }

    pause(){
        this.isPlaying = false;
        this.stopTimer();
        this.updateView();
    }

    updateView() {
        const state = this.game.getState();

        if (state.isGameOver) {
            // Отправка результатов на сервер
            this.sendGameResults(state);
            this.view.renderEndScreen(state);
        } else if (!this.isPlaying) {
            this.view.renderPauseScreen();
        } else {
            this.view.renderMainScreen(state);
        }
    }

    async sendGameResults(state) {
        const score = state.score;
        var formData = new FormData();

        // Добавление данных в объект FormData
        formData.append("score", score);
        try {
            var xhr = new XMLHttpRequest();

            // Настройка запроса
            xhr.open("POST", "http://localhost:3000/game-over", true);

            xhr.send(formData);

        } catch (error) {
            console.error('Ошибка при отправке результатов:', error);
        }
    }

    startTimer(){
        const speed = 1000 - this.game.getState().level * 100;

        if (!this.intervalId){
            this.intervalId = setInterval(() => {
                this.update();
            }, speed > 0 ? speed: 100);
        }
    }
    
    stopTimer(){
        if (this.intervalId){
            clearInterval(this.intervalId);  
            this.intervalId = null;
        }
    }

    handleKeyDown(event){
        switch (event.keyCode){
            case 37: //Left arrow
                this.game.movePieceLeft();
                this.updateView();
                break;
            case 38: //Up arrow
                this.game.rotatePiece();
                this.updateView();
                break;
            case 39: //Right arrow
                this.game.movePieceRight();
                this.updateView();
                break;
            case 40: //Down arrow
                this.stopTimer();
                this.game.movePieceDown();
                this.updateView();
                break;
        }
    }

    handleKeyUp(event){
        switch (event.keyCode){
            case 40: //Down arrow
                this.startTimer();
                break;
        }
    }
}