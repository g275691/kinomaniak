from pymongo import MongoClient
import time, json
import pyautogui
client = MongoClient('mongodb://localhost:27017/')

db = client['kinomaniak']
collection = db['commands']

count = 0
while count > -1:
    count = count + 1
    time.sleep(0.3)
    findbase = collection.find_one({"base":"kinomaniak"})
    fullScreen = findbase['youtubeFullScreen']
    browserZoomPlus = findbase["browserZoomPlus"]
    browserZoomMinus = findbase["browserZoomMinus"]
    browserTabLeft = findbase["browserTabLeft"]
    browserTabRight = findbase["browserTabRight"]
    print(count)
    if fullScreen:
        print("full_screen")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeFullScreen": False}})
        pyautogui.doubleClick(600, 257)
    if browserZoomPlus:
        print("zoom+")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserZoomPlus": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press(['+'])
        pyautogui.keyDown('ctrl')
    if browserZoomMinus:
        print("zoom-")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"browserZoomMinus": False}})
        with pyautogui.hold('ctrl'):
            pyautogui.press(['-'])
        pyautogui.keyDown('ctrl')
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