<?php echo '源码哥免费分享，仅供学习，请支持正版！';exit;?>
<!--{if !$_G['inajax']}-->
	<!--{template common/header}-->
	<div id="ct" class="wp cl w">
		<!--{if !$param[login]}-->
			<div class="nfl">
		<!--{else}-->
			<div class="nfl" id="main_succeed" style="display: none">
				<div class="f_c altw">
					<div class="alert_right">
						<p id="succeedmessage"></p>
						<p id="succeedlocation" class="alert_btnleft"></p>
						<p class="alert_btnleft"><a id="succeedmessage_href">{lang message_forward}</a></p>
					</div>
				</div>
			</div>
			<div class="nfl" id="main_message">
		<!--{/if}-->
<!--{else}-->
	<!--{template common/header_ajax}-->
<!--{/if}-->
<!--{if $param[msgtype] == 1 || $param[msgtype] == 2 && !$_G[inajax]}-->
		<div class="qin_nologin f_c altw">
			<div id="messagetext" class="$alerttype">
				<p>$show_message</p>
				<!--{if $url_forward}-->
					<!--{if !$param[redirectmsg]}-->
						<p class="alert_btnleft"><a href="$url_forward">{lang message_forward}</a></p>
					<!--{else}-->
						<p class="alert_btnleft"><a href="$url_forward">{lang attach_forward}</a></p>
					<!--{/if}-->
				<!--{elseif $allowreturn}-->
				<script type="text/javascript">
					if(history.length > (BROWSER.ie ? 0 : 1)) {
						document.write('<p class="alert_btnleft"><a href="javascript:history.back()">{lang message_go_back}</a></p>');
					} else {
						document.write('<p class="alert_btnleft"><a href="./">[ $_G['setting']['bbname'] {lang homepage} ]</a></p>');
					}
				</script>
				<!--{/if}-->
			</div>
			<!--{if $param[login]}-->
				<div id="messagelogin"></div>
				<div class="nologin_box">
					<div class="nologin_boxbg"></div>
					<div class="nologin_dib">
						<p>
							<a href="member.php?mod=logging&action=login" onclick="showWindow('login', this.href)" class="nologin_bluesmallbutton">立刻登录</a>
							<span class="nologin_pipe"></span>
							<a href="member.php?mod=register" class="nologin_greensmallblankbutton">没有账号？立刻注册</a>
						</p>
					</div>
				</div>
			<!--{/if}-->
		</div>
<!--{elseif $param[msgtype] == 2}-->
		<h3 class="flb"><em>{lang board_message}</em><!--{if $_G[inajax]}--><span><a href="javascript:;" class="flbc" onclick="hideWindow('$_GET['handlekey']');" title="{lang close}">{lang close}</a></span><!--{/if}--></h3>
		<div class="c altw">
			<div class="$alerttype">$show_message</div>
		</div>
		<p class="o pns">
			<!--{if $param['closetime']}-->
				<span class="z xg1">$param['closetime'] {lang message_closetime}</span>
			<!--{elseif $param['locationtime']}-->
				<span class="z xg1">$param['locationtime'] {lang message_locationtime}</span>
			<!--{/if}-->
			<!--{if $param[login]}-->
				<button type="button" class="pn pnc" onclick="hideWindow('$_GET['handlekey']');showWindow('login', 'member.php?mod=logging&action=login');"><strong>{lang login}</strong></button>
				<!--{if !$_G['setting']['bbclosed']}-->
					<button type="button" class="pn pnc" onclick="hideWindow('$_GET['handlekey']');window.open('member.php?mod={$_G[setting][regname]}');"><em>$_G['setting']['reglinkname']</em></button>
				<!--{/if}-->
				<button type="button" class="pn" onclick="hideWindow('$_GET['handlekey']');"><em>{lang cancel}</em></button>
			<!--{elseif !$param['closetime'] && !$param['locationtime']}-->
				<button type="button" class="pn pnc" id="closebtn" onclick="hideWindow('$_GET['handlekey']');"><strong>{lang confirms}</strong></button>
				<script type="text/javascript" reload="1">if($('closebtn')) {$('closebtn').focus();}</script>
			<!--{/if}-->
		</p>
<!--{else}-->$show_message<!--{/if}-->
<!--{if !$_G['inajax']}-->
		</div>
	</div>
	<!--{template common/footer}-->
<!--{else}-->
	<!--{template common/footer_ajax}-->
<!--{/if}-->
