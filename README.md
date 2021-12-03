# chromecast_test


1. You need to sign up for Google Cast SDK Developer Console under https://cast.google.com/publish/#/overview
2. Once you have that setup add the chormecast device under https://cast.google.com/publish/#/devices. For that Chromecast needs to be hooked up to the internet and you need to obtain it's serial number. 
3. Host the reciever app on publicly accessible location (I used S3/CF :https://d2vmx0fwp0k80u.cloudfront.net/receiver/index.html)
4. Register your receiver app under https://cast.google.com/publish/#/applications. Once registered with all the information, publish the app. Make note of the app ID.
5. It takes around 15-20 minutes to register device and app on Google's Cast Dev portal. 
6. Reboot the device. 
7. On your developer machine, make sure you are using latest Google Chrome browser and make sure your dev machine and Chromecast are connected on the same network. 
8. Go to https://casttool.appspot.com/cactool/?. It is Google's recommended Chromecast sender app aka CaC tool.
9. Use earlier obtained app ID to connect this sender app to reciver app from the Cast Connect and Logger Control tab. 
10. Use cast icon on the top tab of CaC tool to luanch reciever app on your chromecast. The cast icon appears only when all above steps are followed.
10. Go to "Load Media" tab of the CaC tool and load the default content by using "Load" radio button and hit "Send request". This should play the content on chromecast receiver app. 

-----------------------------------------------------------------------------------------------------------------------------------------------------------------


For reciever app, the reciver/js/main.js file is modified referring to https://developers.google.com/cast/docs/debugging/cast_debug_logger?hl=en. These initlizations were suggested for debuggin the reciever app. 
Deubugging steps: 
* I have modified Mux's SDK and Google's Reference SDK to get debug log and bitrate/bandwidth parameters but the issue I am facing is how to read the logs.
* I have been tryin to use "adb logcat", "adb shell dumpsys" etc but they give generic logs about device not app playback stats. It seems this is not the way to get app playback stats
* Google's guides suggest to https://developers.google.com/cast/docs/debugging/remote_debugger?hl=en that for reciever app debugging use "chrome://inspect" (on Chrome browser) or "edge://inspect" (on Windows Chromium Edge browser). 
* However, I tried it and both Chrome and Edge browsers dont show the "inspect" link for the device.
* I checked Google Cast Help/Support pages and came across that there are open bugs regarding the remote debugger. I have provided my comments under the latest bug on their portal :https://issuetracker.google.com/issues/191684319
