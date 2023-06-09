//回到最上方
window.addEventListener('scroll', function (
) {
  const backToTop = document.querySelector('.backToTop a');
  backToTop.addEventListener('click', function () {
    window.scrollTo(0, 0)
  })
})

//手機右上角選單漢堡事件
const mPrice = document.querySelector('.mPrice')
const mFooter = document.querySelector('.mFooter')
const content = document.querySelector('.content')
const toolHeader = document.querySelector('.tool-header')
const footer = document.querySelector('.footer')
const menuBtn = document.querySelector('.menuBtn')
const breakpoint = 768;

function menuClick() {
  console.log("test")
  if (menuBtn.innerHTML.trim() === 'menu') {
    mPrice.style.display = 'block';
    mFooter.style.display = 'block';
    content.style.display = 'none';
    toolHeader.style.display = 'none';
    footer.style.display = 'none';
    menuBtn.innerHTML = 'close';
  } else if (menuBtn.innerHTML.trim() === 'close') {
    mPrice.style.display = 'none';
    mFooter.style.display = 'none';
    content.style.display = 'flex';
    toolHeader.style.display = 'flex';
    footer.style.display = 'flex';
    menuBtn.innerHTML = 'menu';
  }
}

function throttle(func, delay) {
  let timer = null;
  return function () {
    if (!timer) {
      func.apply(this, arguments);
      timer = setTimeout(() => {
        timer = null;
      }, delay)
    }
  };
}

//偵測螢幕寬度，復原手機右上角選單漢堡事件
window.addEventListener('resize', throttle(function () {
  var screenWidth = window.innerWidth;
  if (window.innerWidth > breakpoint) {
    if (menuBtn.innerHTML.trim() === 'close') {
      mPrice.style.display = 'none';
      mFooter.style.display = 'none';
      content.style.display = 'flex';
      toolHeader.style.display = 'flex';
      footer.style.display = 'flex';
      menuBtn.innerHTML = 'menu';
    }
  }
}, 200))

menuBtn.addEventListener('click', menuClick);

//AI 工具王 menu 事件
const menuLi = document.querySelectorAll('.menu li')
const toolList = document.querySelector('.tool-list');
const toolListFilter = document.querySelector('.tool-list-filter');

for (let i = 0; i < menuLi.length; i++) {
  menuLi[i].addEventListener('mouseenter', function (e) {
    if (i == 0) {
      toolList.style.display = 'flex';
      toolListFilter.style.display = 'none';
      return
    }

    const menuAct = document.querySelector('.menu .active')
    menuAct.classList.remove('active')
    this.classList.add('active')

    toolList.style.display = 'none';
    toolListFilter.style.display = 'flex';
    toolListFilter.innerHTML = "";

    const URL = `https://2023-engineer-camp.zeabur.app/api/v1/works?type=${menuLi[i].textContent}`

    let aiWorkFilter = ""

    axios.get(URL)
      .then(function (response) {
        const aiWorksFilter = response.data.ai_works.data

        for (let i = 0; i < aiWorksFilter.length; i++) {
          aiWorkFilter +=
            `
          <li class="tool-cards" data-id="${i + 1}">
              <a href="#"><img
                      class="tool"
                      src=${aiWorksFilter[i].imageUrl}
                      alt=${aiWorksFilter[i].title} />
              </a>
              <div class="tool-content">
                  <h3 class="tool-name">${aiWorksFilter[i].title}</h3>
                  <p class="tool-text">
                      ${aiWorksFilter[i].description}
                  </p>
              </div>
              <div class="model">
                  <h3 class="model-name">AI 模型</h3>
                  <span class="model-txt">${aiWorksFilter[i].model}</span>
              </div>
              <div class="tool-group">
                  <h3 class="group-name">#${aiWorksFilter[i].type}</h3>
                  <a href=${aiWorksFilter[i].link} target="_blank"><img
                          class="share"
                          src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/2023web-camp/icons/share.png"
                          alt="分享" />
                  </a>
              </div>
          </li>
      `
        }
        toolListFilter.innerHTML = aiWorkFilter
      })

  })
}

//AI 工具王下拉選單
// 開起選單

