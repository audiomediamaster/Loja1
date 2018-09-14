<template>
	<v-container fluid>
		<v-layout id="ctx" column align-center>
			<video id="video" width="300" height="400" preload="auto" loop playsinline autoplay ref="video" v-show="mostrar">
			</video>
			<v-btn id="snap">Snap Photo</v-btn>
			<canvas id="canvas" width="300" height="400" ref="canvas" v-show="false"></canvas>
			<img  id="foi" src="" alt="">
		</v-layout>
	</v-container>
</template>
<script>
	export default {
		name: 'test',
		data(){
			return{
				
			mostrar: true
			}
			
		},
		methods: {
			sumir()
			{
				 this.mostrar = false;
			}
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
		/*	navigator.mediaDevices.getUserMedia({
					audio: true,
					video: true
				})
				.then(function(stream) {
					var video1 = document.querySelector('video');
					// Older browsers may not have srcObject
					if ("srcObject" in video1) {
						video1.srcObject = stream;
					} else {
						// Avoid using this in new browsers, as it is going away.
						video1.src = window.URL.createObjectURL(stream);
					}
					video1.onloadedmetadata = function(e) {
						video1.play();
					};
				})
				.catch(function(err) {
					console.log(err.name + ": " + err.message);
				});*/
			// set up video
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
			var overlay = document.getElementById('canvas');
			var overlayCC = overlay.getContext('2d');

			function adjustVideoProportions() {
				// resize overlay and video if proportions of video are not 4:3
				// keep same height, just change width
				var proportion = vid.videoWidth / vid.videoHeight;
				vid_width = Math.round(vid_height * proportion);
				vid.width = vid_width;
				overlay.width = vid_width;
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
				overlayCC.drawImage(vid, 0, 0, 300, 400);
				var dataurl = overlay.toDataURL(vid.src);
				var img = document.getElementById("foi");
				img.src = dataurl;
				
				//this.onFileChange($event);
				var tt = document.getElementById("video")
				tt.style.display = "none";
				console.log('oi>>>>>> ', dataurl);
				
			});
		}
	}

</script>
<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
	h1,
	h2 {
		font-weight: normal;
	}

	ul {
		list-style-type: none;
		padding: 0;
	}

	li {
		display: inline-block;
		margin: 0 10px;
	}

	#ctx {
		background-color: #42b983;
	}

</style>
