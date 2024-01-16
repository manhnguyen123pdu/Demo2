// const productsList=JSON.parse(localStorage.getItem("myArray"))
console.log(productsList)
let content = "";
for(let i = 0; i < productsList.length; i++) {
    if(productsList[i].saleInfo == "bestSaler") {
        content += `
        <tr>
            <td><p style ="line-height: 100px">${i + 1}</p></td>
            <td><p style ="line-height: 100px">${productsList[i].id}</p></td>
            <td><p style ="line-height: 100px">${productsList[i].name}</p></td>
            <td><p style ="line-height: 100px"><img src="${productsList[i].img}" alt="" style="width: 100px"></p></td>
            <td><p style ="line-height: 100px">${parseInt(productsList[i].price).toLocaleString()}</p></td>
            <td><p style ="line-height: 100px">${productsList[i].discound}</p></td>
        </tr>
        `
    }
}
document.querySelector(".dataTable").innerHTML = content;
