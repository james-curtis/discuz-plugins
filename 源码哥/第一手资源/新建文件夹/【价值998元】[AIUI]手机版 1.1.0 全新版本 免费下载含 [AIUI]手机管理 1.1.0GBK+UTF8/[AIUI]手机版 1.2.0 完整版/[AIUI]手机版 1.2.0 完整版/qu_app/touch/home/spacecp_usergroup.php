<?PHP exit('QQȺ��550494646');?>
<!--{template common/header}-->
<!--{if in_array($do, array('buy', 'exit'))}-->
	<div class="f_c">
	<h3 class="flb">
		<em id="return_$_GET[handlekey]"><!--{if $join}-->{lang memcp_usergroups_joinbuy}<!--{else}-->{lang memcp_usergroups_joinexit}<!--{/if}--></em>
		<!--{if $_G[inajax]}--><span><a href="javascript:;" onclick="hideWindow('$_GET[handlekey]');" class="flbc" title="{lang close}">{lang close}</a></span><!--{/if}-->
	</h3>

	<form id="buygroupform_{$groupid}" name="buygroupform_{$groupid}" method="post" autocomplete="off" action="home.php?mod=spacecp&ac=usergroup&do=$do&groupid=$groupid"{if !empty($_GET['inajax'])} onsubmit="ajaxpost('buygroupform_{$groupid}', 'return_$_GET['handlekey']', 'return_$_GET['handlekey']', 'onerror');return false;"{/if}>
		<input type="hidden" name="referer" value="{echo dreferer()}" />
		<input type="hidden" name="buysubmit" value="true" />
		<input type="hidden" name="gid" value="$_GET[gid]" />

		<!--{if $_G[inajax]}--><input type="hidden" name="handlekey" value="$_GET[handlekey]" /><!--{/if}-->
		<input type="hidden" name="formhash" value="{FORMHASH}" />
		<div class="c">
			<table class="list" cellspacing="0" cellpadding="0" style="width:300px">
			<!--{if $join}-->
				<!--{if $group['dailyprice']}-->
					<tr>
						<td>{lang memcp_usergroups_dailyprice}</td><td> $group[dailyprice] {$_G[setting][extcredits][$_G[setting][creditstrans]][unit]}{$_G[setting][extcredits][$_G[setting][creditstrans]][title]}</td>
					</tr>
					<tr>
						<td>{lang memcp_usergroups_credit}</td><td>$usermaxdays {lang days}</td>
					</tr>
					<tr>
						<td>{lang memcp_usergroups_span}</td><td><input type="text" size="2" name="days" value="$group[minspan]" class="px" onkeyup="change_credits_need(this.value)" /> {lang days}</td>
					</tr>
					<tr>
						<td>{lang credits_need}{$_G[setting][extcredits][$_G[setting][creditstrans]][title]}</td><td><span id="credits_need"></span> {$_G[setting][extcredits][$_G[setting][creditstrans]][unit]}
			<script language="javascript">
				var dailyprice = $group[dailyprice];
				function change_credits_need(daynum) {
					if(!isNaN(parseInt(daynum))) {
						$('credits_need').innerHTML = parseInt(daynum) * dailyprice;
					} else {
						$('credits_need').innerHTML = '0';
					}
				}
				change_credits_need($group[minspan]);
			</script></td>
					</tr>
					<tr>
						<td colspan="2">{lang memcp_usergroups_explain}:
							<!--{if $join}-->
								{lang memcp_usergroups_join_comment}
							<!--{else}-->
								{lang memcp_usergroups_exit_comment}
							<!--{/if}-->
						</td>
					</tr>
				<!--{else}-->
					<tr>
						<td colspan="2">{lang memcp_usergroups_explain}: {lang memcp_usergroups_free_comment}</td>
					</tr>
				<!--{/if}-->
			<!--{else}-->
				<tr>
					<td colspan="2">{lang memcp_usergroups_explain}:
					<!--{if $group[type] != 'special' || $group[system]=='private'}-->
						{lang memcp_usergroups_admin_exit_comment}
					<!--{elseif $group['dailyprice']}-->
						{lang memcp_usergroups_exit_comment}
					<!--{else}-->
						{lang memcp_usergroups_open_exit_comment}
					<!--{/if}-->
					</td>
				</tr>
			<!--{/if}-->
			</table>
		</div>
		<p class="o pns">
			<button type="submit" name="editsubmit_btn" id="editsubmit_btn" value="true" class="pn pnc"><strong>{lang submit}</strong></button>
		</p>
	</form>
	</div>

