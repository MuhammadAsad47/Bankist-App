'use strict';

/////////////////////////////////////////////////
/////////////////////////////////////////////////
// BANKIST APP

// Data
const account1 = {
  owner: 'Jonas Schmedtmann',
  movements: [200, 450, -400, 3000, -650, -130, 70, 1300],
  interestRate: 1.2, // %
  pin: 1111,
};

const account2 = {
  owner: 'Jessica Davis',
  movements: [5000, 3400, -150, -790, -3210, -1000, 8500, -30],
  interestRate: 1.5,
  pin: 2222,
};

const account3 = {
  owner: 'Steven Thomas Williams',
  movements: [200, -200, 340, -300, -20, 50, 400, -460],
  interestRate: 0.7,
  pin: 3333,
};

const account4 = {
  owner: 'Sarah Smith',
  movements: [430, 1000, 700, 50, 90],
  interestRate: 1,
  pin: 4444,
};

const accounts = [account1, account2, account3, account4];

// Elements
const labelWelcome = document.querySelector('.welcome');
const labelDate = document.querySelector('.date');
const labelBalance = document.querySelector('.balance__value');
const labelSumIn = document.querySelector('.summary__value--in');
const labelSumOut = document.querySelector('.summary__value--out');
const labelSumInterest = document.querySelector('.summary__value--interest');
const labelTimer = document.querySelector('.timer');

const containerApp = document.querySelector('.app');
const containerMovements = document.querySelector('.movements');

const btnLogin = document.querySelector('.login__btn');
const btnTransfer = document.querySelector('.form__btn--transfer');
const btnLoan = document.querySelector('.form__btn--loan');
const btnClose = document.querySelector('.form__btn--close');
const btnSort = document.querySelector('.btn--sort');

const inputLoginUsername = document.querySelector('.login__input--user');
const inputLoginPin = document.querySelector('.login__input--pin');
const inputTransferTo = document.querySelector('.form__input--to');
const inputTransferAmount = document.querySelector('.form__input--amount');
const inputLoanAmount = document.querySelector('.form__input--loan-amount');
const inputCloseUsername = document.querySelector('.form__input--user');
const inputClosePin = document.querySelector('.form__input--pin');

const displayMovements = function (movements) {
  containerMovements.innerHTML = ' ';
  movements.forEach(function (mve, i) {
    const type = mve > 0 ? 'deposit' : 'withdrawal';

    const html = `<div class="movements__row">
          <div class="movements__type movements__type--${type}">
          ${i + 1} ${type}</div>
          <div class="movements__value">${mve}</div>
       </div>
       `;
    containerMovements.insertAdjacentHTML('afterbegin', html);
  });
};
displayMovements(account1.movements);

const calacDisplayBalance = function (acc) {
  acc.balance = acc.movements.reduce((acc, mov) => acc + mov, 0);
  labelBalance.textContent = `${acc.balance} EUR`;
};
// calacDisplayBalance(account1.movements);

