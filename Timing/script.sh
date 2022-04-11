#!/bin/bash
tempf1=/tmp/tempfile.txt;
tempf2=/tmp/tempfile2.txt;
tempf3=/tmp/tempfile3.txt;

outfile=~/Stats/out.csv
infile=~/Stats/in.txt;
script=~/Stats/script.py;
rm $tempf1;
rm $tempf2;
rm $tempf3;

touch $tempf1;
touch $tempf2;
touch $tempf3;

touch $outfile
chmod g=rwx,o=rwx,u=rwx $tempf1;
chmod g=rwx,o=rwx,u=rwx $tempf2;
chmod g=rwx,o=rwx,u=rwx $tempf3;
chmod g=rwx,o=rwx,u=rwx $outfile;
cat $infile > $tempf2; ##replace $infile with tsc
cat $outfile > $tempf3;
date >> $outfile;
truncate -s-1 $outfile;
echo -n "," >> $outfile;
python3 $script $tempf2 $tempf1 $tempf3;
cat $tempf1 >> $outfile;
echo "" >> $outfile