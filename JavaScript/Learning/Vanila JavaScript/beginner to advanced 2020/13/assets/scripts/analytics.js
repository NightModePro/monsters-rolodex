const interval = setInterval(() => {
    console.log('sending data...')
}, 2000)

document.getElementById('start-analitycs-btn').addEventListener('click', () => { clearInterval(interval) });
