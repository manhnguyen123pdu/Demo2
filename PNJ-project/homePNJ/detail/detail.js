const urlParams = new URLSearchParams(window.location.search);
const prodName = urlParams.get("name");
const productsList = JSON.parse(localStorage.getItem("productsList"));
const mainContent = document.querySelector(".main-content");

let detailPro;
let order;
if (localStorage.getItem("orderProduct") == null) {
  order = [];
} else {
  order = JSON.parse(localStorage.getItem("orderProduct"));
}

for (let i = 0; i < productsList.length; i++) {
  if (productsList[i].name === prodName) {
    detailPro = productsList[i];
  }
}
let subImgs = [];
for (let i = 0; i < detailPro.subImgs.length; i++) {
  subImgs.push(
    `<div onclick="change('${detailPro.subImgs[i]}')" class="side-item"><img src="${detailPro.subImgs[i]}" alt="" class="side-img"></div>`
  );
}
let parsLst = [];
for (let i = 0; i < detailPro.desPar.params.length; i++) {
  parsLst.push(`<li class="des-par-item">${detailPro.desPar.params[i]}</li>`);
}
// set title web
document.querySelector(".titleweb").innerText = detailPro.name;
console.log(detailPro)
mainContent.innerHTML = `
<p class="direct">Trang chủ / ${detailPro.type} / <span> ${detailPro.name
  }</span></p>
<div class="detail">
<div class="side">
    ${subImgs.join("")}
</div>
<div class="main-img">
    <img  id="myimage" src="${detailPro.img}" class="img-content">
</div>
<div class="info">
    <div class="headCart">
        <img style="width:60px; padding-right:15px" src="https://cdn.pnj.io/images/image-update/2022/10/pnjfast/PNJfast-Giaotrong3h.svg" alt="">
        <p class="name">  ${detailPro.name}</p>
    </div>
    <div class="small-info">
        <span class="pro-id">Mã: ${detailPro.id}</span>
        <span class="stars"><i class="fa-solid fa-star"></i> 5(3)</span>
        <span class="solds">115 đã bán</span>
    </div>
    <div class="price-month">
        <div class="pro-prices">
            <p style="font-weight:bold" class="pro-price">${Number(detailPro.discound)
    ? (
      (Number(detailPro.price) * (100 - detailPro.discound)) /
      100
    ).toLocaleString()
    : Number(detailPro.price).toLocaleString()
  }₫</p>
            <del class="pro-discount">${Number(detailPro.discound)
    ? Number(detailPro.price).toLocaleString() + 'đ'
    : ""
  }</del>
        </div>
        <p class="months">Chỉ cần trả ${Math.round(
    Number(detailPro.price / 12)
  ).toLocaleString()} ₫</p>
    </div>
    <div class="call">
        Còn hàng - <span class="blue">Gọi <span class="red"><i class="fa-solid fa-phone"></i>1800 5454 57 (Free)</span> Ưu đãi độc quyền</span>
    </div>
    <div class="prioritize">
        <p class="pio-title">Ưu đãi:</p>
        <div class="pio-mid">
            <p>Mã <strong>PNJVNPAY</strong> tự động hiển thị 50k cho đơn từ 2 triệu khi quét <span style="color: blue; margin-bottom: 20px;">VNPAY-QR</span></p>
            <p>Nhập mã <strong>MMQUYPHAI</strong> giảm 2% tối đa 200K khi thanh toán qua <span style="color: blue;">MOMO</span></p>
        </div>
    </div>
    <div onclick="addToCart('${detailPro.id}')" class="big-btn">
    <a target="_blank" href="../check-inf/check-inf.html"><p  class="btn-title">MUA NGAY</p>
        <p class="btn-sub-title">Miễn phí giao hàng tận nhà hoặc tại cửa hàng</p></a>
  </div>
    <div class="sub-btn">
        <div class="small-btn">
            <a href=""><p class="btn-title">MUA TRẢ GÓP</p>
            <p class="btn-sub-title">Chỉ từ ${Math.round(
    Number(detailPro.price / 12)
  ).toLocaleString()}₫/tháng</p></a>
        </div>
        <div class="small-btn">
            <a href=""><p class="btn-title">CỬA HÀNG CÓ HÀNG</p>
            <p class="btn-sub-title">GỌI NGAY giữ hàng và nhận ưu đãi</p></a>
        </div>
    </div>
    <ul class="detail-lst">
        <li class="lst-item"><i class="fa-solid fa-circle-check"></i>Giá sản phẩm thay đổi tuỳ trọng lượng vàng và đá</li>
        <li class="lst-item"><i class="fa-solid fa-circle-check"></i>Đổi sản phẩm trong 48h tại hệ thống cửa hàng PNJ</li>
        <li class="lst-item"><i class="fa-solid fa-circle-check"></i>Cầm đồ và Thu mua. <span style="color: blue;">Xem chi tiết</span></li>
        <li class="lst-item"><i class="fa-solid fa-circle-check"></i>Miễn phí giao nhanh Toàn Quốc 1-7 ngày, xem thêm Chính sách giao hàng</li>
    </ul>
</div>
</div>
<div class="des-par">
    <p>Thông số và mô tả</p>
    <i class="fa-solid fa-chevron-down"></i>
</div>
<div class="des-par-detail">
    <div class="des-par-head">
        <p class="des-par-title">Thông số và Mô tả</p>
        <i class="fa-solid fa-xmark"></i>
    </div>
    <ul class="des-par-lst">
        ${parsLst.join("")}
    </ul>
    <p class="des-par-desc">${detailPro.desPar.desc}</p>
</div>
`;

