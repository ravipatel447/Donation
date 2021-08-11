function checkpin(){
    var pincode =document.getElementById("pincodec").value;
    console.log("this is pincode ",pincode);
    console.log(typeof(pincode));
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    console.log(url);
    var finalcity = "";
    fetch(url)
        .then(res => res.json()).then(data=>{
            const obj = data[0].PostOffice[0]; 
            finalcity = obj.Block+", "+obj.District+", "+obj.State;
            document.getElementById('pinoutput').innerHTML = finalcity;
            console.log(finalcity);
        })
    
}
function checkpinb(){
    var pincode =document.getElementById("pincode").value;
    console.log("this is pincode ",pincode);
    console.log(typeof(pincode));
    const url = `https://api.postalpincode.in/pincode/${pincode}`;
    console.log(url);
    var finalcity = "";
    fetch(url)
        .then(res => res.json()).then(data=>{
            const obj = data[0].PostOffice[0]; 
            finalcity = obj.Block+", "+obj.District+", "+obj.State;
            document.getElementById('pinoutputb').innerHTML = finalcity;
            console.log(finalcity);
        })
    
}
document.getElementById('donate_cloths').addEventListener('click',()=>{
    document.getElementById('main').style.display = 'flex';
})
document.getElementById('donate_blood').addEventListener('click',()=>{
    document.getElementById('mainb').style.display = 'flex';
})
document.querySelector('.close').addEventListener('click',()=>{
    document.getElementById('main').style.display = 'none';
})
document.querySelector('.closeb').addEventListener('click',()=>{
    document.getElementById('mainb').style.display = 'none';
})