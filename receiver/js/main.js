var app = {
  init: function () {
    const context = cast.framework.CastReceiverContext.getInstance();
    const playerManager = context.getPlayerManager();
    const stats = playerManager.getStats();
    let bandwidth = stats.streamBandwidth;
    console.log("#############################");
    console.log("#############################");
    console.log("#############################");
    console.log("#############################");
    console.log("#############################");
    console.log("Bandwidth : " + bandwidth);
    console.log("#############################");
    console.log("#############################");
    console.log("#############################");
    console.log("#############################");
    console.log("#############################");

    let firstPlay = true;
    let player_init_time = Date.now();
    // Debug Logger
    const castDebugLogger = cast.debug.CastDebugLogger.getInstance();
    const LOG_TAG = 'MyAPP.LOG';

    // Enable debug logger and show a 'DEBUG MODE' overlay at top left corner.
    castDebugLogger.setEnabled(true);

    // Show debug overlay
    // castDebugLogger.showDebugLogs(true);

    // Set verbosity level for Core events.
    castDebugLogger.loggerLevelByEvents = {
      'cast.framework.events.category.CORE': cast.framework.LoggerLevel.INFO,
      'cast.framework.events.EventType.MEDIA_STATUS': cast.framework.LoggerLevel.DEBUG
    }

    // Set verbosity level for custom tags.
    castDebugLogger.loggerLevelByTags = {
        LOG_TAG: cast.framework.LoggerLevel.DEBUG,
    };
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
      } else {
        playerManager.mux.emit('videochange', {
          video_title: 'Updated Video'
        });
      }
      
      return loadRequestData;
    });
    
    
    context.start();
  }
};

$(document).ready(function () {
  app.init();
});
