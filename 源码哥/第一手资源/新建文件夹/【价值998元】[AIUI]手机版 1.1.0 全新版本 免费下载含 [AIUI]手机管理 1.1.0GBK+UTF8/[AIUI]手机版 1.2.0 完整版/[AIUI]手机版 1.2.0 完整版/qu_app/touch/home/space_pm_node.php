<?PHP exit('QQȺ��550494646');?>

<!--{if $value[msgfromid] != $_G['uid']}-->
<div class="friend_msg cl">
	<div class="avat z"><img src="<!--{avatar($value[msgfromid], middle, true)}-->" /></div>
	<div class="dialog_green z">
		<div class="dialog_c">
			<div class="dialog_t">$value[message]</div>
		</div>
		<div class="dialog_b"></div>
		<div class="date"><!--{date($value[dateline], 'u')}--></div>
	</div>
</div>
<!--{else}-->
<div class="self_msg cl">
	<div class="avat y"><img src="<!--{avatar($value[msgfromid], middle, true)}-->" /></div>
	<div class="dialog_white y">			
		<div class="dialog_c">
			<div class="dialog_t">$value[message]</div>
		</div>
		<div class="dialog_b"></div>
		<div class="date"><!--{date($value[dateline], 'u')}--></div>
	</div>
</div>
<!--{/if}-->
