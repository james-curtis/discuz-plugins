<?PHP exit('QQȺ��550494646');?>
<!--{template common/header}-->
<!--{eval $mysiteBM = currentlang()}-->
<!--{eval require_once(DISCUZ_ROOT."./template/qu_app/touch/ainuo/lang/$mysiteBM.php");}-->

<!--{if $_GET['op'] == 'delete'}-->
<div class="ainuo_pop favpop cl">
	
	<form id="favoriteform_{$favid}" name="favoriteform_{$favid}" method="post" autocomplete="off" action="home.php?mod=spacecp&ac=favorite&op=delete&favid=$favid&type=$_GET[type]&mobile=2">
		<input type="hidden" name="referer" value="{eval echo dreferer();}" />
		<input type="hidden" name="deletesubmit" value="true" />
		<input type="hidden" name="formhash" value="{FORMHASH}" />
	<div class="acon cl">{lang delete_favorite_message}</div>
	<div class="ainuo_popbottom cl">
    	<input type="submit" name="deletesubmitbtn" value="{lang determine}" class="formdialog aconfirm">
        <a href="javascript:;" onclick="popup.close()" class="acancel">{lang cancel}</a>
    </div>
	</form>
</div>
<!--{else}-->
<div class="ainuo_pop favpop cl">
	<div class="atit cl">$alang_favtip</div>
	<form method="post" autocomplete="off" id="favoriteform_{$id}" name="favoriteform_{$id}" action="home.php?mod=spacecp&ac=favorite&type=$type&id=$id&spaceuid=$spaceuid&mobile=2" >
		<input type="hidden" name="favoritesubmit" value="true" />
		<input type="hidden" name="referer" value="{eval echo dreferer();}" />
		<input type="hidden" name="formhash" value="{FORMHASH}" />
	<div class="acon cl">
	<textarea id="general_{$id}" name="description" rows="3" class="px" style="background:#f8f8f8;"><!--{if $description}-->$description<!--{else}-->{lang favorite_description_default}<!--{/if}--></textarea>
	</div>
	<div class="ainuo_popbottom cl">
    	<input type="submit" name="favoritesubmit_btn" id="favoritesubmit_btn"  value="{lang determine}" class="formdialog aconfirm">
        <a href="javascript:;" onclick="popup.close()" class="acancel">{lang cancel}</a>
    </div>
	</form>
</div>
<!--{/if}-->

<!--{eval $nofooter = true;}-->
<!--{template common/footer}-->
