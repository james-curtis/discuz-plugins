<?PHP exit('QQȺ��550494646');?>
<li class="ainuo_piclist_zhineng">
    <a href="{if $_G[uid] == $thread[authorid]}home.php?mod=space&uid={$thread[authorid]}&do=profile&mycenter=1{else}home.php?mod=space&uid={$thread[authorid]}&do=profile{/if}" class="lione cl" {if $groupcolor[$thread[authorid]]} style="color: $groupcolor[$thread[authorid]];"{/if}>
        <div class="author">
            <div class="aleft">
                <div class="ava"><!--{avatar($thread[authorid], 'middle')}--></div>
                <span>$thread[author]</span> 
                <!--{eval $thread[agroupid] = DB::result_first('SELECT groupid FROM '.DB::table('common_member').' WHERE uid='.$thread[authorid].'')}-->
                {if $thread[agroupid]}
                <!--{eval $thread[astars] = DB::result_first('SELECT stars FROM '.DB::table('common_usergroup').' WHERE groupid='.$thread[agroupid].'')}-->
                {else}<!--Fr om w ww.moq u8 .com -->
                <!--{eval $thread[astars] = 0}-->
                {/if}
                {if $thread[astars]}
                <div class="mod-lv user-level">
                    <span class="mod-lv-icon"><i class="iconfont icon-evaluate_fill"></i></span>
                    <span>$thread['astars']</span>
                </div>
                {/if}
            </div>
            <div class="aright">
                <!--{if $thread['digest'] > 0}-->
                <span class="abadge">$alang_newjinghua</span> 
                <!--{elseif $thread['displayorder'] == 0}-->
                    <!--{if $thread[recommendicon] && $filter != 'recommend'}-->
                        <span class="abadge">{lang thread_recommend}</span>
                    <!--{/if}-->
                    <!--{if $thread[heatlevel]}-->
                        <span class="abadge">{lang heats}</span>
                    <!--{/if}-->
                    <!--{if $thread['rate'] > 0}-->
                        <span class="abadge">{lang rate_credit_add}</span>
                    <!--{elseif $thread['rate'] < 0}-->
                        <span class="abadge">{lang posts_deducted}</span>
                    <!--{/if}-->
                <!--{/if}-->
                <!--{if $thread['special'] == 1}-->
                    <span class="abadge leixing">{lang thread_poll}</span>
                <!--{elseif $thread['special'] == 2}-->
                    <span class="abadge leixing">{lang thread_trade}</span>
                <!--{elseif $thread['special'] == 3}-->
                    <span class="abadge leixing">{lang thread_reward}</span>
                <!--{elseif $thread['special'] == 4}-->
                    <span class="abadge leixing">{lang thread_activity}</span>
                <!--{elseif $thread['special'] == 5}-->
                    <span class="abadge leixing">{lang thread_debate}</span>
                <!--{/if}-->
            </div>
        </div>
    </a>
    
    <a href="forum.php?mod=viewthread&tid=$thread[tid]&extra=$extra" class="litwo cl">
        <div class="asub">
            <div class="atitle" $thread[highlight]>$thread[subject]</div>
            <!--{hook/forumdisplay_littlepic_mobile $key}-->
        </div>
    </a>
    <div class="abot cl">
        <div class="al"><span>$thread[dateline]</span><span>{$thread[views]} $alang_yue</span></div>
        <div class="ar">
            <!--{subtemplate forum/iszan}-->
            <a id="dianzan_{$thread[tid]}" onclick="zanbuzan('dianzan_{$thread[tid]}','red_{$thread[tid]}','$thread[tid]')" href="javascript:;" class="dianzan {if $iszan}yidianzan{/if}"><i id="i_{$thread[tid]}" class="iconfont icon-appreciate_light {if $iszan}icon-appreciate_fill_light{/if}"></i> <span id="red_{$thread[tid]}">$thread[recommend_add]</span></a>
            <a href="forum.php?mod=viewthread&tid=$thread[tid]&extra=$extra" class="rp">
                <i class="iconfont icon-comment_light"></i> $thread[allreplies]
            </a>
        </div>
    </div>
</li>