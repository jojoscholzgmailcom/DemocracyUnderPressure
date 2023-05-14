function updateMapCoords(img) { // chatGPT is an absolute angel
	var scaleWidth = img.clientWidth / img.naturalWidth;
	var scaleHeight = img.clientHeight / img.naturalHeight;
  
	var areas = document.getElementsByTagName('area');
	for (var i = 0; i < areas.length; i++) {
	  var coords = areas[i].getAttribute('data-coords').split(',');
	  for (var j = 0; j < coords.length; j++) {
		if (j % 2 === 0) {
		  coords[j] = Math.round(parseInt(coords[j]) * scaleWidth);
		} else {
		  coords[j] = Math.round(parseInt(coords[j]) * scaleHeight);
		}
	  }
	  areas[i].setAttribute('coords', coords.join(','));
	}
  }
  