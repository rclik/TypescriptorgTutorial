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

After generating the js file, then it can be run by node command.

> node <js_file_name>.js

Then it is done.

### Project based

Another way to transpile **ts** file to **js** file is using **tsconfig.json** file.

To create tsconfig.json file, run this command;

> tsc --init

This command creates a tsconfig file with all basic properties. You can edit them according to your needs.

You can update some properties like **outDir**. It is used for path where generated resources will be placed.

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

Interface ler ile object lerin type larini belirlemek icin kullaniliyor. Bu sekilde bir variable in tipi bir interface ise o interface in tum property lerini icermesi gereklidir. Bu sekilde static typed bir variable olusturulmus olur.

Ornegin;

``` javascript
function printLabel(labeledObj: { label: string }) {
  console.log(labeledObj.label);
}
```

Buradaki method, disaridan bir parametre aliyor. Bu parametrenin tipi yok ama icine string tipinde ismi label olan bir property olmak zorunda. Nu sekilde Typescript bize bir type ismi olmadan da static typed variable yetenegini kazandiriyor. 

Bu methodu su sekilde cagirabiliriz;

```javascript
let myObj = {label: 'myLabel', size: 10};
printLabel(myObj);
```

Burada bir sorun var gibi duruyor degil mi? Mehotu daha farkli parametrelere sahip bir object ile call ediyoruz. Ama bu TypeScript icin bir sorun teskil etmez. Cunku, bir object eger bir property ye sahipse ve ayni zamanda baska bir property ye de sahipse, bunu super class gibi dusunebiliriz.

Bu durumda, TypeScript in yukarida bahsettigimiz calisma mantigini goze alirsak, bu method call islemi sorunsuz calismalidir. Cunku icine gonderdigimiz variable, label property sine sahip. Fazlasi olsa sorun teskil etmez. Bir sub-class i gibi dusunebiliriz. TS deki object oriented mantigi property ler uzerinden ilerledigini hatirlamak lazim.

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

- Interface ler object lerin type larini belirlemek icin kullanilabilir.
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

---

## Functions

TypeScript javascript deki **anonymus** ve **named** function i tiplerini destekler.

Bu ikisine ornek olarak;

```javascript
// Named function
function sum( x, y) {
  return x + y;
}

// anonymus function
let sum = function ( x, y) {
  return x + y;
}
```

Sonra bu ikisini ayni sekilde call edebiliriz;

```javascript
let result = sum (1,2);
```

### Capture Variables

Javascript de, function disindaki bir variable a function icinde ulasilabilir. Buna **capture variable** denir. Ornegin;

```javascript
let z  = 100;

// Named function
function sum( x, y) {
  return x + y + z;
}
```

Bu function x ve y variable larina z variable ini ekleyerek calisacaktir. Bu calisma mantigini unutmamak gerekir. Cunku dezavantajlari da vardir.

### Function Types

#### Typing the function

Daha onceden gordumuz function lari type larini vererek yapalim;

```typescript
function add(x: number, y: number): number {
  return x + y;
}

let myAdd = function (x: number, y: number): number {
  return x + y;
};
```

Aslinda yaptigimiz, function in return type i, parametre type ini Javascript in primitive type larini kullanarak vermektir.

Bu kadar kolaydir, ama bunun amaci, static typed bir function yazmak ve avantaji ise, compile time da bu function i bu syntax a gore cagirilmasini saglamaktir.

#### Writing the function type

Simdi bir function in type ini vererek o function i yazalim;

```typescript
let myAdd: (x : number, y: number) => number;
```

Bu bizim function imizin definition i olabilir. Bu type definition i kullanarak, toplama islemi function i yazilabilir. Ornegin bunu su sekilde kullanabiliriz;

```typescript
let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
    return x + y;
};
```

Bu sekilde tanimlama yapabiliriz ama x parametresini string  olarak kullanamayiz, buna compile zamanda hata verecektir.

```typescript
let myAdd: (x: number, y: number) => number = function (x: string, y: number): number {
    return x + y;
};
```

Cunku function definition ina uymuyor.

Ama bu function definition icin kod yazmamiza gerek yok. Direk olarak de function i yazabiliriz.

```typescript
let myAdd = function (x: number, y: number): number {
    return x + y;
};
```

>Not: Function in return type inin belirtilmesine gerek yoktur. Cunku return type infere edilebilir. Bu yuzden **tsc** compile ederken hata vermez. Eger return type inin da verilmesini istersen, kendin verebilirsin (expilicitly define). Ya da **tslint** gibi formatter larda rule olarak verebilirsin. Ama function parameter larinda ayni durum gecerli degildir. Onlarin type larini vermen gerekir. Yoksa **tsc** compile da yaparken hata alinir.

#### Default and Optional function parameters

Javascript deki optional ve default parameter mantiginin aynisidir. 

Typescript de bir function ne kadar parametre aliyorsa, function i o parametrelerle call etmemiz gerekir. Javascript de bu kisitlama yoktur.

Ornegin elimizde bir function var, icine 3 parameter aliyor. Bu function i, eger 2 parametre veya uc parametre ile call ederken Typescript de, hata aliriz. Ama Javascript de tum method parametreleri optional dir. Yani ayni senaryoda hata almayiz.

Typescript de function parametrelerini default olarak verebiliriz. Bu sekilde bir parametresi optional olan iki parametreli bir function, iki parametre ile de call edilebilir bir parametre ile de call edilebilir. Ornegin;

