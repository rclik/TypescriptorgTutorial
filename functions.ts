// let myAdd: (x: number, y: number) => number = function (x: number, y: number): number {
//     return x + y;
// };

let myAdd = function (x: number, y: number): number {
    return x + y;
};

console.log(myAdd(10, 20));

function buildName(firstName: string, lastName = "Smith") {
    return firstName + " " + lastName;
}

console.log(buildName('rahman'));

// this will cause compile time error, 
// let deck = {
//     suits: ["hearts", "spades", "clubs", "diamonds"],
//     cards: Array(52),
//     createCardPicker: function () {
//       return function () {
//         let pickedCard = Math.floor(Math.random() * 52);
//         let pickedSuit = Math.floor(pickedCard / 13);
  
//         return { suit: this.suits[pickedSuit], card: pickedCard % 13 };
//       };
//     },
//   };
  
//   let cardPicker = deck.createCardPicker();
//   let pickedCard = cardPicker();
  
  alert("card: " + pickedCard.card + " of " + pickedCard.suit);

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