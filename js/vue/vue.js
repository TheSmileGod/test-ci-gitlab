var allHome = new Vue({
	el: '#home-container',
	data:{
		type : '',
		mouse_weight : 0,
		cat_weight : 0,
		dog_weight : 0,
		fox_weight : 0,
		wolf_weight : 0,
		truck_weight : 0,
		truck_object : 'mouse',
		truck_cost : 1,
		house_count : 5,
		truck_moved: false,
		house_length: 182,
		cursor_weight : 0,
		truckCounter: 0,
		truck_left:  860,
		truck_parking : 5,
		initX: 0,
		move: false,
		truck_length: 290,
		start_point : 860,
		disable_m_button: false,
		arrived: false,
		hide_flag: true,
		hide_fail: true,
		hide_success: true,
		refresh_flag: false,
		windowWidth: 0,
		allow_path: 20,
		path_dealer: 0,
		dX : 0,
		
	},
	
	mounted() {
		this.$nextTick(function() {
			window.addEventListener('resize', this.getWindowWidth);
			
			this.getWindowWidth()
		})
	},


	methods: {
		getWindowWidth(event) {
			this.windowWidth = document.documentElement.clientWidth;
			
			this.house_length = Math.floor(this.windowWidth * 0.135)
			this.truck_length = Math.floor(this.windowWidth * 0.2025)
			this.start_point = this.house_count*this.house_length 
			this.truck_left = this.house_count*this.house_length 
			this.allow_path = Math.floor(this.windowWidth * 0.01)
			
		},
		
		
		RiseTruck: function () {
			this.truck_weight += 1
			this.truckCounter += 1
		},
		DecreaseTruck: function () {
			this.truck_weight = this.truck_weight - 1
			this.truckCounter = this.truckCounter - 1
		},
		
		mobilestartmove: function (e) {
			this.initX = e.targetTouches[0].pageX
			this.move = true
			this.dX = (this.truck_left - this.initX)
			
		},
		
		mobilegomove: function (e) {
			var current_pos = e.targetTouches[0].pageX
			
			var min_limit = this.start_point - (this.house_count * this.house_length)
			var max_limit = this.start_point 
			
			
			if ( current_pos < max_limit){
				this.truck_moved = true
				this.disable_m_button = true
				
			}
			if (this.move){
				if(this.truck_moved){
					if( ( current_pos > min_limit) && ( current_pos < max_limit )){
						this.truck_left = current_pos  - (this.truck_length)
						this.path_dealer = this.path_dealer + 1
					}
				}else{
					if( ( current_pos > min_limit) && ( current_pos < (this.start_point + (this.truck_length)) )){
						this.truck_left = current_pos - (this.truck_length)
						this.path_dealer = this.path_dealer + 1
					}
				}
			}
		},
		mobilestopmove: function (e) {
			var finishX = this.truck_left + (this.truck_length/2)
			
			
			if (this.move){
				var i;
				for (i = 0; i < this.house_count; ++i) {
					if ((finishX > (i * this.house_length)) && (finishX < ((i+1) * this.house_length))){
						this.truck_parking = i
					} 
				}
				if (this.truck_parking != 5){
					this.truck_left = this.truck_parking * this.house_length - (this.truck_length/4)
					this.truck_moved = true
					this.disable_m_button = true
					console.log('moved:' + this.truck_moved)
					if ((this.truck_weight > 0) && (this.path_dealer > this.allow_path)){
						switch(this.truck_parking) {
							case 4: 
								
								this.mouse_weight = this.mouse_weight + this.truck_weight
								this.truck_weight = 0
								break

							case 3: 
								if ( (this.truck_weight % 2) == 0 ){
									this.cat_weight = this.cat_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
							case 2:
								if ( (this.truck_weight % 4) == 0 ){
									this.dog_weight = this.dog_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
							case 1:
								if ( (this.truck_weight % 8) == 0 ){
									this.fox_weight = this.fox_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
							case 0:
								if ( (this.truck_weight % 16) == 0 ){
									this.wolf_weight = this.wolf_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
						}
						
					}
				}else{
					this.truck_left = this.start_point 
					
				}
				
			}
			this.move = false
			
			this.path_dealer = 0
		},
		
		startmove: function (e) {
			this.initX = e.clientX
			this.move = true
			this.dX = (this.truck_left - this.initX)
			
		},
		stopmove: function (e) {
		
			var finishX = this.truck_left + (this.truck_length/2)
			
			
			if (this.move){
				var i;
				for (i = 0; i < this.house_count; ++i) {
					if ((finishX > (i * this.house_length)) && (finishX < ((i+1) * this.house_length))){
						this.truck_parking = i
					} 
				}
				if (this.truck_parking != 5){
					this.truck_left = this.truck_parking * this.house_length - (this.truck_length/4)
					this.truck_moved = true
					this.disable_m_button = true
					console.log('moved:' + this.truck_moved)
					if ((this.truck_weight > 0) && (this.path_dealer > this.allow_path)){
						switch(this.truck_parking) {
							case 4: 
								
								this.mouse_weight = this.mouse_weight + this.truck_weight
								this.truck_weight = 0
								break

							case 3: 
								if ( (this.truck_weight % 2) == 0 ){
									this.cat_weight = this.cat_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
							case 2:
								if ( (this.truck_weight % 4) == 0 ){
									this.dog_weight = this.dog_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
							case 1:
								if ( (this.truck_weight % 8) == 0 ){
									this.fox_weight = this.fox_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
							case 0:
								if ( (this.truck_weight % 16) == 0 ){
									this.wolf_weight = this.wolf_weight + this.truck_weight
									this.truck_weight = 0
								}
								break
						}
						
					}
				}else{
					this.truck_left = this.start_point 
					
				}
				
			}
			this.move = false
			
			this.path_dealer = 0
		},
		gomove: function (e) {
			
			 
			var min_limit = this.start_point - (this.house_count * this.house_length)
			var max_limit = this.start_point 
			
			
			if ( e.clientX < max_limit){
				this.truck_moved = true
				this.disable_m_button = true
				
			}
			if (this.move){
				if(this.truck_moved){
					if( ( e.clientX > min_limit) && ( e.clientX < max_limit )){
						this.truck_left = e.clientX - (this.truck_length)
						this.path_dealer = this.path_dealer + 1
					}
				}else{
					if( ( e.clientX > min_limit) && ( e.clientX < (this.start_point + (this.truck_length)) )){
						this.truck_left = e.clientX - (this.truck_length)
						this.path_dealer = this.path_dealer + 1
					}
				}
			}
		},
		
		
		cursor: function (el) {
			
			this.type = el
			
		},
		cursor_weight_down : function (from, pay) {
			switch(from) {
				case 'mouse': 
					if (this.cursor_weight > (pay - 1)) {
						this.mouse_weight = this.mouse_weight + pay
						this.cursor_weight = this.cursor_weight - pay
					}
					break

				case 'cat': 
					if (this.cursor_weight > (pay - 1)) {
						this.cat_weight = this.cat_weight + pay
						this.cursor_weight = this.cursor_weight - pay
					}
					break
				case 'dog':
					if (this.cursor_weight > (pay - 1)) {
						this.dog_weight = this.dog_weight + pay
						this.cursor_weight = this.cursor_weight - pay
					}
					break
				case 'fox':
					if (this.cursor_weight > (pay - 1)) {
						this.fox_weight = this.fox_weight + pay
						this.cursor_weight = this.cursor_weight - pay
					}
					break
				case 'wolf':
					if (this.cursor_weight > (pay - 1)) {
						this.wolf_weight = this.wolf_weight + pay
						this.cursor_weight = this.cursor_weight - pay
					}
					break
				case 'truck':
					if (this.cursor_weight > (pay - 1)) {
						this.truck_weight = this.truck_weight + pay
						this.cursor_weight = this.cursor_weight - pay
					}
					break
				
			}
			
			
			
		},
		cursor_weight_up : function (from, pay) {
			switch(from) {
				case 'mouse': 
					if (this.mouse_weight > (pay - 1)) {
						this.mouse_weight = this.mouse_weight - pay
						this.cursor_weight = this.cursor_weight + pay
					}	
					break
				case 'cat': 
					if (this.cat_weight > (pay - 1)) {
						this.cat_weight = this.cat_weight - pay
						this.cursor_weight = this.cursor_weight + pay
					}
					break
				case 'dog':
					if (this.dog_weight > (pay - 1)) {
						this.dog_weight = this.dog_weight - pay
						this.cursor_weight = this.cursor_weight + pay
					}
					break
				case 'fox':
					if (this.fox_weight > (pay - 1)) {
						this.fox_weight = this.fox_weight - pay
						this.cursor_weight = this.cursor_weight + pay
					}
					break
				case 'wolf':
					if (this.wolf_weight > (pay - 1)) {
						this.wolf_weight = this.wolf_weight - pay
						this.cursor_weight = this.cursor_weight + pay
					}
					break
			}	
			this.truck_cost = pay
			this.truck_object = from
			
			console.log('truck(up): '+ this.truck_object +','+ this.truck_cost)
			console.log('Cursor(up): '+ this.cursor_weight)
			
			
		},
		
		
		checkquest: function () {
			
			//this.allblock()
			
			if ((this.cursor_weight + this.truck_weight) == 0 
			&& (this.mouse_weight < 2) && (this.cat_weight < 3) 
			&& (this.dog_weight < 5) && (this.fox_weight < 9) && (this.wolf_weight < 17)){
				this.hide_flag = false
				this.hide_success = false
			} else {
				this.hide_flag = true
				this.hide_fail = false
			}
		},
		allblock: function () {
			this.type = ''
			this.truck_moved = true
			this.disable_m_button = true
			this.refresh_flag = false
			
			
		},	

		
		refreshAll: function () {
			this.type = ''
			this.mouse_weight = 0
			this.cat_weight = 0
			this.dog_weight = 0
			this.fox_weight = 0
			this.wolf_weight = 0
			this.truck_weight = 0
			this.truck_object = 'mouse'
			this.truck_cost = 1
			this.house_count = 5
			this.truck_moved = false
			this.cursor_weight = 0
			this.truckCounter = 0
			this.truck_parking = 0
			this.initX = 0
			this.move = false
			this.disable_m_button = false
			this.arrived = false
			this.hide_flag = true
			this.hide_fail = true
			this.hide_success = true
			this.refresh_flag = false
			
			this.getWindowWidth()
			
			
			
		},
		
	},
	
	
})
