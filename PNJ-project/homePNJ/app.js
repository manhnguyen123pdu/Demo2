function render(vitri, truong) {
  const mainContent = document.querySelector(`.${vitri}`);
  let content = "";
  for (j = 0; j < productsList.length; j++) {
    if (productsList[j].saleInfo == truong) {
      content += `
      <div class="card1 item">
          <a class="card1-img" href="./detail/detail.html?name=${
            productsList[j].name
          }">
          
          <img src="${productsList[j].img}" class="img" alt="">
          </a>
          <a class="card1-name" href="">${productsList[j].name}</a>
          <p class="card1-price">${
            Number(productsList[j].discound)
              ? (
                  (Number(productsList[j].price) *
                    (100 - productsList[j].discound)) /
                  100
                ).toLocaleString()
              : Number(productsList[j].price).toLocaleString()
          }</p>
          <p class="discount"><span class="underline">${
            Number(productsList[j].discound)
              ? Number(productsList[j].price).toLocaleString()
              : ""
          }</p>
          <div class="card1-footer">
          <div class="stars"><i class="fa-solid fa-star"></i> 5(3)</div>
          <div class="solds">115 đã bán</div>
          </div>
      </div>
      `;
    }
  }
  mainContent.innerHTML = content;
}

render("bestSale-content", "bestSaler");
render("newCollection-content", "newCollection");
render("diamond-content", "diamond");
render("ECZ-content", "ECZ");
render("pearl-content", "pearl");
render("necklace-content", "necklace");
render("married-content", "married");
render("shui-content", "shui");
render("itali-content", "Trang sức vàng Ý");
render("disney-content", "Disney|PNJ");
render("disney-content", "Disney|PNJ");
render("stylePnj-content", "STYLE BY PNJ");
render("Watch-content", "Watch ");
render("contentProduct-content", "Đá màu ");

localStorage.setItem("productsList", JSON.stringify(productsList));

// lazzyloading
window.addEventListener("scroll", function (event) {
  let load = document.querySelectorAll(".load");
  let y = window.pageYOffset + 600;
  for (i = 0; i < load.length; i++) {
    if (load[i].offsetTop < y) {
      load[i].classList.add("hien");
    }
  }
});
function catagory(data) {
  localStorage.setItem("myString", data);
}
// SEARCH
function search() {
  let search = document.querySelector(".search_value_123").value;
  let data = JSON.parse(localStorage.getItem("productsList"));
  let find_item = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toUpperCase().includes(search.toUpperCase())) {
      find_item.push(data[i]);
    }
  }
  localStorage.setItem("search_product", JSON.stringify(find_item));
}
