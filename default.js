const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;

let _state = STATE_INIT;
let _stateTimer = 0;
//let _timer = 0;
let _start = false;
//let _players = App.player;
//let _result = '';

// App이 최초로 시작될 때
App.onInit.Add(function(){
	// 이 시점에 App에는 플레이어들이 참가하지 않은 상태
  // App의 나머지 필요한 부분을 초기화시킨다.
});

// 플레이어가 들어올 때
App.onJoinPlayer.Add(function(p){
  // 해당하는 모든 플레이어가 이 이벤트를 통해 App에 입장
});

// 플레이어가 모두 입장한 뒤에 한번 호출
App.onStart.Add(function(){
  // App에서 원하는 플레이어 속성값을 부여할 수 있다.
    startState(STATE_INIT);
});

function startState(state) {
    _state = state;
    _stateTimer = 0;

    switch(_state)
    {
        case STATE_INIT:
            startState(STATE_READY);
            break;
        case STATE_READY:
            startState(STATE_PLAYING);
            break;
        case STATE_PLAYING:
            break;
        case STATE_JUDGE:
            break;
        case STATE_END:
            _start = false;
            break;
    }
}

// 플레이어가 떠날 때
App.onLeavePlayer.Add(function(p){
  // 플레이어가 단순히 중간에 나갔을 때
  // App이 종료될 때에서 이 이벤트를 통해 모두 App에서 퇴장합니다.
    p.sendUpdated();  
})

// App이 종료될 때
App.onDestroy.Add(function(){
   // 이미 모든 플레이어가 App에서 나간 상태
   // App을 나머지를 정리한다.
    _start = false;  
})

// 매 20ms(0.02초) 마다 실행
App.onUpdate.Add(function(dt){
    if(!_start)
        return;

    _stateTimer += dt;

    switch(_state)
    {
        case STATE_INIT:
            break;
        case STATE_READY:
           break;
        case STATE_PLAYING:
            if(_stateTimer >= 1)
            {
                _stateTimer = 0;
                _timer -= 1;
            }

            if(_timer == 0)
            {
//                 _result = '정답은 ' + _answer + ' 입니다.';
//                 startState(STATE_JUDGE);
            }
            break;
        case STATE_JUDGE:
//             App.showCenterLabel(_result, 0xFFFFFF, 0x000000, 115);

//             if(_stateTimer >= 3)
//                 startState(STATE_END);
            break;
        case STATE_END:
            break;
    }  
});