const dropdownMenu = document.querySelector('.dropdown-menu')
// 切換按鈕文字
$('.dropdown-btn').click(function (e) {
  e.preventDefault();
  $('.dropdown-menu').show();
});

$('.dropdown-btn2').click(function (e) {
  e.preventDefault();
  $('.dropdown-menu2').show();
});

$('.new-to-old').click(function (e) {
  e.preventDefault();
  $('.dropdown-menu').toggleClass('active');
  $('.dropdown-btnText').text('由新到舊');
  $('.dropdown-menu').hide()
});

$('.old-to-new').click(function (e) {
  e.preventDefault();
  $('.dropdown-menu').toggleClass('active');
  $('.dropdown-btnText').text('由舊到新');
  $('.dropdown-menu').hide()
});

$('.filter').mouseleave(function () {
  $('.dropdown-menu').hide()
});
$('.filter2').mouseleave(function () {
  $('.dropdown-menu2').hide()
});


dropdownMenu.addEventListener('click', function (e) {
  toolList.style.display = 'none';
  toolListFilter.style.display = 'flex';
  toolListFilter.innerHTML = "";
  text = "";
  if (e.target.innerHTML == "由新到舊") {
    for (let i = toolList.children.length; i > 0; i--) {
      text += `<li class="tool-cards">` + document.querySelector(`.tool-list .tool-cards:nth-child(${i})`).innerHTML + `</li>`;
    }
    toolListFilter.innerHTML = text
  } else {
    for (let i = 1; i < toolList.children.length + 1; i++) {
      text += `<li class="tool-cards">` + document.querySelector(`.tool-list .tool-cards:nth-child(${i})`).innerHTML + `</li>`;
    }
    toolListFilter.innerHTML = text
  }
}
)


// AI 工具王全部清單
//let toolList = document.querySelector('.tool-list')
let aiWork = ""

axios.get('https://2023-engineer-camp.zeabur.app/api/v1/works')
  .then(function (response) {
    const aiWorks = response.data.ai_works.data
    console.log(aiWorks.length)

    for (let i = 0; i < aiWorks.length; i++) {
      aiWork +=
        `
      <li class="tool-cards" data-id="${i + 1}">
          <a href="#"><img
                  class="tool"
                  src=${aiWorks[i].imageUrl}
                  alt=${aiWorks[i].title} />
          </a>
          <div class="tool-content">
              <h3 class="tool-name">${aiWorks[i].title}</h3>
              <p class="tool-text">
                  ${aiWorks[i].description}
              </p>
          </div>
          <div class="model">
              <h3 class="model-name">AI 模型</h3>
              <span class="model-txt">${aiWorks[i].model}</span>
          </div>
          <div class="tool-group">
              <h3 class="group-name">#${aiWorks[i].type}</h3>
              <a href=${aiWorks[i].link} target="_blank"><img
                      class="share"
                      src="https://raw.githubusercontent.com/hexschool/2022-web-layout-training/main/2023web-camp/icons/share.png"
                      alt="分享" />
              </a>
          </div>
      </li>
  `
    }
    toolList.innerHTML = aiWork
  })


//分頁事件
/* menuBtn.addEventListener('click', menuClick);
const page = document.querySelectorAll('.page > li > a')
for (let i = 0; i < page.length; i++) {
  page[i].addEventListener('mouseenter', function () {
    document.querySelector('.page .active').classList.remove('active')
    this.parentNode.classList.add('active')
  })
} */

//顧客評論事件
var swiper = new Swiper(".swiper-container", {
  spaceBetween: 0,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  on: {
    slideChange: function () {
      var activeIndex = this.activeIndex;

      const swiper = document.querySelector('.swiper-slide')

      if (window.innerWidth < 464) {
        var slideWidth = swiper.style.width;
      } else if (window.innerWidth < 768) {
        var slideWidth = swiper.style.width;

      } else if (window.innerWidth > 768) {
        var slideWidth = 416 + 24;
      }

      var offset = activeIndex * slideWidth;
      var slideContainer = document.querySelector(".swiper-wrapper");
      slideContainer.style.transform = "translateX(-" + offset + "px)";
    }
  }
});  