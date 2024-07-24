# my-hi-app

## Project setup

```sh
npm install
```

### Compiles and hot-reloads for development

```sh
npm run start
```

### Compiles and minifies for production

```sh
npm run build:test  # 测试环境
npm run build:pre   # 预上线环境
npm run build:pro   # 线上环境
```

Now built-in multi-environment build and deploy. 

if you have other envs, such as `offline` 、`beta`(multiple test environments) and so on, 
you can add it referring to the current way of writing it.

### Publish

```sh
# Before, need to checkout into the branch corresponding to the environment
# Note that the pro must be the **master** branch
git push
bash ./tag.sh [$DEPLOY_ENV-] # test- pre- pro-
```

### Visualize size of webpack output files with an interactive zoomable treemap
