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

    focusClick = findbase["focusClick"]
    youtubePlay = findbase["youtubePlay"]

    computerDisable = findbase["computerDisable"] 

    # print(count)
    if fullScreen:
        print("full_screen")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeFullScreen": False}})
        pyautogui.press(['F'])
    if youtubePlay:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubePlay": False}})
        pyautogui.press(['K'])
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
    if focusClick:
        print('focus')
        collection.update_one({"base":"kinomaniak"}, {"$set": {"focusClick": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press('F6')
        pyautogui.keyUp('ctrl')
    if computerDisable:
        collection.update_one({"base":"kinomaniak"}, {"$set": {"computerDisable": False}})
        os.system('shutdown -s')
