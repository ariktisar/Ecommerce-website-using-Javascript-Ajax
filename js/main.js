$(document).ready(function(){
	cat();
	brand();
	product();
	function cat(){
		$.ajax({
			url	:	"action.php",
			method:	"POST",
			data	:	{category:1},
			success	:	function(data){
				$("#get_category").html(data);
}})}
	function brand(){
		$.ajax({
			url	:	"action.php",
			method:	"POST",
			data	:	{brand:1},
			success	:	function(data){
				$("#get_brand").html(data);
			}	})}
		function product(){
		$.ajax({
			url	:	"action.php",
			method:	"POST",
			data	:	{getProduct:1},
			success	:	function(data){
				$("#get_product").html(data);
			}})}
	$("body").delegate(".category","click",function(event){
		$("#get_product").html("<h3>Loading...</h3>");
		event.preventDefault();
		var cid = $(this).attr('cid');
			$.ajax({
			url		:	"action.php",
			method	:	"POST",
			data	:	{get_seleted_Category:1,cat_id:cid},
			success	:	function(data){
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}}})})
	$("body").delegate(".selectBrand","click",function(event){
		event.preventDefault();
		$("#get_product").html("<h3>Loading...</h3>");
		var bid = $(this).attr('bid');
			$.ajax({
			url		:	"action.php",
			method	:	"POST",
			data	:	{selectBrand:1,brand_id:bid},
			success	:	function(data){
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}}})})
	$("#search_btn").click(function(){
		$("#get_product").html("<h3>Loading...</h3>");
		var keyword = $("#search").val();
		if(keyword != ""){
			$.ajax({
			url		:	"action.php",
			method	:	"POST",
			data	:	{search:1,keyword:keyword},
			success	:	function(data){
				$("#get_product").html(data);
				if($("body").width() < 480){
					$("body").scrollTop(683);
				}}})}})
	$("#login").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url	:	"login.php",
			method:	"POST",
			data	:$("#login").serialize(),
			success	:function(data){
				if(data == "login_success"){
					window.location.href = "profile.php";
				}else if(data == "cart_login"){
					window.location.href = "cart.php";
				}else{
					$("#e_msg").html(data);
					$(".overlay").hide();
				}}})})
	$("#signup_form").on("submit",function(event){
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url : "register.php",
			method : "POST",
			data : $("#signup_form").serialize(),
			success : function(data){
				$(".overlay").hide();
				if (data == "register_success") {
					window.location.href = "cart.php";
				}else{
					$("#signup_msg").html(data);
				}}})})
	$("body").delegate("#product","click",function(event){
		var pid = $(this).attr("pid");
		event.preventDefault();
		$(".overlay").show();
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {addToCart:1,proId:pid},
			success : function(data){
				count_item();
				getCartItem();
				$('#product_msg').html(data);
				$('.overlay').hide();
			}	})})
	count_item();
	function count_item(){
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {count_item:1},
			success : function(data){
				$(".badge").html(data);
			}})}
	getCartItem();
	function getCartItem(){
		$.ajax({
			url : "action.php",
			method : "POST",
			data : {Common:1,getCartItem:1},
			success : function(data){
				$("#cart_product").html(data);
			}	})}
	$("body").delegate(".remove","click",function(event){
		var remove = $(this).parent().parent().parent();
		var remove_id = remove.find(".remove").attr("remove_id");
		$.ajax({
			url	:	"action.php",
			method	:	"POST",
			data	:	{removeItemFromCart:1,rid:remove_id},
			success	:	function(data){
				$("#cart_msg").html(data);
				checkOutDetails();
			}
		})


	})
	checkOutDetails();
		function checkOutDetails(){
				 $('.overlay').show();
					$.ajax({
						url : "action.php",
						method : "POST",
						data : {Common:1,checkOutDetails:1},
						success : function(data){
							$('.overlay').hide();
							$("#cart_checkout").html(data);
								net_total();
						}
					})
				}
	}	})})
	$("body").delegate("#page","click",function(){
		var pn = $(this).attr("page");
		$.ajax({
			url	:	"action.php",
			method	:	"POST",
			data	:	{getProduct:1,setPage:1,pageNumber:pn},
			success	:	function(data){
				$("#get_product").html(data);
			}})})})
