import csv
import math

# Even probability
vals = [0, 1, 2, 3, 4, 5, 6]

# Method 1
def expected_val(arr, var):
    arr.append(var)
    ex = 0
    for i in range(0, len(arr)):
        ex += (float(arr[i]) / len(arr))
    return ex

# Method 2
def expected_val2(arr, var):
    arr.append(var)
    ex = 0
    for x in range(1, max(arr)+10):
        gtCt = 0
        for i in range(0, len(arr)):
            if arr[i] >= x:
                gtCt += 1
        ex += float(gtCt) / len(arr)
    return ex

##with open('exp_val.csv', mode='w', newline='') as exp_val:
##    csv_writer = csv.writer(exp_val, delimiter=',')
##
##    csv_writer.writerow(['Variable Dice Face', 'Expected Value'])
##
##    for i in range(8, 1000):
##        csv_writer.writerow([i, expected_val(list(vals), i)])


##for i in range(0, 100):
##    print([i, expected_val(list(vals), i)])
    
##print(expected_val(list(vals), 10))
##print(expected_val2(list(vals), 10))

# Some e stuff now

def exp(x, terms):
    s = 0
    for i in range(0, terms):
        s += math.pow(x, i) / math.factorial(i)
    return s

num = 4
##print(math.exp(num))
##print(exp(num, 1))
##for x in range(1, 100):
##    print([math.exp(num), exp(num, x)])

nums = [2, 1, 0.5, 0.3, 0.1, .001]

##for x in nums:
##    x = x * -1
##    print([x, math.exp(x), exp(x, 2)])

########### Probabilities

def distinct(k, n):
    prob = 1
    for j in range(0, k):
        prob *= (1-(j/n))
    return prob
def coll(k, n):
    return 1 - distinct(k, n)

s = 0
for x in range(0, 101):
    s += x
print(s)

def e_distinct(k, n, approx = False):
    return math.exp(-1 * k * ((k-1), k)[approx] / (2 * n))

def get_diff():
    picks = 1000
    choices = 36500
    totaldiff = 0
##    for x in range(2, 10000):
##        totaldiff += abs(e_distinct(x, choices) - distinct(x, choices))
##    print(totaldiff)
    print([distinct(picks, choices), e_distinct(picks, choices)])
    print(e_distinct(picks, choices) - distinct(picks, choices))
    print([distinct(picks, choices), e_distinct(picks, choices, True)])
    print(e_distinct(picks, choices, True) - distinct(picks, choices))

get_diff()

