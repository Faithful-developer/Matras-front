let playButtons = document.querySelectorAll('.play');
let body = document.querySelector('body')
let videoPlayers = document.querySelectorAll('.video-player')
let slick = document.querySelectorAll('.slick-active');
let activeMssage = document.querySelector('.btn-active');
let message = document.querySelector('.message');
let formData = document.querySelector('.form-data');
let counter = document.querySelector('.count');
let minutCount = document.querySelector('.minus-count');
let plusCount = document.querySelector('.plus-count')
let count = 1;
let orderOpener = document.querySelectorAll('.order-open');
let orderCard = document.querySelector('.order-card')
let closeOrder = document.querySelectorAll('.close-order');
let shadow = document.querySelector('.shadow')
let submitOrder = document.getElementById('submit-order');
let activePart = document.querySelector('.active-card');
let messagePart = document.querySelector('.message-part');
let burgerButton = document.querySelector('.burger-btn');
let burgerButtonImages = document.querySelectorAll('.burger-btn-img')
let mobileMenu = document.querySelector('.mobile-menu');
let toTopButton = document.querySelector('.to-top');
let productWrapper = document.querySelector('.wrapper-products');
let introSlider = document.querySelector('.intro-slider')
let phoneNumberInput = document.querySelector('.send-phone');
let nameInput = document.querySelector('.send-name');
let modelSelect = document.getElementById('model');
let countProduct = document.querySelector('.count')
let callLeter = document.querySelector('#submit-call');
let numberInput = document.querySelector('#number');
let typeList = document.querySelector('.type-list');
let StatWrapper = document.getElementById('statistic-wrapper');
let videoWrapper = document.getElementById('video-wrapper');

window.addEventListener('load', function (e) {
    e.preventDefault();
    this.pageYOffset = 0;

    fetch('http://localhost:4500/products')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            iterateSelect(data.data)
            createProduct(data.data)
        });
    fetch('http://localhost:4500/categories')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            iterateCategories(data.data)
        });
    fetch('http://localhost:4500/carousel')
        .then((response) => {
            return response.json();
        })
        // .then((data) => {
        //     iterateCarousel(data.data);
        //     console.log(data.data);
        // });
    fetch('http://localhost:4500/stats')
        .then((response) => {
            return response.json();
        })
        .then((data) => {
            statisticsIteration(data.data)
        });
})



function statisticsIteration(data) {
    data.forEach(item => {
        let values = Object.entries(item)
        for (let i = 1; i < values.length; i++) {
            let box = document.createElement('li');
            let title = document.createElement('span');
            let value = document.createElement('h2')
            box.setAttribute('class', 'box');
            title.innerHTML = values[i][0].toUpperCase()
            value.innerHTML = values[i][1]
            box.appendChild(value)
            box.appendChild(title)
            StatWrapper.appendChild(box)
        }

    })
}

// let carouselWrapper = document.querySelector('.intro-slider')
// let carouselTemplate = document.querySelector('#slick-template').content;

// function iterateCarousel(data) {
//     data.forEach((item, index) => {
//         let newTemp = carouselTemplate.cloneNode(true)
//         newTemp.querySelector('.slick-box-title').textContent = item.title
//         newTemp.querySelector('.slick-box-img').src = item.img_link

//         carouselWrapper.append(newTemp)
//         $('.intro-slider').slick({
//             dots: true,
//             infinite: true,
//             speed: 300,
//             slidesToShow: 1,
//             adaptiveHeight: true,
//             autoplay: true,
//             autoplaySpeed: 2000,
//             prevArrow: false,
//             nextArrow: false
//         });
//     })
// }

let elMyCarousel = document.querySelector('.my-carousel')
let elMyCarouselTemp = document.querySelector('.my-carousel-temp').content 


