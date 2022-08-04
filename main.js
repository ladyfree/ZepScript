
// 플레이어들이 채팅창에 입력하는 모든 채팅에 대해 호출 되는 이벤트
// !로 시작하는 텍스트는 채팅창에 나오지 않으나, onSay 함수에는 사용 가능
App.onSay.Add(function(player, text) {

    //App.showCenterLabel(player.name + '님 왈 : ' + text);
    if(text == 'speed up') {
        player.moveSpeed = 400;
    }
    else if(text == 'speed down') {
        player.moveSpeed = 40;
    }
    else {
        player.moveSpeed = 200;
    }
    player.sendUpdated();

});

