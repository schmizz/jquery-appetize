(function($) {
	$.fn.appetize = function(options) {
		o = $.extend({
			'length' : '4',
			'speed'  : 1000,
			'easing' : null,
			'interval' : 2000,
			'postSlideCallback': null
		}, options || {});
		
		return this.each(function(i, it) {
			var $this  = $(this);
			var $items = $('li', $this);
			var passepartout = $this.parent('div');
			var length       = $items.length;

			debug('Items found: '+ length);
			
			// Calculate height of a single item
			var oneness = $(this).height() / $items.length;

			debug('oneness: '+ oneness);

			// Set the height of the passepartout
			$(passepartout).height(o.length * oneness);

			// Clone items and append them to list
			$('li:lt('+o.length+')', $this).clone().appendTo($this);

			var offset = -1;
			var current = 0;
			var interval = setInterval(function() {
				debug(current);
				
				// Reset position
				if (current == length) {
					current = 0;
					$this.css('top', 0);
				}

				// Calculate offset
				offset = (++current * oneness * -1);

				$this.animate({'top' : offset}, o.speed, o.easing, function() {
					if ($.isFunction(o.postSlideCallback)) {
						o.postSlideCallback.apply(this, [ this, current ]);
					}
				});
			}, o.interval);
		});
	};
	
	function debug($subject) {
		if (window.console && window.console.log) {
			window.console.log($subject);
		}
	};
})(jQuery);