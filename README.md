# File Distribute Platform

## Frontend
1. `$ npm install -g cnpm --registry=https://registry.npm.taobao.org` china mirror
2. `$ cnpm run dev` frontend devolop
3. `$ cnpm run dev:no-mock` devolop with backend
4. `$ cnpm run build` build frontend

## Backend
1. copy the output files('FileDistributorWeb/dist/') of frontend to 'FileDistributorService/src/main/resources/static/'
2. gradle build

## Todo
1. add a status for each host after distribute
2. add 'retry' button for failed host after distribute
