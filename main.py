import numpy as np
import threading
import math
import os

lines = ""
dataY = ["0"]
dataX = ["0"]

def checkLine(string):
    if(string.find("time=") != -1):
        return True
    else:
        return False

def addDummyNumberToArray():
    dataX.append(0)
    dataY.append(dataY[len(dataY)-1])

def addNumberToArray(string):
    dataX.append(0)
    time_spot = string.find("time=") + 5
    string = string[time_spot:]
    ms_spot = string.find("ms")
    string = string[:ms_spot]
    number = math.floor(float(string))
    dataY.append(number)

def getData():
  threading.Timer(1, getData).start()
  with open('google.txt', 'rb') as f:
    try:
        f.seek(-2, os.SEEK_END)
        while f.read(1) != b'\n':
            f.seek(-2, os.SEEK_CUR)
    except OSError:
        f.seek(0)
    last_line = f.readline().decode()
    if(checkLine(last_line) == True):
        addNumberToArray(last_line)
    else:
        addDummyNumberToArray()

def printData():
  threading.Timer(1.1, printData).start()
  print("dataX: " + str(dataX))
  print("dataY: " + str(dataY))
  

getData()
printData()