<?PHP exit('QQȺ��550494646');?>
<!--{template common/header}-->
			<!--{hook/spacecp_avatar_top}-->
			<script type="text/javascript">
				function updateavatar() {
					window.location.href = document.location.href.replace('&reload=1', '') + '&reload=1';
				}
				<!--{if !$reload}-->
				saveUserdata('avatar_redirect', document.referrer);
				<!--{/if}-->
			</script>
			<form method="post" autocomplete="off" action="home.php?mod=spacecp&ac=avatar&ref">
				<table cellspacing="0" cellpadding="0" class="tfm">
					<caption>
						<span id="retpre" class="y xi2"></span>
						<h2 class="xs2">{lang current_my_space}</h2>
						<p>{lang setting_avatar_message}</p>
					</caption>
					<tr>
						<td>
							<!--{avatar($space[uid],big)}-->
						</td>
					</tr>
				</table>

				<table cellspacing="0" cellpadding="0" class="tfm">
					<caption>
						<h2 class="xs2">{lang setting_my_new_avatar}</h2>
						<p>{lang setting_my_new_avatar_message}</p>
					</caption>
					<tr>
						<td>
							<script type="text/javascript">document.write(AC_FL_RunContent('<!--{echo implode("','", $uc_avatarflash);}-->'));</script>
						</td>
					</tr>
				</table>
				<input type="hidden" name="formhash" value="{FORMHASH}" />
			</form>
			<!--{hook/spacecp_avatar_bottom}-->
		</div>
	</div>
	<script type="text/javascript">
		var redirecturl = loadUserdata('avatar_redirect');
		if(redirecturl) {
			$('retpre').innerHTML = '<a href="' + redirecturl + '">{lang previous_page}</a>';
		}
	</script>
</div>
<!--{template common/footer}-->