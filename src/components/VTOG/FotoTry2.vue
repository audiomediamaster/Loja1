<template>
	<div id="contentx" v-if="isAuthenticated">
		<v-container align-center justify-center>
			<v-layout align-center justify-center column fill-height mt-3>
				<div id="containerx" class="hide">
					<canvas id="image" width="300" height="400" ref="canvas"></canvas>
					<img id="glass" src="" />
					<canvas id="overlay" width="300" height="400"></canvas>
				</div>
				<br />
				 <v-flex xs8 >
        <v-card class="card--flex-toolbar">
          <v-toolbar card prominent>
            <v-btn color="blue-grey" class="white--text btn1" @click="uploadA">Upload
					<input type="file" accept="image/*" capture="user" id="files" name="files[]" style="display:none;" />
					<v-icon right dark>cloud_upload</v-icon>
				</v-btn>
				<v-dialog v-model="dialog" fullscreen hide-overlay transition="dialog-bottom-transition">
					<v-btn slot="activator" color="blue-grey" class="white--text btn1" >Foto</v-btn>
					<v-card>
						<v-toolbar dark color="primary">
							<v-btn icon dark @click.native="dialog = false">
								<v-icon>close</v-icon>
							</v-btn>
							<v-toolbar-title>Settings</v-toolbar-title>
							<v-spacer></v-spacer>
							<v-toolbar-items>
								<v-btn dark flat @click.native="dialog = false">Save</v-btn>
							</v-toolbar-items>
						</v-toolbar>
						<v-list three-line subheader>
							<v-container fluid>
								<v-layout id="ctx" column align-center>
									<video id="video" width="300" height="400" preload="auto" loop playsinline autoplay ref="video" v-show="true">
									</video>
									<v-divider></v-divider>
									<v-btn id="snap" @click.native="dialog = false">Snap Photo</v-btn>
								</v-layout>
							</v-container>
						</v-list>
					</v-card>
				</v-dialog>
				<v-btn color="blue-grey" class="white--text btn1" @click="rotate">rotate </v-btn>

          
          </v-toolbar>

          
        </v-card>
      </v-flex>
				
				<p id="convergence"></p>
				<p id="positions"></p>
				<v-flex md6 align-center justify-center>
					<swiper :options="swiperOption">
						<swiper-slide v-for="(item,i) in items" class="mb-5 px-5 align-center justify-space-between row fill-height" :key="i">
							<v-flex xs6 offset-xs3>
								<v-card>
									<v-img :src="item.thumbnail_url" height="150px" contain @click="animateClean(item.thumbnail_url)">
									</v-img>
									<v-card-title primary-title>
										<div>
											<div class="headline">{{item.title }}</div>
											<span class="grey--text">{{item.title }}</span>
										</div>
									</v-card-title>
									<v-card-actions class="d-inline-block align-end align-content-end pl-5 ">
										<v-btn flat>Share</v-btn>
										<v-btn flat color="purple">Explore</v-btn>
										<v-btn icon @click="show = !show">
											<v-icon>{{ show ? 'keyboard_arrow_down' : 'keyboard_arrow_up' }}</v-icon>
										</v-btn>
									</v-card-actions>
									<v-slide-y-transition>
										<v-card-text v-show="show">
											{{item.description}}
										</v-card-text>
									</v-slide-y-transition>
								</v-card>
							</v-flex>
						</swiper-slide>
						<div class="swiper-pagination" slot="pagination"></div>
					</swiper>
				</v-flex>
			</v-layout>
		</v-container>
	</div>
