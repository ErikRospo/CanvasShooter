#!/bin/bash
tempf1=/tmp/tempfile.txt;
tempf2=/tmp/tempfile2.txt;
tempf3=/tmp/tempfile3.txt;

outfile=~/Stats/out.csv
infile=~/Stats/in.txt;
script=~/Stats/script.py;
if test -e $tempf1; then
    rm $tempf1;
fi
if test -e $tempf2; then
    rm $tempf2;
fi
if test -e $tempf3; then
    rm $tempf3;
fi
touch $tempf1;
touch $tempf2;
touch $tempf3;

touch $outfile
chmod g=rw,o=rw,u=rw $tempf1;
chmod g=rw,o=rw,u=rw $tempf2;
chmod g=rw,o=rw,u=rw $tempf3;
chmod g=rw,o=rw,u=rw $outfile;

cat $infile > $tempf2; ##replace $infile with tsc
cat $outfile > $tempf3;
date >> $outfile;
truncate -s-1 $outfile;
echo -n "," >> $outfile
python3 $script $tempf2 $tempf1 $tempf3;
# python3 $script $tempf2 $tempf1 $tempf3; 
cat $tempf1 >> $outfile;
echo "" >> $outfile