const calacDisplaySummary = function (acc) {
  const income = acc.movements
    .filter(mov => mov > 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumIn.textContent = `${income}#`;

  ///////////////OUT////////////
  const out = acc.movements
    .filter(mov => mov < 0)
    .reduce((acc, mov) => acc + mov, 0);
  labelSumOut.textContent = `${Math.abs(out)}#`;

  const intrest = acc.movements
    .filter(mov => mov > 0)
    .map(deposit => (deposit * acc.interestRate) / 100)
    .filter((int, i, arr) => {
      // console.log(arr);
      return int >= 1;
    })
    .reduce((acc, int) => acc + int, 0);
  labelSumInterest.textContent = `${intrest}# `;
};

// calacDisplaySummary(account1.movements);

/////////////////////////////////////////////////
const creatUsernames = function (accs) {
  accs.forEach(function (acc) {
    acc.username = acc.owner
      .toLowerCase()
      .split(' ')
      .map(name => name[0])
      .join('');
  });
};
creatUsernames(accounts);

const updateUI = function (acc) {
  //Display movements
  displayMovements(acc.movements);

  // Display balance
  calacDisplayBalance(acc);

  //Display summary
  calacDisplaySummary(acc);
};
// console.log(accounts);

//Event andler
let currentAccount;

btnLogin.addEventListener('click', function (e) {
  e.preventDefault();

  currentAccount = accounts.find(
    acc => acc.username === inputLoginUsername.value
  );
  // console.log(currentAccount);

  if (currentAccount?.pin === Number(inputLoginPin.value)) {
    //Display UI and message
    labelWelcome.textContent = `Welcome back, ${
      currentAccount.owner.split(' ')[0]
    }`;
    containerApp.style.opacity = 100;

    //clear input field
    inputLoginUsername.value = inputLoginPin.value = '';
    inputLoginPin.blur();

    updateUI(currentAccount);
  }
});

btnTransfer.addEventListener('click', function (e) {
  e.preventDefault();
  const amount = Number(inputTransferAmount.value);
  const receiverAcc = accounts.find(
    acc => acc.username === inputTransferTo.value
  );
  // console.log(amount, receiverAcc);
  inputTransferAmount.value = inputTransferTo.value = '';

  if (
    amount > 0 &&
    receiverAcc &&
    currentAccount.balance >= amount &&
    receiverAcc?.username !== currentAccount.username
  ) {
    currentAccount.movements.push(-amount);
    receiverAcc.movements.push(amount);
    // update ui
    updateUI(currentAccount);
  }
});


/////////////////////////////////////////////////
/////////////////////////////////////////////////
// LECTURES

// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

/////////////////////////////////////////////////
/*
let arr = ['a', 'b','c','d','e','f']

console.log(arr.slice(2));
console.log(arr.slice(2, 4));
console.log(arr.slice(-2));
console.log(arr.slice(-1));
console.log(arr.slice(1, -2));
console.log(arr.slice());
console.log([...arr]);

//SPLICE//
console.log(arr.splice(2));
console.log(arr);

//Reverse//
// gijkl
arr = ['a', 'b','c','d','e','f']
let arr2= ['l','k', 'j','i', 'g']
console.log(arr2.reverse());
console.log(arr2);

//CONCAT//

const letters = arr.concat(arr2)
console.log(letters);

//JOIN//



// ---AT--- //
const arr = [11, 22, 64]
console.log(arr[0]);
console.log(arr.at(-1));
console.log(arr.at(-2));

// getting last array element

console.log(arr[arr.length -1]);
console.log(arr.slice(-1)[0]);
console.log(arr.at(-1));

console.log('jonas'.at(-1));


const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

for ( const[i, movement]of movements.entries() ){
  if (movement > 0){
    console.log(`Movements ${i, + 1}: You deposite ${movement}`);
  } else {
    console.log(`Movements ${i, + 1}: You witraw ${Math.abs(movement)}`);
  }
}

console.log('---FOREACH---');

movements.forEach(function(mov, i, arr){
  if (mov > 0) {
    console.log(` Movements ${i + 1}: You deposite ${mov}`);
  } else {
    console.log(` Movements ${i + 1}: You witraw ${Math.abs(mov)}`);
  }
});
///////////////////////////////////////////////////////
const calachumanAverageAge = age =>
//   age
//     .map(age => (age <= 2 ? 2 * age : 16 + age * 4))
//     .filter(age => age >= 18)
//     .reduce((acc, age, i, arr) => acc + age / arr.length, 0);

// const avg1 = calachumanAverageAge([16, 6, 10, 5, 6, 1, 4]);
// const avg2 = calachumanAverageAge([5, 2, 4, 1, 15, 8, 3]);
// console.log(avg1, avg2);


// const currencies = new Map([
//   ['USD', 'United States dollar'],
//   ['EUR', 'Euro'],
//   ['GBP', 'Pound sterling'],
// ]);

// currencies.forEach(function (value, key, map) {
//   console.log(`${key}:${value}`);
// });

// const currenciesUnique = new Set(['USD', 'GBP', 'USD', 'EUR', 'EUR']);
// console.log(currenciesUnique);
// currenciesUnique.forEach(function (value, key, map) {
//   console.log(`${key}: ${value}`);
// });


Coding Challenge #1
Julia and Kate are doing a study on dogs. So each of them asked 5 dog owners 
about their dog's age, and stored the data into an array (one array for each). For 
now, they are just interested in knowing whether a dog is an adult or a puppy.
A dog is an adult if it is at least 3 years old, and it's a puppy if it's less than 3 years 
old.
Your tasks:
Create a function 'checkDogs', which accepts 2 arrays of dog's ages 
('dogsJulia' and 'dogsKate'), and does the following things:
1. Julia found out that the owners of the first and the last two dogs actually have 
cats, not dogs! So create a shallow copy of Julia's array, and remove the cat 
ages from that copied array (because it's a bad practice to mutate function 
parameters)
2. Create an array with both Julia's (corrected) and Kate's data
3. For each remaining dog, log to the console whether it's an adult ("Dog number 1 
is an adult, and is 5 years old") or a puppy ("Dog number 2 is still a puppy 
�
")
4. Run the function for both test datasets
Test data:
§ Data 1: Julia's data [3, 5, 2, 12, 7], Kate's data [4, 1, 15, 8, 3]
§ Data 2: Julia's data [9, 16, 6, 8, 3], Kate's data [10, 5, 6, 1, 4]
Hints: Use tools from all lectures in this section so far �

*/

// const checkDogs = function( dogsJulia, dogsKate ){
//   const dogsJuliaCorrected = dogsJulia.slice();
//   dogsJuliaCorrected.splice(0, 1)
//   dogsJuliaCorrected.splice( -2)
//   console.log(dogsJuliaCorrected);

//   const dogs = dogsJuliaCorrected.concat(dogsKate);
//   console.log(dogs);

//   dogs.forEach(function(dog, i){
//     if(dog >= 3){
//       console.log(`Dog number ${i+1} is an adult, and is ${dog}  year old`);
//     } else {
//       console.log(`Dog is a ${i + 1} is still a puppy`)
//     }
//   })
// };
// const cqeckDogs = function(jonDogs){
//   const dogs = jonDogs

// const forLoop = [4, 5, 6, 7, 8, 9]
//   dogs.forEach(function(dog, i){
//   if (dog > 5){
//     console.log(`${i + 1} This is a ${dog} year dog and adult`);
//   } else{
//     console.log(`${i + 1} This is a ${dog} year dog and a puppy`);
//   }
//   })
// };

//  cqeckDogs([4, 5, 6, 7, 8, 9])

// console.log(userName);

/////////Practice//////////////////

// const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const eurotoUsd = 1.1;

// const movementsUsd = movements.map(function(mov) {
//   return mov * eurotoUsd;
// })

// const movementsUsd = movements.map(mov => mov * eurotoUsd );

// console.log(movementsUsd);

// const movementsDescription = movements.map((mov, i, ) =>
//   `Movements ${i + 1}: you ${mov > 0 ? 'deposited': 'witdrew'} ${Math.abs(mov)}`
// );

// console.log(movementsDescription);
const movements = [200, 450, -400, 3000, -650, -130, 70, 1300];

// const deposite = movements.filter(function(mov){
//   return mov > 0
// })
// console.log(deposite);

// const depositeFor = []
// for(const mov of movements) if (mov > 0) depositeFor.push(mov);

//   console.log(depositeFor);
//   const withdrawal = movements.filter(mov => mov < 0)
//   console.log(withdrawal);

// const balance = movements.reduce((acc, cur) => acc + cur + 0);
// console.log(balance);

// let balance2 = 0;
// for (const mov of movements) balance2 += mov;
// console.log(balance2);

////////////////////////////////////////////
///////////////Maximum value////////////////
///////////importanat conncept//////////////
////////////////////////////////////////////
// const max = movements.reduce((acc, mov) => {
//   if (acc > mov) return acc;
//   else return mov;
// }, movements[0]);
// console.log(max);

// const calachumanAge = function (ages) {
//   const humanAge = ages.map(age => age <= 2 ? 2 * age : 16 + age * 4)
//   const belowAge = humanAge.filter( age => age > 18);
//   console.log(humanAge);
//   console.log(belowAge);
//   const average = belowAge.reduce((acc, age) => acc + age , 0) / belowAge.length;
//   return average;
// };

// const avrg1 =calachumanAge([5, 2, 4, 1, 15, 8, 3]);
// const avrg2 =calachumanAge([16, 6, 10, 5, 6, 1, 4]);
// console.log(avrg1, avrg2);
///////////////////////////////////////////////////
///////////////////////////////////////////////////

// const belowAge = humanAge.filter(function(age){
// return humanAge > 18})
// console.log(belowAge);

// const movementsUsd = movements.map(function(mov) {
//   return mov * eurotoUsd;
// })

// const movementsUsd = movements.map(mov => mov * eurotoUsd );

// console.log(movementsUsd);

// const eurotoUsd = 1.1;

// const totalDepositeUsd = movements
//   .filter(mov => mov > 0)
//   .map(mov => mov * eurotoUsd)
//   .reduce((acc, mov) => acc + mov, 0);
// console.log(totalDepositeUsd);

// const firstWitDrawal = movements.find(mov => mov < 0);
// console.log(movements);
// console.log(firstWitDrawal);
// const account = accounts.find(acc => acc.owner === 'Jessica Davis');
// console.log(account);

