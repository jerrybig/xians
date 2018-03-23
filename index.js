var home=Vue.extend({template:"#home"});
var sell=Vue.extend({template:"#sell"});
var shop=Vue.extend({template:"#shop",
	data(){
		return{
			goods:[]
		}
	},
	created(){
		for(var i=0; i<localStorage.length; i++){
			var k=localStorage.key(i);
			var v=JSON.parse(localStorage.getItem(k));
			this.goods.push(v);
		}
	},
	methods:{
		little(val,key){
			if(val.number==1){
				var a=confirm("是否删除该商品");
				if(a==true){
					localStorage.removeItem(key);
					this.goods.splice(val,1);
				}else{
					alert("还有很多商品");
				}
			}else{
				val.number--;
			}
		},
		more(val){
			val.number++;
		}
	},
	computed:{
		zj:function(){
			var zj=0;
			for(var h in this.goods){
				zj+=parseInt(this.goods[h].p3.slice(1)*this.goods[h].number);
			}
			return zj;
		}
	}
	
});
var mine=Vue.extend({template:"#mine"});

var coun=Vue.extend({template:"#coun",
	data:function(){
		return{
			arrs:[],
			goods:{}
		}
	},
	created:function(){
		this.$http.get("http://localhost:8888/").then(function(res){
			this.arrs=JSON.parse(res.body);
		})
	},
	methods:{
		add(k){
			var key=this.arrs.twos[k].id;
			
			var mes=localStorage.getItem(key);
			if(mes){
				mes=JSON.parse(mes);
				mes.number++;
				mes=JSON.stringify(mes);
				localStorage.setItem(key,mes);
			}else{
				this.arrs.twos[k].number=1;
				var val=JSON.stringify(this.arrs.twos[k]);
				localStorage.setItem(key,val);
			}
		}
	}
});
var wide=Vue.extend({
	template:"#wide",
	data:function(){
		return{
			arrs:[],
			goods:{}
		}
	},
	created:function(){
		this.$http.get("http://localhost:8888/").then(function(res){
			this.arrs=JSON.parse(res.body);
		})
	},
	methods:{
		add(k){
			var key=this.arrs.ones[k].id;
			
			var mes=localStorage.getItem(key);
			if(mes){
				mes=JSON.parse(mes);
				mes.number++;
				mes=JSON.stringify(mes);
				localStorage.setItem(key,mes);
			}else{
				this.arrs.ones[k].number=1;
				var val=JSON.stringify(this.arrs.ones[k]);
				localStorage.setItem(key,val);
			}
		}
	}
});
var ice=Vue.extend({template:"#ice"});
var sec=Vue.extend({template:"#sec"});
var hui=Vue.extend({template:"#hui"});
var nut=Vue.extend({template:"#nut"});
var supe=Vue.extend({template:"#supe"});
var thin=Vue.extend({template:"#thin"});

var router=new VueRouter({
	routes:[
		{path:"/home",component:home,
			children:[
				{path:"/home/coun",component:coun},
				{path:"/home/wide",component:wide},
				{path:"/home/ice",component:ice},
				{path:"/home/sec",component:sec},
				{path:"/home/hui",component:hui},
				{path:"/home/nut",component:nut},
				{path:"/home/supe",component:supe},
				{path:"/home/thin",component:thin},
				{path:"/home/",component:coun},
			]},
		{path:"/sell",component:sell},
		{path:"/shop",component:shop},
		{path:"/mine",component:mine},
		{path:"/",component:home}
	]
});

var vue=new Vue({
	el:"#app",
	router:router
});
