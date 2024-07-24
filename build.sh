#!/bin/bash
pwd

if [ ! -d node_modules ];then
    mkdir node_modules
    npm install --no-optional
fi

# You can do anything to publish for your project here according to
# `$1` (the tag prefix), And now Using it as `PROFILE_ACTIVE`.
# `$2` (custom node env), Configuring CI Variables: CI_NODE_ENV.
export ${2//,/ } && npm run build:$1

errorCode=$?
if [ "$errorCode" != 0 ]
then
  echo "ERROR: npm 打包构建失败"
  exit 1;
else
  echo "SUCCESS: npm 打包构建成功"
fi
