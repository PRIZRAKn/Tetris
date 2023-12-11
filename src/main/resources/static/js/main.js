// Подключение к WebSocket с использованием SockJS
var socket = new SockJS('/ws/connect');
var stompClient = Stomp.over(socket);

// Обработчик успешного подключения
stompClient.connect({}, function (frame) {
    console.log('Connected: ' + frame);

    sendMessage("Hello World")

    // Дополнительные действия после подключения
    // Например, подписка на каналы, отправка сообщений и т.д.
});

// Обработчик ошибок подключения
stompClient.debug = null;  // Отключение вывода отладочной информации в консоль

// Обработчик закрытия соединения
socket.onclose = function () {
    console.log('Connection closed');
};

// Пример отправки сообщения на сервер
function sendMessage(message) {
    console.log(message)
    stompClient.send("/app/send", {}, JSON.stringify({
        'chatMessage': message
    }));
}

// Пример подписки на канал и обработки полученных сообщений
stompClient.subscribe('/topic/public', function (response) {
    var message = JSON.parse(response.body);
    console.log('Received message: ' + message);
    // Ваш код обработки сообщения
});