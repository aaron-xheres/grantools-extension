# Grantools (Pre-release)

QOL Tools for Granblue Fantasy built on Electron

## Disclaimer

```
This extension will only READ data from Granblue Fantasy.
ALL functions is done only on the tab itself and not the game (nor its contents)


That being said...

This is a THIRD-PARTY TOOL and is not recommended to be used due to the EULA of Granblue Fantasy
http://game.granbluefantasy.jp/#static/infraction

Your account may be BANNED from using Grantools
The developers are not liable for any damages caused to your account
```

## Todo / Ideas
```
[x] Use WebRequests instead of Debugger?
   - Since I only need to read the sending header
```


## Features

```
Auto Refresh
  * Works with multi-battle raids
  - Auto Refreshes on Attack
  - Auto Refreshes on Summons

Repeat Stage
  - Repeat Counter
  - Redirects to Support Summon Page
  - Replicard Expedition redirect (instead of support summon)
```

## How to Install

1. Download latest release version [here](https://github.com/aaron-xheres/grantools-extension/releases)
2. Extract ZIP file
3. Open chrome extension page (chrome://extensions)
4. Click on Load Unpacked
5. Select unzipped Folder

**Remember to pin the extension for easy access!**


## Updating

1. Download latest release version [here](https://github.com/aaron-xheres/grantools-extension/releases)
2. Extract ZIP file
3. Repleace old extension folder with extracted files
4. Open chrome extension page (chrome://extensions)
5. Click on Update

**If there is any issue with updating the extension, remove and do a clean 'Load Unpacked' again**


## How to Use

1. Navigate to [Granblue Fantasy](http://game.granbluefantasy.jp)
2. Open the extension pop-up (click on the extension icon)
3. Select the options and settings and it should automatically work

* Note that the extension may sometimes not work properly (e.g. attacks/summons not refreshing)

```
- Refresh Icon: Auto Refresh
- Repeat Icon: Repeat Stage

Auto Refresh Settings
  - On Attack
  - On Summon
  
Repeat Stage Settings
  - Replicard Expedition
    - This sends player to the last selected replicard expeidition map instead of repeating the stage
      (only for Replicard Sandbox)
```
