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
    closePotPlayer = findbase["closePotPlayer"]
    computerDisable = findbase["computerDisable"] 

    # print(count)
    if fullScreen:
        print("full_screen")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeFullScreen": False}})
        keyboard.send('shift+f')
    if youtubePlay:
        if videoMode == "youtube":
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubePlay": False}})
            keyboard.send('K')
        else:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubePlay": False}})
            keyboard.send('space')
    if browserZoomPlus:
        print("zoom+")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserZoomPlus": False}})
        keyboard.send("ctrl+plus")
    if browserZoomMinus:
        print("zoom-")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserZoomMinus": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press('-')
        pyautogui.keyUp('ctrl')
    if browserTabRight:
        print("tabRight")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserTabRight": False}})
        keyboard.send('ctrl+tab')
    if browserTabLeft:
        print("tabLeft")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserTabLeft": False}})
        keyboard.send('ctrl+shift+tab')
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
    if closePotPlayer:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"closePotPlayer": False}})
        keyboard.send('ctrl+shift+O')
    if videoMode.lower() == "google":
        if focusVideo:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"focusVideo": False}})
            pyautogui.click(850,200)
        if youtubeVolumeUp:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeVolumeUp": False}})
            keyboard.send(['up'])
        if youtubeVolumeDown:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeVolumeDown": False}})
            keyboard.press(['down'])
        if youtubeTimeLeft:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeTimeLeft": False}})
            keyboard.press(['left'])
        if youtubeTimeRight:
            collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeTimeRight": False}})
            keyboard.press(['right'])
