<?PHP exit('QQȺ��550494646');?>
<div class="xld xlda mtm">
	<!--{loop $list $appicon $values}-->
		<dl class="bbda cl">
			<dd class="m avt">
				<a href="userapp.php?mod=app&id=$appicon"><img src="http://appicon.manyou.com/logos/$appicon" alt="" /></a>
			</dd>
			<dd class="cl">
				<ul class="el">
					<!--{loop $values $value}-->
					<li class="cl">
						<a class="t" href="userapp.php?icon=$value[icon]" title="{lang just_look_dynamic}">
							<img width="16" height="16" {if $_G[cache][myapp][$value[icon]][icon]}src="$_G[cache][myapp][$value[icon]][icon]" onerror="this.onerror=null;this.src='http://appicon.manyou.com/icons/$value[icon]'"{else} src="http://appicon.manyou.com/icons/$value[icon]"{/if} />
						</a>
						$value[title_template]
						<span class="xg1"><!--{date($value[dateline], 'n-j H:i')}--></span>

						<div class="ec">
							<!--{if $value['image_1']}-->
							<a href="$value[image_1_link]"{$value[target]}><img src="$value[image_1]" class="tn" /></a>
							<!--{/if}-->
							<!--{if $value['image_2']}-->
							<a href="$value[image_2_link]"{$value[target]}><img src="$value[image_2]" class="tn" /></a>
							<!--{/if}-->
							<!--{if $value['image_3']}-->
							<a href="$value[image_3_link]"{$value[target]}><img src="$value[image_3]" class="tn" /></a>
							<!--{/if}-->
							<!--{if $value['image_4']}-->
							<a href="$value[image_4_link]"{$value[target]}><img src="$value[image_4]" class="tn" /></a>
							<!--{/if}-->

							<!--{if $value['body_template']}-->
							<div class="detail"{if $value['image_3']} style="clear: both; zoom: 1;"{/if}>
								$value[body_template]
							</div>
							<!--{/if}-->

							<!--{if $value['body_general']}-->
							<div class="quote"><blockquote>$value[body_general]</blockquote></div>
							<!--{/if}-->
						</div>
					</li>
				<!--{/loop}-->
				</ul>
			</dd>
		</dl>
	<!--{/loop}-->
</div>