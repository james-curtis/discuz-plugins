<?php (!defined('IN_SANREE')&&exit('Power By ymg6.Com'))?>
<table cellpadding="0" cellspacing="0" summary="post_attachbody" border="0" width="100%">
<!--{loop $attachlist $attach}-->
	<tbody id="attach_$attach[aid]">
		<tr>
			<td class="attswf">
				<p id="attach$attach[aid]">
					<span>$attach[filetype] <a href="javascript:;" class="xi2" id="attachname$attach[aid]" isimage="{if $attach['isimage']}1{else}0{/if}" onclick="{if $attach['isimage']}insertAttachimgTag('$attach[aid]');hideMenu('attach_preview_$attach[aid]_menu'){else}insertAttachTag('$attach[aid]'){/if};doane(event);" {if $attach['isimage']}onmouseout="hideMenu('attach_preview_$attach[aid]_menu');" onmouseover="showMenu({'menuid':'attach_preview_$attach[aid]_menu','pos':'*'});"{/if}>{$attach[filename]}</a></span>
					<!--{if $_G['setting']['allowattachurl']}-->
						<a href="javascript:;" class="atturl" title="{lang e_attach_url}" onclick="insertText('attach://$attach[aid].{echo fileext($attach[filenametitle])}');doane(event);"><img src="{IMGDIR}/attachurl.gif" /></a>
						<!--{if ($attachmcode = parseattachmedia($attach))}--><a href="javascript:;" class="atturl" title="{lang e_attach_mediacode}" onclick="insertText('$attachmcode');doane(event);"><img src="{IMGDIR}/attachmediacode.gif" /></a><!--{/if}-->
					<!--{/if}-->
					<!--{if $attach['pid']}-->
						<input type="hidden" name="attachupdate[{$attach[aid]}]" id="attachupdate{$attach[aid]}" size="2" />&nbsp;
						<!--{if !empty($allowuploadnum)}--><a href="javascript:;" onclick="uploadWindow(function (aid, url, name){$('attachupdate$attach[aid]').value = aid;$('attachname$attach[aid]').title = '';$('attachname$attach[aid]').innerHTML = name;$('attachname$attach[aid]').onmouseover=null}, 'file');return false;">{lang update}</a></span><!--{/if}-->
					<!--{/if}-->
				</p>
				<span id="attachupdate$attach[aid]"></span>
				<!--{if $attach['isimage']}-->
				<div id="attach_preview_$attach[aid]_menu"  style="display:none">
					<img src="{echo news_getforumimg($attach[aid], 1, 300, 300, 'fixnone')}&ramdom={echo random(5)}" id="image_$attach[aid]" cwidth="{if $attach[width] < 300}$attach[width]{else}300{/if}"/>
				</div>
				<!--{/if}-->
				<!--{if $_GET[result] == 'simple'}-->
				<input type="hidden" name="attachnew[{$attach[aid]}][description]" value="" />
				<input type="hidden" name="ishome" value="" />
				<input type="hidden" name="attachnew[{$attach[aid]}][isimage]" value="<!--{if $attach['isimage']}-->1<!--{else}-->0<!--{/if}-->" />
				<!--{/if}-->
			</td>
			<!--{if $_GET[result] != 'simple'}-->
				<td class="attpr">
				<input type="hidden" name="attachnew[{$attach[aid]}][isimage]" value="<!--{if $attach['isimage']}-->1<!--{else}-->0<!--{/if}-->" />
				<!--{if $attach['isimage']}-->
				<input type="radio" name="ishome" class="px" value="$attach[aid]" size="1" <!--{if $attach[aid]==$homeaid}-->checked="checked" <!--{/if}--> /><!--{/if}--></td>
			<!--{/if}-->
			<td class="attc"><a href="javascript:;" class="d" onclick="delAttach($attach[aid],{if !$attach[pid]}1{else}0{/if});return false;" title="{lang e_attach_del}">{lang e_attach_del}</a></td>
		</tr>
	</tbody>
<!--{/loop}-->
</table>
<!--{if $_G[inajax]}-->
	<script type="text/javascript" reload="1">
	ATTACHNUM['attachunused'] += <!--{echo count($attachlist)}-->;
	updateattachnum('attach');
	if($('attachlimitnotice')) {
		ajaxget('forum.php?mod=ajax&action=updateattachlimit&fid=' + fid, 'attachlimitnotice');
	}
	</script>
<!--{/if}-->