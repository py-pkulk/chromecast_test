var app = {
  init: function () {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    let firstPlay = true;
    let player_init_time = Date.now();
    let stats ;
    let bandwidth;
  
    playerManager.addEventListener(cast.framework.events.EventType.PLAYING, ()=>{
         stats = playerManager.getStats();
         bandwidth = stats.streamBandwidth;
    });

    playerManager.setMessageInterceptor(cast.framework.messages.MessageType.LOAD, loadRequestData => {

      if (firstPlay) {
        firstPlay = false;
        initChromecastMux(playerManager, {
          debug: true,
          data: {
            env_key: '9r2vt044rcduk9fvofj5u4lai',
            player_init_time: player_init_time,
            video_title: 'Chromecast Test Video'
          }
        });
      } 
        else {
        playerManager.mux.emit('videochange', {
          video_title: 'Updated Video'
        });
      }
      playerManager.mux.emit('renditionchange', {
        video_source_bitrate: bandwidth});
     
      
      return loadRequestData;
    });
    
    
    context.start();

  }
};

$(document).ready(function () {
  app.init();
});