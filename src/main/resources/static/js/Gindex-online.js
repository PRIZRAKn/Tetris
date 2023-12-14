import Game from './game-online.js';
import View from './view-online.js';
import Controller from './controller-online.js';

const root = document.querySelector('#root');
const second = document.querySelector('#second');

const game = new Game ();
const view = new View(root, 480 + 20, 640 + 20, 20, 10, false, sendState);
const controller = new Controller(game, view);

window.game = game;
window.view = view;
window.controller = controller;

const game2 = new Game ();
const view2 = new View(second, 240 + 20, 360 + 20, 20, 10, true);
const controller2 = new Controller(game2, view2, true);
window.view = view2;

let topic;
let stompClient;

axios.get('/online-game/connect')
  .then(function (response) {
    // обработка успешного запроса
    let room = response.data;
    topic = "/topic/" + room;
    if (room !== myId) {
        controller.play();
    }

    const ws = new SockJS("http://localhost:3000/ws/connect");
    stompClient = Stomp.over(ws);

    stompClient.connect({}, function() {
        stompClient.subscribe(topic, function(data) {
            let message = data.body;
            if (message === "connect") {
                controller.play();
            } else {
                message = JSON.parse(message);
                if (message.id !== myId) {
                    view2.renderMainScreen(message.gameState);
                }
            }
        });
    })
});

async function sendState(gameState) {
    console.log(gameState)
    let jsonString = JSON.stringify({id: myId, gameState: gameState});
    stompClient.send(topic, {}, jsonString);
}