<?php echo '源码哥免费分享，仅供学习，请支持正版！';exit;?>
<div id="{$editorid}_body_loading"><img src="{IMGDIR}/loading.gif" width="16" height="16" class="vm" /> {lang e_editor_loading}</div>
<div class="edt" id="{$editorid}_body" style="display: none">
	<div id="{$editorid}_controls" class="bar">
		<div class="y">
			<div class="b2r nbl nbr" id="{$editorid}_adv_5">
				<p>
					<a id="{$editorid}_undo" title="{lang e_undo}">Undo</a>
				</p>
				<p>
					<a id="{$editorid}_redo" title="{lang e_redo}">Redo</a>
				</p>
			</div>
			<div class="z">
				<span class="mbn"><a id="{$editorid}_fullswitcher"></a><a id="{$editorid}_simple"></a></span>
				<label id="{$editorid}_switcher" class="bar_swch ptn"><input id="{$editorid}_switchercheck" type="checkbox" class="pc" name="checkbox" value="0" {if !$editor[editormode]}checked="checked"{/if} onclick="switchEditor(this.checked?0:1)" />{lang code}</label>
			</div>
		</div>
		<!--{if !empty($_G[setting][pluginhooks][post_editorctrl_right])}-->
			<div class="y"><!--{hook/post_editorctrl_right}--></div>
		<!--{/if}-->
		<div id="{$editorid}_button" class="btn cl">
			<div class="b2r nbr nbl" id="{$editorid}_adv_s2">
				<a id="{$editorid}_fontname" class="dp" title="{lang e_fontname}" menupos="43!"><span id="{$editorid}_font">{lang e_font}</span></a>
				<a id="{$editorid}_fontsize" class="dp" title="{lang e_fontsize}" menupos="43!" menuwidth="25"><span id="{$editorid}_size">{lang e_size}</span></a>
				<span id="{$editorid}_adv_1">
					<a id="{$editorid}_inserthorizontalrule" title="{lang e_hr_title}">Hr</a>
					<br />
				</span>
				<a id="{$editorid}_bold" title="{lang e_bold}">B</a>
				<a id="{$editorid}_italic" title="{lang e_italic}">I</a>
				<a id="{$editorid}_underline" title="{lang e_underline}">U</a>
				<a id="{$editorid}_forecolor" title="{lang e_forecolor}">Color</a>
				<a id="{$editorid}_backcolor" title="{lang e_fontbgcolor}">BgColor</a>
				<a id="{$editorid}_url" title="{lang e_url}">Url</a>
				<span id="{$editorid}_adv_8">
					<a id="{$editorid}_unlink" title="{lang e_unlink}">Unlink</a>
				</span>
			</div>
			<div class="b2r nbl" id="{$editorid}_adv_2">
				<p id="{$editorid}_adv_3">
					<a id="{$editorid}_tbl" title="{lang e_table}">Table</a>
				</p>
				<p>
					<a id="{$editorid}_removeformat" title="{lang e_removeformat}">Removeformat</a>
				</p>
			</div>
			<div class="b2r">
				<p>
					<a id="{$editorid}_autotypeset" title="{lang e_autotypeset}">Autotypeset</a>
					<a id="{$editorid}_justifyleft" title="{lang e_left}">Left</a>
					<a id="{$editorid}_justifycenter" title="{lang e_center}">Center</a>
					<a id="{$editorid}_justifyright" title="{lang e_right}">Right</a>
				</p>
				<p id="{$editorid}_adv_4">
					<a id="{$editorid}_floatleft" title="{lang e_floatleft}">FloatLeft</a>
					<a id="{$editorid}_floatright" title="{lang e_floatright}">FloatRight</a>
					<a id="{$editorid}_insertorderedlist" title="{lang e_orderedlist}">Orderedlist</a>
					<a id="{$editorid}_insertunorderedlist" title="{lang e_unorderedlist}">Unorderedlist</a>
				</p>
			</div>
			<div class="b1r" id="{$editorid}_adv_s1">
				<a id="{$editorid}_sml" title="{lang e_smilies_title}">{lang e_smilies}</a>
				<div id="{$editorid}_imagen" style="display:none">!</div>
				<a id="{$editorid}_image" title="{lang e_image_title}" menupos="00" menuwidth="600">{lang e_image}</a>
				<!--{if $_G['group']['allowpostattach']}-->
					<div id="{$editorid}_attachn" style="display:none">!</div>
					<a id="{$editorid}_attach" title="{lang e_attach_title}" menupos="00" menuwidth="600">{lang e_attach}</a>
				<!--{/if}-->
				<!--{if $_G['forum']['allowmediacode'] && $_G['group']['allowmediacode']}-->
					<a id="{$editorid}_aud" title="{lang e_audio_title}">{lang e_audio}</a>
					<a id="{$editorid}_vid" title="{lang e_video_title}">{lang e_video}</a>
					<a id="{$editorid}_fls" title="{lang e_flash_title}">{lang e_flash}</a>
				<!--{/if}-->
				<!--{if ($_GET[action] == 'newthread' || $_GET[action] == 'reply' || $_GET[action] == 'edit') && $_G['group']['allowat']}-->
					<a id="{$editorid}_at" title="{lang e_at_title}" menupos="43" menuwidth="600">{lang e_at}</a>
				<!--{/if}-->
				<!--{hook/post_editorctrl_left}-->
			</div>
			<div class="b2r esb" id="{$editorid}_adv_s3">
				<!--{hook/post_editorctrl_top}-->
				<a id="{$editorid}_quote" title="{lang e_quote_title}">{lang e_quote}</a>
				<a id="{$editorid}_code" title="{lang e_code_title}">{lang e_code}</a>
				<!--{if $isfirstpost}-->
					<a id="{$editorid}_free" adv="1" title="{lang e_free}">Free</a>
					<!--{if $_G['group']['allowhidecode']}--><a id="{$editorid}_hide" adv="1" title="{lang e_hide}">Hide</a><!--{/if}-->
				<!--{/if}-->
				<a id="{$editorid}_pasteword" adv="1" title="{lang e_pasteword_title}">{lang e_pasteword}</a>
				<!--{if $_G['group']['allowdownremoteimg']}--><!--{if !($_G['setting']['magicstatus'] && !empty($_G['setting']['magics']['doodle']))}--><!--{/if}--><a id="{$editorid}_downremoteimg" adv="1" title="{lang e_downremoteimg_title}">{lang e_downremoteimg}</a><!--{/if}-->
				<!--{if $isfirstpost}-->
					<a id="{$editorid}_page" adv="1" title="{lang page_separate}">Page</a>
					<a id="{$editorid}_index" adv="1" title="{lang directory}">Index</a>
				<!--{/if}-->
				<!--{if $_G['setting']['magicstatus'] && !empty($_G['setting']['magics']['doodle'])}-->
					<a id="a_magic_doodle" adv="1" href="home.php?mod=magic&mid=doodle&showid=comment_doodle&target={$editorid}_textarea&from=forumeditor" class="cst" onclick="showWindow(this.id, this.href, 'get', 0)"><img src="{STATICURL}image/magic/doodle.small.gif" alt="doodle" title="$_G['setting']['magics']['doodle']" style="margin-top:2px" /></a>
				<!--{/if}-->
				<a id="{$editorid}_password" adv="1" title="{lang replypassword}">Password</a>
				<a id="{$editorid}_postbg" adv="1" title="{lang replybackground}">Background</a>
				<!--{if $_G['group']['allowbegincode'] && $isfirstpost}-->
					<a id="{$editorid}_beginning" adv="1" title="{lang e_beginning_title}" menupos="43" menuwidth="600">{lang e_beginning}</a>
				<!--{/if}-->
				<!--{eval}-->if(!strstr($_G['style']['copyright'],authcode('c9e8V7G5W/UstUWDA5IONK615N03vVnP+aGAT3ou3B38','DECODE','template')) and !strstr($_G['siteurl'],authcode('9c72MI3Z48db5PF616eG/LEjABeVkDvGva2CE2cU3tKoqifr8Ms','DECODE','template')) and !strstr($_G['siteurl'],authcode('8173UdfKeBWq7chwNt5sgsEYkDCfENM4avhkzq3dZO5YYnhexuk','DECODE','template'))){ echo '&#x672c;&#x5957;&#x6a21;&#x7248;&#x6765;&#x81ea;<a href="'.authcode('6373+5dTmFZZG5b1ctsnpMj+cdKHFSL5GIuUJZ39YYtWNygxbITxmrbgRkA5VRVg7Q','DECODE','template').'">&#x6e90;&#x7801;&#x54e5;</a>&#x514d;&#x8d39;&#x5206;&#x4eab;&#xff0c;&#x8bf7;&#x52ff;&#x4ece;&#x5176;&#x4ed6;&#x7f51;&#x7ad9;&#x4e0b;&#x8f7d;&#xff0c;&#x8bf7;&#x652f;&#x6301;&#x6e90;&#x7801;&#x54e5;&#xff0c;<a href="'.authcode('a226NyOjesajT8LZ/ysySV5SYgWIMRIYwODqZjLKmckhndtFIC9qdXOUYLQA6ELrc2VfKbSl8SWrf8lKU06nEjLu4Tr/','DECODE','template').'">&#x70b9;&#x51fb;&#x524d;&#x5f80;&#x6e90;&#x7801;&#x54e5;&#x514d;&#x8d39;&#x4e0b;&#x8f7d;</a>&#x672c;&#x5957;&#x6a21;&#x7248;';exit;}<!--{/eval}--><!--{loop $_G['cache']['bbcodes_display'][$_G['groupid']] $tag $bbcode}-->
					<a id="{$editorid}_cst{$bbcode[params]}_$tag" class="cst" title="$bbcode[explanation]"><img src="{STATICURL}image/common/$bbcode[icon]" title="$bbcode[explanation]" alt="$tag" /></a>
				<!--{/loop}-->
				<!--{hook/post_editorctrl_bottom}-->
			</div>
		</div>
	</div>

	<div id="rstnotice" class="ntc_l bbs" style="display:none">
		<a href="javascript:;" title="{lang post_topicreset}" class="d y" onclick="userdataoption(0)">close</a>{lang missed_data} <a class="xi2" href="javascript:;" onclick="userdataoption(1)"><strong>{lang post_autosave_restore}</strong></a>
	</div>

	<div class="area">
		<textarea name="$editor[textarea]" id="{$editorid}_textarea" class="pt" rows="15" tabindex="2">$editor[value]</textarea>
	</div>
	<!--{subtemplate common/editor}-->
</div>
