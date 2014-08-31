module.exports = Lighthigh;

var css = require('mucss');


/** @True {string} Append this name to the `el` class list.  */
var name = 'lighthigh';

var doc = document, win = window, root = document.documentElement;


/**
 * Create a highlighter.
 *
 * @param   {Element}   el   An element to take as a highlight. It can contain anything inside.
 */

function Lighthigh(el){
	this.el = el || document.createElement('div');

	this.el.setAttribute('hidden', true);
	this.el.classList.add(name);

	this.el.lighthigh = this;
}

var proto = Lighthigh.prototype;


/**
 * Fade in and move highlight to the target.
 *
 * @param    {(Array|Node)}   target   A target area or element to highlight.
 * @return   {Lighthigh}   Chain of calls.
 */

proto['to'] = function (target){
	//get target rectangle
	var rect = getRect(target);

	if (target instanceof Element) {
		//copy target position
		var style = win.getComputedStyle(target);
		if (style.position === 'fixed') {
			if (!this.el.classList.contains(name + '-fixed')) {
				this.el.classList.add(name + '-fixed');
			}
		} else if (this.el.classList.contains(name + '-fixed')) {
			this.el.classList.remove(name + '-fixed');
		}

		//↓↓↓
		//TODO: calc absolute offset position
		//TODO: place to the body with calc offset position
		//TODO: calc target element offset position
		//TODO: move to the target element offset position
		//TODO: remove from DOM when anim ends
		//TODO: place to the target parent
		//TODO: clone target offset position within parent (make dependent on target holder position)
		//TODO: unhide from the DOM
		//↑↑↑

		//place to the target parent
		//because parent can be displaced, so highlight should be positioned similarly to the target
		var parent = target.parentNode instanceof Element && target.parentNode !== root ? target.parentNode : document.body;
		if (this.el.parentNode !== parent) parent.appendChild(this.el);
	}

	//unhide element
	if (this.el.hasAttribute('hidden')) {
		this.el.removeAttribute('hidden');
		//TODO: make soft fade-in
	}

	//set new position
	this.moveTo(rect);

	return this;
};


/**
 * Return bounding client rectangle of any target passed.
 *
 * @param    {(Node|Array|window|document|Objcet)}   target   A target.
 * @return   {Array}   Rectangle array: `[left,top,right,bottom]`.
 */

function getRect(target){
	var rect;

	if (target instanceof Node && target !== doc){
		var oRect = css.offsets(target);
		rect = [oRect.left, oRect.top, oRect.right, oRect.bottom];
	}

	else if (target === win){
		rect = [0, 0, win.innerWidth,  win.innerHeight];
	}

	else if (target === doc){
		rect = [0, 0, root.offsetWidth, root.offsetHeight];
	}

	//object like {top:N, left:N, width:N, height:N}
	else if (target.top){
		rect = [target.left, target.top, target.right || (target.left + target.width), target.bottom || (target.top + target.height) ];
	}

	else if (target instanceof Array){
		rect = target;
	}

	else {
		rect = [0,0,0,0];
	}

	return rect;
}


/**
 * Fade out & hide.
 *
 * @return   {Lighthigh}   Chain of calls.
 */

proto['off'] = function (){
	//TODO: make soft fade-out
	this.el.setAttribute('hidden', true);

	return this;
};


/** @True {string} CSS transform property name. */
var transform = '-webkit-transform';


/**
 * Move highlighter to the rectangle.
 *
 * @param    {Array}   rect   4-dimension array [left,top,right,bottom].
 * @return   {Lighthigh}   Chain of calls.
 *
 */

proto.moveTo = function (rect) {
	var paddings = css.paddings(this.el);

	css(this.el, {
		'transform': 'translate3d(' + (rect[0] - paddings.left) + 'px, ' + (rect[1] - paddings.top) + 'px, 0)',
		'width': (rect[2] - rect[0]) + 'px',
		'height': (rect[3] - rect[1]) + 'px'
	});

	return this;
};


/**
 * Mimic target element position, if such.
 *
 * @return   {Lighthigh}   Chaining.
 */

proto.update = function () {
	//TODO
};