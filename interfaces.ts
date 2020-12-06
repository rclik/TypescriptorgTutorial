function printLabel(labeledObj: { label: string }) {
    console.log(labeledObj.label);
}

// let myObj = {label: 'myLabel', size: 10};
// printLabel(myObj);

interface LabeledValue {
    label: string;
}

// function printLabel(labeledObj: LabeledValue) {
//     console.log(labeledObj.label);
// }

// let myObj : LabeledValue = { label: 'redLabel'};
// printLabel(myObj);

// ama bir variable in tipini verdigimizde o interface e birebilr uymalidir.

// let anotherLabelObj : LabeledValue = {label:'new label', size:''};
// burada size property sini ekleyemeyiz.

// let myObj = { label: "my label", size: 10 };
// printLabel(myObj); // this will work

// interface SizedLabeledValue extends LabeledValue {
//     label: string;
//     size: number;
// }

interface SizedLabeledValue extends LabeledValue {
    size: number;
}

let sizedLabel: SizedLabeledValue = {size: 10, label: 'sized labeled value'};
printLabel(sizedLabel);

/****************************************************************************************************************************************
 * Optional Properties
 * 
 *  Interface lerdeki property lerin optional olmasi saglanabilir. Bu bize, interface tipinden istenilen object lerin interface deki tum property lere sahip olmayabilecegini soylemek icindir.
 * 
 * */ 

//  interface SquareConfig {
//      color ?: string;
//      width ?: number;
//  }

//  function createSquare(config: SquareConfig): any {
//     let square =  {color: 'white', area: 100};

//     // config.colr bu hata verir.
//     if(config.color){
//         square.color = config.color;
//     }

//     if (config.width) {
//         square.area = config.width * config.width;
//     }
//     return square;
//  }

//  let mySquare = createSquare({ color: "black" });

 // buradaki createSquare method u width property si olmadan da cagirilabilmesinin nedeni, width in optional property olarak tanimlanmasidir.
 
 /****************************************************************************************************************************************
 * Readonly Properties
 * 
 *  Bazi object ler, sadece object creation zamaninda modify edilebilmelidirler. Bu tur object ler icin readonly keyword u kullanilir.
 * 
 * */ 

// interface Point {
//     readonly x: number;
//     readonly y: number;
//   }

// let p1 : Point =  {x: 10, y: 12};
// // p1.x = 12; bu calismamali. cunku bu property readonly olarak tanimlanmis.

// // Buna benzer olarak readonly array vardir. bunu typescript gelistirmistir;

// let arr = [1,2,3];
// let roarr : ReadonlyArray<number> = arr;

// roarr[0]; // returns 1
// // roarr[0] = 12; returns error, compile time error of course.

// // roarr.push(12); does not work again

// // arr = roarr; this does not work too, since arr is not a read only array.

// // ama arr yi, roarr ile assertion olarak birbirlerine assign edebiliriz. cast yani:

// // yani roarr i number olarak bir alt class a cast ettik.
// arr = roarr as number[];

// // ya da bu sekilde, yukaridaki daha kolay anlasiliyor bence.
// arr = <number[]> roarr;

/*
  readonly ve const
    bunlarin arasindaki fark nedir? biri typescript digeri ise pure javascript
    farklari ise, biri property leri tanimlarken kullanilir, (readonly) digeri ise variable lari tanimlarken kullaniliyor. (const)
*/


 /****************************************************************************************************************************************
 * Excess Property Checks
 * 
 *  Propery leri interface ile vermeyi gorduk sonra da interface deki property leri optional etmeyi gorduk.
 *  Bu ikisini ayni zamanda kullandigimizi dusunelim. Compiler olmadigini dusunelim, eger interface uzerindeki bir property ismini yanlis yazarsak, ama type i dogru olursa ne olur?
 *  Optional property ise bu property sorun olmamasi lazim. Cunku o property olmasa da olur diyoruz. Ama yanlis yazdigimiz icin bu bir sorun olusturuyor. Biz aslinda optional olan propert yi kastetmistik.
 *  O zaman bu duruma da typescript el atmali degilmi?
 * 
 * */ 

//  interface SquareConfig {
//      color ?: string;
//      width ?: number;
//  }

//  function createSquare( config: SquareConfig) {
//     return {
//         color: config.color || 'red',
//         width: config.width ? config.width * config.width : 20
//     };
//  }

//  let mySquare = createSquare({colour: "blue"}); // goruldugu uzere typescript buna el atiyor, bir hata cikariyor.
// ama bunun hata olmadigini compiler a soylememiz lazim. o zaman assertion yapiyoruz.

// let mySquare = createSquare({ colour: 'blue', width: 100} as SquareConfig);
// console.log(mySquare.color);
// console.log(mySquare.width);


// sunu da yapabiliriz, deriz ki bu interface farkli isimlerde ve farkli tiplerde baska property ler de barindirabilir.

// interface SquareConfigWithExtraProps {
//     color ?: string;
//     width ?: number;
//     [propName: string]: any;
// }

// eger function a gonderecegimiz parametre interface deki hicbir property i karsilazsa ne olur?

// let anotherSquare = createSquare({ area: 1000}) as SquareConfig; // calismaz. bu da bizim hatamizdan dolayi olabilir, dolayisiyla typescript buna da el atiyor.
// onun icin dikkatli olmamiz, lazim. yoksa zaten o bizi uyariyor.


 /****************************************************************************************************************************************
 * Function Types
 * 
 *  Bir interface e property lerin nasil eklenecegini gorduk, simdi de bir function in nasil eklenecegini gorelim, bu function type property olarak adlandiriliyor.
 * 
 * */ 

 // icine iki tane string parameter alan bir function property si olan bir interface
//  interface SearchFunction{
//      (source: string, subString: string): boolean;
//  }

//  let mySearch : SearchFunction;

//  mySearch = ""; // bu hata verir, cunku bunun artik bir type i var, ve bunun function olmasi gerekir

// mySearch = function(){}; // bu da hata verir, cunku parametreleri eksiktir.

// mySearch = function(source: string, subString: string): boolean{
//     let result = source.search(subString);
//     return result > -1;
// }

// bu method daki parametre isimlerinin interface dekilerle ayni olmasina gerek yoktur hatta paremeter type larinin belirtilmesine gerek yoktur. Ama parameter type larini verirsek eger, bu type larin interface deki degerlerle uyusmasi gerekir. bunun boyle calismasi ise, eger typescript i kullanmayan bir yer varsa o zaman hersey run time da belli olacak olmasidir. 

// let anotherSearch: SearchFunction;

// anotherSearch = function (src, sub) {
//   let result = src.search(sub);
//   return result > -1;
// };

// benzer sekilde return type inin da interface deki function type property ile uyusmasi gerekir. 
// anotherSearch = function (src, sub) {
//     let result = src.search(sub);
//     return "heyoo";
// };


// ilk olarak bu project i node project olarak olusturalim;
// npm init 