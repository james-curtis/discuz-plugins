<?php echo '源码哥，商业模版免费下载：www.ymg6.com';exit;?>
<div id="threadlist" class="bm bmw"{if $_G['uid']} style="position: relative;"{/if}>
	<!--{if $quicksearchlist && !$_GET['archiveid']}-->
		<!--{subtemplate forum/search_sortoption}-->
	<!--{/if}-->
	$sorttemplate['header']
	<form method="post" autocomplete="off" name="moderate" id="moderate" action="forum.php?mod=topicadmin&action=moderate&fid=$_G[fid]&infloat=yes&nopost=yes">
		$sorttemplate['body']
		<!--{if $_G['forum']['ismoderator'] && $_G['forum_threadcount']}-->
			<!--{template forum/topicadmin_modlayer}-->
		<!--{/if}-->
	</form>
	$sorttemplate['footer']
</div>

<div class="bm bw0 pgs cl">
	$multipage
	<span {if $_G[setting][visitedforums]}id="visitedforumstmp" onmouseover="$('visitedforums').id = 'visitedforumstmp';this.id = 'visitedforums';showMenu({'ctrlid':this.id,'pos':'21'})"{/if} class="pgb y"><a href="forum.php">{lang return_index}</a></span>
	<!--{if !$_GET['archiveid']}--><a href="javascript:;" id="newspecialtmp" onmouseover="$('newspecial').id = 'newspecialtmp';this.id = 'newspecial';showMenu({'ctrlid':this.id})"{if !$_G['forum']['allowspecialonly'] && empty($_G['forum']['picstyle'])} onclick="showWindow('newthread', 'forum.php?mod=post&action=newthread&fid=$_G[fid]')"{else} onclick="location.href='forum.php?mod=post&action=newthread&fid=$_G[fid]';return false;"{/if} title="{lang send_posts}"><img src="{IMGDIR}/pn_post.png" alt="{lang send_posts}" class="post_lw" /></a><!--{/if}-->
	<!--{hook/forumdisplay_postbutton_bottom}-->
</div>