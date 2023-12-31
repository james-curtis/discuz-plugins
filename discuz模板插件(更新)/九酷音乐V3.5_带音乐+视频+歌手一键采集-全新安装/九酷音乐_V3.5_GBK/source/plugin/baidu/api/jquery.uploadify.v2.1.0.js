if (jQuery)(function(jQuery) {
	jQuery.extend(jQuery.fn, {
		uploadify: function(options) {
			jQuery(this).each(function() {
				settings = jQuery.extend({
					id: jQuery(this).attr('id'),
					uploader: 'source/plugin/baidu/api/uploadify.swf',
					script: 'source/plugin/baidu/api/uploads.php',
					expressInstall: null,
					folder: '',
					height: 30,
					width: 110,
					cancelImg: 'source/plugin/baidu/api/up.png',
					wmode: 'opaque',
					scriptAccess: 'sameDomain',
					fileDataName: 'Filedata',
					method: 'POST',
					queueSizeLimit: 999,
					simUploadLimit: 1,
					queueID: false,
					displayData: 'percentage',
					onInit: function() {},
					onSelect: function() {},
					onQueueFull: function() {},
					onCheck: function() {},
					onCancel: function() {},
					onError: function() {},
					onProgress: function() {},
					onComplete: function() {},
					onAllComplete: function() {}
				},
				options);
				var pagePath = location.pathname;
				pagePath = pagePath.split('/');
				pagePath.pop();
				pagePath = pagePath.join('/') + '/';
				var data = {};
				data.uploadifyID = settings.id;
				data.pagepath = pagePath;
				if (settings.buttonImg) data.buttonImg = escape(settings.buttonImg);
				if (settings.buttonText) data.buttonText = escape(settings.buttonText);
				if (settings.rollover) data.rollover = true;
				data.script = settings.script;
				data.folder = escape(settings.folder);
				if (settings.scriptData) {
					var scriptDataString = '';
					for (var name in settings.scriptData) {
						scriptDataString += '&' + name + '=' + settings.scriptData[name];
					}
					data.scriptData = escape(scriptDataString.substr(1));
				}
				data.width = settings.width;
				data.height = settings.height;
				data.wmode = settings.wmode;
				data.method = settings.method;
				data.queueSizeLimit = settings.queueSizeLimit;
				data.simUploadLimit = settings.simUploadLimit;
				if (settings.hideButton) data.hideButton = true;
				if (settings.fileDesc) data.fileDesc = settings.fileDesc;
				if (settings.fileExt) data.fileExt = settings.fileExt;
				if (settings.multi) data.multi = true;
				if (settings.auto) data.auto = true;
				if (settings.sizeLimit) data.sizeLimit = settings.sizeLimit;
				if (settings.checkScript) data.checkScript = settings.checkScript;
				if (settings.fileDataName) data.fileDataName = settings.fileDataName;
				if (settings.queueID) data.queueID = settings.queueID;
				if (settings.onInit() !== false) {
					jQuery(this).css('display', 'none');
					jQuery(this).after('<div id="' + jQuery(this).attr('id') + 'Uploader"></div>');
					swfobject.embedSWF(settings.uploader, settings.id + 'Uploader', settings.width, settings.height, '9.0.24', settings.expressInstall, data, {
						'quality': 'high',
						'wmode': settings.wmode,
						'allowScriptAccess': settings.scriptAccess
					});
					if (settings.queueID == false) {
						jQuery("#" + jQuery(this).attr('id') + "Uploader").after('<div id="' + jQuery(this).attr('id') + 'Queue" class="uploadifyQueue"></div>');
					}
				}
				if (typeof(settings.onOpen) == 'function') {
					jQuery(this).bind("uploadifyOpen", settings.onOpen);
				}
				jQuery(this).bind("uploadifySelect", {
					'action': settings.onSelect,
					'queueID': settings.queueID
				},
				function(event, ID, fileObj) {
					if (event.data.action(event, ID, fileObj) !== false) {
						var byteSize = Math.round(fileObj.size / 1024 * 100) * .01;
						var suffix = 'KB';
						if (byteSize > 1000) {
							byteSize = Math.round(byteSize * .001 * 100) * .01;
							suffix = 'MB';
						}
						var sizeParts = byteSize.toString().split('.');
						if (sizeParts.length > 1) {
							byteSize = sizeParts[0] + '.' + sizeParts[1].substr(0, 2);
						} else {
							byteSize = sizeParts[0];
						}
						if (fileObj.name.length > 20) {
							fileName = fileObj.name.substr(0, 20) + '...';
						} else {
							fileName = fileObj.name;
						}
						queue = '#' + jQuery(this).attr('id') + 'Queue';
						if (event.data.queueID) {
							queue = '#' + event.data.queueID;
						}
						jQuery(queue).append('<div id="' + jQuery(this).attr('id') + ID + '" class="uploadifyQueueItem">\
        <div class="cancel">\
         <a href="javascript:jQuery(\'#' + jQuery(this).attr('id') + '\').uploadifyCancel(\'' + ID + '\')"><img src="' + settings.cancelImg + '" border="0" /></a>\
        </div>\
        <span class="fileName">' + fileName + ' (' + byteSize + suffix + ')</span><span class="percentage"></span>\
        <div class="uploadifyProgress">\
         <div id="' + jQuery(this).attr('id') + ID + 'ProgressBar" class="uploadifyProgressBar"><!--Progress Bar--></div>\
        </div>\
       </div>');
					}
				});
				if (typeof(settings.onSelectOnce) == 'function') {
					jQuery(this).bind("uploadifySelectOnce", settings.onSelectOnce);
				}
				jQuery(this).bind("uploadifyQueueFull", {
					'action': settings.onQueueFull
				},
				function(event, queueSizeLimit) {
					if (event.data.action(event, queueSizeLimit) !== false) {
						alert('The queue is full.  The max size is ' + queueSizeLimit + '.');
					}
				});
				jQuery(this).bind("uploadifyCheckExist", {
					'action': settings.onCheck
				},
				function(event, checkScript, fileQueueObj, folder, single) {
					var postData = new Object();
					postData = fileQueueObj;
					postData.folder = pagePath + folder;
					if (single) {
						for (var ID in fileQueueObj) {
							var singleFileID = ID;
						}
					}
					jQuery.post(checkScript, postData,
					function(data) {
						for (var key in data) {
							if (event.data.action(event, checkScript, fileQueueObj, folder, single) !== false) {
								var replaceFile = confirm("Do you want to replace the file " + data[key] + "?");
								if (!replaceFile) {
									document.getElementById(jQuery(event.target).attr('id') + 'Uploader').cancelFileUpload(key, true, true);
								}
							}
						}
						if (single) {
							document.getElementById(jQuery(event.target).attr('id') + 'Uploader').startFileUpload(singleFileID, true);
						} else {
							document.getElementById(jQuery(event.target).attr('id') + 'Uploader').startFileUpload(null, true);
						}
					},
					"json");
				});
				jQuery(this).bind("uploadifyCancel", {
					'action': settings.onCancel
				},
				function(event, ID, fileObj, data, clearFast) {
					if (event.data.action(event, ID, fileObj, data, clearFast) !== false) {
						var fadeSpeed = (clearFast == true) ? 0: 250;
						jQuery("#" + jQuery(this).attr('id') + ID).fadeOut(fadeSpeed,
						function() {
							jQuery(this).remove()
						});
					}
				});
				if (typeof(settings.onClearQueue) == 'function') {
					jQuery(this).bind("uploadifyClearQueue", settings.onClearQueue);
				}
				var errorArray = [];
				jQuery(this).bind("uploadifyError", {
					'action': settings.onError
				},
				function(event, ID, fileObj, errorObj) {
					if (event.data.action(event, ID, fileObj, errorObj) !== false) {
						var fileArray = new Array(ID, fileObj, errorObj);
						errorArray.push(fileArray);
						jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text(" - " + errorObj.type + " Error");
						jQuery("#" + jQuery(this).attr('id') + ID).addClass('uploadifyError');
					}
				});
				jQuery(this).bind("uploadifyProgress", {
					'action': settings.onProgress,
					'toDisplay': settings.displayData
				},
				function(event, ID, fileObj, data) {
					if (event.data.action(event, ID, fileObj, data) !== false) {
						jQuery("#" + jQuery(this).attr('id') + ID + "ProgressBar").css('width', data.percentage + '%');
						if (event.data.toDisplay == 'percentage') displayData = ' 已上传:' + data.percentage + '% - ' + data.speed + 'KB/s';
						if (event.data.toDisplay == 'speed') displayData = ' - ' + data.speed + 'KB/s';
						if (event.data.toDisplay == null) displayData = '';
						if (data.percentage > 99) displayData = ' 正在保存,请稍等...';
						jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text(displayData);
					}
				});
				jQuery(this).bind("uploadifyComplete", {
					'action': settings.onComplete
				},
				function(event, ID, fileObj, response, data) {
					if (event.data.action(event, ID, fileObj, unescape(response), data) !== false) {
						jQuery("#" + jQuery(this).attr('id') + ID + " .percentage").text(' - x5music');
						jQuery("#" + jQuery(this).attr('id') + ID).fadeOut(250,
						function() {
							jQuery(this).remove()
						});
					}
				});
				if (typeof(settings.onAllComplete) == 'function') {
					jQuery(this).bind("uploadifyAllComplete", {
						'action': settings.onAllComplete
					},
					function(event, uploadObj) {
						if (event.data.action(event, uploadObj) !== false) {
							errorArray = [];
						}
					});
				}
			});
		},
		uploadifySettings: function(settingName, settingValue, resetObject) {
			var returnValue = false;
			jQuery(this).each(function() {
				if (settingName == 'scriptData' && settingValue != null) {
					if (resetObject) {
						var scriptData = settingValue;
					} else {
						var scriptData = jQuery.extend(settings.scriptData, settingValue);
					}
					var scriptDataString = '';
					for (var name in scriptData) {
						scriptDataString += '&' + name + '=' + escape(scriptData[name]);
					}
					settingValue = scriptDataString.substr(1);
				}
				returnValue = document.getElementById(jQuery(this).attr('id') + 'Uploader').updateSettings(settingName, settingValue);
			});
			if (settingValue == null) {
				if (settingName == 'scriptData') {
					var returnSplit = unescape(returnValue).split('&');
					var returnObj = new Object();
					for (var i = 0; i < returnSplit.length; i++) {
						var iSplit = returnSplit[i].split('=');
						returnObj[iSplit[0]] = iSplit[1];
					}
					returnValue = returnObj;
				}
				return returnValue;
			}
		},
		uploadifyUpload: function(ID) {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').startFileUpload(ID, false);
			});
		},
		uploadifyCancel: function(ID) {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').cancelFileUpload(ID, true, false);
			});
		},
		uploadifyClearQueue: function() {
			jQuery(this).each(function() {
				document.getElementById(jQuery(this).attr('id') + 'Uploader').clearFileUploadQueue(false);
			});
		}
	})
})(jQuery);