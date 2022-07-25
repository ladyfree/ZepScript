const STATE_INIT = 3000;
const STATE_READY = 3001;
const STATE_PLAYING = 3002;
const STATE_JUDGE = 3004;
const STATE_END = 3005;


let _state = STATE_INIT;
let _start = false;
let _widget = null; // using for contents UI
let _players = App.player;
let _result = '';

// App 실행 시에 최초로 호출되는 이벤트 (유저 진입 전)
// Normal App과 Sidebar App은 Script 적용 후 맵이 실행될 때 호출
App.onInit.Add(function(){
});

// 모든 플레이어를 이 이벤트를 통해 App에 진입시킴
App.onJoinPlayer.Add(function(player) {
});

// 플레이어 모두 진입 시 최초로 시작되는 이벤트
App.onStart.Add(function(){
    startState(STATE_INIT);    
});

function startState(state) {
    _state = state;

    switch(_state)
    {
        case STATE_INIT:
            if(_widget)
            {
                _widget.destroy();
                _widget = null;
            }
    
            // called html UI
            // param1 : file name
            // param2 : position 
            // [ top, topleft, topright, middle, middleleft, middleright, bottom, bottomleft, bottomright, popup ]
            // param3 : width size
            // param4 : height size
            _widget = App.showWidget('clock.html', 'topleft', 200, 200);
            
            startState(STATE_READY);
            break;
        case STATE_READY:
            _start = true;
            startState(STATE_PLAYING);
            break;
        case STATE_PLAYING:
            break;
        case STATE_JUDGE:
            break;
        case STATE_END:
            if(_widget)
            {
                _widget.destroy();
                _widget = null; // must to do for using again
            }

            _start = false;
            break;
    }
}


// 20ms 마다 호출되는 이벤트
// dt: deltatime(전 프레임이 완료되기까지 걸린 시간)
App.onUpdate.Add(function(dt){
    if(!_start)
        return;

    switch(_state)
    {
        case STATE_INIT:
            break;
        case STATE_READY:
            break;
        case STATE_PLAYING:
            break;
        case STATE_JUDGE:
            break;
        case STATE_END:
            break;
    }    
});

// 이벤트 콜백 처리 후 다시 onUpdate

// App 종료 시 모든 플레이어를 App에서 나가게 함
App.onLeavePlayer.Add(function(player){
});

// App 종료 시 마지막으로 호출
// Normal App과 Sidebar App은 별도의 종료
App.onDestroy.Add(function(){
    _start = false;
    
    if(_widget)
    {
        _widget.destroy();
        _widget = null;
    }    
});