const products=[

{code:"PEP221",prod:"Pepsi",price:12,instock:"Yes",category:"Beverages"},
{code:"COK113",prod:"Coca Cola",price:18,instock:"Yes",category:"Beverages"},
{code:"MIR646",prod:"Mirinda",price:15,instock:"No",category:"Beverages"},
{code:"SLI874",prod:"Slice",price:22,instock:"Yes",category:"Beverages"},
{code:"MIN654",prod:"Minute Maid",price:25,instock:"Yes",category:"Beverages"},
{code:"APP652",prod:"Appy",price:10,instock:"No",category:"Beverages"},
{code:"FRO085",prod:"Frooti",price:30,instock:"Yes",category:"Beverages"},
{code:"REA546",prod:"Real",price:24,instock:"No",category:"Beverages"},
{code:"DM5461",prod:"Dairy Milk",price:40,instock:"Yes",category:"Chocolates"},
{code:"KK6546",prod:"Kitkat",price:15,instock:"Yes",category:"Chocolates"},
{code:"PER5436",prod:"Perk",price:8,instock:"No",category:"Chocolates"},
{code:"FST241",prod:"5 Star",price:25,instock:"Yes",category:"Chocolates"},
{code:"NUT553",prod:"Nutties",price:18,instock:"Yes",category:"Chocolates"},
{code:"GEM006",prod:"Gems",price:8,instock:"No",category:"Chocolates"},
{code:"GD2991",prod:"Good Day",price:25,instock:"Yes",category:"Biscuits"},
{code:"PAG542",prod:"Parle G",price:5,instock:"Yes",category:"Biscuits"},
{code:"MON119",prod:"Monaco",price:7,instock:"No",category:"Biscuits"},
{code:"BOU291",prod:"Bourbon",price:22,instock:"Yes",category:"Biscuits"},
{code:"MAR951",prod:"MarieGold",price:15,instock:"Yes",category:"Biscuits"},
{code:"ORE188",prod:"Oreo",price:30,instock:"No",category:"Biscuits"}

];



const categories = ['Beverages','Chocolates','Biscuits'];

const stocks = ['Yes','No'];
const priceRange = ['<10','10-20','>20'];
let sortedColumnNumber = -1;
let selectedDropDownValues = {cat:'',stock:'',price:''};

let filterArr = [];

let bill = [];


show();

function show(active=0,defaultArr = products){

	let str = makeNavbar();

	active === 1 ? str += showProductTable(defaultArr) : str += '';

	document.getElementById('data').innerHTML = str;

	let element = document.getElementById('data');

}
function makeBill(){

	let totalQuan = bill.reduce( (acc,curr) => acc += +curr.quantity,0);

	let totalValue = bill.reduce( (acc,curr) => acc += +curr.value,0);


	let str = '<div class="container">';

	str += '<h4>Details of Current Bill</h4>';
	str += '<div>Items: '+bill.length+',Quantity: '+totalQuan+' ,Amount: '+totalValue+' </div>';


	let arr = bill.map( (product,index) => {

		let {code,prod,price,quantity,value} = product;

		let str = '<div class="row border">';
		str += '<div class="col-6">'+code+' '+prod+' Price: '+price+' Quantity: '+quantity+' value: '+value+'</div>';
		str += '<div class="col-6"><button class="btn btn-success btn-sm" onclick="incrementProductInBill('+index+')">+</button>';
		str += '<button class="btn btn-warning btn-sm" onclick="decrementProductInBill('+index+')">-</button>'
		str += '<button class="btn btn-danger btn-sm" onclick="removeProduct('+index+')">x</button>'
		str += '</div>';
		str += '</div>';
		return str;
	});

	let table = (arr.join('') != '') ? str + arr.join('') +'<button class="btn btn-primary btn-sm" onclick="closeBill()">Close Bill</button></div>' : str + arr.join('') + '</div>';

	return table;

}

function showProduct(defaultArr=products){
	show(1,defaultArr);

}

function makeNavbar(active = 0){

	active = active==1 ? 'active' : '';

	let str = '<nav class="navbar navbar-expand-lg navbar-dark bg-dark">';

	str += '<a class="navbar-brand" href="#">BillingSystem</a>';
	str += '<button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNavDropdown">';

	str += '<span class"navbar-toggler-icon"></span>';
	str += '</button>';
	str += '<div class="collapse navbar-collapse" id="navbarNavDropdown">';
	str += '<ul class="navbar-nav">';
	str += '<li class="nav-item '+active+'">';
	str += '<a class="nav-link" onclick="showProduct()">New Bill</a>';
	str += '</li>';
	str += '</ul>';
	str += '</div>';
	str += '</nav>';

	return str;
}

