<?PHP exit('QQȺ��550494646');?>
<!--{if $action == 'index'}-->
	<div class="bm bml tns">
		<table cellpadding="4" cellspacing="0" border="0">
			<tr>
				<th><p>$_G[forum][posts]</p>{lang posts}</th>
				<th><p>$_G[forum][membernum]</p>{lang member}</th>
				<td><p>$groupcache[ranking][data][today]</p>{lang group_member_rank}</td>
			</tr>
		</table>
	</div>
	<!--{hook/group_index_side}-->
	<!--{if $status != 2 && $status != 3}-->
		<div class="bm">
			<ul class="tb tb_h cl">
				<li class="a" id="new" onmouseover="this.className='a';$('top').className='';$('newuserlist').style.display='block';$('topuserlist').style.display='none';"><a href="javascript:;">{lang group_member_new}</a></li>
				<li id="top" onmouseover="this.className='a';$('new').className='';$('topuserlist').style.display='block';$('newuserlist').style.display='none';"><a href="javascript:;">{lang group_member_active}</a></li>
			</ul>
			<div class="bm_c">
				<ul class="ml mls cl" id="newuserlist" style="display:block;">
					<!--{loop $newuserlist $user}-->
						<li>
							<a href="home.php?mod=space&uid=$user[uid]" title="{if $user['level'] == 1}{lang group_moderator_title}{elseif $user['level'] == 2}{lang group_moderator_vice_title}{elseif $user['level'] == 3}{lang group_star_member_title}{/if}{if $user['online']} {lang login_normal_mode}{/if}" class="avt" c="1">
								<!--{if $user['level'] == 1}-->
									<em class="gm"></em>
								<!--{elseif $user['level'] == 2}-->
									<em class="gm" style="filter: alpha(opacity=50); opacity: 0.5"></em>
								<!--{elseif $user['level'] == 3}-->
									<em class="gs"></em>
								<!--{/if}-->
								<!--{if $user['online']}-->
									<em class="gol"{if $user['level'] <= 3} style="margin-top: 15px;"{/if}></em>
								<!--{/if}-->
								<!--{echo avatar($user[uid], 'small')}-->
							</a>
							<p>
								<a href="home.php?mod=space&uid=$user[uid]">$user[username]</a>
							</p>
						</li>
					<!--{/loop}-->
				</ul>
				<ul class="ml mls cl" id="topuserlist" style="display:none;">
					<!--{loop $activityuserlist $user}-->
						<li>
							<a href="home.php?mod=space&uid=$user[uid]" title="{if $user['level'] == 1}{lang group_moderator_title}{elseif $user['level'] == 2}{lang group_moderator_vice_title}{elseif $user['level'] == 3}{lang group_star_member_title}{/if}{if $user['online']} {lang login_normal_mode}{/if}" class="avt" c="1">
								<!--{if $user['level'] == 1}-->
									<em class="gm"></em>
								<!--{elseif $user['level'] == 2}-->
									<em class="gm" style="filter: alpha(opacity=50); opacity: 0.5"></em>
								<!--{elseif $user['level'] == 3}-->
									<em class="gs"></em>
								<!--{/if}-->
								<!--{if $user['online']}-->
									<em class="gol"{if $user['level'] <= 3} style="margin-top: 15px;"{/if}></em>
								<!--{/if}-->
								<!--{echo avatar($user[uid], 'small')}-->
							</a>
							<p>
								<a href="home.php?mod=space&uid=$user[uid]">$user[username]</a>
							</p>
						</li>
					<!--{/loop}-->
				</ul>
			</div>
		</div>

		<!--{if $groupviewed_list}-->
		<div class="bm">
			<div class="bm_h cl">
				<h2>{lang group_visited}</h2>
			</div>
			<div class="bm_c">
				<ul class="ml mls cl">
					<!--{loop $groupviewed_list $groupid $group}-->
					<li>
						<a href="forum.php?mod=group&fid=$groupid" title="$group[name]" class="avt"><img src="$group[icon]" alt="$group[name]" /></a>
						<p><a href="forum.php?mod=group&fid=$groupid" title="$group[name]">$group[name]</a></p>
						<span>$group[membernum]</span>
					</li>
					<!--{/loop}-->
				</ul>
			</div>
		</div>
		<!--{/if}-->
	<!--{/if}-->
