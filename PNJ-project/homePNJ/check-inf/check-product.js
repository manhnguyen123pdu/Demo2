const productsCheckOutList = JSON.parse(localStorage.getItem("orderProduct"));
if (localStorage.getItem("listOrder") == null) {
  order = [];
} else {
  order = JSON.parse(localStorage.getItem("listOrder"));
}
function render() {
  let content = "";
  let sum = 0;
  for (i = 0; i < productsCheckOutList.length; i++) {
    sum +=
      Number(
        productsCheckOutList[i].item.discound
          ? (Number(productsCheckOutList[i].item.price) *
            (100 - productsCheckOutList[i].item.discound)) /
          100
          : Number(productsCheckOutList[i].item.price)
      ) * productsCheckOutList[i].quantity;
    content += `
    <div class="checkCon">     
      <table>
        <tr>
          <td rowspan="6"><div class="checkoutsLeftimg"><img src="${productsCheckOutList[i].item.img
      }" alt=""></div>
          </td>
          <td>
            <div class="checkoutsLeftinf">
              <div class="checkoutsLeftName"><b><p>${productsCheckOutList[i].item.name
      }</p></b></div>
              <div class="checkoutsLeftId"><b><span>Mã: ${productsCheckOutList[i].item.id
      }</span></b></div>
              <div class="checkoutsLeftPrice">
                <div class="checkoutsLeftPriceL"><span>Giá:</span></div>
                <div class="checkoutsLeftPriceR">${Number(productsCheckOutList[i].item.discound)
        ? (
          (Number(productsCheckOutList[i].item.price) *
            (100 - productsCheckOutList[i].item.discound)) /
          100
        ).toLocaleString()
        : Number(
          productsCheckOutList[i].item.price
        ).toLocaleString()
      }</div>
              </div>
              <div class="checkoutsLeftQuantity">
                <div class="checkoutsLeftQuantityL">
                  <span>Số lượng:</span>
                </div>
                <div class="checkoutsLeftQuantityR">
                  <i class="fa fa-minus" onclick="minusCart(${i})"></i>
                  <input class="amountPro" type="text" value=${productsCheckOutList[i].quantity
      } placeholder="1" min="1">
                  <i class="fa fa-plus" onclick="addCart(${i})"></i>
                </div>
                </div>
              <div class="checkoutsLeftDelete">
                  <button onclick="deleteItem(${i})"><i class="fa fa-trash"></i>Xóa</button>
              </div>
            </div>  
          </td>
        </tr>
        </table> 
        <hr/>
    </div>
    `;
  }
  const checkContent = document.querySelector(".checkContent");

  checkContent.innerHTML = content;
  document.querySelector(".caculateSum").innerHTML =
    Number(sum).toLocaleString();
  document.querySelector(".vat").innerHTML = (
    Number(sum) * 0.1
  ).toLocaleString();
  document.querySelector(".sumTotalAll").innerHTML = (
    Number(sum) +
    Number(sum) * 0.1
  ).toLocaleString();
}
render();

let amount = 0;
function addCart(i) {
  productsCheckOutList[i].quantity++;
  localStorage.setItem("orderProduct", JSON.stringify(productsCheckOutList));

  render();
}
function minusCart(i) {
  if (productsCheckOutList[i].quantity == 1) {
    deleteItem(i);
  } else {
    productsCheckOutList[i].quantity--;
    localStorage.setItem("orderProduct", JSON.stringify(productsCheckOutList));

  }
  render();
}
function deleteItem(i) {
  productsCheckOutList.splice(i, 1);
  localStorage.setItem("orderProduct", JSON.stringify(productsCheckOutList));

  render();
}
function submitOrder(event) {
  event.preventDefault();
  // thông tin khách hàng
  let name = document.querySelector("#name").value;
  let phone = document.querySelector("#phone").value;
  let email = document.querySelector("#email").value;
  let birthday = document.querySelector("#birthday").value;
  // giao hàng
  let province_shipping = document.querySelector("#province_shipping").value;
  let distract_shipping = document.querySelector("#distract_shipping").value;
  let ward_shipping = document.querySelector("#ward_shipping").value;
  let detail_location_shipping =
    document.querySelector("#detail_location").value;
  let note_shipping = document.querySelector("#note_shipping").value;
  // nhận tại cửa hàng
  let province_direct = document.querySelector("#province_direct").value;
  let distract_direct = document.querySelector("#distract_direct").value;
  let note_direct = document.querySelector("#note_direct").value;
  let radio_check_male = document.querySelector("#male").checked;
  let radio_check_female = document.querySelector("#female").checked;
  let radio_free_ship = document.querySelector("#fast_delivery").checked;
  let info_customer = {
    radio_check_male,
    radio_check_female,
    name,
    phone,
    email,
    birthday,
    radio_free_ship,
    province_shipping,
    distract_shipping,
    ward_shipping,
    detail_location_shipping,
    note_shipping,
    province_direct,
    distract_direct,
    note_direct,
  };

  if (
    name !== "" &&
    phone !== "" &&
    email !== "" &&
    birthday !== "" &&
    province_shipping !== "" &&
    distract_shipping !== "" &&
    ward_shipping !== "" &&
    detail_location_shipping !== ""
  ) {
    order.push({
      id:  `OD${parseInt(Math.random() * 100)}`,
      date: new Date().toLocaleDateString('vi-VI'),
      info_customer,
      data: { productsCheckOutList },
    });
    localStorage.setItem("orderProduct", JSON.stringify([]));
    localStorage.setItem("listOrder", JSON.stringify(order));
    alert("Đặt hàng thành công")
    location.reload(true);
  } else {
    alert("phải điền đầy đủ thông tin");
  }
}
// SEARCH
function search() {
  let search = document.querySelector(".search_check_123").value;
  let data = JSON.parse(localStorage.getItem("productsList"));
  let find_item = [];
  for (let i = 0; i < data.length; i++) {
    if (data[i].name.toUpperCase().includes(search.toUpperCase())) {
      find_item.push(data[i]);
    }
  }
  localStorage.setItem("search_product", JSON.stringify(find_item));
}
console.log(parseInt(Math.random() * 100))