</template>
<script>
	var $ = require('jquery');
	import clm from "clmtrackr";
	//var clm = require("../../assets/js/clmtrackr");
	require("../../assets/js/utils.js");
	require("../../assets/js/dat.gui.min.js");
	//require("../../assets/js/libs/Stats.js");
	var ploc = [];
	var ploca = [];
	var ploco = [];
	var plocv = [];
	var plocw = [];
	var ctrack = new clm.tracker({
		searchWindow: 11,
		stopOnConvergence: true,
		scoreThreshold: 0.5
	});
	ctrack.init();
	export default {
		name: 'foto2',
		data() {
			return {
				cW: "180px",
				cH: "180px",
				dialog: false,
				notifications: false,
				sound: true,
				widgets: false,
				items: [],
				show: false,
				swiperOption: {
					effect: 'coverflow',
					grabCursor: true,
					centeredSlides: true,
					slidesPerView: 'auto',
					coverflowEffect: {
						rotate: 50,
						stretch: 0,
						depth: 100,
						modifier: 1,
						slideShadows: false
					},
					pagination: {
						el: '.swiper-pagination'
					}
				}
			}
		},
		methods: {
			uploadA() {
				document.getElementById('files').click();
			},
			rotate() {
				document.getElementById('image').style.transform = "scaleX(-1)";
				document.getElementById('image').style.transform = "rotateZ(90deg)";
				document.getElementById('overlay').style.transform = "scaleX(-1)";
				document.getElementById('overlay').style.transform = "rotateZ(90deg)";
				//			document.getElementById('overlay').setAttribute('width', document.getElementById('image').height+ "px");	
				//			document.getElementById('overlay').setAttribute('height', document.getElementById('image').width+ "px");	
			},
			startMirror() {
				var canvas = document.getElementById('image');
				var cc = canvas.getContext('2d');
				var overlay = document.getElementById('overlay');
				var overlayCC = overlay.getContext('2d');
				var drawRequest;
				var canselDraw;
				this.oi = function animateClean(maskA) {
					var model = maskA;
					document.getElementById('glass').setAttribute('src', model);
					ctrack.start(document.getElementById('image'));
					//run();
					drawLoop();
					positionLoop();
				}

				function animate(box) {
					ctrack.start(document.getElementById('image'), box);
					drawLoop();
				}

				function drawLoop() {
					drawRequest = requestAnimFrame(drawLoop);
					overlayCC.clearRect(0, 0, canvas.width, canvas.height);
					if (ctrack.getCurrentPosition()) {
						//ctrack.draw(overlay);
					}
				}

				function positionLoop() {
					canselDraw = requestAnimFrame(positionLoop);
					var positions = ctrack.getCurrentPosition();
					// do something with the positions ...
					// print the positions
					var positionString = "";
					if (positions && document.getElementById('glass').style != null) {
						for (var p = 0; p < 71; p++) {
							ploc = positions[27];
							ploca = positions[32];
							ploco = positions[33];
							plocv = positions[0];
							plocw = positions[14];
							if (p === 70) {
								document.getElementById('glass').style.top = ploco[1].toFixed(2) - ((plocw[0] - plocv[0]) / 2).toFixed(2) + 0 + "px";
								document.getElementById('glass').style.left = ploco[0].toFixed(2) - ((plocw[0] - plocv[0]) / 2).toFixed(2) + "px";
								document.getElementById('glass').setAttribute('width', (plocw[0] - plocv[0]).toFixed(2) + "px");
							}
						}
					}
					if (positions && document.getElementById('glass').style != null) {
						var xx2 = Math.atan(((ploca[1] - ploc[1]).toFixed(2)) / ((ploca[0] - ploc[0]).toFixed(2))) * (180 / Math.PI);
						document.getElementById('glass').style.transform = "rotateZ(" + (xx2.toFixed(2)) + "deg)";
					}
				}
				// detect if tracker fails to find a face
				document.addEventListener("clmtrackrNotFound", function(event) {
					ctrack.stop();
					console.log("Not Found.")
				}, false);
				// detect if tracker loses tracking of face
				document.addEventListener("clmtrackrLost", function(event) {
					ctrack.stop();
					console.log("lost.")
				}, false);
				// detect if tracker has converged
				document.addEventListener("clmtrackrConverged", function(event) {
					document.getElementById('convergence').innerHTML = "CONVERGED";
					document.getElementById('convergence').style.backgroundColor = "#FF0000";
					// stop drawloop
					cancelRequestAnimFrame(drawRequest);
					overlayCC.clearRect(0, 0, canvas.width, canvas.height);
					cancelRequestAnimFrame(canselDraw);
					//ctrack.reset();
				}, false);

				function selectBox() {
					overlayCC.clearRect(0, 0, canvas.width, canvas.height);
					document.getElementById('convergence').innerHTML = "";
					ctrack.reset();
					$('#overlay').addClass('hide');
					$('#image').imgAreaSelect({
						handles: true,
						onSelectEnd: function(img, selection) {
							// create box
							var box = [selection.x1, selection.y1, selection.width, selection.height];
							// do fitting
							animate(box);
							$('#overlay').removeClass('hide');
						},
						autoHide: true
					});
				}
				// function to start showing images
				function loadImage() {
					if (fileList.indexOf(fileIndex) < 0) {
						var reader = new FileReader();
						reader.onload = (function(theFile) {
							return function(e) {
								// check if positions already exist in storage
								// Render thumbnail.
								//var canvas = document.getElementById('image')
								//var cc = canvas.getContext('2d');
								var img = new Image();
								img.onload = function() {
									if (img.height > 400 || img.width > 300) {
										var rel = img.height / img.width;
										var neww = 300;
										var newh = neww * rel;
										if (newh > 400) {
											newh = 400;
											neww = newh / rel;
										}
										canvas.setAttribute('width', neww);
										canvas.setAttribute('height', newh);
										overlay.setAttribute('width', neww);
										overlay.setAttribute('height', newh);
										cc.drawImage(img, 0, 0, neww, newh);
										this.cW = neww;
										this.cH = newh;
										//											document.getElementById('image').style.transform = "scaleX(1)";	
										//				document.getElementById('image').style.transform = "rotateZ(90deg)";	
										//			document.getElementById('overlay').style.transform = "scaleX(1)";	
										//			document.getElementById('overlay').style.transform = "rotateZ(90deg)";	
									} else {
										canvas.setAttribute('width', img.width);
										canvas.setAttribute('height', img.height);
										overlay.setAttribute('width', img.width);
										overlay.setAttribute('height', img.height);
										cc.drawImage(img, 0, 0, img.width, img.height);
										this.cW = img.width;
										this.cH = img.height;
										//											document.getElementById('image').style.transform = "scaleX(1)";	
										//				document.getElementById('image').style.transform = "rotateZ(90deg)";	
										//			document.getElementById('overlay').style.transform = "scaleX(1)";	
										//			document.getElementById('overlay').style.transform = "rotateZ(90deg)";	
									}
								}
								img.src = e.target.result;
							};
						})(fileList[fileIndex]);
						reader.readAsDataURL(fileList[fileIndex]);
						overlayCC.clearRect(0, 0, canvas.width, canvas.height);
						document.getElementById('convergence').innerHTML = "";
						ctrack.reset();
					}
					$('#containerx').removeClass('hide');
				}
				// set up file selector and variables to hold selections
				var fileList, fileIndex;
				if (window.File && window.FileReader && window.FileList) {
					function handleFileSelect(evt) {
						var files = evt.target.files;
						fileList = [];
						for (var i = 0; i < files.length; i++) {
							if (!files[i].type.match('image.*')) {
								continue;
							}
							fileList.push(files[i]);
						}
						if (files.length > 0) {
							fileIndex = 0;
						}
						loadImage();
					}
					document.getElementById('files').addEventListener('change', handleFileSelect, false);
				} else {
					$('#files').addClass("hide");
					$('#loadimagetext').addClass("hide");
				}
			},
			animateClean(maskA) {
				this.oi(maskA);
			},
		},
		mounted() {
			navigator.getUserMedia = navigator.getUserMedia || navigator.webkitGetUserMedia || navigator.mozGetUserMedia || navigator.msGetUserMedia;
			window.URL = window.URL || window.webkitURL || window.msURL || window.mozURL;
			if (navigator.mediaDevices === undefined) {
				navigator.mediaDevices = {};
			}
			// Some browsers partially implement mediaDevices. We can't just assign an object
			// with getUserMedia as it would overwrite existing properties.
			// Here, we will just add the getUserMedia property if it's missing.
			if (navigator.mediaDevices.getUserMedia === undefined) {
				navigator.mediaDevices.getUserMedia = function(constraints) {
					// First get ahold of the legacy getUserMedia, if present
					var getUserMedia = navigator.webkitGetUserMedia || navigator.mozGetUserMedia;
					// Some browsers just don't implement it - return a rejected promise with an error
					// to keep a consistent interface
					if (!getUserMedia) {
						return Promise.reject(new Error('getUserMedia is not implemented in this browser'));
					}
					// Otherwise, wrap the call to the old navigator.getUserMedia with a Promise
					return new Promise(function(resolve, reject) {
						getUserMedia.call(navigator, constraints, resolve, reject);
					});
				}
			}
			if (navigator.mediaDevices) {
				navigator.mediaDevices.getUserMedia({
					video: true
				}).then(gumSuccess).catch(gumFail);
			} else if (navigator.getUserMedia) {
				navigator.getUserMedia({
					video: true
				}, gumSuccess, gumFail);
			} else {
				//insertAltVideo(vid);
				//document.getElementById('gum').className = "hide";
				//document.getElementById('nogum').className = "nohide";
				alert("Your browser does not seem to support getUserMedia, using a fallback video instead.");
			}
			var vid = document.getElementById('video');
			var vid_width = vid.width;
			var vid_height = vid.height;
			var overlay1 = document.createElement('canvas');
			var overlayCC1 = overlay1.getContext('2d');

			function adjustVideoProportions() {
				// resize overlay and video if proportions of video are not 4:3
				// keep same height, just change width
				var proportion = vid.videoWidth / vid.videoHeight;
				vid_width = Math.round(vid_height * proportion);
				vid.width = vid_width;
				overlay1.width = vid_width;
			}

			function gumSuccess(stream) {
				// add camera stream if getUserMedia succeeded
				if ("srcObject" in vid) {
					vid.srcObject = stream;
				} else {
					vid.src = (window.URL && window.URL.createObjectURL(stream));
				}
				vid.onloadedmetadata = function() {
					adjustVideoProportions();
					vid.play();
				}
				vid.onresize = function() {
					adjustVideoProportions();
				}
			}

			function gumFail() {
				// fall back to video if getUserMedia failed
				//insertAltVideo(vid);
				//document.getElementById('gum').className = "hide";
				//document.getElementById('nogum').className = "nohide";
				alert("There was some problem trying to fetch video from your webcam, using a fallback video instead.");
			}
			//vid.addEventListener('canplay', enablestart, false);
			// Trigger photo take
			document.getElementById("snap").addEventListener("click", function() {
				var canvas = document.getElementById('image');
				var cc = canvas.getContext('2d');
				overlayCC1.drawImage(vid, 0, 0, 300, 400);
				cc.drawImage(vid, 0, 0, 300, 400);
				var dataurl = overlay1.toDataURL(vid.src);
				//var img = document.getElementById("image");
				//img.src = dataurl;
				$('#containerx').removeClass('hide');
				//this.onFileChange($event);
				var tt = document.getElementById("video")
				//tt.style.display = "none";
				console.log('oi>>>>>> ', dataurl);
			});
			//console.log("Not Found.", this.$store.getters.isLoggedInAD );
			this.startMirror();
		},
		created() {
			this.items = this.$store.getters.products;
		},
		computed: {
			isAuthenticated() {
				//return this.$store.getters.isLoggedIn
				return true;
			}
		},
		components: {}
	}