<!--{elseif $action == 'list'}-->
	<!--{if $groupcache['replies']['data']}-->
		<div class="bm">
			<div class="bm_h cl">
				<h2>{lang group_hot_topics_today}</h2>
			</div>
			<div class="bm_c">
				<ul class="xl xl1">
					<!--{loop $groupcache['replies']['data'] $tid $thread}-->
						<li><a href="forum.php?mod=viewthread&tid=$tid">$thread[subject]</a></li>
					<!--{/loop}-->
				</ul>
			</div>
		</div>
	<!--{/if}-->
	<!--{if $groupcache['digest']['data']}-->
		<div class="bm">
			<div class="bm_h cl">
				<h2>{lang group_digest_recommend}</h2>
			</div>
			<div class="bm_c">
				<ul class="xl xl1">
					<!--{loop $groupcache['digest']['data'] $tid $thread}-->
						<li><a href="forum.php?mod=viewthread&tid=$tid">$thread[subject]</a></li>
					<!--{/loop}-->
				</ul>
			</div>
		</div>
	<!--{/if}-->
<!--{/if}-->
<!--{if CURMODULE == 'group'}--><!--{hook/group_side_top}--><!--{else}--><!--{hook/forumdisplay_side_top}--><!--{/if}-->
<!--{if $action == 'create'}-->
	<div class="bm bmn">
		<div class="bm_c xw1 xi1">{lang group_you_have}</div>
	</div>
<!--{else}-->
	<!--{if $action != 'index' && ($status != 2 || $status != 3)}-->
	<div class="bm bml">
		<div class="bm_h cl">
			<h2>{lang group_find_topics}</h2>
		</div>
		<div class="bm_c hm pns">
			<form method="post" action="search.php?mod=group&srchfid=$_G[fid]&searchsubmit=1">
				<input type="text" name="srchtxt" id="groupsearch" class="px p_fre vm" size="15" value="{lang input_search_key_words}" onclick="$('groupsearch').value=''" />&nbsp;
				<button type="submit" class="pn vm"><span>{lang search}</span></button>
			</form>
		</div>
	</div>
	<!--{/if}-->

	<div class="bm bml">
		<div class="bm_h cl">
			<h2>{lang group_url}</h2>
		</div>
		<div class="bm_c">
			<p>
				<!--{if $_G['setting']['allowgroupdomain'] && !empty($_G['setting']['domain']['root']['group']) && !empty($_G['forum']['domain'])}-->
				<a href="http://{$_G[forum][domain]}.{$_G['setting']['domain']['root']['group']}" id="group_link"></a>
				<!--{else}-->
				<a href="forum.php?mod=group&fid={$_G[fid]}" id="group_link"></a>
				<!--{/if}-->
				[<a href="javascript:;" onclick="setCopy($('group_link').href, '{lang group_url_copy_finished}')" class="xi2">{lang copy}</a>]
			</p>
			<script type="text/javascript">$('group_link').innerHTML = $('group_link').href</script>
			<p class="ptn xg1">$_G[forum][foundername] {lang create_on} $_G[forum][dateline]</p>
			<!--{if $status == 'isgroupuser'}--><p class="ptn"><a onclick="showDialog('{lang group_exit_confirm}', 'confirm', '', function(){location.href='forum.php?mod=group&action=out&fid=$_G[fid]'})" href="javascript:;" class="xi2">{lang group_exit}</a><p><!--{/if}-->
		</div>
	</div>
<!--{/if}-->