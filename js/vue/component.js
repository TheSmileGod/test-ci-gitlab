Vue.component('home', {
	template: `
		<div>
			<li v-if="!check_mobile"
			class="col-house" 
			v-bind:class="'col-' + type" 
			
			v-on:mousedown="transitfrom" 
			v-on:mouseup="transitto"
			v-on:mouseleave="mousein = false"
			v-on:mouseover="mousein = true"
			>
				<div class="col-house-in" v-bind:class="'col-' + type + '-in' + ' col-' + type + '-' + counter">
					<img class="count-beast" v-bind:class="[{'hide': hide_flag } , countshow]" v-bind:src="'images/'+countshow+'.png'" alt="">
					
					
				</div>
				<div class="parking"></div>
			</li>
			
			<li v-else
			class="col-house" 
			v-bind:class="'col-' + type" 
			
			@touchstart.prevent="transitfrom"   
			@touchend.prevent="transitto"  
			@touchmove.prevent="mobilemove"
			>
				<div class="col-house-in" v-bind:class="'col-' + type + '-in' + ' col-' + type + '-' + counter">
					<img class="count-beast" v-bind:class="[{'hide': hide_flag } , countshow]" v-bind:src="'images/'+countshow+'.png'" alt="">
					
					
				</div>
				<div class="parking"></div>
			</li>
		</div>
	`,
	data: function () {
		return { 
			mousein: false,
			check_mobile: mobile,
			initY : 0,
			finishY : 0,
		}
	},
	computed: {
		counter: function () {
			return Math.floor(this.weight/this.cost)
		},
		countshow: function () {
			if (this.counter == 1) {
				return 'one'
			}else{
				return 'zero'
			}
		},
		
		hide_flag: function () {
			if (( (this.check_show/this.cost) >= 1) && !this.hide) {
				return false
			}else{
				return true
			}
		},
	},
	props:{
		weight:{
			type: Number,
			default: 0,
		},
		cost:{
			type: Number,
			default: 1,
		},
		type:{
			type: String,
			default: 'mouse',
		},
		hide:{
			type: Boolean,
			default: true,
		},
		check_show:{
			type: Number,
			default: 0,
		},
		truck_weight : {
			type: Number,
			default: 0,
		},
		
		truck_cost : {
			type: Number,
			default: 1,
		},
		cursor_weight:{
			type: Number,
			default: 0
		},
	},
	
	methods: {
		transitto: function (e){
			this.finishY = this.check_mobile ? this.finishY : e.clientY
			var path = this.finishY - this.initY 
			if (path < 20){
				
				this.$emit('transit_c_to_h', this.type, this.cursor_weight)
			}else{
				this.changecursor('changecursor', '')
				this.$emit('transit_c_to_h', 'truck', this.cursor_weight)
			}
			this.changecursor('')
			
			
		},
		mobilemove: function (e){
			this.finishY = e.targetTouches[0].pageY
		},
		transitfrom: function (e){
			this.initY = this.check_mobile ? e.targetTouches[0].pageY : e.clientY
			if ((this.truck_weight != 0) && (this.truck_cost != this.cost)){
			
				this.changecursor('stop')
				
			}else{
				
				if (this.weight >= this.cost){
					this.$emit('transit_h_to_c', this.type, this.cost)
					this.changecursor(this.type)
				}
			}
			
			
			
		},
		changecursor: function (el) {
					
			this.$emit('changecursor', el)
			
		},
	
	}
})


