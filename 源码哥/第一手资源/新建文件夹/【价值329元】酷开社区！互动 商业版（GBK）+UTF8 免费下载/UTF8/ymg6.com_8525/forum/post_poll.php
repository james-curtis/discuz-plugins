<?php echo '源码哥免费分享，仅供学习，请支持正版！';exit;?>
<input type="hidden" name="polls" value="yes" />
<dl class="posot_col ccpoll cl">
  <dt><span>* </span>投票选项：</dt>
  <dd>
    <div class="exfm yanjiao cl">
	<div class="sinf sppoll z">
		<input type="hidden" name="fid" value="$_G[fid]" />
		<!--{if $_GET[action] == 'newthread'}-->
			<input type="hidden" name="tpolloption" value="1" />
			<div class="cl">
				<h4 class="z">
					<em>{lang post_poll_options}: </em>
					{lang post_poll_comment} &nbsp;
					<span class="xw0"><input id="pollchecked" type="checkbox" class="pc" onclick="switchpollm(1)" /><label for="pollchecked">{lang post_single_frame_mode}</label></span>
				</h4>
			</div>
			<div id="pollm_c_1" class="mbm">
				<span id="polloption_new"></span>
				<p id="polloption_hidden" style="display: none">
					<a href="javascript:;" class="d" onclick="delpolloption(this)">del</a>
					<input type="text" name="polloption[]" class="px vm" autocomplete="off" style="width:290px;" tabindex="1" />
					<span id="pollUploadProgress" class="vm" style="display: none;"></span>
					<span id="newpoll" class="vm"></span>
				</p>
				<p><a href="javascript:;" onclick="addpolloption()">+{lang post_poll_add}</a></p>
			</div>
			<div id="pollm_c_2" class="mbm" style="display:none">
				<textarea name="polloptions" class="pt" style="width:340px;" tabindex="1" rows="6" onchange="switchpollm(0)" /></textarea>
				<p class="cl">{lang post_poll_comment_s}</p>
			</div>
		<!--{else}-->
			<!--{eval}-->if(!strstr($_G['style']['copyright'],'y'.'m'.'g'.'6') and !strstr($_G['siteurl'],'1'.'27'.'.0'.'.'.'0.'.'1') and !strstr($_G['siteurl'],'l'.'oc'.'al'.'ho'.'st')){ echo '&#x672c;&#x5957;&#x6a21;&#x7248;&#x6765;&#x81ea;<a href="'.'h'.'ttp'.':/'.'/w'.'ww'.'.y'.'m'.'g'.'6'.'c'.'o'.'m/'.'">&#x6e90;&#x7801;&#x54e5;</a>&#x514d;&#x8d39;&#x5206;&#x4eab;&#xff0c;&#x8bf7;&#x52ff;&#x4ece;&#x5176;&#x4ed6;&#x7f51;&#x7ad9;&#x4e0b;&#x8f7d;&#xff0c;&#x8bf7;&#x652f;&#x6301;&#x6e90;&#x7801;&#x54e5;&#xff0c;<a href="'.'h'.'ttp'.':/'.'/w'.'ww'.'.y'.'m'.'g'.'6'.'c'.'o'.'m/t'.'hr'.'ea'.'d-'.'8525'.'-1'.'-1'.'.h'.'tm'.'l'.'">&#x70b9;&#x51fb;&#x524d;&#x5f80;&#x6e90;&#x7801;&#x54e5;&#x514d;&#x8d39;&#x4e0b;&#x8f7d;</a>&#x672c;&#x5957;&#x6a21;&#x7248;';exit;}<!--{/eval}--><!--{loop $poll['polloption'] $key $option}-->
				<!--{eval $ppid = $poll['polloptionid'][$key];}-->
				<p>
					<input type="hidden" name="polloptionid[{$poll[polloptionid][$key]}]" value="$poll[polloptionid][$key]" />
					<input type="text" name="displayorder[{$poll[polloptionid][$key]}]" class="px pxs vm" autocomplete="off" tabindex="1" value="$poll[displayorder][$key]" />
					<input type="text" name="polloption[{$poll[polloptionid][$key]}]" class="px vm" autocomplete="off" style="width:230px;" tabindex="1" value="$option"{if !$_G['group']['alloweditpoll']} readonly="readonly"{/if} />
					<!--img src="$poll[imginfo][$ppid][small]" class="cur1" /-->

					<span id="newpoll_{$key}" class="vm"></span>
					<span id="pollUploadProgress_{$key}" class="vm">
						<!--{if $poll[isimage]}-->
						<img src="{IMGDIR}/attachimg_2.png" class="cur1" onmouseover="showMenu({'menuid':'poll_img_preview_{$poll[imginfo][$ppid][aid]}_menu','ctrlclass':'a','duration':2,'timeout':0,'pos':'34'});" onmouseout="hideMenu('poll_img_preview_{$poll[imginfo][$ppid][aid]}_menu');" />
						<!--{/if}-->
						<input type="hidden" name="pollimage[{$poll[polloptionid][$key]}]" id="pollUploadProgress_{$key}_aid" value="$poll[imginfo][$ppid][aid]" />
						<span id="poll_img_preview_{$poll[imginfo][$ppid][aid]}_menu" style="display: none">
							<img src="$poll[imginfo][$ppid][small]" />
						</span>
					</span>
				</p>
			<!--{/loop}-->
			<span id="polloption_new"></span>
			<p id="polloption_hidden" style="display: none">
				<a href="javascript:;" class="d" onclick="delpolloption(this)">del</a>
				<input type="text" name="displayorder[]" class="px pxs vm" autocomplete="off" tabindex="1" />
				<input type="text" name="polloption[]" class="px vm" autocomplete="off" style="width:230px;" tabindex="1" />
				<span id="newpoll" class="vm"></span>
				<span id="pollUploadProgress" class="vm" style="display: none;"></span>
			</p>
			<p><a href="javascript:;" onclick="addpolloption()">+{lang post_poll_add}</a></p>
		<!--{/if}-->
	</div>
	<div class="sadd z">
		<p class="mbn">
			<label for="maxchoices">{lang post_poll_allowmultiple}</label>
			<input type="text" name="maxchoices" id="maxchoices" class="px pxs" value="{if $_GET[action] == 'edit' && $poll[maxchoices]}$poll[maxchoices]{else}1{/if}" tabindex="1" /> {lang post_option}
		</p>
		<p class="mbn">
			<label for="polldatas">{lang post_poll_expiration}</label>
			<input type="text" name="expiration" id="polldatas" class="px pxs" value="{if $_GET[action] == 'edit'}{if !$poll[expiration]}0{elseif $poll[expiration] < 0}{lang poll_close}{elseif $poll[expiration] < TIMESTAMP}{lang poll_finish}{else}{echo (round(($poll[expiration] - TIMESTAMP) / 86400))}{/if}{/if}" tabindex="1" /> {lang days}
		</p>
		<p class="mbn">
			<input type="checkbox" name="visibilitypoll" id="visibilitypoll" class="pc" value="1"{if $_GET[action] == 'edit' && !$poll[visible]} checked{/if} tabindex="1" /><label for="visibilitypoll">{lang poll_after_result}</label>
		</p>
		<p class="mbn">
			<input type="checkbox" name="overt" id="overt" class="pc" value="1"{if $_GET[action] == 'edit' && $poll[overt]} checked{/if} tabindex="1" /><label for="overt">{lang post_poll_overt}</label>
		</p>
		<!--{hook/post_poll_extra}-->
	</div>
