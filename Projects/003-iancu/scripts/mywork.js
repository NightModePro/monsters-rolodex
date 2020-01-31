const DBController = (function () {
    const slideShow = [
        "images/slide-show/slide 1.jpg",
        "images/slide-show/slide 2.jpg",
        "images/slide-show/slide 3.jpg",
        "images/slide-show/slide 4.jpg",
        "images/slide-show/slide 5.jpg",
    ]

    const portolofioImages = [
        "images/portofolio/portofoliu 1.jpg"
    ]

    return {
        getSlideShowImages: function () {
            return slideShow;
        },
    }
})();

const UIController = (function () {
    let order = 1;
    const slideShow = function () {
        if (order < 5) {
            order++
        } else {
            order = 1
        }
        slide.src = `images/slide-show/slide ${order}.jpg`
    }

    const portofolio = function () {
        let newRow, portofolio;
        portofolio = document.getElementsByClassName('portofolio')[0];
        for (let i = 0; i < 32;) {
            newRow = `<div class="portofolio-row">
                <img src="images/portofolio/portofoliu ${i + 1}.jpg" alt="photo smekerie">
                <img src="images/portofolio/portofoliu ${i + 2}.jpg" alt="photo smekerie">
                <img src="images/portofolio/portofoliu ${i + 3}.jpg" alt="photo smekerie">
                <img src="images/portofolio/portofoliu ${i + 4}.jpg" alt="photo smekerie">
            </div>`
            i += 4

            portofolio.insertAdjacentHTML('beforeend', newRow);
        }

    }


    return {
        slideShowStart: function () {
            setInterval(slideShow, 3500);
        },

        createPortofolion: function () {
            portofolio();
        }
    }
})();


const app = (function (dbCtrl, uiCtrl) {
    const init = function () {
        // uiCtrl.slideShowStart();
        uiCtrl.createPortofolion();
    }



    return {
        init: function () {
            init();
        }
    }
})(DBController, UIController);

app.init();