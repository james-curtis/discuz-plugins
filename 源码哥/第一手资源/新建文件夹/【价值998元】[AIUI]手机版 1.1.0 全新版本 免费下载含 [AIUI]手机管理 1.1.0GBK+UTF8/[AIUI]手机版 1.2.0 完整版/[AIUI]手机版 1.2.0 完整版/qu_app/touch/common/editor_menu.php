<?PHP exit('QQȺ��550494646');?>
<div id="{$editorid}_editortoolbar" class="editortoolbar">

	<!--{eval $fontoptions = array({lang e_fontoptions})}-->
	<div class="p_pop fnm" id="{$editorid}_fontname_menu" style="display: none">
	<ul unselectable="on">
	<!--{loop $fontoptions $fontname}-->
		<li onclick="discuzcode('fontname', '$fontname')" style="font-family: $fontname" unselectable="on"><a href="javascript:;" title="$fontname">$fontname</a></li>
	<!--{/loop}-->
	</ul>
	</div>

	<!--{eval $sizeoptions = array(1, 2, 3, 4, 5, 6, 7)}-->
	<div class="p_pop fszm" id="{$editorid}_fontsize_menu" style="display: none">
	<ul unselectable="on">
	<!--{loop $sizeoptions $size}-->
		<li onclick="discuzcode('fontsize', $size)" unselectable="on"><a href="javascript:;" title="$size"><font size="$size" unselectable="on">$size</font></a></li>
	<!--{/loop}-->
	</ul>
	</div>

</div>

<script type="text/javascript">smilies_show('smiliesdiv', $_G['setting']['smcols'], editorid + '_');showHrBox(editorid+'_inserthorizontalrule');showHrBox(editorid+'_postbg', 'postbg');</script>
