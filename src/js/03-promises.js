import Notiflix from "notiflix";

function createPromise(position, delayValue) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const shouldResolve = Math.random() > 0.3;
      if (shouldResolve) {
        resolve({position, delayValue});
      } else {
        reject({position, delayValue});
      }
    }, delayValue);  
  });
}

const form = document.querySelector('form');
const btn = document.querySelector('button');

form.addEventListener("submit", handleSubmit);

function handleSubmit(event) {
  event.preventDefault();
  const {
    elements: { delay, step, amount}
  } = event.currentTarget;

  let delayValue = Number(delay.value);
  const stepValue = Number(step.value);
  const amountValue = Number(amount.value);

  for (let position = 1; position <= amountValue; position += 1){
    createPromise(position, delayValue)
      .then(({ position, delayValue }) => {
        console.log(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
        Notiflix.Notify.success(`✅ Fulfilled promise ${position} in ${delayValue}ms`);
      })
      .catch(({ position, delayValue }) => {
        console.log(`❌ Rejected promise ${position} in ${delayValue}ms`);
        Notiflix.Notify.failure(`❌ Rejected promise ${position} in ${delayValue}ms`);
      });
    delayValue += stepValue;
  }
  
}

