import matplotlib.pyplot as plt
import matplotlib.animation as animation
from matplotlib import style
import threading
import math
import os

style.use("dark_background")

fig = plt.figure()
ax1 = fig.add_subplot(1,1,1)
frame1 = plt.gca()
frame1.axes.get_xaxis().set_visible(False)
plt.box(False)

lines = ""
dataY = [50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50, 50]
dataX = [30, 29, 28, 27, 26, 25, 24, 23, 22, 21, 20, 19, 18, 17, 16, 15, 14, 13, 12, 11, 10, 9, 8, 7, 6, 5, 4, 3, 2, 1]

def checkLine(string):
    if(string.find("time=") != -1):
        return True
    else:
        return False

def addDummyNumberToArray():
    num = dataY[len(dataY)-1]
    dataY.pop(len(dataY)-1)
    dataY.insert(0, num)
    with open('ping.txt', 'w') as f:
        for item in dataY:
            f.write(str(item) + "\n")

def addNumberToArray(string):
    time_spot = string.find("time=") + 5
    string = string[time_spot:]
    ms_spot = string.find("ms")
    string = string[:ms_spot]
    num = float(string)
    dataY.pop(len(dataY)-1)
    dataY.insert(0, num)
    with open('ping.txt', 'w') as f:
        for item in dataY:
            f.write(str(item) + "\n")

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

def update(i):
    ax1.axis('auto')
    ax1.invert_xaxis()
    ax1.clear()
    ax1.plot(dataX,dataY)

ani = animation.FuncAnimation(fig, update, interval=500)


getData()
plt.show()