let orderLst = JSON.parse(localStorage.getItem('listOrder'))

function render(orderLst) {
  let addCart = "";
  for (let i = 0; i < orderLst.length; i++) {
    let total = 0;
    let contentInvoice = ""
    for (let j = 0; j < orderLst[i].data.productsCheckOutList.length; j++) {
      total += parseInt(orderLst[i].data.productsCheckOutList[j].item.price) * parseInt(orderLst[i].data.productsCheckOutList[j].quantity) * ((100 - parseInt(orderLst[i].data.productsCheckOutList[j].item.discound)) / 100)
      contentInvoice += `
      <tr>
          <td>${j + 1}</td>
          <td class="text-left">${orderLst[i].data.productsCheckOutList[j].item.id}</td>
          <td class="text-left">${orderLst[i].data.productsCheckOutList[j].item.name}</td>
          <td>Chiếc</td>
          <td>${orderLst[i].data.productsCheckOutList[j].quantity}</td>
          <td>${(parseInt(orderLst[i].data.productsCheckOutList[j].item.price) * ((100 - parseInt(orderLst[i].data.productsCheckOutList[j].item.discound)) / 100)).toLocaleString()}</td>
          <td>${(parseInt(orderLst[i].data.productsCheckOutList[j].item.price) * parseInt(orderLst[i].data.productsCheckOutList[j].quantity) * ((100 - parseInt(orderLst[i].data.productsCheckOutList[j].item.discound)) / 100)).toLocaleString()}</td>
      </tr>
      `
    }

    addCart += `
    <tr >
        <td class="table-center">${i + 1}</td>
        <td>${orderLst[i].info_customer.name}</td>
        <td>${orderLst[i].info_customer.detail_location_shipping}</td>
        <td class="table-center">${orderLst[i].info_customer.email}</td>
        <td class="table-center">${orderLst[i].info_customer.phone}</td>
        <td class="table-center">${total.toLocaleString()}đ</td>
        <td  class="table-center">
        <!-- Button trigger modal -->
            <button type="button" class="btn-1 " data-toggle="modal" data-target="#modelId${orderLst[i].id}" >
              Detail
            </button>
            <button type="button" class="btn-1 "  onclick="print('${orderLst[i].id}')" >
              Print
            </button>
            
            <!-- Modal -->
            <div class="modal fade ${orderLst[i].id}" id="modelId${orderLst[i].id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
              <div class="modal-dialog modal-xl" role="document">
                <div class="modal-content">
                <form action="">
                <section class="title">
                  <div class="title_content">
                    <div class="title_left">
                      <img
                        src="https://cdn.pnj.io/images/logo/pnj.com.vn.png"
                        alt="logo PNJ"
                      />
                    </div>
                    <div class="title_center">
                      <h1><b>HÓA ĐƠN BÁN HÀNG</b></h1>
                      <p><b>Ngày ${orderLst[i].date.slice(0, 2)} Tháng ${orderLst[i].date.slice(3, 5)} Năm ${orderLst[i].date.slice(6, 10)}</b></p>
                    </div>
                    <div class="title_right">
                      <p><b>Mẫu số:</b> 01</p>
                      <p><b>Ký hiệu:</b> invoid-01</p>
                      <p><b>Số:</b>  ${orderLst[i].id}</p>
                    </div>
                  </div>
                </section>
                <hr />
                <section class="info_company">
                  <div class="info_company_content">
                    <p>
                    <b>Đơn vị bán hàng: </b> Công Ty Cổ Phần Vàng Bạc Đá Quý Phú Nhuận
                    </p>
                    <p><b>Mã số thuế: </b>0300521758</p>
                    <p>
                      <b>Địa chỉ: </b> 170E Phan Đăng Lưu – Phường 3 – Quận Phú Nhuận – Thành phố Hồ Chí Minh
                    </p>
                    <p><b>Điện thoại:</b> (84-28) 39951703 – Fax: (84-28) 39951702</p>
                    <p> <b>Email:</b> pnj@pnj.com.vn</p>
                  </div>
                </section>
                <hr/>
                <section class="info_customer">
                  <div class="info_customer_content">
                    <p><b>Họ tên người mua hàng: </b> ${orderLst[i].info_customer.name}</p>
                    <p><b>Số điện thoại: </b> ${orderLst[i].info_customer.phone}</p>
                    <p><b>Địa chỉ: </b> ${orderLst[i].info_customer.detail_location_shipping}</p>
                    <p><b>Chi tiết sản phẩm: </ b></p>
                  </div>
                </section>
                <section class="info_product">
                  <div class="info_product_content">
                    <table border="1px" cellspacing="0" class="table-invoice">
                      <tr>
                        <td>STT</td>
                        <td>Mã sản phẩm</td>
                        <td>Tên sản phẩm</td>
                        <td>Đơn vị tính</td>
                        <td>Số lượng</td>
                        <td>Đơn giá</td>
                        <td>Thành tiền</td>
                      </tr>
                      <tr>
                        <td>A</td>
                        <td>b</td>
                        <td>C</td>
                        <td>D</td>
                        <td>1</td>
                        <td>2</td>
                        <td>3=1x2</td>
                      </tr>
                      ${contentInvoice}
                      <tr>
                      <td colspan="6"><b>Cộng thành tiền hàng:</b></td>
                      <td><b>${total.toLocaleString()}đ</b></td>
                    </tr>
                      <tr>
                        <td colspan="6"><b>Thuế suất GTGT(10%)</b></td>
                        <td><b>${parseInt((total * 10 / 100)).toLocaleString()}đ</b></td>
                      </tr>
                      <tr>
                        <td colspan="6"><b>Tổng tiền thanh toán:</b></td>
                        <td><b>${parseInt(total + (total * 10 / 100)).toLocaleString()}đ</b></td>
                      </tr>
                      <tr />
                    <td colspan="7"><b>Số tiền viết bằng chữ: </b>${to_vietnamese((total + (total * 10 / 100)))} đồng </td>
                    <tr />
                    </table>
                  </div>
                </section>
                <section class="sign">
                  <div class="sign_content">
                    <div class="sign_customer">
                      <p style="margin:0">Người mua hàng</p>
                      <i>(Ký,ghi rõ họ tên)</i>
                    </div>
                    <div class="sign_company">
                    <div>  
                      <p style="margin:0">Người bán hàng</p>
                      <i>(Ký,đóng dấu, ghi rõ họ tên)</i></div>
                    <div class="signatrue">
                        <p>Signatrue Valid</p>
                        <p class="namecopany">Ký bởi : CONG TY TRANG SUC PNJ </p>
                        <p>Ký ngày :${new Date().toLocaleDateString('vi-VI')}</p>
                    </div>
                    </div>
                  </div>
                </section>
              </form>
                </div>
              </div>
            </div>
        </td>
    </tr>

    `
  }
  document.querySelector(".body-Table").innerHTML = addCart;
}
render(orderLst);

