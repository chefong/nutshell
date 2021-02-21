import json
import textstat
import readtime

def readingLevel(strs):
    levels = []
    for s in strs:
        levels.append(textstat.automated_readability_index(s))

    return levels

def readTime(s):
    return readtime.of_text(s).seconds

# given a list of intervals and setences in the format:
# (sentence, interval_start, interval_end) - in seconds
# sorted by interval_start, with no overlapping intervals
# not continuous
# return a list of numerical values:
#  where each value arr[i] represents the reading level of the i+1th minute.

# 0 (0-60)
# 1 (61-119)
def levelForMin(l):
    readingIth = []
    s = ''

    i = 1
    for item in l:
        if item[1] <= (i * 60):
            s += item[0] + ' '
        else: # item[1] > i * 60
            readingIth.append(textstat.automated_readability_index(s))
            i += 1
            s = ''
            
    readingIth.append(textstat.automated_readability_index(s))

    return readingIth, list(range(len(readingIth)))

# data = '''[["This is the lock-picking lawyer.", 0.7, 2.2], ["And today we're going to talk about lockout keys and how to defeat them first.", 2.2, 7.0], ["What is a lockout key?", 7.0, 8.4], ["Well, it's a specially cut key designed for rendering locks temporarily inoperable and preventing entry by a keyholder.", 8.7, 15.8], ["I've also heard these called Motel keys with the idea.", 16.1, 19.2], ["They can be used to keep Motel employees like the made out of your room while you're away.", 19.2, 24.0], ["Now as you can see these keys are cut into two pieces and when you push them together, they form one.", 24.6, 29.9], ["Key blank one part known as the Barb will be lodged in the keyway preventing insertion of the correct key.", 30.1, 37.5], ["Let's see that in action.", 37.9, 39.2], ["When I insert the Barb the pins will drop down behind that hook preventing its removal.", 42.9, 48.2], ["Now that it's lodged in place to remove it.", 49.6, 52.0], ["I take the second half of the lockout key, which has a ramp on the front that will push the blocking pins out of the way.", 52.0, 59.0], ["Now if you understand what I just explained you may be wondering if there's anything special about this half of the key or whether anything that can lift.", 60.9, 68.6], ["The pins can remove the Barb and the answer is no there's Nothing special about it.", 68.6, 73.7], ["Something like a lockpick could be ideal for removing these but a simple paper clip would work as well.", 73.7, 79.6], ["So let's put this back and try both of those.", 79.9, 83.0], ["I'm going to take this lock pick and lift the pins while pulling out on the lockout K.", 85.4, 92.0], ["And as you can see we remove that very quickly.", 92.3, 95.3], ["Let's try a paper clip as well.", 95.7, 97.8], ["The paper-clipped worked very well also.", 108.8, 111.4], ["Okay folks.", 112.3, 113.1], ["Obviously.", 112.3, 113.9], ["This is a pretty rudimentary security device and with a little knowledge or Preparation.", 113.9, 119.3], ["They shouldn't take more than a few seconds to defeat in any case.", 119.4, 123.5], ["That's all I have for you today.", 123.6, 125.0], ["If you do have any questions or comments about this, please put them below if you like this video and would like to see more like it, please.", 125.0, 131.5], ["Subscribe, and as always have a nice day.", 131.7, 134.8], ["Thank you.", 135.2, 135.7]]'''
# parsed = json.loads(data)
# print(levelForMin(parsed))
