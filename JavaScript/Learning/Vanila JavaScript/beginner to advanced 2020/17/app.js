const button = document.querySelector('button');
const output = document.querySelector('p');

const getPosition = (opts) => {
  const promise = new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition(success => {
      resolve(success);
    }), error => {

    }, opts
  });
  return promise;
};

const setTimer = (duration) => {
  const promise = new Promise((resolve, reject) => {
    setTimeout(() => {
      resolve('Done');
    }, duration);
  });
  return promise;
};

function trackUserHandler() {
  getPosition().then(posData => {
    setTimer
  });

  setTimeout(() => {
    console.log('timer done...')
  }, 0);
  setTimer(1000).then(() => {
    console.log('Timer done!');
  });
  console.log('geting position ...');
}

button.addEventListener('click', trackUserHandler);

// let result = 0;

// for (let i = 0; i < 100000000; i++) {
//   result += i;
// }

// console.log(result);