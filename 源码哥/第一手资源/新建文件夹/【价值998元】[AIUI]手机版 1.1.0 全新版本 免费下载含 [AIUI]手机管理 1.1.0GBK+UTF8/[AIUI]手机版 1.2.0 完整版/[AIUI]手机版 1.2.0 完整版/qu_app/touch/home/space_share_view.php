<?PHP exit('QQȺ��550494646');?>
<!--{eval $_G['home_tpl_titles'] = array($tpl_title, '{lang share}');}-->

	<!--{template home/space_header}-->
	<div id="ct" class="ct2 wp n cl">
		<div class="mn">
			<div class="bm">
				<div class="bm_h">
					<h1 class="mt">{lang share}</h1>
				</div>
				<div class="bm_c">

		<div id="share_ul" class="vw">
			<div class="h">
				<h1 class="ph">$share[title_template]</h1>
				<span class="y">
					<!--{if $_G[uid] == $share[uid] || checkperm('manageshare')}-->
					<a href="home.php?mod=spacecp&ac=share&sid=$share[sid]&op=delete&type=view&handlekey=delsharehk_{$share[sid]}" id="share_delete_$share[sid]" onclick="showWindow(this.id, this.href, 'get', 0);">{lang delete}</a>&nbsp;&nbsp;&nbsp;
					<!--{/if}-->
					<!--{if checkperm('manageshare')}-->
					<a href="home.php?mod=spacecp&ac=share&sid=$share[sid]&op=edithot&handlekey=hotsharehk_{$share[sid]}" id="a_hot_$share[sid]" onclick="showWindow(this.id, this.href, 'get', 0);">{lang hot}</a>
					<!--{/if}-->
					<!--<a href="home.php?mod=spacecp&ac=common&op=report&idtype=sid&id=$share[sid]&handlekey=reportsharehk_{$share[sid]}" id="a_report" onclick="showWindow(this.id, this.href, 'get', 0);">{lang report}</a>-->
				</span>
				<!--{if $share[hot]}--><span class="hot">{lang hot} <em>$share[hot]</em></span><!--{/if}-->
				<span class="xg1"><!--{date($share[dateline])}--></span>
			</div>
			<div id="share_article" class="ec d cl">
				<!--{if $share['image']}-->
				<a href="$share[image_link]"><img src="$share[image]" class="tn" style="margin-top: 0;" alt="" /></a>
				<!--{/if}-->
				{$share[body_template]}<br />
				<!--{if 'video' == $share['type']}-->
				<div class="tn" id="flash_div_$share[sid]">
					<script>showFlash('{$share['body_data']['host']}', '{$share['body_data']['flashvar']}', '', '{$share['sid']}');</script>
				</div>
				<!--{elseif 'music' == $share['type']}-->
				<div class="tn" id="flash_div_$share[sid]">
					<script>showFlash('music', '{$share['body_data']['musicvar']}', '', '{$share['sid']}');</script>
				</div>
				<!--{elseif 'flash' == $share['type']}-->
				<div class="tn" id="flash_div_$share[sid]">
					<script>showFlash('flash', '{$share['body_data']['flashaddr']}', '', '{$share['sid']}');</script>
				</div>
				<!--{/if}-->

				<!--{if $share[body_general]}-->
				<div class="quote{if $share['image']} z{/if}"><blockquote>$share[body_general]</blockquote></div>
				<!--{/if}-->
			</div>
		</div>
		<!--[diy=diycommenttop]--><div id="diycommenttop" class="area"></div><!--[/diy]-->
		<div class="bm bw0 mtm mbm">
			<h3 class="bbs pbn">
				<!--{if !empty($list)}-->
				<a href="home.php?mod=space&uid=$share[uid]&do=$do&id=$id#quickcommentform_{$id}" onclick="if($('comment_message')){$('comment_message').focus();return false;}" class="y xi2 xw0">{lang publish_comment}</a>
				<!--{/if}-->
				{lang comment}
			</h3>
			<div id="comment">
				<!--{if $cid}-->
				<div class="i">
					{lang current_blog_replay}<a href="home.php?mod=space&uid=$share[uid]&do=share&id=$share[sid]">{lang click_view_all}</a>
				</div>
				<!--{/if}-->
				<div id="comment_ul" class="xld xlda">
				<!--{loop $list $k $value}-->
					<!--{template home/space_comment_li}-->
				<!--{/loop}-->
				</div>
			</div>
			<!--{if $multi}--><div class="pgs cl mtm">$multi</div><!--{/if}-->
		</div>
		<!--{if !$share[noreply] && helper_access::check_module('share')}-->
		<form id="quickcommentform_{$id}" name="quickcommentform_{$id}" action="home.php?mod=spacecp&ac=comment&handlekey=qcshare_{$id}" method="post" autocomplete="off" onsubmit="ajaxpost('quickcommentform_{$id}', 'return_qcshare_$id');doane(event);">
			<!--{if $_G['uid']}-->
				<p>
					<span id="comment_face" onclick="showFace(this.id, 'comment_message');return false;" class="cur1"><img src="{IMGDIR}/facelist.gif" alt="facelist" class="vm" /></span>
					<!--{if $_G['setting']['magicstatus'] && $_G['setting']['magics']['doodle']}-->
					<a id="a_magic_doodle" href="home.php?mod=magic&mid=doodle&showid=comment_doodle&target=comment_message" onclick="showWindow(this.id, this.href, 'get', '0')"><img src="{STATICURL}image/magic/doodle.small.gif" alt="doodle" class="vm" />{$_G[setting][magics][doodle]}</a>
					<!--{/if}-->
				</p>
			<!--{/if}-->
			<div class="tedt mtn mbn">
				<div class="area">
					<!--{if $_G['uid'] || $_G['group']['allowcomment']}-->
						<textarea id="comment_message" name="message" rows="5" onkeydown="ctrlEnter(event, 'commentsubmit_btn');" class="pt"></textarea>
					<!--{else}-->
						<div class="pt hm">{lang login_to_comment} <a href="member.php?mod=logging&action=login" onclick="showWindow('login', this.href)" class="xi2">{lang login}</a> | <a href="member.php?mod={$_G[setting][regname]}" class="xi2">$_G['setting']['reglinkname']</a></div>
					<!--{/if}-->
				</div>
			</div>
			<!--{if $secqaacheck || $seccodecheck}-->
				<!--{block sectpl}--><sec> <span id="sec<hash>" onclick="showMenu(this.id);"><sec></span><div id="sec<hash>_menu" class="p_pop p_opt" style="display:none"><sec></div><!--{/block}-->
				<div class="mtm mbm"><!--{subtemplate common/seccheck}--></div>
			<!--{/if}-->
			<p>
				<input type="hidden" name="refer" value="home.php?mod=space&uid=$share[uid]&do=$do&id=$id" />
				<input type="hidden" name="id" value="$id" />
				<input type="hidden" name="idtype" value="sid" />
				<input type="hidden" name="commentsubmit" value="true" />
				<button type="submit" name="commentsubmit_btn" id="commentsubmit_btn" class="pn" value="true"{if !$_G[uid]&&!$_G['group']['allowcomment']} onclick="showWindow(this.id, this.form.action);return false;"{/if}><strong>{lang comment}</strong></button>
				<span id="return_qcshare_{$id}"></span>
			</p>
			<input type="hidden" name="formhash" value="{FORMHASH}" />
		</form>
		<script type="text/javascript">
			function succeedhandle_qcshare_$id(url, msg, values) {
				comment_add(values['cid']);
				<!--{if $sechash}-->
					<!--{if $secqaacheck}-->
					updatesecqaa('$sechash');
					<!--{/if}-->
					<!--{if $seccodecheck}-->
					updateseccode('$sechash');
					<!--{/if}-->
				<!--{/if}-->
			}
		</script>
		<!--{/if}-->
<script type="text/javascript">
var elems = selector('div[class~=magicflicker]');
for(var i=0; i<elems.length; i++){
	magicColor(elems[i]);
}
</script>

		</div>
		</div>
	</div>
	<div class="sd">
		<!--{subtemplate home/space_userabout}-->
	</div>
</div>

<!--{template common/footer}-->