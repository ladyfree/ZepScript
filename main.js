const spawn_X = 13;
const spawn_Y = 18;

// 플레이어가 스페이스에 진입 할 때 호출 되는 이벤트
App.onJoinPlayer.Add(function(p) {
    // playerID 에 해당하는 플레이어를 tileX, tileY 좌표로 소환한다.
    App.spawnPlayer(p.id, spawn_X, spawn_Y)
});