<!--{elseif $do == 'switch'}-->
	<div class="f_c">
	<h3 class="flb">
		<em id="return_$_GET[handlekey]">{lang memcp_usergroups_switch}</em>
		<!--{if $_G[inajax]}--><span><a href="javascript:;" onclick="hideWindow('$_GET[handlekey]');" class="flbc" title="{lang close}">{lang close}</a></span><!--{/if}-->
	</h3>
	<form id="switchgroupform_{$groupid}" name="switchgroupform_{$groupid}" method="post" autocomplete="off" action="home.php?mod=spacecp&ac=usergroup&do=switch&groupid=$groupid"{if !empty($_GET['inajax'])} onsubmit="ajaxpost('switchgroupform_{$groupid}', 'return_$_GET['handlekey']', 'return_$_GET['handlekey']', 'onerror');return false;"{/if}>
		<input type="hidden" name="referer" value="{echo dreferer()}" />
		<input type="hidden" name="groupsubmit" value="true" />
		<input type="hidden" name="gid" value="$_GET[gid]" />

		<!--{if $_G[inajax]}--><input type="hidden" name="handlekey" value="$_GET[handlekey]" /><!--{/if}-->
		<input type="hidden" name="formhash" value="{FORMHASH}" />
		<div class="c">
			<table class="list" cellspacing="0" cellpadding="0" style="width:300px">
				<tr>
					<td>{lang memcp_usergroups_main_old}</td><td>$_G[group][grouptitle]</td>
				</tr>
				<tr>
					<td>{lang memcp_usergroups_main_new}</td><td>$group[grouptitle]</td>
				</tr>
			</table>
		</div>
		<p class="o pns">
			<button type="submit" name="editsubmit_btn" id="editsubmit_btn" value="true" class="pn pnc"><strong>{lang submit}</strong></button>
		</p>
	</form>
	</div>
<!--{elseif $do == 'forum'}-->
	<!--{subtemplate home/spacecp_header}-->
			<!--{hook/spacecp_usergroup_top}-->
			<!--{subtemplate home/spacecp_usergroup_header}-->
            <div class="dashedtip cl">
            	<img src="{IMGDIR}/data_valid.gif" alt="data_valid" class="vm" /> {lang usergroup_right_message1}&nbsp;
				<img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" class="vm" /> {lang usergroup_right_message2}&nbsp;
                <!--{if $_G['setting']['verify']['enabled']}-->
                    <p><!--{echo implode('', $verifyicon)}--> {lang usergroup_right_message3}</p>
                <!--{/if}-->
            </div>
			<table cellpadding="0" cellspacing="0" class="myquanx">
				<tr class="alt">
					<th class="xw1">{lang forum_name}</th>
					<!--{loop $perms $perm}-->
						<td class="xw1">$permlang['perms_'.$perm]</td>
					<!--{/loop}-->
				</tr>
			<!--{eval $key = 1;}-->
			<!--{loop $_G['cache']['forums'] $fid $forum}-->
				<!--{if $forum['status']}-->
				<tr {if $key++%2==0}class="alt"{/if}>
					<th{if $forum['type'] == 'forum'} style="padding-left:30px"{elseif $forum['type'] == 'sub'} style="padding-left:60px"{/if}><a href="forum.php?mod=forumdisplay&fid=$forum[fid]">$forum[name]</th>
					<!--{loop $perms $perm}-->
						<td>
							<!--{if !empty($verifyperm[$fid][$perm])}-->
								<!--{if $myverifyperm[$fid][$perm] || $forumperm[$fid][$perm]}-->
									<img src="{IMGDIR}/data_valid.gif" alt="data_valid" class="vm" />
								<!--{else}-->
									<img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" class="vm" />
								<!--{/if}-->
								&nbsp;$verifyperm[$fid][$perm]
							<!--{else}-->
								<!--{if $forumperm[$fid][$perm]}--><img src="{IMGDIR}/data_valid.gif" alt="data_valid" /><!--{else}--><img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" /><!--{/if}-->
							<!--{/if}-->
						</td>
					<!--{/loop}-->
				</tr>
				<!--{/if}-->
			<!--{/loop}-->
			</table>
			
		</div>
		<!--{hook/spacecp_usergroup_bottom}-->
	</div>

