'use strict';

const picturesArray = [
  '/images/dogpics/pic1.jpg',
  '/images/dogpics/pic2.jpg',
  '/images/dogpics/pic3.jpg',
  '/images/dogpics/pic4.jpg',
  '/images/dogpics/pic5.jpg',
  '/images/dogpics/pic6.jpg',
  '/images/dogpics/pic7.jpg',
  '/images/dogpics/pic8.jpg',
  '/images/dogpics/pic9.jpg',
  '/images/dogpics/pic10.jpg',
  '/images/dogpics/pic11.jpg',
  '/images/dogpics/pic12.jpg',
  '/images/dogpics/pic13.jpg',
  '/images/dogpics/pic14.jpg',
  '/images/dogpics/pic15.jpg',
  '/images/dogpics/pic16.jpg',
  '/images/dogpics/pic17.jpg',
  '/images/dogpics/pic18.jpg',
  '/images/dogpics/pic19.jpg',
  '/images/dogpics/pic20.jpg',
  '/images/dogpics/pic21.jpg'
]
;
const randomPic = function () {
  return picturesArray[Math.floor(Math.random() * picturesArray.length)];
};
module.exports = randomPic
;
