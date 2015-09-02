from collections import Counter
import csv

flight_counts = Counter()
with open('flights.csv', 'rU') as infile:
    csvreader = csv.reader(infile)
    csvreader.next()
    for row in csvreader:
        orig_dest = (row[0], row[1])
        flight_counts.update(orig_dest)

with open('flight_counts.csv', 'w') as outfile:
    csvwriter = csv.writer(outfile)
    csvwriter.writerow(["code", "count"])
    for code, count in flight_counts.items():
        csvwriter.writerow([code, count])