async function myCarousel(){
    let response = await request('http://localhost:4500/carousel' , 'GET')
    console.log(response)
    response.data.forEach((item, index) => {
        let newTemp = elMyCarouselTemp.cloneNode(true)
       
        newTemp.querySelector('.hero-inner__title').textContent = item.title
        newTemp.querySelector('.my-carousel__img').src = item.img_link       
        elMyCarousel.append(newTemp)
    })
    $('.my-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
      });

}

myCarousel()



function iterateCategories(data) {
    for (let i = 0; i < data.length; i++) {
        let type = document.createElement('li')
        let button = document.createElement('button')
        button.setAttribute('class', 'type-list-button')
        button.setAttribute('data-btn-order', data[i].category_id)
        button.innerHTML = data[i].category_name;
        type.appendChild(button);
        typeList.appendChild(type)
    }
    let typeButtons = document.querySelectorAll('.type-list-button')

    typeButtons.forEach(item => {
        item.addEventListener('click', function (e) {
            e.preventDefault();
            let id = item.dataset.btnOrder
            fetch(`http://localhost:4500/categories/:${id}`)
                .then((response) => {
                    return response.json();
                })
                .then((data) => {
                    console.log(data);
                });
            tabSwitcher(item.dataset.btnOrder);
        })
    })




    function tabSwitcher(btnOrder) {
        typeButtons.forEach(item => {
            if (btnOrder != item.dataset.btnOrder) {
                item.classList.remove('active');
            } else {
                item.classList.add('active')
            }
        })
    }
}





function iterateSelect(data) {
    for (let i = 0; i < data.length; i++) {
        let option = document.createElement('option');
        option.setAttribute('value', data[i].product_name);
        option.innerHTML = data[i].product_name
        modelSelect.appendChild(option);
    }
}



function createProduct(data) {
    for (let i = 0; i < data.length; i++) {
        // console.log(data[i], 'data')
        let wrapper = document.createElement('div')
        wrapper.setAttribute('class', 'card');
        let card = `<div class="img-section">
        <img src="${data[i].img_links[0]}" alt="">
        </div>
        <div class="info-section">
        <h3 class="name">${data[i].product_name}</h3>
        <div class="some-info">
            <div class="box">
                <span>Yuklama</span>
                <h3>${data[i].yuklama} kg</h3>
            </div>
            <div class="box">
                <span>Kafolat</span>
                <h3>${data[i].kafolat} yil</h3>
            </div>
            <div class="box">
                <span>
                    O’lchami
                </span>
                <h3>${data[i].olchami}</h3>
            </div>
            <div class="box">
                <span>Sig’imi</span>
                <h3>${data[i].sigimi} kishilik</h3>
            </div>
        </div>
        <p class="overview">${data[i].description}
        </p>
        <div class="price">
            <span>Narxi</span>
            <h3>${data[i].price}</h3>
        </div>
        <button class="btn order-to-product">
            Buyurtma berish
        </button>
        </div>`
        wrapper.innerHTML = card
        productWrapper.appendChild(wrapper)
    }

    let orderToProduct = document.querySelectorAll('.order-to-product');

    orderToProduct.forEach(btn => {
        // console.log(btn);
        btn.addEventListener('click', function (e) {
            e.preventDefault();
            // console.log('hello');
            orderCard.classList.add('active');
            shadow.classList.add('active')
            document.querySelector('body').classList.add('no-scroll')
            // document.querySelector('body').classList.add('no-scroll')
        })
    })
    // console.log(orderToProduct);
}

window.addEventListener('scroll', function (e) {
    e.preventDefault();
    if (this.pageYOffset > 900) {
        toTopButton.classList.add('active')
    } else {
        toTopButton.classList.remove('active')
    }
})

burgerButton.addEventListener('click', function (e) {
    e.preventDefault();
    imageChanger()
    mobileMenu.classList.toggle('active')
})


function imageChanger() {
    burgerButtonImages.forEach(image => {
        if (image.classList.contains('active')) {
            image.classList.remove('active')
        } else {
            image.classList.add('active')
        }
    })
}



