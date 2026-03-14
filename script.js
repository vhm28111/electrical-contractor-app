function addRow(){

let table = document.getElementById("quotationTable").getElementsByTagName('tbody')[0];

let rowCount = table.rows.length;

let row = table.insertRow();

row.innerHTML = `
<td>${rowCount + 1}</td>
<td><textarea class="desc" rows="1"></textarea></td>
<td><input type="number" oninput="calculateRow(this)"></td>
<td><input type="number" oninput="calculateRow(this)"></td>
<td class="amount">0</td>
`;

}

function calculateRow(input){

let row = input.parentElement.parentElement;

let qty = row.cells[2].querySelector("input").value || 0;
let rate = row.cells[3].querySelector("input").value || 0;

let amount = qty * rate;

row.cells[4].innerText = amount.toFixed(2);

calculateTotal();

}

function calculateTotal(){

let amounts = document.querySelectorAll(".amount");

let subtotal = 0;

amounts.forEach(function(a){
subtotal += Number(a.innerText);
});

let gst = subtotal * 0.18;

let total = subtotal + gst;

document.getElementById("subtotal").value = subtotal.toFixed(2);
document.getElementById("gst").value = gst.toFixed(2);
document.getElementById("grandTotal").value = total.toFixed(2);

document.getElementById("amountWords").innerText =
"Amount in Words: " + numberToWords(Math.round(total)) + " Only";

}

function numberToWords(num){

const ones=["","One","Two","Three","Four","Five","Six","Seven","Eight","Nine","Ten",
"Eleven","Twelve","Thirteen","Fourteen","Fifteen","Sixteen",
"Seventeen","Eighteen","Nineteen"];

const tens=["","","Twenty","Thirty","Forty","Fifty","Sixty","Seventy","Eighty","Ninety"];

if(num<20) return ones[num];

if(num<100)
return tens[Math.floor(num/10)]+" "+ones[num%10];

if(num<1000)
return ones[Math.floor(num/100)]+" Hundred "+numberToWords(num%100);

if(num<100000)
return numberToWords(Math.floor(num/1000))+" Thousand "+numberToWords(num%1000);

if(num<10000000)
return numberToWords(Math.floor(num/100000))+" Lakh "+numberToWords(num%100000);

return numberToWords(Math.floor(num/10000000))+" Crore "+numberToWords(num%10000000);

}

function printPage(){
window.print();
}

function downloadPDF(){

let buttons=document.querySelector(".buttons");
buttons.style.display="none";

let element=document.querySelector(".container");

html2pdf()
.set({
margin:5,
filename:"estimation.pdf",
html2canvas:{scale:2},
jsPDF:{unit:"mm",format:"a4",orientation:"portrait"}
})
.from(element)
.save()
.then(()=>{
buttons.style.display="block";
});

}

function saveData(){

let content=document.documentElement.outerHTML;

let blob=new Blob([content],{type:"text/html"});

let link=document.createElement("a");

link.href=URL.createObjectURL(blob);

let name=prompt("Enter File Name","estimation");

if(name==null) return;

link.download=name+".html";

link.click();

}