</div>
<!--{elseif $do == 'expiry' || $do == 'list'}-->
	<!--{subtemplate home/spacecp_header}-->
			<!--{hook/spacecp_usergroup_top}-->
			<!--{subtemplate home/spacecp_usergroup_header}-->
				<div class="dashedtip cl">
                <span class="y">
					{lang youhave} <span class="xi1"> $usermoney {$_G[setting][extcredits][$_G[setting][creditstrans]][unit]}{$_G[setting][extcredits][$_G[setting][creditstrans]][title]}</span></span>
					{lang yourusergroup}: {$_G['cache']['usergroups'][$_G[groupid]]['grouptitle']}
				</div>
				<!--{if $do == 'expiry'}-->
					<div class="dashedtip cl">{lang usergroup_expired}</div>
				<!--{/if}-->
				<!--{if $expirylist}-->
                <div class="buyuser cl">
					<table cellspacing="0" cellpadding="0" width="100%">
						<tbody class="th">
							<tr>
								<th>{lang usergroup}</th>
								<th>{lang memcp_usergroups_dailyprice}</th>
								<th>{lang memcp_usergroups_credit}</th>
								<th>{lang group_expiry_time}</th>
								<th></th>
							</tr>
						</tbody>
						<tbody>
							<!--{loop $expirylist $groupid $group}-->
								<tr class="{echo swapclass('alt')}">
									<td><a href="home.php?mod=spacecp&ac=usergroup&gid=$groupid" class="xi2" target="_blank">$group[grouptitle]</a></td>
									<td>
										<!--{if $_G['cache']['usergroups'][$groupid]['pubtype'] == 'buy' && $group[dailyprice]}-->
											$group[dailyprice] {$_G[setting][extcredits][$_G[setting][creditstrans]][unit]}{$_G[setting][extcredits][$_G[setting][creditstrans]][title]}
										<!--{elseif $_G['cache']['usergroups'][$groupid]['pubtype'] == 'free'}-->
											{lang free}
										<!--{/if}-->
									</td>
									<td><!--{if $group[usermaxdays]}-->$group[usermaxdays] {lang days}<!--{/if}--></td>
									<td>$group[time]</td>
									<td>
										<!--{if in_array($groupid, $extgroupids) || $groupid == $_G['groupid']}-->
											<!--{if $groupid != $_G['groupid']}-->
												<!--{if !$group[noswitch]}-->
													<a href="home.php?mod=spacecp&ac=usergroup&do=switch&groupid=$groupid&handlekey=switchgrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang memcp_usergroups_set_main}</a>
												<!--{/if}-->
												<!--{if !$group['maingroup']}-->
													<!--{if $_G['cache']['usergroups'][$groupid]['pubtype'] == 'buy'}-->
														<a href="home.php?mod=spacecp&ac=usergroup&do=buy&groupid=$groupid&handlekey=buygrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang renew}</a>
													<!--{/if}-->
													<a href="home.php?mod=spacecp&ac=usergroup&do=exit&groupid=$groupid&handlekey=exitgrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang memcp_usergroups_exit}</a>
												<!--{/if}-->
											<!--{else}-->
												<!--{if $_G['cache']['usergroups'][$groupid]['pubtype'] == 'buy'}-->
													<a href="home.php?mod=spacecp&ac=usergroup&do=buy&groupid=$groupid&handlekey=buygrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang renew}</a>
												<!--{/if}-->
												{lang main_usergroup}
											<!--{/if}-->
										<!--{elseif $_G['cache']['usergroups'][$groupid]['pubtype'] == 'free'}-->
											<a href="home.php?mod=spacecp&ac=usergroup&do=buy&groupid=$groupid&handlekey=buygrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang free_buy}</a>
										<!--{elseif $_G['cache']['usergroups'][$groupid]['pubtype'] == 'buy'}-->
											<a href="home.php?mod=spacecp&ac=usergroup&do=buy&groupid=$groupid&handlekey=buygrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang memcp_usergroups_buy}</a>
										<!--{/if}-->
									</td>
								</tr>
							<!--{/loop}-->
						</tbody>
					</table>
                    </div>
				<!--{else}-->
                    <div class="emp"><i class="iconfont icon-meiyougengduole"></i><p>{lang memcp_usergroup_unallow}</p></div>
				<!--{/if}-->
			</div>
			<!--{hook/spacecp_usergroup_bottom}-->
		</div>
	</div>
