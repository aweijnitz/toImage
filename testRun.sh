#!/usr/bin/env bash
rm workDir/*
node toImage.js -w 320 -h 200 -o workDir/320x200.png test/testdata/320x200px_BE_03ff.bin test/testdata/320x200px_BE_03ff.bin test/testdata/320x200px_BE_0022.bin
