vals = [1, 2, 3, 4, 5, 6, 100]

ex = 0

for i in range(0, len(vals)):
    ex += (float(vals[i]) / len(vals))

print(ex)

ex = 0

for x in range(0,max(vals)):
    btCt = 0
    for i in range(0, len(vals)):
        if vals[i] > x:
            btCt += 1
    ex += float(btCt) / len(vals)

print (ex)