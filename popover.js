var feed = document.getElementById('feed')
feed.addEventListener("mouseover", decideHover)
feed.addEventListener("mouseout", cancelTime)

//global timeOutId to control hover state
var timeoutId = null

var cache = {}

function cancelTime() {
  window.clearTimeout(timeoutId)
  var popUp;
  if (document.getElementById('popContainer')) { 
    popUp = document.getElementById('popContainer')
    var parentNode = popUp.parentNode
    parentNode.removeChild(parentNode.lastChild)
  }
}

function decideHover(e) {
  timeoutId = window.setTimeout(function() {
    parseId(e);
  }, 500);  
}

function parseId(e) {  
  var target = e.target  
  var id, path;
  if (target.tagName.toLowerCase() === 'a') {
    path = target.href.split('/')
    id = path[path.length-1]
    getMiniProfile(id, e)    
  }  
}

function getMiniProfile(id, e) {
  // var request = new XMLHttpRequest();
  // request.open('GET', '/', true);
  // request.onload = function() {
  //   if (request.status >=200 && request.status < 400) {
  //     console.log(request)
  //   } else {
  //     console.log("I TRIEDD")
  //   }
  // }

  // request.responseType = 'json';
  // request.setRequestHeader('X-Requested-With', 'XMLHttpRequest');
  // request.setRequestHeader('popoverAJAX', '1.0');
  // request.send();
  var profileData;
  if(cache[id]) {
    profileData = cache[id]
  } else {
    profileData = id
  }
  generatePopOver(profileData, e)

function generatePopOver(id, e) {
  var popOver = document.createElement('div')
  popOver.id = 'popContainer'      
  popOver.innerHTML = popOver.innerHTML + id + ":   This is a popover"  
  var linkPosition = getPosition(e.target)
  var linkPositionY = linkPosition.y - 200
  
  popOver.style.top = linkPosition.y+'px'
  var linkPositionX = linkPosition.x + linkPosition.x

  popOver.style.left = linkPositionX+'px'

  var feed = document.getElementById('feed')
  feed.appendChild(popOver)
}


// deal with the page getting resized or scrolled
window.addEventListener("scroll", updatePosition, false);
window.addEventListener("resize", updatePosition, false);
 
function updatePosition() {
  // add your code to update the position when your browser
  // is resized or scrolled
}

function getPosition(el) {
  var xPos = 0;
  var yPos = 0;
 
  while (el) {
    if (el.tagName == "BODY") {
      // deal with browser quirks with body/window/document and page scroll
      var xScroll = el.scrollLeft || document.documentElement.scrollLeft;
      var yScroll = el.scrollTop || document.documentElement.scrollTop;
 
      xPos += (el.offsetLeft - xScroll + el.clientLeft);
      yPos += (el.offsetTop - yScroll + el.clientTop);
    } else {
      // for all other non-BODY elements
      xPos += (el.offsetLeft - el.scrollLeft + el.clientLeft);
      yPos += (el.offsetTop - el.scrollTop + el.clientTop);
    }
 
    el = el.offsetParent;
  }
  return {
    x: xPos,
    y: yPos
  };
}
 



