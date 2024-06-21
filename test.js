
// Prime
function listPrimes(limit) {
  const primes = []

  nextPrime:
  for (let i = 2; i < limit; i++) {
    let isPrime = true;
    for (let j = 2; j * 2 <= i; j++) {
      if (i % j === 0) {
        continue nextPrime;
      }
    }

    primes.push(i);
  }

  return primes;
}

console.log(listPrimes(20));