<!--{else}-->
	<!--{subtemplate home/spacecp_header}-->
			<!--{hook/spacecp_usergroup_top}-->
			<!--{subtemplate home/spacecp_usergroup_header}-->
			<!--{eval
				$permtype = array(0 => '{lang permission_menu_normaloptions}', 1 => '{lang permission_modoptions_name}');
			}-->
            <div class="dashedtip cl">
				<p>{lang my_main_usergroup} - $maingroup[grouptitle]</p>
                <p>
                	<img src="{IMGDIR}/data_valid.gif" alt="data_valid" class="vm" /> {lang usergroup_right_message1}&nbsp;
                	<img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" class="vm" /> {lang usergroup_right_message2}
                </p>
            </div>
			<div class="tdats">
				<table cellpadding="0" cellspacing="0" class="tdat">
					<tbody class="ca">
						<tr><td>{lang user_level}</td></tr>
						<!--{loop $bperms $key $perm}-->
						<tr {if $key%2==0}class="alt"{/if}>
							<td>$permlang['perms_'.$perm]</td>
						</tr>
						<!--{/loop}-->
					</tbody>

					<tr class="alt h">
						<th>{lang permission_menu_post}</th>
					</tr>
					<tbody class="cb">
						<!--{loop $pperms $key $perm}-->
						<tr {if $key%2==0}class="alt"{/if}>
							<td>$permlang['perms_'.$perm]</td>
						</tr>
						<!--{/loop}-->
					</tbody>

					<tr class="alt h">
						<th>{lang about_space}</th>
					</tr>
					<tbody class="cc">
						<!--{loop $sperms $key $perm}-->
						<tr {if $key%2==0}class="alt"{/if}>
							<td>$permlang['perms_'.$perm]</td>
						</tr>
						<!--{/loop}-->
					</tbody>


					<tr class="alt h">
						<th>{lang permission_menu_attachment}</th>
					</tr>
					<tbody class="cd">
						<!--{loop $aperms $key $perm}-->
						<tr {if $key%2==0}class="alt"{/if}>
							<td>$permlang['perms_'.$perm]</td>
						</tr>
						<!--{/loop}-->
					</tbody>
				</table>
				<table cellpadding="0" cellspacing="0" class="tdat tfx{if !$group}f{/if}">
					<!--{echo permtbody($maingroup)}-->
				</table>
				<!--{if $group}-->
					<!--{if $switchtype == 'user'}--><!--{eval $cid = 1;$tlang = '{lang usergroup_group1}';}--><!--{/if}-->
					<!--{if $switchtype == 'upgrade'}--><!--{eval $cid = 2;$tlang = '{lang usergroup_group2}';}--><!--{/if}-->
					<!--{if $switchtype == 'admin'}--><!--{eval $cid = 3;$tlang = '{lang usergroup_group3}';}--><!--{/if}-->
					<ul id="tba" class="tb c$cid">
						<li id="c$cid">$tlang - $currentgrouptitle</li>
					</ul>
					<div class="tscr">
						<table cellpadding="0" cellspacing="0" class="tdat">
							<tr>
								<th class="alt h">
									<!--{if $group['grouptype'] == 'member'}-->
										<!--{eval $v = $group[groupcreditshigher] - $_G['member']['credits'];}-->
										<!--{if $_G['group']['grouptype'] == 'member' && $v > 0}-->
											<span class="notice">{lang spacecp_usergroup_message1} $v</span>
										<!--{else}-->
											<span class="notice">{lang spacecp_usergroup_message2} $group[groupcreditshigher]</span>
										<!--{/if}-->
									<!--{/if}-->
									<!--{if isset($publicgroup[$group['groupid']]) && $group['groupid'] != $_G['groupid'] && $publicgroup[$group['groupid']]['allowsetmain']}-->
										<a href="home.php?mod=spacecp&ac=usergroup&do=switch&groupid=$group['groupid']&gid=$_GET[gid]&handlekey=switchgrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang memcp_usergroups_set_main}</a>
									<!--{/if}-->
									<!--{if in_array($group['groupid'], $extgroupids) && $switchmaingroup && $group['grouptype'] == 'special' && $group['groupid'] != $_G['groupid']}-->
										<!--{if $_G['cache']['usergroups'][$group['groupid']]['pubtype'] == 'buy'}-->
											<a href="home.php?mod=spacecp&ac=usergroup&do=buy&groupid=$group['groupid']&gid=$_GET[gid]&handlekey=buygrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang renew}</a>
										<!--{/if}-->
										<a href="home.php?mod=spacecp&ac=usergroup&do=exit&groupid=$group['groupid']&gid=$_GET[gid]&handlekey=exitgrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang memcp_usergroups_exit}</a>
									<!--{/if}-->
									<!--{if $group['grouptype']=='special' && $group['groupid'] != $_G['groupid'] && array_key_exists($group['groupid'], $publicgroup) && !$publicgroup[$group['groupid']]['allowsetmain']}-->
										<a href="home.php?mod=spacecp&ac=usergroup&do=buy&groupid=$group['groupid']&gid=$_GET[gid]&handlekey=buygrouphk" class="xw1 xi2" onclick="showWindow('group', this.href, 'get', 0);">{lang memcp_usergroups_buy}</a>
									<!--{/if}-->
									<!--{if array_key_exists($group['groupid'], $groupterms['ext'])}-->
										<span class="notice">{lang memcp_usergroups_timelimit}: <!--{date($groupterms[ext][$group['groupid']])}--></span>
									<!--{/if}-->
								</th>
							</tr>
							<!--{echo permtbody($group)}-->
						</table>
					</div>
				<!--{/if}-->
			</div>
			
			<div id="gmy_menu" class="p_pop" style="display:none">$usergroups[my]</div>
			<div id="gupgrade_menu" class="p_pop" style="display:none">$usergroups[upgrade]</div>
			<div id="guser_menu" class="p_pop" style="display:none">$usergroups[user]</div>
			<div id="gadmin_menu" class="p_pop" style="display:none">$usergroups[admin]</div>
		</div>
		<!--{hook/spacecp_usergroup_bottom}-->
	</div>