function showProductTable(productsArr = products){

	let title = '<h4 class="text-center">Product List</h4>';


	let filterRow = '<div class="row">';
	filterRow += '<div class="col-3"><b>Filter Products by:</b></div>';
	filterRow += '<div class="col-3">'+makeDropdown('categoryId',categories,'Select Category',selectedDropDownValues.cat)+'</div>';
	filterRow += '<div class="col-3">'+makeDropdown('stockId',stocks,'Select In Stock',selectedDropDownValues.stock)+'</div>';
	filterRow += '<div class="col-3">'+makeDropdown('priceRangeId',priceRange,'Select Price Range',selectedDropDownValues.price)+'</div>';
	filterRow += '</div>';

	// console.log(productsArr);

	const arr = productsArr.map( (pr,index) => {

		let {code,prod,price,instock,category} = pr;
		let str = '<div class="row border">';
		str += '<div class="col-2">'+code+'</div>';
		str += '<div class="col-2">'+prod+'</div>';
		str += '<div class="col-2">'+category+'</div>';
		str += '<div class="col-2">'+price+'</div>';
		str += '<div class="col-2">'+instock+'</div>';
		str += '<div class="col-2"><button class="btn btn-secondary btn-sm" onclick="addToBill(\''+code+'\')">Add to bill</button></div>';
		str += '</div>';

		return str;
	});

	let str0 = sortedColumnNumber === 0 ? '(x)' : '';
	let str1 = sortedColumnNumber === 1 ? '(x)' : '';
	let str2 = sortedColumnNumber === 2 ? '(x)' : '';
	let str3 = sortedColumnNumber === 3 ? '(x)' : '';
	let str4 = sortedColumnNumber === 4 ? '(x)' : '';

	let table = '<div class="row bg-dark text-white">';
	table += '<div class="col-2" onclick="sort(0)">Code'+str0+'</div>';
	table += '<div class="col-2" onclick="sort(1)">Product'+str1+'</div>';
	table += '<div class="col-2" onclick="sort(2)">Category'+str2+'</div>';
	table += '<div class="col-2" onclick="sort(3)">Price'+str3+'</div>';
	table += '<div class="col-2" onclick="sort(4)">In Stock'+str4+'</div>';
	table += '<div class="col-2"></div>';
	table += '</div>';

	table += arr.join('');

	

	return  makeBill() + title + filterRow + table;
}


function makeDropdown(id,options,header,selValue=''){

	const arr1 = options.map( opt => {

		let selected = opt === selValue ? 'selected' : '';

		return '<option '+selected+'>'+opt+'</option>';

	});

	let s1 = '<div class="form-group">';
	s1 += '<select id="'+id+'" class="form-control" onchange="filterData('+id+')">';

	let selectedHeader = selValue ? '' : 'selected';
	s1 += '<option value="" '+selectedHeader+'>'+header+'</option>';
	s1 += arr1.join('');
	s1 += '</select>';
	s1 += '</div>';

	return s1;

}

function sort(colNo){

	sortedColumnNumber = colNo;


	console.log(filterArr);

	if(filterArr.length > 0){
		switch(colNo){

			case 0 : filterArr.sort((p1,p2) => p1.code.localeCompare(p2.code)); break;
			case 1 : filterArr.sort((p1,p2) => p1.prod.localeCompare(p2.prod)); break;
			case 2 : filterArr.sort((p1,p2) => p1.category.localeCompare(p2.category)); break;
			case 3 : filterArr.sort((p1,p2) => (+p1.price)-(+p2.price)); break;
			case 4 : filterArr.sort((p1,p2) => p1.instock.localeCompare(p2.instock)); break;
		}
		showProduct(filterArr);
	}else{

		switch(colNo){

			case 0 : products.sort((p1,p2) => p1.code.localeCompare(p2.code)); break;
			case 1 : products.sort((p1,p2) => p1.prod.localeCompare(p2.prod)); break;
			case 2 : products.sort((p1,p2) => p1.category.localeCompare(p2.category)); break;
			case 3 : products.sort((p1,p2) => (+p1.price)-(+p2.price)); break;
			case 4 : products.sort((p1,p2) => p1.instock.localeCompare(p2.instock)); break;
		}
		showProduct();


	}
	
	
}

