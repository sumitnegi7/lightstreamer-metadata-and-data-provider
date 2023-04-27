# Digitok Backend APIs

This project is based on a GitLab [Project Template](https://docs.gitlab.com/ee/gitlab-basics/create-project.html).

Improvements can be proposed in the [original project](https://gitlab.com/gitlab-org/project-templates/express).

## notes for quiz

- for every question and answer create token with expiry
- on play now: send token with quiz, player_id, total_play_time + 1 minute
- application quiz: 1 minute before quiz starts and token expiry after each time
- we need to push quiz response to SQS and redis and then lamda triggers

### how redis key will be used

- event sequence diagram using plant UML - user -> api -> commit

### redis commands

- `CONFIG GET databases` - list all databases on redis-cli
- `INFO` - show info of redis
- `keys *` - show all keys
- `get user:1` - key values for a specific key
- `redis-cli KEYS *leaderboard* | xargs redis-cli DEL` - delete keys with a prefix
- `ZADD setname score player_id`
- `ZINCRBY setname increment_value player_id`
- `ZRANGE lb:daily:7 0 9 WITHSCORES` - 0 and 9 are range here top 10 with scores
- `ZREVRANGE lb:daily:7 0 9 WITHSCORES` - reverse range
- `ZRANK lb:daily:7 player_id`
- `ZREVRANK lb:daily:7 player_id` - player rank
- `ZSCORE lb:daily:7 "prashant"` - player score

### leaderboard types

APPOINTMENT

- [ ] Students
  - [ ] All India
    - [ ] Daily - LB:ST:IN:TODAY:GAMEID
    - [ ] Weekly - LB:ST:IN:WEEK:GAMEID
    - [ ] All Time - LB:ST:IN:ONGOING:GAMEID
  - [ ] My School
    - [ ] Daily - LB:ST:SCHOOLCODE:TODAY:GAMEID
    - [ ] Weekly - LB:ST:SCHOOLCODE:WEEK:GAMEID
    - [ ] All Time- LB:ST:SCHOOLCODE:ONGOING:GAMEID
  - [ ] My Zone
    - [ ] Daily - LB:ST:ZONECODE:TODAY:GAMEID
    - [ ] Weekly - LB:ST:ZONECODE:WEEK:GAMEID
    - [ ] All Time - LB:ST:ZONECODE:ONGOING:GAMEID
- [ ] Open
  - [ ] Daily - LB:OP:TODAY:GAMEID
  - [ ] Weekly - LB:OP:WEEK:GAMEID
  - [ ] All Time - LB:OP:ONGOING:GAMEID
- [ ] Combined
  - [ ] Daily - LB:CB:TODAY:GAMEID
  - [ ] Weekly- LB:CB:WEEK:GAMEID
  - [ ] All Time- LB:CB:ONGOING:GAMEID

In Non-Appoinment, replace GAMEID with GAMEID:QUIZID

### git hints

hint: Pulling without specifying how to reconcile divergent branches is
hint: discouraged. You can squelch this message by running one of the following
hint: commands sometime before your next pull:
hint:
hint:   `git config pull.rebase false`  # merge (the default strategy)
hint:   `git config pull.rebase true`   # rebase
hint:   `git config pull.ff only`       # fast-forward only
hint:
hint: You can replace "git config" with "git config --global" to set a default
hint: preference for all repositories. You can also pass --rebase, --no-rebase,
hint: or --ff-only on the command line to override the configured default per
hint: invocation.
