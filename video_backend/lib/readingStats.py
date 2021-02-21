import textstat
import readtime

def readingLevel(strs):
    levels = []
    for s in strs:
        levels.append(textstat.automated_readability_index(s))

    return levels

def readTime(s):
    return readtime.of_text(s)

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

    for item in l:
        i = 1
        if item[1] <= i * 60:
            print('hi')
            s += item[0]
        elif item[1] > i * 60:
            i += 1
            readingIth.append(readingLevel([s]))
            s = ''
            
    print(readingLevel([s]))
    readingIth.append(readingLevel([s]))

    return readingIth

print(levelForMin([('pie is fun.', 0, 61), ('so is cake.', 61, 65)]))
