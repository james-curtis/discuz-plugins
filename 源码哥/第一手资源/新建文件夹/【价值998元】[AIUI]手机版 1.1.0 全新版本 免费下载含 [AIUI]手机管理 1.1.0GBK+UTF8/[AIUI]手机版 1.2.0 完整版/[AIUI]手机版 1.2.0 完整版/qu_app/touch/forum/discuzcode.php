<?PHP exit('QQȺ��550494646');?>
{eval
function tpl_hide_credits_hidden($creditsrequire) {
global $_G;
}
<!--{block return}--><div class="locked"><!--{if $_G[uid]}-->{$_G[username]}<!--{else}-->{lang guest}<!--{/if}-->{lang post_hide_credits_hidden}</div><!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function tpl_hide_credits($creditsrequire, $message) {
}
<!--{block return}--><div class="locked">{lang post_hide_credits}</div>
$message<br /><br />
<!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function tpl_codedisp($code) {
}
<!--{block return}--><div class="blockcode"><div><ol><li>$code</ol></div></div><!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function tpl_quote() {
}
<!--{block return}--><div class="grey quote"><blockquote>{lang e_quote}: \\1</blockquote></div><!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function tpl_free() {
}
<!--{block return}--><div class="grey quote"><blockquote>\\1</blockquote></div><!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function tpl_hide_reply() {
global $_G;
}
<!--{block return}--><div class="showhide"><h4>{lang post_hide}</h4>\\1</div>
<!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function tpl_hide_reply_hidden() {
global $_G;
}
<!--{block return}--><div class="locked"><!--{if $_G[uid]}-->{$_G[username]}<!--{else}-->{lang guest}<!--{/if}-->{lang post_hide_reply_hidden}</div><!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function attachlist($attach) {
global $_G;
$attach['refcheck'] = (!$attach['remote'] && $_G['setting']['attachrefcheck']) || ($attach['remote'] && ($_G['setting']['ftp']['hideurl'] || ($attach['isimage'] && $_G['setting']['attachimgpost'] && strtolower(substr($_G['setting']['ftp']['attachurl'], 0, 3)) == 'ftp')));
$aidencode = packaids($attach);
$is_archive = $_G['forum_thread']['is_archived'] ? "&fid=".$_G['fid']."&archiveid=".$_G[forum_thread][archiveid] : '';
}
<!--{block return}-->
<!--{if !$attach['price'] || $attach['payed']}-->
<div class="box box_ex2 attach">
	<dd>
		<p class="attnm">
			<!--{if $_G['setting']['mobile']['mobilesimpletype'] == 0}-->
				$attach[attachicon]
			<!--{/if}-->
			<!--{if !$attach['price'] || $attach['payed']}-->
				<a href="forum.php?mod=attachment{$is_archive}&aid=$aidencode" id="aid$attach[aid]" target="_blank">$attach[filename]</a>
			<!--{else}-->
				<a href="forum.php?mod=misc&action=attachpay&aid=$attach[aid]&tid=$attach[tid]">$attach[filename]</a>
			<!--{/if}-->
			<span class="xg1">($attach[dateline] {lang upload})</span>
		</p>
		<p class="xg1">$attach[attachsize]<!--{if $attach['readperm']}-->, {lang readperm}: <strong>$attach[readperm]</strong><!--{/if}-->, {lang downloads}: $attach[downloads]<!--{if !$attach['attachimg'] && $_G['getattachcredits']}-->, {lang attachcredits}: $_G[getattachcredits]<!--{/if}--></p>
		<!--{if $attach['description']}--><p class="xg2">{$attach[description]}</p><!--{/if}-->
	</dd>
</div>
<!--{/if}-->
<!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function imagelist($attach) {
global $_G, $post;
$fix = count($post[imagelist]) == 1 ? 800 : 5000;
$fixtype = count($post[imagelist]) == 1 ? 'fixnone' : 'fixnone';
$attach['refcheck'] = (!$attach['remote'] && $_G['setting']['attachrefcheck']) || ($attach['remote'] && ($_G['setting']['ftp']['hideurl'] || ($attach['isimage'] && $_G['setting']['attachimgpost'] && strtolower(substr($_G['setting']['ftp']['attachurl'], 0, 3)) == 'ftp')));
$mobilethumburl = $attach['attachimg'] && $_G['setting']['showimages'] && (!$attach['price'] || $attach['payed']) && ($_G['group']['allowgetimage'] || $_G['uid'] == $attach['uid']) ? getforumimg($attach['aid'], 0, $fix, $fix, $fixtype) : '' ;
$aidencode = packaids($attach);
$is_archive = $_G['forum_thread']['is_archived'] ? "&fid=".$_G['fid']."&archiveid=".$_G[forum_thread][archiveid] : '';
}
<!--{block return}-->
	<!--{if $attach['attachimg'] && $_G['setting']['showimages'] && ($_G['group']['allowgetimage'] || $_G['uid'] == $attach['uid']) && (!$attach['price'] || $attach['payed'])}-->
			<!--{if !$attach['price'] || $attach['payed']}-->
				<!--{if $_G['setting']['mobile']['mobilesimpletype'] == 0}-->
				<li><a href="forum.php?mod=viewthread&tid=$attach[tid]&aid=$attach[aid]&from=album&page=$_G[page]" class="orange"><img id="aimg_$attach[aid]" class="ainuolazyload" data-original="$mobilethumburl" alt="$attach[imgalt]" title="$attach[imgalt]" /></a>
				</li>
				<!--{/if}-->
			<!--{/if}-->
	<!--{/if}-->
<!--{/block}-->
<!--{eval return $return;}-->
{eval
}

function attachinpost($attach) {
global $_G;
$attach['refcheck'] = (!$attach['remote'] && $_G['setting']['attachrefcheck']) || ($attach['remote'] && ($_G['setting']['ftp']['hideurl'] || ($attach['isimage'] && $_G['setting']['attachimgpost'] && strtolower(substr($_G['setting']['ftp']['attachurl'], 0, 3)) == 'ftp')));
$mobilethumburl = $attach['attachimg'] && $_G['setting']['showimages'] && (!$attach['price'] || $attach['payed']) && ($_G['group']['allowgetimage'] || $_G['uid'] == $attach['uid']) ? getforumimg($attach['aid'], 0, 800, 5000, 'fixnone') : '' ;
$aidencode = packaids($attach);
$is_archive = $_G['forum_thread']['is_archived'] ? '&fid='.$_G['fid'].'&archiveid='.$_G[forum_thread][archiveid] : '';
}
<!--{block return}-->
	<!--{if $attach['attachimg'] && $_G['setting']['showimages'] && (!$attach['price'] || $attach['payed']) && ($_G['group']['allowgetimage'] || $_G['uid'] == $attach['uid'])}-->
		<!--{if $_G['setting']['mobile']['mobilesimpletype'] == 0}-->
		<a href="forum.php?mod=viewthread&tid=$attach[tid]&aid=$attach[aid]&from=album&page=$_G[page]" class="orange"><img id="aimg_$attach[aid]" class="ainuolazyload" data-original="$mobilethumburl" alt="$attach[imgalt]" title="$attach[imgalt]" style="margin-top:5px;" /></a>
		<!--{/if}-->
	<!--{else}-->
		
		<div id="attach_$attach[aid]" class="ainuo_attachbox cl" >
			<!--{if $_G['setting']['mobile']['mobilesimpletype'] == 0}-->
			$attach[attachicon]
			<!--{/if}-->
			<!--{if !$attach['price'] || $attach['payed']}-->
				<a href="forum.php?mod=attachment{$is_archive}&aid=$aidencode" target="_blank">$attach[filename]</a>
			<!--{else}-->
				<a href="forum.php?mod=misc&action=attachpay&aid=$attach[aid]&tid=$attach[tid]" target="_blank">$attach[filename]</a>
			<!--{/if}-->
			<em class="xg1">($attach[attachsize])</em>
			<em class="xg1"><br />({lang downloads}: $attach[downloads], $attach[dateline] {lang upload})
			</em>
			<!--{if !$attach['attachimg'] && $_G['getattachcredits']}--><p>{lang attachcredits}: $_G[getattachcredits]</p><!--{/if}-->
		</div>
		
	<!--{/if}-->
<!--{/block}-->
<!--{eval return $return;}-->
<!--{eval
}

}-->
