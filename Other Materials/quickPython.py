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

expect(5)
# Birthday Problem
expect(365)
expect(3)