const dropdownBtn = document.querySelector(".fa-chevron-down");
const closeBtn = document.querySelector(".fa-xmark");
const desPar = document.querySelector(".des-par");
const desParDetail = document.querySelector(".des-par-detail");

dropdownBtn.onclick = function () {
  desPar.style.display = "none";
  desParDetail.style.display = "block";
};

closeBtn.onclick = function () {
  desParDetail.style.display = "none";
  desPar.style.display = "flex";
};
function change(i) {
  let pic = document.querySelector(".img-content");
  let piczom = document.querySelector(".img-magnifier-glass");
  piczom.style.backgroundImage = `url(${i})`; // Thêm dấu ngoặc đơn
  pic.src = i;
}

// zoom
function magnify(imgID, zoom) {
  var img, glass, w, h, bw;
  img = document.getElementById(imgID);

  /* Create magnifier glass: */
  glass = document.createElement("DIV");
  glass.setAttribute("class", "img-magnifier-glass");

  /* Insert magnifier glass: */
  img.parentElement.insertBefore(glass, img);

  /* Set background properties for the magnifier glass: */
  glass.style.backgroundImage = "url('" + img.src + "')";
  glass.style.backgroundRepeat = "no-repeat";
  glass.style.backgroundSize =
    img.width * zoom + "px " + img.height * zoom + "px";
  bw = 3;
  w = glass.offsetWidth / 2;
  h = glass.offsetHeight / 2;

  /* Execute a function when someone moves the magnifier glass over the image: */
  glass.addEventListener("mousemove", moveMagnifier);
  img.addEventListener("mousemove", moveMagnifier);

  /*and also for touch screens:*/
  glass.addEventListener("touchmove", moveMagnifier);
  img.addEventListener("touchmove", moveMagnifier);
  function moveMagnifier(e) {
    var pos, x, y;
    /* Prevent any other actions that may occur when moving over the image */
    e.preventDefault();
    /* Get the cursor's x and y positions: */
    pos = getCursorPos(e);
    x = pos.x;
    y = pos.y;
    /* Prevent the magnifier glass from being positioned outside the image: */
    if (x > img.width - w / zoom) {
      x = img.width - w / zoom;
    }
    if (x < w / zoom) {
      x = w / zoom;
    }
    if (y > img.height - h / zoom) {
      y = img.height - h / zoom;
    }
    if (y < h / zoom) {
      y = h / zoom;
    }
    /* Set the position of the magnifier glass: */
    glass.style.left = x - w + "px";
    glass.style.top = y - h + "px";
    /* Display what the magnifier glass "sees": */
    glass.style.backgroundPosition =
      "-" + (x * zoom - w + bw) + "px -" + (y * zoom - h + bw) + "px";
  }

  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    /* Get the x and y positions of the image: */
    a = img.getBoundingClientRect();
    /* Calculate the cursor's x and y coordinates, relative to the image: */
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    /* Consider any page scrolling: */
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
}
function addToCart(id) {
  console.log(id)
  let item = productsList.find((data) => {
    if (data.id == id) {
      return data;
    }
  });
  let index = order.findIndex((data) => {
    if (data.item.id == id) {
      return data;
    }
  });
  if (index == -1) {
    order.push({
      quantity: 1,
      // THÔNG TIN SẢN PHẨM
      item,
    });
  } else {
    order[index].quantity++;
  }
  localStorage.setItem("orderProduct", JSON.stringify(order));
}
// SEARCH
function search() {
  let search = document.querySelector(".search_detail_123").value;
  let data = JSON.parse(localStorage.getItem("productsList"));
  let find_item = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toUpperCase().includes(search.toUpperCase())) {
      find_item.push(data[i]);
    }
  }
  localStorage.setItem("search_product", JSON.stringify(find_item));
}
