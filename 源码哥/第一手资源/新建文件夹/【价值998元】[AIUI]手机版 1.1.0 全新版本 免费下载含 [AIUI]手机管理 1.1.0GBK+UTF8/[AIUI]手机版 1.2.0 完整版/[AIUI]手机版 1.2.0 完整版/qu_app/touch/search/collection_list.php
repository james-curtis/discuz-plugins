<?PHP exit('QQȺ��550494646');?>
<div class="tl">
	<div class="sttl mbn">
		<h2><!--{if $keyword}-->{lang search_result_keyword}<!--{else}-->{lang search_result}<!--{/if}--></h2>
	</div>
	<!--{ad/search/y mtw}-->
	<!--{if empty($collectionlist)}-->
		<p class="emp xs2 xg2">{lang search_nomatch}</p>
	<!--{else}-->
		<div class="slst pbm bbda cl">
			<!--{loop $collectionlist $key $value}-->
			<dl class="xld xld_a z" style="width: 350px;">
				<dt><a href="forum.php?mod=collection&action=view&ctid=$value[ctid]" target="_blank">$value[name]</a></dt>
				<dd>{lang threads}: $value[threadnum], {lang comment}: $value[commentnum], {lang subscribe}: $value[follownum], {lang lastupdate}: $value[lastupdate]</dd>
				<dd>$value[desc]&nbsp;</dd>
			</dl>
			<!--{/loop}-->
		</div>
		<!--{if !empty($multipage)}--><br /><div class="pgs cl mbm">$multipage</div><!--{/if}-->
	<!--{/if}-->
</div>
