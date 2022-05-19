const showPopup = (token) => {
    const popup = document.getElementById("popup");
    popup.style.display = "block"; 

}

window.addEventListener("load",()=>{
    const btn = document.getElementById("btn");
    btn.addEventListener("click",()=> {
        showPopup();
    });
    document.getElementById("cancel").addEventListener("click",(e)=>{
        e.preventDefault();
        document.getElementById("popup").style.display = "none"; 
    })
    $.get("/csrftoken").then(data=>{
        $('input[name="token"]').val(data.token);
    });
})