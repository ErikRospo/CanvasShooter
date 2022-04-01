from posixpath import abspath
from re import compile
from sys import argv
from os.path import abspath
infile = open(abspath(argv[1]), "tr")
outfile = open(abspath(argv[2]), "tw")
currentFileW = open(abspath(argv[3]), "tw")
currentfileR = open(abspath(argv[3]), "tr")
lines = infile.readlines()
fixedLines = []
clearedLines = []
p = compile("[A-Za-z/\\ ]*:\\s*(\\d{1,2}\\.\\d{1,2})s")
p2 = compile(
    "(((I\/O (read|write))|(Parse|Bind|Check|Emit|Total) time):\s+\d{1,2}\.\d{1,2}s)")
for line in lines:
    if p2.match(line):
        clearedLines.append(p2.match(line)[0])
for line in clearedLines:
    fixedLines.append(p.sub('\\1,', line.rstrip()))
for line in fixedLines:
    outfile.write(line)
infile.close()
outfile.close()
