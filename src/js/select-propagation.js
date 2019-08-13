/**
 * select-propagation.js
 * Copyright (c) 2019 KOMEKOME Party (k2party)
 */
;(function($){
	$('select.select').each(function() {
		var $target = $(this);
		$target.selectpicker($.extend({
			'multipleSeparator': ', ',
			'selectedTextFormat': 'count > 3',
			'countSelectedText' : '{0}件選択中',
			'noneSelectedText': '指定しない',
			'selectAllText': '全て選択',
			'deselectAllText': 'クリア',
			'actionsBox': true,
			'showTick': true,
		}, $target.data()));

		// data-propagation属性がある場合、連携させる
		var propagation = $target.data('propagation');
		if(propagation !== undefined && propagation != '') {
			$(propagation).each(function() {
				var $child = $(this);
				
				// 伝搬元のselectpickerに、changed.bs.select発生時のイベントリスナーを登録する。
				// ・伝搬元のselectpickerを選択（変更）した場合、伝搬先のselectpickerのoptionを切り替える。
				$target.on('changed.bs.select', function() {
					// data-group属性があるoptionをすべて非表示にする
					$child.find('option[data-group]').hide();
					
					// 伝搬元で選択中の値を取得（multiple考慮のため配列で処理）
					var selected = $target.val();
					if(!Array.isArray(selected)) selected = [selected];
					$.each(selected, function(index) {
						if(selected[index] == '') return;
						$child.find('option[data-group=' + selected[index] + ']').show();
					});
					
					// 表示するoptionが１つもない場合、伝搬先のselectを非活性にする
					var disabled = $child.find('option').toArray().every(function(option) {
						return $(option).css('display') == 'none';
					});
					$child.prop('disabled', disabled);
					
					// selectpickerにステータスを取り込む
					$child.selectpicker('refresh');
					
					// 伝搬先のselectpickerへイベントを伝搬
					$child.triggerHandler('changed.bs.select');
				});
				
				// 伝搬先のselectpickerに、changed.bs.select時のイベントリスナーを登録する。
				// ・非表示の項目を選択解除する。
				$child.on('changed.bs.select', function(jqEvent, clickedIndex, isSelected, previousValue) {
					// 非表示の場合（CSSのdisplayプロパティが"none"の場合）、選択を解除する
					$child.find('option').each(function(index, option) {
						if($(option).css('display') == 'none') {
							$(option).prop('selected', false);
						}
					});
					
					// selectpickerにステータスを取り込む
					$child.selectpicker('refresh');
				});
			});
		}
	});
})(jQuery);

$(function() {
	$('select.select').triggerHandler('changed.bs.select');
});
