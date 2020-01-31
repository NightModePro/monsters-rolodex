// class DataBase {
//     constructor() {
//         DataBase.slider = [
//             {
//                 imgUrl: '../images/slide-show/slide 1.jpg',
//                 link: '#',
//                 linkText: 'poza 1',
//             },
//             {
//                 imgUrl: '../images/slide-show/slide 2.jpg',
//                 link: '#',
//                 linkText: 'poza 2',
//             },
//             {
//                 imgUrl: '../images/slide-show/slide 3.jpg',
//                 link: '#',
//                 linkText: 'poza 3',
//             },
//             {
//                 imgUrl: '../images/slide-show/slide 4.jpg',
//                 link: '#',
//                 linkText: 'poza 4',
//             },
//             {
//                 imgUrl: '../images/slide-show/slide 5.jpg',
//                 link: '#',
//                 linkText: 'poza 5',
//             },
//         ];
//     }

//     static get getDataBase() {
//         return DataBase.slider;
//     }
// }

// class UIController {
//     constructor() {
//         UIController.countSlides = 1;
//     }

//     static changeSlide() {
//         new DataBase();

//         const max = DataBase.getDataBase.length;
//         const slider = document.querySelector('.slider');

//         let currentSlide = slider.querySelector('#slide-img');
//         let currentText = slider.querySelector('.center');

//         if (UIController.countSlides === max) {
//             UIController.countSlides = 0;
//         }
//         currentSlide.src = DataBase.getDataBase[UIController.countSlides].imgUrl;
//         currentText.innerText = DataBase.getDataBase[UIController.countSlides].linkText;

//         console.log(UIController.countSlides)
//         UIController.countSlides++;
//         console.log(UIController.countSlides)

//     }

//     static StartSlider() {
//         new UIController();

//         setInterval(() => {
//             this.changeSlide()
//         }, 5000)
//     }

//     static StopSlider() {
//         clearInterval(this.StartSlider());
//     }
// }


// class App {

//     static RunSlider() {

//         const slider = document.querySelector('.slider');
//         slider.addEventListener('mouseover', () => {
//             UIController.StopSlider();
//         });
//         slider.addEventListener('mouseout', () => {
//             UIController.StartSlider();
//         });
//     }

//     static init() {
//         new DataBase();

//         console.log('init...');
//         UIController.StartSlider();

//     }
// };

// App.init()