function find() {
  let ip = document.querySelector("#find").value;
  let newarr = [];
  for (let i = 0; i < orderLst.length; i++) {
    if (orderLst[i].info_customer.phone.includes(ip)) {
      newarr.push(orderLst[i]);
    }
  }
  render(newarr);

}



function print(id) {
  const divContent = document.querySelector(`.${id}`).innerHTML;
  const cssStyle = `<style> 
  * {
  margin: 0;
  padding: 0;
  box-sizing: border-box;

}
table{
  width:100%; 
}
form {
  padding-top: 30px;
  max-width:730px; 
  margin: 0px;
  border: 1px solid black;
  padding: 30px;
  margin: 30px;
}
.title_content {
  display: flex;
  justify-content: space-around;
}
.title_left {
  width: 20%;
}
.title_left img {
  width: 100%;
}
.title_center {
  text-align: center;
}
.title_center h1 {
  margin-bottom: 30px;
}
.title_right p {
  margin: 10px 0;
}
.info_company_content p {
  margin: 10px 0 5px 10px;
  font-size: 17px;
}
.info_customer_content p {
  margin: 10px 0 5px 10px;
  font-size: 17px;
}
.info_product_content table {
  width:100%; 
  text-align: center;
}
.info_product_content p {
  font-size: 17px;
  margin: 20px 0;
}
.sign_content {
  display: flex;
  justify-content: space-around;
  text-align: center;
}
.sign_content h2 {
  margin: 10px 0;
}

tr>.table-center{
  text-align: center;
}
.btn-1{
  margin: 20px 0;
}
.modal, .text-left{
  text-align: left;
}
.table-invoice {
  width:730px; 
  font-weight: normal;
}
.table-invoice tr:first-child {
  font-weight: bold;
}
.sign {
  padding-top: 30px;
  padding-bottom: 0px;
}
.info_product_content tr td{
  padding: 5px 9px;
}
.signatrue{
  background-color: #E4F2E5;
  color:red;
  padding: 10px 15px;
  border: 2px solid #9ce9a3;
  margin-top: 50px;
}
i{
  font-weight: normal;
  font-size: 14px;
}
.signatrue p{
  margin: 0;
  padding: 3px 0;
  text-align: left;
}
  </style>`;
  // Tạo trang HTML mới với nội dung của div
  const newPage = `<html><head><title>Print</title>${cssStyle}</head><body>${divContent}</body></html>`;

  // Mở trang HTML mới và in
  const printWindow = window.open('', '_blank');
  printWindow.document.open();
  printWindow.document.write(newPage);
  printWindow.document.close();
  printWindow.print();

}

