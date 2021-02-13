const btn = document.querySelector("#button");
btn.addEventListener("click", () => {
    let data = document.getElementById("description");
    let maindata = data.value;
    let para = document.querySelector(".para");
    para.textContent = maindata;
    let divtoshow = document.querySelector(".bannerDivapp");
    let value = document.querySelector("#chck").checked;
    if (value == true) {
        divtoshow.classList.add("show");
    } else {
        divtoshow.classList.remove("show");
    }
    let buttonName = document.querySelector("#buttonName").value;
    document.querySelector(".button").textContent = buttonName;

    let imageName = document.querySelector("#fileName").value;
    let imgPath = imageName.slice(10, imageName.length);
    console.log(imgPath)
    document.querySelector(".image").setAttribute("src", "images/" + imgPath);

})


const btn1 = document.querySelector("#btn1");


btn1.addEventListener("click", ()=>{
    alert("");
})




// 