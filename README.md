# File Distribute Platform

## Frontend

1. `$ yarn install` install dependencies
2. `$ yarn dev` frontend devolop
3. `$ yarn dev:no-mock` devolop with backend
4. `$ yarn build` build frontend

## Backend

1. copy the output files('FileDistributorWeb/dist/') of frontend to 'FileDistributorService/src/main/resources/static/'
2. gradle build

## Todo

- [x] add a status for each host after distribute
- [x] add 'retry' feature after distribute exception
- [x] add 'FileManage' module
