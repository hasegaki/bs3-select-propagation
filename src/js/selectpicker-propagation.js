/**
 * selectpicker-propagation.js
 * Copyright (c) 2019 KOMEKOME Party (k2party)
 */
;(function($) {
	/**
	 * Class: PropagationTarget
	 * 伝搬先のコンポーネントに適用するクラス。
	 * 伝搬先での選択肢の取得、再描画を行う。
	 */
	var PropagationTarget = function($target, options) {
		this._$target = $target;
		this._options = $.extend({
			selectAjax: null,
		}, options);
		
		if(typeof this._options.selectAjax == 'string') {
			this._options.selectAjax = {
				type: 'get',
				url: this._options.selectAjax,
			};
		}

		// data-group属性を持つoptionを保持
		this._$children = $target.children('option[data-group]').clone();

		// select.propagationイベントリスナーを登録
		this._$target.on('select.propagation', this._on_propagation);
	};
	
	PropagationTarget.prototype = {
		_ajax: function(value)
		{
			return $.ajax($.extend({
				type: 'get',
				dataType: 'json',
				data: {
					q: value,
				},
			}, this._options.ajax))
			.done(function(result) {
				console.log(result);
			})
			.fail(function(error) {
				console.log(error);
			});
		},

		_on_propagation: function(jqEvent, parameters)
		{
			// イベントのパラメタから現在値を取得
			var value = parameters.value;
			var propagation_target = this._propagation_target;
			if(propagation_target._options.ajax != null && typeof propagation_target._options.ajax == 'object') {
				// data-select-ajax属性が指定されている場合、ajax実行
				propagation_target._ajax(value).done(function(result) {
					// ajax実行後（正常時）、ドロップダウンリストの内容を再構築する
					var html = '';
					result.data.forEach(function(data) {
						var option = [data, data];
						var matcher = data.match(/^([^\s]+)\s+(.*)$/);
						if(matcher != null) {
							option = [matcher[1], matcher[2]];
						}
						html += '<option value="'+ option[0] + '">' + option[1] + '</option>';
					});
					propagation_target._$target.html(html);
				});
				return;
			}
			
			// ajaxでない場合、option[data-group=xxxx]を取得して入れ替える
			var $children = propagation_target._$children.clone();
			$children = $children.filter('[data-group=' + value + ']');
			propagation_target._$target.children('[data-group]').remove();
			propagation_target._$target.append($children);
			propagation_target._$target.selectpicker('refresh');
		},
	};
	
	/**
	 * Class: PropagationPropagator
	 * 伝搬元のコンポーネントに適用するクラス。
	 * 伝搬元のイベントリスニング、伝搬先へのイベント伝達を行う
	 */
	var PropagationPropagator = function($target, options) {
		this._$target = $target;
		this._$propagations = null;
		this._options = $.extend({
			selectPropagation: null,
		}, options);
		
		if(this._options.selectPropagation != null) {
			this._$propagations = $(this._options.selectPropagation);
			this._$propagations.each(function() {
				this._propagation_target = new PropagationTarget($(this), $(this).data()); 
			});
		}
		
		// イベントリスナーを登録
		this._$target.on('changed.bs.select', this._on_change);
	};

	PropagationPropagator.prototype = {
		refresh: function()
		{
			this._propagation._$propagations.triggerHandler('select.propagation', {
				source: $(this),
				sourceEvent: jqEvent,
				value: $(this).val(),
			});
		},
		
		_on_change: function(jqEvent)
		{
			console.log(jqEvent);
			this._propagation._$propagations.triggerHandler('select.propagation', {
				source: $(this),
				sourceEvent: jqEvent,
				value: $(this).val(),
			});
		},
	};
	
	jQuery.fn.propagation = function() {
		var args = Array.prototype.slice.call(arguments);
		if(args.length == 0 || typeof args[0] == 'object') {
			this.each(function(index, target) {
				target._propagation = new PropagationPropagator($(target), args[0]);
			});
			return this;
		}
		
		var cmd = args.shift();
		if(cmd.charAt(0) != '_' && typeof PropagationPropagator.prototype[cmd] == 'function') {
			this.each(function(index, target) {
				PropagationPropagator.prototype[cmd].apply(target._propagatorion, args);
			});
			return this;
		}
		
		if(typeof PropagationPropagator.prototype['__' + cmd] == 'function') {
			var results = this.map(function(index, target) {
				return PropagationPropagator.prototype['__' + cmd].apply(target._propagation, args);
			});
			return (results.length > 1)? results:results[0];
		}
	
		throw new Error('PropagationPropagator: command "{cmd}" does not exist.'.replace('{cmd}', cmd));
	};
})(jQuery);
