!function (window, document) {
  var rootElement = document.documentElement;
  var toggleElement = document.getElementById('color-toggle');
  var highlightElement = document.getElementsByName('highlight-style');
  var modeStorageKey = 'color-mode';
  var mediaQueryStorageKey = 'color-mode-media-query';
  var htmlAttribute = 'color-mode';
  var toggleAttribute = 'color-toggle';

  var getMediaQuery = function () {
    return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
  }

  var getModeStorage = function () {
    return localStorage.getItem(modeStorageKey);
  }

  var setModeStorage = function (mode) {
    localStorage.setItem(modeStorageKey, mode);
  }

  var getMediaQueryStorage = function () {
    return localStorage.getItem(mediaQueryStorageKey);
  }

  var setMediaQueryStorage = function (mode) {
    localStorage.setItem(mediaQueryStorageKey, mode);
  }

  var setColorMode = function (mode) {
    rootElement.setAttribute(htmlAttribute, mode);
    setModeStorage(mode);
  }

  var setIcon = function (mode) {
    if (!toggleElement) return;
    var addIconName = mode === 'light' ? 'iconmoono' : 'iconsuno';
    var removeIconName = mode === 'light' ? 'iconsuno' : 'iconmoono';
    toggleElement.classList.remove(removeIconName);
    toggleElement.classList.add(addIconName);
    toggleElement.setAttribute(toggleAttribute, mode);
  }

  var setHighlightStyle = function (mode) {
    highlightElement.forEach(function (item) {
      item.disabled = !(item.getAttribute('mode') === mode);
    });
  }

  var loadColorMode = function (mode) {
    var mode = mode || getModeStorage() || getMediaQuery();
    if (getMediaQuery() === getMediaQueryStorage()) {
      mode = getModeStorage();
    } else {
      mode = getMediaQuery();
      setMediaQueryStorage(mode);
    }
    setColorMode(mode);
    setIcon(mode);
    setHighlightStyle(mode);
  }

  var switchColorMode = function () {
    if (!toggleElement) return;
    toggleElement.addEventListener('click', function () {
      var mode = this.getAttribute(toggleAttribute) === 'light' ? 'dark' : 'light';
      setColorMode(mode);
      setIcon(mode);
      setHighlightStyle(mode);
    });
  }

  var Timingswitch = function () {
	var i=setInterval(function(){
	var hours=new Date().getHours();
	if(hours >=20 || hours <= 5){
		clearInterval(i)
		var mode = getModeStorage()
		var mode = 'dark';
    	setColorMode(mode);
    	setIcon(mode);
    	setHighlightStyle(mode);
	}
	},1000)
  }

  loadColorMode();
  switchColorMode();
  Timingswitch();
}(window, document);