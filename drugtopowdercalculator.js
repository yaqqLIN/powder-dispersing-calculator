let dosein=document.querySelector("#dosein");
let frequencyin=document.querySelector("#frequencyin");
let durationin=document.querySelector("#durationin");
let day1in=document.querySelector("#day1in");
let postblock=document.querySelector("#postblock");
let savedboardtext=document.querySelector("#savedboardtext");
let countdose={
    blockall:document.querySelector("#blockall"),
    blockall2:document.querySelector("#blockall2"),
    quantity2in:document.querySelector("#quantity2in"),
    frequency2in:document.querySelector("#frequency2in"),
    pack2in:document.querySelector("#pack2in"),
    dose2in:"0.00",
    duration2in:"0.00",
}
dosein.value=0;
frequencyin.value=0;
durationin.value=0;
day1in.value=0;
countdose.quantity2in.value=0;
countdose.frequency2in.value=0;
countdose.pack2in.value=0;
postblock.ptname="";
postblock.drugname="";
postblock.nameinput="";
savedboardtext.innerHTML="";
function shiftcount(element,num){
    element.style.backgroundColor="red";
    element.parentNode.childNodes[num].style.backgroundColor="grey";
    if(num==1){
        countdose.blockall.style="display:none"
        countdose.blockall2.style="display:flex"
    }else{
        countdose.blockall.style="display:flex"
        countdose.blockall2.style="display:none"
    }

}
function showhide(elementid){
    let element=document.querySelector("#"+elementid);
    if(element.original){
        element.style="display:none";
        delete element.original
    }else{
        element.original=element.style
        element.style="display:block;"
    }
}
function selectedin(element,hideid){
    let hideelement=document.querySelector("#"+hideid)
    let hideelementvalue=document.querySelector("#"+hideid+"value")
    hideelement.style="pointer-events:none;opacity:0.6;";
    hideelementvalue.style="pointer-events:none;opacity:0.6;";
    element.style="background-color:red;opacity:1;"
}
function selected(idvalue,idvar){
    let idvaluein=document.querySelector("#"+idvalue);
    let idvarin= document.querySelector("#"+idvar);
    if(idvaluein.original){
        idvaluein.style=idvaluein.original;
        idvaluein.style="width:100%";
        idvarin.style="display:none;";
        delete idvaluein.original;
    }else{
        idvaluein.original=idvaluein.style
        idvaluein.style="pointer-events:none;opacity:0.3;width:100%";
        idvarin.style="display:block;"
    };
};
function resetCSS(){
    let elementli=document.getElementsByTagName("li");
    let elementul=document.getElementsByTagName("ul");
    let elementvar=document.getElementsByClassName("inputvar")
    for(i=0;i<100;i++){
        if(elementli[i]){
            elementli[i].style="background-color: rgb(209, 253, 219);"
        }
    }
    for(i=0;i<30;i++){
        if(elementul[i]){
            elementul[i].style="pointer-events:auto;opacity:1;";
        }
    }
    for(i=0;i<10;i++){
        if(elementvar[i]){
            elementvar[i].style="display:none;";
            elementvar[i].value=0;
        }
    }
    dosein.value=0.00;
    frequencyin.value=0.00;
    durationin.value=0.00;
    day1in.value=0;
    postblock.innerHTML=""
}
function roundToTwo(num) {
    return +(Math.round(num + "e+2")  + "e-2");
}
function inputvalue(inputid,inputvalue){
    let element=document.querySelector("#"+inputid);
    inputvalue=roundToTwo(inputvalue);
    postblock.inputcal="未輸入完成";
    element.value=parseFloat(inputvalue);
    postblock.packnum=roundToTwo(durationin.value*frequencyin.value+day1in.value);
    postblock.quantity=roundToTwo(dosein.value*parseFloat(postblock.packnum));
    postblock.inputhtml="<次劑量: "+String(dosein.value)+"> <頻次: "+String(frequencyin.value)+"> <天數: "+String(durationin.value)+"> <首日: "+String(day1in.value)+" 包>";
    if(postblock.packnum==0.00 || postblock.quantity==0.00){
        inputcal="未輸入完成";
    }else{
        postblock.inputcal="= 共 "+String(postblock.quantity)+" 顆，共"+String(postblock.packnum)+" 包 ";
    }
    postblock.innerHTML="<div style='background-color: antiquewhite;'>"+postblock.nameinput+"</br>"+postblock.inputhtml+"</br>"+postblock.inputcal+"</div>";
}
function inputvalue2(inputid,inputvalue){
    let element=document.querySelector("#"+inputid);
    inputvalue=roundToTwo(inputvalue);
    postblock.inputhtml="未輸入完成";
    element.value=parseFloat(inputvalue);
    countdose.dose2in=roundToTwo(countdose.quantity2in.value/countdose.pack2in.value);
    countdose.duration2in=roundToTwo(countdose.pack2in.value/countdose.frequency2in.value);
    postblock.inputcal="= 共 "+String(countdose.quantity2in.value)+" 顆，共"+String(countdose.pack2in.value)+" 包 ";
    console.log(postblock)
    if(countdose.pack2in.value == 0 || countdose.frequency2in.value == 0){
        postblock.inputhtml="未輸入完成";
    }else{
        postblock.inputhtml="<次劑量: "+String(countdose.dose2in)+"> <頻次: "+String(countdose.frequency2in.value)+"> <天數: "+String(countdose.duration2in)+">";
    }
    postblock.innerHTML="<div style='background-color: antiquewhite;'>"+postblock.nameinput+"</br>"+postblock.inputhtml+"</br>"+postblock.inputcal+"</div>";
}
function inputname(element,inputid){
    postblock[inputid]=element.value;
    if(postblock.ptname||postblock.drugname){
        postblock.nameinput="姓名: "+postblock.ptname+" 藥名: "+postblock.drugname;
        postblock.innerHTML="<div style='background-color: antiquewhite;'>"+postblock.nameinput+"</br>"+postblock.inputhtml+"</br>"+postblock.inputcal+"</div><span style='display:flex'><button id='casebtn' onclick='savetext()' style='width:50px;'>儲存</button><span style='width:100%;opacity:0.1;'></span></span>";
    }
}
function savetext(){
    savedboardtext.innerHTML=savedboardtext.innerHTML+postblock.nameinput+"</br>"+postblock.inputhtml+"</br>"+postblock.inputcal+"</br>";
    postblock.textout=postblock.nameinput+","+postblock.inputhtml+","+postblock.inputcal+"\n";
    postblock.ptname="";
    postblock.drugname="";
    postblock.nameinput="";
    resetCSS();
    postblock.innerHTML="";
}
function clearLst(){
    if(confirm("確定清除所有紀錄?")){
        savedboardtext.innerHTML="";
        postblock.textout="";
    };
}
function downloadLst(){
    filename=prompt("輸入檔名")+".csv"
    var link = window.document.createElement("a");
    link.setAttribute("href", "data:text/csv;charset=utf-8,%EF%BB%BF" + encodeURI(postblock.textout));
    link.setAttribute("download", filename);
    link.click();
    }
