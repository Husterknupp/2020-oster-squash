#!/bin/sh

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
echo "I'm in directory $(pwd)"

echo "git pull"
git pull --rebase

echo "trying to kill old instance ($(cat ./running-instance))"
# `:` is noop (if killing didn't work, we assume that there was no process running in the first place which is good)
echo ./running-instance | awk '{print $2}' | xargs kill -9 || :

##########################
#     START DJANGO       #
##########################

python3 manage.py migrate
COMMAND="python3 manage.py runserver 0.0.0.0:8000"
# `< /dev/null` - read input from /dev/null (whenever the COMMAND needs input it immediately skips the input)
# `> start-script.log` - write output to start-script.log (standard output)
# `2>> error.log` - append output 2 (error) to error.log (`2>&1` would mean, write 2 where also 1 goes)
# `&` - & at the end returns immediately
nohup $COMMAND </dev/null >>event.log 2>>error.log &
# >> "[2] 17622"

# write pid from background process into file
echo $! >running-instance
