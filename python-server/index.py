from pymongo import MongoClient
import time, pyautogui, os, keyboard
client = MongoClient('mongodb://localhost:27017/')

db = client['kinomaniak']
collection = db['commands']
collection.update_one({"base":"kinomaniak"}, {"$set":{"isYoutubeOpen":False,"youtubeVolumeUp":False,"youtubeVolumeDown":False,"isCompUnlock":False,"youtubePlay":False,"openVideo":False,"youtubeOpenVideo":False,"youtubeTimeLeft":False,"youtubeTimeRight":False,"youtubeFullScreen":False,"youtubeStatusPaused":"true","fullScreen":False,"browserZoomPlus":False,"browserZoomMinus":False,"browserTabClose":False,"browserTabLeft":False,"browserTabRight":False,"youtubeSubcriptions":False,"youtubeNumberVideo":False,"youtubeOpenVideoByNumber":False,"scrollDown":False,"scrollUp":False,"computerDisable":False}})
count = 0
while count > -1:
    count = count + 1
    time.sleep(0.1)
    findbase = collection.find_one({"base":"kinomaniak"})
    fullScreen = findbase['youtubeFullScreen']
    browserZoomPlus = findbase["browserZoomPlus"]
    browserZoomMinus = findbase["browserZoomMinus"]
    browserTabLeft = findbase["browserTabLeft"]
    browserTabRight = findbase["browserTabRight"]
    browserTabClose = findbase["browserTabClose"]
    focusVideo = findbase["focusVideo"]
    videoMode = findbase["videoMode"]
    youtubePlay = findbase["youtubePlay"]
    youtubeVolumeUp = findbase["youtubeVolumeUp"]
    youtubeVolumeDown = findbase["youtubeVolumeDown"]
    youtubeTimeLeft = findbase["youtubeTimeLeft"]
    youtubeTimeRight = findbase["youtubeTimeRight"]
    openBrowser = findbase["openBrowser"]
    selectApp = findbase["selectApp"]
    selectYoutube = findbase["selectYoutube"]

    computerDisable = findbase["computerDisable"] 

    # print(count)
    if fullScreen:
        print("full_screen")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeFullScreen": False}})
        keyboard.send("f")
    if youtubePlay:
        if videoMode == "youtube":
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubePlay": False}})
            pyautogui.press(['K'])
        else:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubePlay": False}})
            pyautogui.press(['space'])
    if browserZoomPlus:
        print("zoom+")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserZoomPlus": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press(['+'])
        pyautogui.keyUp('ctrl')
    if browserZoomMinus:
        print("zoom-")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserZoomMinus": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press(['-'])
        pyautogui.keyUp('ctrl')
    if browserTabRight:
        print("tabRight")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserTabRight": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press(['tab'])
        pyautogui.keyUp('ctrl')
    if browserTabLeft:
        print("tabLeft")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserTabLeft": False}})
        with pyautogui.hold('ctrl'):
            with pyautogui.hold('shift'):
                pyautogui.press(['tab'])
        pyautogui.keyUp('ctrl')
        pyautogui.keyUp('shift')
    if browserTabClose:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserTabClose": False}})
        keyboard.send("ctrl+w")
        print("close")
    if computerDisable:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"computerDisable": False}})
        pyautogui.click(20, 1059)
        time.sleep(3)
        pyautogui.click(131, 981)
        time.sleep(3)
        pyautogui.click(986, 493)
    if openBrowser:
        print("openBrowser")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"openBrowser": False}})
        keyboard.send('ctrl+alt+9')
    if selectApp:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"selectApp": False}})
        keyboard.send('ctrl+alt+tab')
    if selectYoutube:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"selectYoutube": False}})
        pyautogui.click(217,78)
    if videoMode == "google":
        if focusVideo:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"focusVideo": False}})
            pyautogui.click(850,200)
        if youtubeVolumeUp:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeVolumeUp": False}})
            pyautogui.press(['up'])
        if youtubeVolumeDown:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeVolumeDown": False}})
            pyautogui.press(['down'])
        if youtubeTimeLeft:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeTimeLeft": False}})
            pyautogui.press(['left'])
        if youtubeTimeRight:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeTimeRight": False}})
            pyautogui.press(['right'])
