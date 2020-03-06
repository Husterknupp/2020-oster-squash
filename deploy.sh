#!/bin/sh

# RUN THIS ON-SITE

# OPTIONS
# daemon on uber-space polling GitHub for changes
# script lying on the machine, manual actions that trigger that script from the outside
# manual action from my machine
# manual action on GitHub (could later be run automized after successful test pipeline)

# AGENT
# 0. ~~log every failure~~ (not yet, will execute script manually for the beginning)
# 1. connect to machine
# 2. quit running python/django process
# 2. transfer python code (git pull)
# 3. migrate django model
# 4. start python/django process (nohup)

# CLIENT
# 5. smoke test (should do client)

cd /home/hstrknpp/code/2020-oster-squash/ || exit
echo "[UPDATE] I'm in directory $(pwd)"
echo "[UPDATE]"

echo "[UPDATE] git pull"
git pull --rebase
echo "[UPDATE] "

echo "[UPDATE] trying to kill old instances"
# `:` is noop (if killing didn't work, we assume that there was no process running in the first place which is good)
ps aux | grep manage.py | grep -v grep | awk '{print $2}' | xargs kill -9 || :
echo "[UPDATE] "

##########################
#     START DJANGO       #
##########################

echo "[UPDATE] starting django"
python3 manage.py migrate
COMMAND="python3 manage.py runserver 0.0.0.0:8000"
# `< /dev/null` - read input from /dev/null (whenever the COMMAND needs input it immediately skips the input)
# `> start-script.log` - write output to start-script.log (standard output)
# `2>> error.log` - append output 2 (error) to error.log (`2>&1` would mean, write 2 where also 1 goes)
# `&` - & at the end returns immediately
nohup $COMMAND </dev/null >>~/logs/2020-oster-squash-event.log 2>&1 &
# >> "[2] 17622"
exit_code=$?
echo "[UPDATE] trying to start django exited with code $exit_code"

echo "[UPDATE] end"
