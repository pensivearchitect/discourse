#!/bin/bash
rsync -z -a -P --exclude=".git" --exclude="*.log" --exclude="tmp" /Users/joshua/code/discourse/forum/ discourse@dgsforum.com:/home/discourse
