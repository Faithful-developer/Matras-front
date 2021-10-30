// $(document).ready(function () {
//     $('.intro-slider').slick({
//         dots: true,
//         infinite: true,
//         speed: 300,
//         slidesToShow: 1,
//         adaptiveHeight: true,
//         autoplay: true,
//         autoplaySpeed: 2000,
//         prevArrow: false,
//         nextArrow: false
//     });
// });

$(document).ready(function () {
    $('.carousel-address').slick({
        dots: true,
        infinite: true,
        speed: 300,
        slidesToShow: 1,
        adaptiveHeight: true,
        autoplay: true,
        autoplaySpeed: 2000,
        prevArrow: false,
        nextArrow: false
    })
})

$(document).ready(function () {
    $('.videos').slick({
        dots: false,
        infinite: true,
        slidesToShow: 3,
        responsive: [{
                breakpoint: 600,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,
                    infinite: true,
                    dots: true
                }
            }
        ]
    })
})