#!/usr/bin/env bash
rm workDir/*
node toImage8bit.js -n -h -w 320 -h 200 -o workDir/320x200_8bit.png test/testdata/320x200px_BE_03ff.bin

