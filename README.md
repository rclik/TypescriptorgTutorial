# Typescript Tutorials

The purpose of this project is implementing tutorials in handbook in the site [typescriptorg](https://www.typescriptlang.org/docs/handbook/intro.html).

## Development Environment

For development it is required to install **Node.js**.

After installing it, now create a **node project**:
> npm init

This command will create a node project where the command is called. After calling this command, it will ask values for some properties. You can give different values for these properties or remain them as default.

If you want to create a project with defaults, use that command;
> npm init -y

## Installing Typescript for the project

There is a package inside Node Package Manager (npm) that transpile **ts** files to **js** files. In order to add this package only for this project, run this command;

> npm install typescript --save-dev

This command will download **typescript** dependency and add it to the *package.json* file as development dependency.

You can also add this dependency by adding it to the package.json file.

``` json
...
  "devDependencies": {
    "typescript": "^4.0.3"
  }
...
  
```

After adding this lines, then run this command to install project again;
> npm install

Now, development environement is ready for typescript tutorials.

> Note: You can add typescript dependency as global then you can access **tsc** command any directory. Otherwise, like here, you should go to the tsc command line executor first, then use the command. Or you should use task runner (like Grunt, Gulp) or build tool(like Webpack).

## Running the code

Typescript files need to be transpiled to the js file. In order to do so, first thing is that transpiling the ts files to js fiels. This is what actually typescript development dependency does.

This operations can be done with many ways;

### File based

To transpile ts file to js file, you can use this command;

> node_modules/typescript/bin/tsc <ts_file_name>.ts <js_file_name>.js

After generating the js file, then it can be rum by node command.

> node <js_file_name>.js

Then it is done.

### Project based

Another way to transpile **ts** file to **js** file is using ** file.

To create tsconfig file, run this command;

> tsc --init

This command creates a tsconfig file with all basic properties. You can edit them according to your needs.

You can update some properties like **out**. It is used for path where generated resources will be placed.

``` json
...
 "outDir": "./out",
...
```

After adding this file, run the command where tsconfig.json file is placed;

> tsc

After all ts files will be transpiled to js files under given output directory. Js files are generated for each ts file.
