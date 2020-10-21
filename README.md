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

Another way to transpile **ts** file to **js** file is using **tsconfig.json** file.

To create tsconfig.json file, run this command;

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

After all ts files will be transpiled to js files under given output directory. Js files are generated for each ts file. And also there is different properties to configure transpilation process.

After file transpilation, use this command to run the code;

> node <transpiled_file_name>.js

---

## Interfaces

Bu bolumde, Typescript de interface lerin nasil kullanilacagi uzerinde duracagiz.

Burada interface ler ile object lerin type larini belirlemek icin kullaniliyor. Bu sekilde bir variable in tipi bir interface ise o interface in tum property lerini icermesi gereklidir. Bu sekilde static typed bir variable olusturulmus olur.

Ornegin;

``` javascript
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}
```

Buradaki method, disaridan bir parametre aliyor. Bu parametrenin tipi yok ama icine string tipinde ismi label olan bir property olmak zorunda. Typescript bize bir type ismi olmadan da static typed variable yetenegini kazandiriyor. Bu methodu su sekilde cagirabiliriz;

```javascript
let myObj = {label: 'myLabel', size: 10};
printLabel(myObj);
```

Bu sekilde method call edilebilir, cunku icine gonderdigimiz variable, label property sine sahip. Fazlasi olsa sorun teskil etmez. Bir sub-class i gibi dusunebiliriz. TS deki object oriented mantigi property ler uzerinden ilerledigini hatirlamak lazim.

Simdi ayni method a bir interface olusturup o interfafe tipindeki bir variable gonderecek olursak;

```javascript
interface LabeledValue {
    label: string;
}

let myObj : LabeledValue = { label: 'redLabel'};
printLabel(myObj);
```

Yine sorun olmayacak cunku, gonderilen parametre istenilen property e sahip.

Tam tersini deneyecek olursak, yani bir variable bir interface tipinde olsa, ama variable a o interface de olmayan bir property eklesek ne olur?

```javascript
let anotherLabelObj : LabeledValue = {label:'new label', size:10};
```

Bu kod hata vericektir. Cunku bir variable in tipi (LabeledValue) verilmisse tamamen ona uygun property leri olmalidir. Burada size property si LabeledValue interface inde bulunmuyor.

Simdi ise method parametresi LabeledValue interface type inda olsun;

``` javascript
function printLabel(labeledObj: LabeledValue) {
  console.log(labeledObj.label);
}

let myObj : LabeledValue = { label: 'redLabel'};
printLabel(myObj);
```

Bu calisacak. Ama gonderilen variable in tipi  olmasa ne olur;

```javascript
let myObj = { label: "my label", size: 10 };
printLabel(myObj); // this will work
```

Bu da calisiyor, hatta fazladan bir property de olsa.

Bir de yeni bir interface olusturalim, ama bu interface label property si ve baska bir property icersin;

```javascript
interface SizedLabeledValue{
    label: string;
    size: number;
}

let sizedLabel: SizedLabeledValue = {size: 10, label: 'sized labeled value'};
printLabel(sizedLabel);
```
Bu testte de sorun yok. Ne compile time da ne de run time da.
Bu durumdan sunlari cikartabiliriz;

- Interface ler type lar icin kullanilabilir.
- Eger bir variable in tipi belirlenmisse, o variable sadece o property lere sahip olmalidir. (bunu ts varible olarak adlandiralim, eger bir variable in tipi yoksa js variable olarak adlandiralim.)
- Eger bir variable in tipi verilmemisse, o varible icerdigi property lere gore herbir interface tipindeki variable olarak kullanilabilir. Yani js variable i ts variable i yerine kullanilabilir ancak ve ancak js variable kullanilacagi ts variable in tum property leri icermelidir (fazla property si olsa da sorun cikarmaz).
- Bir interface diger bir interface yerine kullanilabilir. Onemli olan o interface in yerine kullanilacagi interface in tum property lerine sahip olmasi gerekitigidir. Daha fazla property si olsa da sorun olmaz. Ayrica, bu interface in diger interface i extends etmesine de gerek yoktur. Ama daha okunakli kod yazilmasi icin implement etmek daha iyidir.

Interface lerin birbirlerini extends etmesi durumu, cok gerekli olmamakla birlikte, daha anlasilir code, ve daha az code yazmak icin gereklidir.

``` javascript
interface SizedLabeledValue extends LabeledValue {
    size: number;
}

let sizedLabel: SizedLabeledValue = {size: 10, label: 'sized labeled value'};
printLabel(sizedLabel);
```
Js variable lar, ts variable lar yerine ayni sekilde ts variable lar da js varible yerine kullanilabilirler (kurallari yukarida yazdik.) Cunku run time da hepsi js variable olacaklardir.
