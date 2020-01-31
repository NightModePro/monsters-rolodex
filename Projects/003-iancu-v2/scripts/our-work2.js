const DataBase = (function () {
    const database = {
        slider: [
            {
                imgUrl: '../images/slide-show/slide 1.jpg',
                link: '#',
                linkText: 'poza 1',
            },
            {
                imgUrl: '../images/slide-show/slide 2.jpg',
                link: '#',
                linkText: 'poza 2',
            },
            {
                imgUrl: '../images/slide-show/slide 3.jpg',
                link: '#',
                linkText: 'poza 3',
            },
            {
                imgUrl: '../images/slide-show/slide 4.jpg',
                link: '#',
                linkText: 'poza 4',
            },
            {
                imgUrl: '../images/slide-show/slide 5.jpg',
                link: '#',
                linkText: 'poza 5',
            },
        ],
        portofolion: [

        ]
    };

    return {
        getDataBase: function () {
            return database;
        }
    }
})();


const UIController = (function () {
    const slider = document.querySelector('.slider');

    let currentSlide = slider.querySelector('#slide-img');
    let currentText = slider.querySelector('.center');

    return {
        changeSlide: function (slide) {
            currentSlide.src = slide.imgUrl;
            currentText.innerText = slide.linkText;
        },

        createPortofolio: function () {
            console.log('works')
            let portofolion = document.querySelector('.portofolio');
            for (let i = 1; i < 32; i += 4) {
                let portofolioRow = document.createElement('div');
                portofolioRow.className = 'portofolio-row';
                portofolioRow.innerHTML = `
                    <img src="../images/portofolio/portofoliu ${i}.jpg" id="${i}" alt="">
                    <img src="../images/portofolio/portofoliu ${i + 1}.jpg" id="${i + 1}" alt="">
                    <img src="../images/portofolio/portofoliu ${i + 2}.jpg" id="${i + 2}" alt="">
                    <img src="../images/portofolio/portofoliu ${i + 3}.jpg" id="${i + 3}" alt="">
                `;
                portofolion.appendChild(portofolioRow);

            }
        }
    }
})();


const App = (function (DB, UICtrl) {
    let slideNumber = 0;
    const maxSlides = DB.getDataBase().slider.length;

    // when click on the left <<< part, it give you the previous image
    const previousSlide = function () {
        document.querySelector('.left').addEventListener('click', () => {
            slideNumber--;
            if (slideNumber < 0) {
                slideNumber = maxSlides - 1
            }
            console.log('app', DB.getDataBase()[slideNumber])
            UICtrl.changeSlide(DB.getDataBase()[slideNumber]);
            console.log('app', slideNumber)
        }, false)
    }

    // when click on the right >>> part, it give you the next image
    const nextSlide = function () {
        document.querySelector('.right').addEventListener('click', () => {
            slideNumber++;
            if (slideNumber > maxSlides - 1) {
                slideNumber = 0
            }
            UICtrl.changeSlide(DB.getDataBase()[slideNumber]);
            console.log('next')
        }, false)
    }


    // it makes the slider to run in circle
    const startSlider = function () {
        setInterval(() => {
            if (slideNumber >= maxSlides) {
                slideNumber = 0;
            }
            UICtrl.changeSlide(DB.getDataBase().slider[slideNumber]);
            console.log(slideNumber)
            slideNumber++;
        }, 5000)
    }

    // initialization
    const init = function () {
        console.log('init...');
        UICtrl.changeSlide(DB.getDataBase().slider[maxSlides - 1]);
        UICtrl.createPortofolio();
        // startSlider();
        previousSlide();
        nextSlide();
    }

    return {
        init: function () {
            init();
        }
    }
})(DataBase, UIController);

App.init();