Vue.component('truck', {
	template: `
		<div>
			<div v-if="!check_mobile"
				class="truck" 
				v-bind:style="{'position':'absolute', 'left': leftstyle}"
				v-bind:class="object+'-in-truck-'+counter"
				
				v-on:mousedown="startmove"
				v-on:mouseup="stopmove"
				v-on:mouseleave="mousein = false; stopmove"
				v-on:mousemove="gomove"
				v-on:mouseover="mousein = true"
				
				
				
				>
			</div>
			<div  v-else 
				class="truck" 
				
				:class="object+'-in-truck-'+counter"
				:style="{'position':'absolute', 'left': leftstyle}"
				
				@touchstart.prevent="mobilestartmove"   
				@touchend.prevent="mobilestopmove"  
				@touchcancel.prevent="mobilestopmove" 
				@touchmove.prevent="mobilegomove"
			>	
			</div>
		</div>
	`,
	props:{
		cursor_weight:{
			type: Number,
			default: 0
		},
		weight:{
			type: Number,
			default: 0
		},
		object:{
			type: String,
			default: 'mouse'
		},
		cost:{
			type: Number,
			default: 1
		},
		leftstyle:{
			type: String,
			default: '0px',
		},
		allow_path:{
			type: Number,
			default: 20
		},
		
	},
	
	data: function () {
		return { 
			mousein: false,
			touch: 0,
			check_mobile: mobile
		}
	},
	
	computed: {
		counter: function () {
			return Math.floor(this.weight/this.cost)
		},
		
      
	},
	
	methods: {
		show: function (el) {
			console.log(el)
		},
		startmove: function (e) {
			
			
			this.$emit('startmove', e)
		},
		stopmove: function (e) {
			
			this.$emit('stopmove', e)
			if (this.mousein){
				this.changecursor('changecursor', '')
				this.$emit('transit_c_to_t', 'truck', this.cursor_weight)
			}
			
		},
		gomove: function (e) {
			
			this.$emit('gomove', e)
		},
		changecursor: function (el) {
					
			this.$emit('changecursor', el)
			
		},
		
		mobilestartmove: function (e) {
			this.$emit('mobilestartmove', e)
			
		},
		mobilestopmove: function (e) {
			this.$emit('mobilestopmove', e)
			
		},
		mobilegomove: function (e) {
			
			
			this.$emit('mobilegomove', e)
		},
		
	},
	
	
})

 
Vue.component('mouse-button', {
	template: `
		
		<div class="mouse-buttons">
			<a href="#looks-well"  
			@click="decrease"
			@mousedown="state_minus = '-push'"
			@mouseup="state_minus =  ''"
			@mouseleave="state_minus =  ''"
			@mouseover="state_minus = '-hover'"
			:class="'mouse-minus'+class_minus"
			>
			
			</a>
			<a href="#looks-well" 
			@click="riseup"
			@mousedown="state_plus =  '-push'"
			@mouseup="state_plus =  ''"
			@mouseleave="state_plus =  ''"
			@mouseover="state_plus =  '-hover'"
			:class="'mouse-pluse'+class_plus"
			>
			</a>
			<div class="loader hidden">
				<img src="images/mouse-minus-hover.png">
				<img src="images/mouse-minus-push.png">
				<img src="images/mouse-minus-inactive.png">
				<img src="images/mouse-minus.png">
			</div>
			<div class="loader hidden">
				<img src="images/mouse-pluse-hover.png">
				<img src="images/mouse-pluse-push.png">
				<img src="images/mouse-pluse-inactive.png">
				<img src="images/mouse-pluse.png">
			</div>
		</div>
			
	`,
	
	data: function () {
		return { 
			counter: 0,
			state_minus : '',
			state_plus : '',
		}
	},
  
	props:{
		limit:{
			type: Number,
			default: 31
		},
		disable_component:{
			type: Boolean,
			default: false,
		},
		refresh:{
			type: Boolean,
			default: false,
		},
		check_counter:{
			type: Number,
			default: 1
		},
		
	},
	
	computed: {
		class_minus: function(){
			if (this.disable_component == true){
				this.state_plus = '-inactive'
				return '-inactive'
			}
			if( this.check_counter == 0){
				console.log('else:'+this.check_counter)
				this.state_minus = '-inactive'
			} 
			return this.state_minus
		},
		class_plus: function(){
			if (this.disable_component == true){
				this.state_plus = '-inactive'
				return '-inactive'
			}
			if( this.check_counter == this.limit){
				console.log('else:'+this.check_counter)
				this.state_plus = '-inactive'
			}
			if( this.check_counter == 0){
				console.log('else:'+this.check_counter)
				this.state_plus = ''
			}			
			return this.state_plus
		},
		
	},
	
	methods: {
		riseup: function () {
			if ( this.check_counter == 0){
				this.counter = 0
			}
			if ((this.counter < this.limit) && !this.disable_component){
				this.counter += 1
				this.state_minus = '' 
				this.$emit('counterrise')
			}
		},
		decrease: function () {
			if ( this.check_counter == 0){
				this.counter = 0
			}
			if ((this.counter > 0) && !this.disable_component){
				this.counter = this.counter - 1
				this.state_plus = '' 
				this.$emit('counterdecrease')
			}
		},
	}, 
})
//cache imitator
Vue.component('loadcash', {
	template:`
		<div v-html="images" class="hidden">
		</div>
	`,
	
	props:{
		objects:{
			type: Object,
			default: function () {
				return { 1 : ['mouse','jpg','gif'], 2 : ['cat','png','gif']}
			}
		},
		limit_weight:{
			type: Number,
			default: 31
		},
	},
	
	computed: {
    
		images: function () {
			var returnData = ''
			
			for(var index in this.objects) { 
				
				var value = this.objects[index]
				
				var max = Math.floor(this.limit_weight /  index)
				
				var path = 'images/'+value[0]+'-in-truck/'+value[1]+'/'
				for (var i = 1; i <= max; i++){
					returnData = returnData + '<img src="'+path + i +'.'+value[1]+'">'
				}
				path = 'images/animate-'+value[0]+'-in-house/'+value[2]+'/'
				for (var i = 1; i <= max; i++){
					returnData = returnData + '<img src="'+path + i +'.'+value[2]+'">'
				}
			}	
			
			return returnData 
		}
  }
})