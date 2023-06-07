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

menuBtn.addEventListener('click', menuClick);

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


//常見問題事件
const result = document.querySelector(".QAs")

result.addEventListener('click', function (e) {
  accordition = e.target;
  if (accordition.innerHTML == '+') {
    accordition.innerHTML = '-';
    QAContent = accordition.parentElement.nextElementSibling;
    QAContent.style.display = 'block';
  } else if (accordition.innerHTML == '-') {
    accordition.innerHTML = '+';
    QAContent = accordition.parentElement.nextElementSibling;
    QAContent.style.display = 'none';

  }
})

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
    toolListFilter.innerHTML = `<li class="tool-cards">` + document.querySelector(`.tool-list .tool-cards:nth-child(${this.dataset.id})`).innerHTML + `</li>`;

  })
}


//AI 工具王下拉選單
// 開起選單
const dropdownMenu = document.querySelector('.dropdown-menu')

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
    toolListFilter.innerHTML = text;
  }
}
)


// 切換按鈕文字
$('.dropdown-menu2').hide();
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

$('.filter2').mouseleave(function () {
  $('.dropdown-menu2').hide()
});