</div>
<!--{/if}-->
{eval
function permtbody($maingroup) {
global $_G, $bperms, $pperms, $sperms, $aperms;
}
<tr><td><!--{echo showstars($_G['cache']['usergroups'][$maingroup['groupid']]['stars']);}--></td></tr>
<tbody class="ca">
	<!--{loop $bperms $key $groupbperm}-->
	<tr {if $key%2==0}class="alt"{/if}>
		<td>
			<!--{if $groupbperm == 'creditshigher' || $groupbperm == 'readaccess' || $groupbperm == 'maxpmnum'}-->
			$maingroup[$groupbperm]
			<!--{elseif $groupbperm == 'allowsearch'}-->
				<!--{if $maingroup['allowsearch'] == '0'}-->{lang permission_basic_disable_sarch}<!--{elseif $maingroup['allowsearch'] == '1'}-->{lang permission_basic_search_title}<!--{else}-->{lang permission_basic_search_content}<!--{/if}-->
			<!--{else}-->
				<!--{if $maingroup[$groupbperm] >= 1}--><img src="{IMGDIR}/data_valid.gif" alt="data_valid" /><!--{else}--><img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" /><!--{/if}-->
			<!--{/if}-->
		</td>
	</tr>
	<!--{/loop}-->
</tbody>

<tr class="alt h">
	<th>$maingroup[grouptitle]</th>
</tr>
<tbody class="cb">
	<!--{loop $pperms $key $grouppperm}-->
	<tr {if $key%2==0}class="alt"{/if}>
		<td>
			<!--{if in_array($grouppperm, array('maxsigsize', 'maxbiosize'))}-->
				$maingroup[$grouppperm] {lang bytes}
			<!--{elseif $grouppperm == 'allowrecommend'}-->
				<!--{if $maingroup[allowrecommend] > 0}-->+$maingroup[allowrecommend]<!--{else}--><img src="{IMGDIR}/data_invalid.gif" /><!--{/if}-->
			<!--{elseif in_array($grouppperm, array('allowat', 'allowcreatecollection'))}-->
				<!--{echo intval($maingroup[$grouppperm])}-->
			<!--{else}-->
				<!--{if $maingroup[$grouppperm] == 1 || (in_array($grouppperm, array('raterange', 'allowcommentpost')) && !empty($maingroup[$grouppperm]))}--><img src="{IMGDIR}/data_valid.gif" alt="data_valid" /><!--{else}--><img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" /><!--{/if}-->
			<!--{/if}-->
		</td>
	</tr>
	<!--{/loop}-->
</tbody>

<tr class="alt h">
	<th>$maingroup[grouptitle]</th>
</tr>
<tbody class="cc">
	<!--{loop $sperms $key $perm}-->
	<tr {if $key%2==0}class="alt"{/if}>
		<td>
			<!--{if in_array($perm, array('maxspacesize', 'maximagesize'))}-->
				<!--{if $maingroup[$perm]}-->$maingroup[$perm]<!--{else}-->{lang permission_attachment_nopermission}<!--{/if}-->
			<!--{else}-->
				<!--{if $maingroup[$perm] == 1}--><img src="{IMGDIR}/data_valid.gif" alt="data_valid" /><!--{else}--><img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" /><!--{/if}-->
			<!--{/if}-->
		</td>
	</tr>
	<!--{/loop}-->
</tbody>

<tr class="alt h">
	<th>$maingroup[grouptitle]</th>
</tr>
<tbody class="cd">
	<!--{loop $aperms $key $groupaperm}-->
	<tr {if $key%2==0}class="alt"{/if}>
		<td>
			<!--{if in_array($groupaperm, array('maxattachsize', 'maxsizeperday', 'maxattachnum'))}-->
				<!--{if $maingroup[$groupaperm]}-->$maingroup[$groupaperm]<!--{else}-->{lang permission_attachment_nopermission}<!--{/if}-->
			<!--{elseif $groupaperm == 'attachextensions'}-->
				<!--{if $maingroup[allowpostattach] == 1}--><!--{if $maingroup[attachextensions]}--><p class="nwp" title="$maingroup[attachextensions]">$maingroup[attachextensions]</p><!--{else}-->{lang permission_attachment_nopermission}<!--{/if}--><!--{else}--><img src="{IMGDIR}/data_invalid.gif" /><!--{/if}-->
			<!--{else}-->
				<!--{if $maingroup[$groupaperm] == 1}--><img src="{IMGDIR}/data_valid.gif" alt="data_valid" /><!--{else}--><img src="{IMGDIR}/data_invalid.gif" alt="data_invalid" /><!--{/if}-->
			<!--{/if}-->
		</td>
	</tr>
	<!--{/loop}-->
</tbody>
<!--{eval
}
}-->
<!--{template common/footer}-->