</div>
  
  </dd>
</dl>
<!--{subtemplate common/upload}-->
<script type="text/javascript" reload="1">
var maxoptions = parseInt('$_G[setting][maxpolloptions]');
<!--{if $_GET[action] == 'newthread'}-->
	var curoptions = 0;
	var curnumber = 1;
	addpolloption();
	addpolloption();
	addpolloption();
<!--{else}-->
	var curnumber = curoptions = <!--{echo count($poll['polloption'])}-->;
	for(var i=0; i < curnumber; i++) {
		addUploadEvent('newpoll_'+i, 'pollUploadProgress_'+i);
	}
<!--{/if}-->
function addUploadEvent(imgid, pollstr) {
	<!--{if empty($_G['setting']['pluginhooks']['post_upload_extend']) && empty($_G['setting']['pluginhooks']['post_poll_upload_extend'])}-->
		new SWFUpload({
			upload_url: SITEURL + 'misc.php?mod=swfupload&action=swfupload&operation=poll&fid=$_G[fid]',
			post_params: {"uid":"$_G[uid]", "hash":"$swfconfig[hash]"},

			file_size_limit : "2048",
			file_types : "*.jpg;*.jpeg;*.gif;*.png;*.bmp",
			file_types_description : "{lang pictypefile}",
			file_upload_limit : 0,
			file_queue_limit : 1,

			swfupload_preload_handler : preLoad,
			swfupload_load_failed_handler : loadFailed,
			file_dialog_start_handler : fileDialogStart,
			file_queued_handler : fileQueued,
			file_queue_error_handler : fileQueueError,
			file_dialog_complete_handler : fileDialogComplete,
			upload_start_handler : uploadStart,
			upload_progress_handler : uploadProgress,
			upload_error_handler : uploadError,
			upload_success_handler : uploadSuccess,
			upload_complete_handler : uploadComplete,

			button_image_url : IMGDIR+"/uploadbutton_small_pic.png",
			button_placeholder_id : imgid,
			button_width: 26,
			button_height: 26,
			button_cursor:SWFUpload.CURSOR.HAND,
			button_window_mode: "transparent",

			custom_settings : {
				progressTarget : pollstr,
				uploadSource: 'forum',
				uploadType: 'poll'
			},

			debug: false
		});
	<!--{else}-->
		<!--{hook/post_poll_upload_extend}-->
	<!--{/if}-->
}
</script>