</script>
<style scoped lang="scss">
	@import url(https://fonts.googleapis.com/css?family=Lato:300italic,320italic,300,320);

	#overlay {
		position: absolute;
		top: 0px;
		left: 0px;
		margin: 0;
		
		transform: scaleX(1);
		-webkit-transform: scaleX(1);
		transform: scaleY(1);
		-webkit-transform: scaleY(1);
		-moz-transform: scaleX(1);
		-o-transform: scaleX(1);
		filter: FlipH;
		-ms-filter: "FlipH";
		
	}

	#image {
		margin: 0;
		top: 0px;
	
		transform: scaleX(1);
		-webkit-transform: scaleX(1);
		transform: scaleY(1);
		-webkit-transform: scaleY(1);
		left: 0px;
		-moz-transform: scaleX(1);
		-o-transform: scaleX(1);
		filter: FlipH;
		-ms-filter: "FlipH";
		
	}

	#video {
		position: relative;
		
		transform: scaleX(-1);
		-webkit-transform: scaleX(-1);
		-moz-transform: scaleX(-1);
		-o-transform: scaleX(-1);
		filter: FlipH;
		-ms-filter: "FlipH";
		image-orientation: flip;
	}

	#containerx {
		position: relative;
		display: flex;
		/*width: 320px;*/
		/*margin : 0px auto;*/
	}

	#convergence {
		display: inline;
	}

	h2 {
		font-weight: 400;
	}

	.btn1 {
		position: relative;
		font-family: 'Lato';
		font-size: 8px;
	}

	.hide {
		display: none;
	}

	#mkm {
		margin: 0;
		position: absolute;
		width: 4px;
		height: 4px;
		background-color: deeppink;
		border-radius: 20px;
		display: flex;
		align-items: center;
	}

	#mkn {
		margin: 0;
		position: absolute;
		width: 4px;
		height: 4px;
		background-color: orangered;
		border-radius: 20px;
	}

	#mko {
		margin: 0;
		position: absolute;
		width: 4px;
		height: 4px;
		background-color: darkorchid;
		border-radius: 20px;
	}

	#glass {
		position: absolute;
		top: 0px;
		left: 0px;
		margin: 0;
		z-index: auto;
		/*-o-transform: scaleX(-1);
			-webkit-transform: scaleX(-1);
			transform: scaleX(-1);
			-ms-filter: fliph;
			filter: fliph;*/
	}

	.swiper-innerxxx {
		width: 50%;
		height: 400px;
		padding-top: 50px;
		padding-bottom: 50px;
	}

	.swiper-slide {
		background-position: center;
		background-size: cover;
	}

	/*input[type=file]{ 
        color:transparent;
    }*/

</style>