```typescript
function buildName(firstName: string, lastName?: string) {
  if (lastName) return firstName + " " + lastName;
  else return firstName;
}
let result1 = buildName("Bob"); // works correctly now
let result2 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
Expected 1-2 arguments, but got 3.
Expected 1-2 arguments, but got 3.
let result3 = buildName("Bob", "Adams"); // ah, just right
let result4 = buildName("Bob", null); // error since parameter can be string
```

>Not: Optional parameter, required parameter lardan sonra gelmelidir. Yoksa compile time error verirler.

Bir function a default parameter degeri de verebiliriz. Bu method call edilirken eger optional parameter verilmezse veya undefined olarak verilirse bu degeri alir.

```typescript
function buildName(firstName: string, lastName = "Smith") {
  return firstName + " " + lastName;
}
let result1 = buildName("Bob"); // works correctly now, returns "Bob Smith"
let result2 = buildName("Bob", undefined); // still works, also returns "Bob Smith"
let result3 = buildName("Bob", "Adams", "Sr."); // error, too many parameters
Expected 1-2 arguments, but got 3.
Expected 1-2 arguments, but got 3.
let result4 = buildName("Bob", "Adams"); // ah, just right Bob Adams
let result5 = buildName("Bob", null); // does not work since parameter can be string not null
```

>Default parameter lar, optinal parameter larin tersine, function in ilk parametresi olabilirler. Ayrica, eger function in son parametresi default parameter ise, optional gibi davranirlar. Sadece value gelmediginden default degerini alirlar.

#### Rest parameters

Javascript den gelen bir ozelliktir, ama Typescript te de kullanilabilir, tabii parameter in type ini belirttikten sonra.

Rest parameter, function in birden fazla alabilecegiz parametreleri array seklinde alabilmesidir. Ornegin bir method umuz olsun, birden fazla isim alsin. Ama bunu yapabilmek icin ya array tipinde bir parameter kullancagiz, ya da rest parameters i kullanicagiz.

```typescript
function buildName(firstName: string, ...restOfName: string[]) {
  return firstName + " " + restOfName.join(" ");
}

// employeeName will be "Joseph Samuel Lucas MacKinzie"
let employeeName = buildName("Joseph", "Samuel", "Lucas", "MacKinzie");
```

Rest parameter lar, eequired parameter lardan sonra alinmalidir ve tip leri ayni olmalidir, Tabi any type i kullanabiliriz ama duruma gore any parametresine izin verilmeyebilir.

#### this

Javascript de **this** keyword unun kullanimi her zaman karmasik olmustur. **this** keyword u bir function call edilirken, call edildigi context object idir. Bunun icin bazen hatalar alabiliriz. Bunun icin su ornegi gozden gecirelim;

```javascript
let deck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      return function () {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);
  
        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };
  
  let cardPicker = deck.createCardPicker();
  let pickedCard = cardPicker();
  
  alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

Burada cardPicker function ini bir object e atadiktan sonra call ederken bir sorun yasariz. Cunku assigned function i call ederken kullandirimiz context, 'window' object idir. Ve method icindeki **this**, 'window' object idir. O object icinde de suits olmadigindan hata alacagiz.

Bunu engellemek icin arrow function lari kullanabiliriz. Arrow function lar, function in assign edildigi zamandaki **this** object ini call edilirken **this** e atarlar. Sonunda bu sorundan kurtarmis oluruz.

Typescript de bu hatanin compile time da gosterilmesi icin bir config parametresi vardir. Bu parametreyi true edersek, arrow function disindaki function larda **this** object i kullanimi hatalarindan bizi haberdar eder;

```json
"noImplicitThis": true,
```

Direk olarak normal function yerine arrow function kullanirsak, bu hatadan kurtulmus oluruz.

```typescript
  let anotherDeck = {
    suits: ["hearts", "spades", "clubs", "diamonds"],
    cards: Array(52),
    createCardPicker: function () {
      return () => {
        let pickedCard = Math.floor(Math.random() * 52);
        let pickedSuit = Math.floor(pickedCard / 13);
  
        return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
      };
    },
  };
  
  let anotherCardPicker = deck.createCardPicker();
  let anotherPickedCard = cardPicker();
  
  alert("card: " + pickedCard.card + " of " + pickedCard.suit);
```

#### Overloads

Soyle bir function imiz olsun, any type inda bir parameter alsin ve bu parameter larin type larina gore farkli type larda object return etsin.

Bunu compiler a nasil soylebiliriz? Tabii parameter oldugu gibi any return type edilebilir ama sorumuz daha cok verilen parameter type larina gore hangi return type donecek onu vermek.

Bunu Typescript bize sunuyor;

```typescript
function pickCard(x: { suit: string; card: number }[]): number;
function pickCard(x: number): { suit: string; card: number };
function pickCard(x: any): any {
  // Check to see if we're working with an object/array
  // if so, they gave us the deck and we'll pick the card
  if (typeof x == "object") {
    let pickedCard = Math.floor(Math.random() * x.length);
    return pickedCard;
  }
  // Otherwise just let them pick the card
  else if (typeof x == "number") {
    let pickedSuit = Math.floor(x / 13);
    return { suit: suits[pickedSuit], card: x % 13 };
  }
}
```

Yapilan is, function definiton larini yazmak sadece...
