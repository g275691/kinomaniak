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
    print(count)
    if fullScreen:
        print("full_screen")
        collection.update_one({"base":"kinomaniak"}, {"$set": {"youtubeFullScreen": False}})
        pyautogui.doubleClick(600, 257)
