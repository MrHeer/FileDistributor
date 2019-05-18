# File Distribute Platform

## Frontend
1. `$ npm install -g cnpm --registry=https://registry.npm.taobao.org` china mirror
2. `$ cnpm install` install dependencies
3. `$ cnpm run dev` frontend devolop
4. `$ cnpm run dev:no-mock` devolop with backend
5. `$ cnpm run build` build frontend

## Backend
1. copy the output files('FileDistributorWeb/dist/') of frontend to 'FileDistributorService/src/main/resources/static/'
2. gradle build

## Todo
- [x] add a status for each host after distribute
- [x] add 'retry' feature after distribute exception
- [x] add 'FileManage' module