function filterData(element){

	if(element.id == 'categoryId'){

		selectedDropDownValues.cat = element.value;

	}else if(element.id === 'stockId'){

		selectedDropDownValues.stock = element.value;

	}else if(element.id === 'priceRangeId'){

		selectedDropDownValues.price = element.value;

	}

	filterProducts();
	

}

function filterProducts(){

	console.log(selectedDropDownValues.cat === '');
	console.log(selectedDropDownValues.stock === '');
	console.log(selectedDropDownValues.price === '');

	if(selectedDropDownValues.cat && !selectedDropDownValues.stock && !selectedDropDownValues.price){

		 filterArr = products.filter( product => {

		return product.category === selectedDropDownValues.cat;

		});
		showProduct(filterArr);

	}else if(selectedDropDownValues.cat && selectedDropDownValues.stock && !selectedDropDownValues.price){


		 filterArr = products.filter(product => {

			return product.category === selectedDropDownValues.cat && product.instock === selectedDropDownValues.stock;
		});

		showProduct(filterArr);

	}else if(selectedDropDownValues.cat && selectedDropDownValues.stock && selectedDropDownValues.price){

		let price = selectedDropDownValues.price;
		

		if(price === '<10'){

			filterArr = products.filter(product => {

				return product.category === selectedDropDownValues.cat && product.instock === selectedDropDownValues.stock && (product.price < 10);
			});

		}else if(price === '10-20'){

			filterArr = products.filter(product => {

				return product.category === selectedDropDownValues.cat && product.instock === selectedDropDownValues.stock && (product.price >= 10 && product.price <= 20);
			});
		}else {

			 filterArr = products.filter(product => {

				return product.category === selectedDropDownValues.cat && product.instock === selectedDropDownValues.stock && (product.price > 20);
			});
		}
		showProduct(filterArr);

	}else if(selectedDropDownValues.cat && !selectedDropDownValues.stock && selectedDropDownValues.price){

		let price = selectedDropDownValues.price;

		if(price === '<10'){

			filterArr = products.filter(product => {

				return product.category === selectedDropDownValues.cat  && (product.price < 10);
			});

		}else if(price === '10-20'){

			filterArr = products.filter(product => {

				return product.category === selectedDropDownValues.cat  && (product.price >= 10 && product.price <= 20);
			});
		}else {

			 filterArr = products.filter(product => {

				return product.category === selectedDropDownValues.cat  && (product.price > 20);
			});
		}

		showProduct(filterArr);

	}else if(selectedDropDownValues.cat === '' && selectedDropDownValues.stock === '' && selectedDropDownValues.price === ''){

		filterArr = [];

		showProduct();

	}else {

		showProduct();

	}
}

function addToBill(productCode){

	let product = products.find(prd =>{

		return prd.code === productCode;

	});


	submitToBill(product);


}

function submitToBill(productInformation){

	let {code,prod,price} = productInformation;

	let index = bill.findIndex(pr => pr.code === code);

	if(index >= 0){

		bill[index].quantity += 1;

		bill[index].value = bill[index].price * bill[index].quantity;

		if(filterArr.length > 0){
			showProduct(filterArr);	
		}else{
			showProduct();
		}

	}else {

		let quantity = 1;

		let value = price * quantity;

		let billProduct = {code:code,prod:prod,price:price,quantity:quantity,value:value};

		bill.push(billProduct);

		if(filterArr.length > 0){
			showProduct(filterArr);	
		}else{
			showProduct();
		}
		

	}
}
function incrementProductInBill(index){

	bill[index].quantity += 1;

	bill[index].value = bill[index].price * bill[index].quantity;

	(filterArr.length > 0) ? showProduct(filterArr) : showProduct();
}
function decrementProductInBill(index){

	if(bill[index].quantity > 1){

		bill[index].quantity -= 1;

		bill[index].value = bill[index].price * bill[index].quantity;

	}else{

		bill.splice(index,1);

	}
	(filterArr.length > 0) ? showProduct(filterArr) : showProduct();

}
function removeProduct(index){

	bill.splice(index,1);

	(filterArr.length > 0) ? showProduct(filterArr) : showProduct();
}
function closeBill(){

	alert('Closing the current bill');
	bill = [];
	filterArr = [];
	selectedDropDownValues = {cat:'',stock:'',price:''};

	showProduct();

}
