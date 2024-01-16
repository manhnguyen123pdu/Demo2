let searchCon = "";
function render() {
  let search_value = document.querySelector(".search_value_123").value;
  let search_info = JSON.parse(localStorage.getItem("search_product"));
  for (i = 0; i < search_info.length; i++) {
    if (
      search_info[i].name.toUpperCase().includes(search_value.toUpperCase())
    ) {
      searchCon += `
            <div class="card item">
            <a class="card-img" href="../detail/detail.html?name=${
              search_info[i].name
            }">
            
            <img src="${search_info[i].img}" class="img" alt="">
            </a>
            <a class="card-name" href="">${search_info[i].name}</a>
            <p class="card-price">${
              Number(search_info[i].discound)
                ? (
                    (Number(search_info[i].price) *
                      (100 - search_info[i].discound)) /
                    100
                  ).toLocaleString()
                : Number(search_info[i].price).toLocaleString()
            }</p>
            <p class="discount"><span class="underline">${
              Number(search_info[i].discound)
                ? Number(search_info[i].price).toLocaleString()
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
  document.querySelector(".contentProduct").innerHTML = searchCon;
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
