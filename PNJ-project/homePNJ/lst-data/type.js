let typeCon = "";

function render() {
  let retrievedString = localStorage.getItem("myString");
  for (i = 0; i < productsList.length; i++) {
    if (productsList[i].saleInfo == retrievedString) {
      typeCon += `
            <div class="card item">
            <a class="card-img" href="../detail/detail.html?name=${
              productsList[i].name
            }">
            
            <img src="${productsList[i].img}" class="img" alt="">
            </a>
            <a class="card-name" href="">${productsList[i].name}</a>
            <p class="card-price">${
              Number(productsList[i].discound)
                ? (
                    (Number(productsList[i].price) *
                      (100 - productsList[i].discound)) /
                    100
                  ).toLocaleString()
                : Number(productsList[i].price).toLocaleString()
            }</p>
            <p class="discount"><span class="underline">${
              Number(productsList[i].discound)
                ? Number(productsList[i].price).toLocaleString()
                : ""
            }</p>
            <div class="card-footer">
            <div class="stars"><i class="fa-solid fa-star"></i> 5(3)</div>
            <div class="solds">115 đã bán</div>
            </div>
        </div>
        `;
    }
  }
  document.querySelector(".contentProduct").innerHTML = typeCon;
}
render();
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
