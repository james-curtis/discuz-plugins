<?PHP exit('QQȺ��550494646');?>
<!--{eval $aaffirmpoint = DB::result_first('SELECT affirmpoint FROM '.DB::table('forum_debate').' WHERE tid ='.$thread[tid].'')}-->
<!--{eval $anegapoint = DB::result_first('SELECT negapoint FROM '.DB::table('forum_debate').' WHERE tid ='.$thread[tid].'')}-->
<!--{eval $aendtime = DB::result_first('SELECT endtime FROM '.DB::table('forum_debate').' WHERE tid ='.$thread[tid].'')}-->
<!--{eval $anowtime = time()}-->
<li class="ainuo_piclist_debate">
    <a href="forum.php?mod=viewthread&tid=$thread[tid]&extra=$extra">
        <div class="authorinfo cl">
            <div class="author">
                <div class="aleft">
                    <div class="ava"><!--{avatar($thread[authorid], 'middle')}--></div>
                    <span>$thread[author]</span> 
                </div>
                <div class="aright">
                    <span>$thread[dateline]</span> 
                    <span class="pip">/</span> 
                    <span>$thread[views] $alang_view</span>
                </div>
            </div>
        </div>
        <div class="atitle cl" $thread[highlight]>$thread[subject]</div>
        <div class="actcon cl">
            <div class="actconli"><span class="la" style="color:#fc535f">$alang_debategd1</span><span style="color:#fc535f">$aaffirmpoint</span></div>
            <div class="actconli"><span class="la" style="color:#3aa3e0">$alang_debategd2</span><span style="color:#3aa3e0">$anegapoint</span></div>
            {if $aendtime}<!--From w ww.ymg6 .com -->
                {if $aendtime > $anowtime}
                    <div class="actconli"><span class="la">$alang_debategd3</span><span style="color:#ff0000">{echo dgmdate($aendtime)}</span></div>
                {else}
                    <div class="actconli"><span class="la">$alang_debategd4</span></div>
                {/if}
            {/if}
        </div>
    </a>
</li>