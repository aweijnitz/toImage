#!/usr/bin/env bash
rm workDir/*
node toImage.js -l -w 320 -h 200 -o workDir/320x200.png test/testdata/320x200px_xE_0000.bin test/testdata/320x200px_xE_0000.bin test/testdata/320x200px_LE_ff03.bin
