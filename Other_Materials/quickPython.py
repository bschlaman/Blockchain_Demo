# This function calculates the expected value of
# the number of draws before a collision given n possible values
def expect(n):
    total = 0
    for x in range(1, n+1):
        probXgteN = 1
        for y in range(0, x):
            probXgteN *= (float(n-y)/n)
        total += probXgteN
    print(total)

#expect(5)
# Birthday Problem
#expect(365)
#expect(3)

####################################3
import math

reward = 200
tot = 0
def dep(r):
    return math.floor(r * 0.9)
print('Ver : reward')
for x in range(0, 50):
    print(str(x) + ' : ' + str(reward))
    tot += reward
    reward = dep(reward)
print(tot)
