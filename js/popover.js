var feed = document.getElementById('feed')
feed.addEventListener("mouseover", decideHover)
feed.addEventListener("mouseout", cancelTime)

//global timeOutId to control hover state
var timeoutId = null

//ideally this would be stored in a separate caching service
//Redis comes to mind as a k-v store for this
var cache = {}

//on mouseout, reset timer and remove element
function cancelTime() {
  window.clearTimeout(timeoutId)
  var popUp;
  if (document.getElementById('popContainer')) { 
    popUp = document.getElementById('popContainer')
    var parentNode = popUp.parentNode
    parentNode.removeChild(parentNode.lastChild)
  }
}

//setTimeout for hover
function decideHover(e) {
  timeoutId = window.setTimeout(function() {
    parseId(e);
  }, 500);  
}

//library function parseId from href
function parseId(e) {  
  var target = e.target  
  var id, path;
  if (target.tagName.toLowerCase() === 'a') {
    path = target.href.split('/')
    id = path[path.length-1]
    getMiniProfile(id, e)    
  }  
}

//AJAX to DB. Mocked with a small data struct as proof of concept
function getMiniProfile(id, e) {
  var profileData = cache[id] ? cache[id] : id    
  if (!cache[id]) { cache[id] = id }  
  generatePopOver(profileData, e)
}

//Generates popover
function generatePopOver(id, e) {
  var popOver = document.createElement('div')
  popOver.id = 'popContainer'      
  popOver.innerHTML = popOver.innerHTML + id + ":   This is a popover"  
  var linkPosition = getPosition(e.target)
  var linkPositionY = linkPosition.y - (linkPosition.y/4)
  var linkPositionX = linkPosition.x + linkPosition.x
  
  popOver.style.top = linkPositionY+'px'

  popOver.style.left = linkPositionX+'px'

  var feed = document.getElementById('feed')
  feed.appendChild(popOver)
}


 



