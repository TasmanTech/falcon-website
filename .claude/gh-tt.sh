#!/bin/sh
# Run gh as the TasmanTech account (gh's own login is HusseinAljanaby, which can't access this repo)
export GH_TOKEN=$(printf 'protocol=https\nhost=github.com\nusername=TasmanTech\n\n' | git credential fill | sed -n 's/^password=//p')
exec gh "$@"
