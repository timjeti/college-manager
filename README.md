
# College Management Portal

This repository contains work that is responsible for managing day to day activities of a college, it uses **Angular JS** as Frontend Technology and **Node JS** for API based Queries.
The installation apis are specified below.

Installation steps:

## Express js

**Express js Installation**

```bash
$ mkdir core
$ cd core
npm init
```
**Instruction**
Update the entrypoint to app.js in package.json

**Install the following dependencies for backend**

```
npm install express
npm install mysql
npm install -g nodemon
```


- **Express port** : 3000

**Install the following dependencies for Frontend**

```bash
cd colege-manager
npm install -g @angular/cli
content_copy
ng new college-manager

##Installing angular material
npm install @angular/material @angular/cdk @angular/animations --save  
ng add @angular/material  

##Installing bootstrap
ng add @ng-bootstrap/ng-bootstrap

##For image upload, install this inside core folder for express js
sudo npm install -g multer

##Install Pdf viewer to view pdf files
npm i ng2-pdf-viewer

```
- **Angular port** : 4200
