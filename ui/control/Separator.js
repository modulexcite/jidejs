/**
 * A Separator can be used to separate two controls visually. It is most commonly used in Menus and ToolBars.
 *
 * @module jidejs/ui/control/Separator
 */
define([
	'./../../base/Class', './../../base/ObservableProperty', './../Control',
	'./../Skin', './../Orientation', './../register'
], function(Class, Observable, Control, Skin, Orientation, register) {
	function SeparatorSkin(separator, el) {
		Skin.call(this, separator, el);
	}
	Class(SeparatorSkin).extends(Skin).def({
		defaultElement: 'div',
		install: function() {
			Skin.prototype.install.call(this);
			var separator = this.component;
			this.managed(separator.orientationProperty.subscribe(function(event) {
				if(event.value === Orientation.VERTICAL) {
					separator.classList.remove('jide-orientation-horizontal');
					separator.classList.add('jide-orientation-vertical');
				} else {
					separator.classList.add('jide-orientation-horizontal');
					separator.classList.remove('jide-orientation-vertical');
				}
			}));
			separator.classList.add(separator.orientation === Orientation.VERTICAL
				? 'jide-orientation-vertical'
				: 'jide-orientation-horizontal');
		},

		dispose: function() {
			Skin.prototype.dispose.call(this);
			var bindings = this.bindings;
			for(var i = 0, len = bindings.length; i < len; i++) {
				bindings[i].dispose();
			}
			this.bindings = [];
		}
	});

	/**
	 * Creates a new Separator.
	 *
	 * @constructor
	 * @alias module:jidejs/ui/control/Separator
     * @extends module:jidejs/ui/Control
     *
     * @param {object} config The configuration.
	 */
	var exports = function Separator(config) {
		installer(this);
		config = config || {};
		Control.call(this, config);
		this.classList.add('jide-separator');
	};
	Class(exports).extends(Control).def(/** @lends module:jidejs/ui/control/Separator# */{
		dispose: function() {
			Control.prototype.dispose.call(this);
			installer.dispose(this);
		},

		/**
		 * The orientation of the Separator.
		 * @type module:jidejs/ui/Orientation
		 */
		orientation: Orientation.HORIZONTAL,
		/**
		 * The orientation of the Separator.
		 * @type module:jidejs/base/ObservableProperty
		 */
		orientationProperty: null
	});
    exports.Skin = SeparatorSkin;
	var installer = Observable.install(exports, 'orientation');
	register('jide-separator', exports, Control, ['orientation']);
	return exports;
});