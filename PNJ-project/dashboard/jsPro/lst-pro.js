let dataProducts = localStorage.getItem("myArray");
let getArray = JSON.parse(dataProducts);
function render(getArray) {
let content = "";
for (i = 0; i < getArray.length; i++) {
  content += `
<tr class="conPro">
<td>${i}</td>
<td class="conProName" style="text-align: start;">${getArray[i].id}</td>
<td class="conProName" style="text-align: start;">${getArray[i].name}</td>
<td><img src="${getArray[i].img}" alt="" class="conProImg"></td>
<td>${Number(getArray[i].price).toLocaleString()}<span style="text-transform: lowercase;">đ</span></td>
<td class="conProButton">
  <!-- Button trigger modal -->
  <button type="button" class="btn-1" data-toggle="modal" data-target="#modelId${getArray[i].id}">
    Edit
  </button>
  <button onclick="del('${getArray[i].id}')" type="button" class=" btn-2">
    Delete
  </button>

  <!-- Modal -->
  <div class="modal fade" id="modelId${getArray[i].id}" tabindex="-1" role="dialog" aria-labelledby="modelTitleId" aria-hidden="true">
    <div class="modal-dialog modal-md" role="document">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title text-left">${getArray[i].id}-${getArray[i].name}</h5>
          <button type="button" class="close" data-dismiss="modal" aria-label="Close">
            <span aria-hidden="true">&times;</span>
          </button>
        </div>
        <div class="modal-body">
          <div class="modal-container">
              <div class="modal-h"><h5>Name Product</h5></div>
              <div class="modal-con">
                <input type="text" value="${getArray[i].name}" class="modal-name${getArray[i].id}">
              </div>
          </div>
          <div class="modal-container">
              <div class="modal-h"><h5>Price (đ)</h5></div>
              <div class="modal-con">
                  <input type="text" value="${getArray[i].price}" class="modal-price${getArray[i].id}">
              </div>
          </div>
          <div class="modal-container">
              <div class="modal-h"><h5>Discound(%)</h5></div>
              <div class="modal-con">
                  <input type="text" value="${getArray[i].discound}" class="modal-discound${getArray[i].id}">
              </div>
          </div>
          <div class="modal-container">
              <div class="modal-h"><h5>Describe</h5></div>
              <div class="modal-con">
                  <input type="text" value="${getArray[i].desPar.desc}" class="modal-describe${getArray[i].id}">
              </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button closebtn${getArray[i].id}" class="btn btn-secondary" data-dismiss="modal">Close</button>
          <button onclick="data('${getArray[i].id}')" type="button closebtn${getArray[i].id}" class="btn btn-secondary" data-dismiss="modal">Save</button>
        </div>
      </div>
    </div>
  </div>
</td>
</tr>
    `;
}
document.querySelector(".card-content").innerHTML = content;
}

render(getArray)

function data(id) {
  let name = document.querySelector(`.modal-name${id}`).value
  let price = document.querySelector(`.modal-price${id}`).value
  let discound = document.querySelector(`.modal-discound${id}`).value
  let describe = document.querySelector(`.modal-describe${id}`).value
  let item = getArray.find(item => {
    return item.id == id
  })
  let newItem = {...item, name, price, discound, desc: describe}
  let indexItem = getArray.findIndex(item => {
    return item.id == id
  })
  getArray[indexItem] = newItem

  let jsonString = JSON.stringify(getArray);
  localStorage.setItem("myArray", jsonString);
  render(getArray)
}


function del(id) {
  let indexItem = getArray.findIndex(item => {
    return item.id == id
  })
 getArray.splice(indexItem,1)
  let jsonString = JSON.stringify(getArray);
  localStorage.setItem("myArray", jsonString);
  render(getArray)
  alert(`Xóa thành công ${id}`)
}

function find() {
  let ip = document.querySelector("#find").value;
  let newarr = [];

  for (let i = 0; i < getArray.length; i++) {
    if (getArray[i].name.toLowerCase().includes(ip.toLowerCase())) {
      newarr.push(getArray[i]);
    }
  }
  render(newarr)

  console.log(newarr);
}