submitOrder.addEventListener('click', function (e) {
    e.preventDefault();
    fetch("http://localhost:4500/orders", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                clientName: nameInput.value,
                clientContact: `+998${phoneNumberInput.value}`,
                product: modelSelect.value,
                count: countProduct.innerHTML
            })
        })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (res) {
            console.log(res)
        })

    activePart.classList.add('hidden');
    messagePart.classList.add('active')
})

window.addEventListener('keydown', function (e) {
    if (e.keyCode == 27) {
        orderCard.classList.remove('active');
        shadow.classList.remove('active')
        activePart.classList.remove('hidden')
        messagePart.classList.remove('active')
    }
});

orderOpener.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        orderCard.classList.add('active');
        shadow.classList.add('active')
        document.querySelector('body').classList.add('no-scroll')
    })
})

closeOrder.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        orderCard.classList.remove('active');
        shadow.classList.remove('active')
        document.querySelector('body').classList.remove('no-scroll')
        activePart.classList.remove('hidden')
        messagePart.classList.remove('active')
    })
})

minutCount.addEventListener('click', function (e) {
    e.preventDefault();
    if (count == 1) {
        minutCount.setAttribute('disabled', 'true')
    } else {
        count--
    }
    counter.innerHTML = count
})

plusCount.addEventListener('click', function (e) {
    e.preventDefault();
    if (count > 1) {
        minutCount.removeAttribute('disabled', 'true');
        count++
    } else {
        count++
    }
    counter.innerHTML = count
})

callLeter.addEventListener('click', function (e) {
    e.preventDefault();
    message.classList.add('active')
    formData.classList.add('hidden')
    setTimeout(() => {
        activeMessage()
    }, 5000);
    fetch("http://localhost:4500/calls", {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: "POST",
            body: JSON.stringify({
                phoneNumber: `+998${numberInput.value}`
            })
        })
        .then(function (res) {
            console.log(res)
        })
        .catch(function (res) {
            console.log(res)
        })
})

function activeMessage() {
    message.classList.remove('active');
    formData.classList.remove('hidden')
}



playButtons.forEach(button => {
    button.addEventListener('click', function (e) {
        e.preventDefault();
        videoSwitcher(button.dataset.btnOrder);
    })
})


function videoSwitcher(btnOrder) {
    videoPlayers.forEach(video => {
        if (btnOrder != video.dataset.videoOrder) {
            video.removeAttribute('controls', 'true')
            video.pause()
        } else {
            video.setAttribute('controls', 'true')
            video.play()
        }
    })
    playButtons.forEach(button => {
        if (btnOrder != button.dataset.btnOrder) {
            button.setAttribute('class', 'play')
        } else {
            button.setAttribute('class', 'play hidden')
        }
    })
}

let elAddressInner = document.querySelector('.address-inner')
let elAddressTemp = document.querySelector('.address-left-template').content;
let elAddressCarouselTemp = document.querySelector('.address-carousel-template').content;

async function address(){
    let response = await request('http://localhost:4500/location' , 'GET')
    response.data.forEach((item, index) => {
      
        let newTemp = elAddressTemp.cloneNode(true)
    
        newTemp.querySelector('.address-inner__address').textContent = item.address
        newTemp.querySelector('.address-inner__destination').textContent = item.text
        newTemp.querySelector('.address-inner__btn').href = item.location

        let images = item.img_link
        images.forEach((img, index) => {
            let addressTemp = elAddressCarouselTemp.cloneNode(true)
            addressTemp.querySelector('.address-carousel-img').src = img
            newTemp.querySelector('.address-inner__right-carousel').append(addressTemp)
        })


       
        elAddressInner.append(newTemp)
    })
    $('.address-inner__right-carousel').slick({
        dots: true,
        infinite: true,
        speed: 500,
        fade: true,
        cssEase: 'linear',
        autoplay: true,
      });
}

address()