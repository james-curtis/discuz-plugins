<?php
	include "../source/global/global_inc.php";
	global $db,$qianwei_in_userid,$qianwei_in_username;
	VerifyLogin($qianwei_in_userid);
	if(cd_remoteup==1){
		$cd_remotepath=cd_webpath."plugin.php?open=ftp&opens=index&to=user&ac=song";
		$cd_remotewidth="688px";
		$cd_remoteheight="132px";
		$cd_remotetop="160px";
	}elseif(cd_remoteup==2){
		$cd_remotepath=cd_webpath."plugin.php?open=qiniu&opens=index&to=user&ac=song";
		$cd_remotewidth="688px";
		$cd_remoteheight="132px";
		$cd_remotetop="160px";
	}elseif(cd_remoteup==3){
		$cd_remotepath=cd_webpath."plugin.php?open=baidu&opens=index&to=user&ac=song";
		$cd_remotewidth="688px";
		$cd_remoteheight="132px";
		$cd_remotetop="160px";
	}elseif(cd_remoteup==4){
		$cd_remotepath=cd_webpath."plugin.php?open=oss&opens=index&to=user&ac=song";
		$cd_remotewidth="580px";
		$cd_remoteheight="200px";
		$cd_remotetop="130px";
	}
?>
<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
	<meta http-equiv="Content-Type" content="text/html; charset=gb2312" />
	<title>分享音乐 - <?php echo cd_webname; ?></title>
	<script type="text/javascript">
		var domIsReady=false,domReadyList=[],domReadyObject=[],$call=function(callback,obj){if(typeof obj!=='object'){obj=document}if(domIsReady){callback.call(obj)}else{domReadyList.push(callback);domReadyObject.push(obj)}};
		var site_domain="<?php echo cd_webpath; ?>";zone_domain="<?php echo cd_upath; ?>";
	</script>
	<link type="text/css" href="<?php echo cd_upath; ?>static/css/core.css" rel="stylesheet" />
        <link type="text/css" href="<?php echo cd_upath; ?>static/site/css/common.css" rel="stylesheet" />
	<link type="text/css" href="<?php echo cd_upath; ?>static/space/css/common.css" rel="stylesheet" media="all" />
	<link type="text/css" href="<?php echo cd_upath; ?>static/space/css/user.css" rel="stylesheet" media="all" />
</head>
<body>
<div class="header"><?php include "source/module/system/header.php"; ?></div>
<div class="user">
	<div class="user_center">
		<div class="user_menu" id="share">
			<?php include "source/module/system/left_menu.php"; ?>
		</div>
		<div class="user_main">
			<div class="uMain_content">
				<div class="main_nav">
					<ul>
						<li class="concert">
							<a href="<?php echo cd_upath.rewrite_url('index.php?p=dance&a=list'); ?>">已审音乐</a>
						</li>
						<li class="find">
							<a href="<?php echo cd_upath.rewrite_url('index.php?p=dance&a=pass'); ?>">待审音乐</a>
						</li>
					</ul>
					<div class="action">
						<a href="<?php echo cd_upath.rewrite_url('index.php?p=dance&a=share'); ?>">分享音乐</a>
					</div>
				</div>
				<div class="main">
					<div id="tooltip" class="refresh">

					</div>
				</div>
				<div class="minHeight500">
					<div class="profile">
						<div class="title">
							<div class="name">分享音乐</div>
						</div>
					<?php if(cd_usermusic=="no"){ ?>
						<div class="nothing">本站暂时关闭歌曲上传功能。</div>
					<?php }else{ ?>
                                                <form name="form">
                                                        <ul id="danceAddMain">
								<li>
									<div class="name">音乐名称：</div>
									<div class="input">
										<input type="text" style="width: 190px;" class="input_normal" name="rdanceName" id="rdanceName" maxlength="100" />
									</div>
									<div class="input_msg" id="mdanceName">作为音乐名称请您认真填写，合理的名称审核才会通过。</div>
								</li>
								<li>
									<div class="name">所属歌手：</div>
									<div class="input">
										<select style="width: 110px;" class="select_normal" name="rSingerID" id="rSingerID">
											<option value="">选择所属歌手</option>
											<option value="0">不属任何歌手</option>
											<?php
												$sqlclass="select * from ".tname('singer');
												$results=$db->query($sqlclass);
												if($results){
													while ($row3=$db->fetch_array($results)){
														echo "<option value='".$row3['CD_ID']."'>".getlen("len","10",$row3['CD_Name'])."</option>";
													}	
						
												}
											?>
										</select>
									</div>
									<div class="input_msg"><span class="button2-main"><span><button type="button" onclick="pop.up('选择歌手', '<?php echo cd_webpath; ?>admin.php?iframe=star&to=u&so=form.rSingerID', '500px', '400px', '80px');">选择</button></span></span></div><div class="input_msg" id="mSingerID">音乐的所属歌手，请选择加入一个。</div>
								</li>
								<li>
									<div class="name">所属分类：</div>
									<div class="input">
										<select style="width: 110px;" class="select_normal" name="rclassId" id="rclassId">
											<option value="0">选择所属分类</option>
											<?php
												$sqlclass="select * from ".tname('class')." where CD_SystemID=1 and CD_FatherID=1 and CD_IsHide=0";
												$results=$db->query($sqlclass);
												if($results){
													while ($row3=$db->fetch_array($results)){
														echo "<option value='".$row3['CD_ID']."'>".$row3['CD_Name']."</option>";
													}	
						
												}
											?>
										</select>
									</div>
									<div class="input_msg" id="mclassId">音乐的所属分类，请正确选择。</div>
								</li>
								<li>
									<div class="name">所属专辑：</div>
									<div class="input">
										<select style="width: 110px;" class="select_normal" name="rSpecialID" id="rSpecialID">
											<option value="">选择所属专辑</option>
											<option value="0">不属任何专辑</option>
											<?php
												$sqlclass="select * from ".tname('special')." where CD_User='$qianwei_in_username'";
												$results=$db->query($sqlclass);
												if($results){
													while ($row3=$db->fetch_array($results)){
														echo "<option value='".$row3['CD_ID']."'>".getlen("len","10",$row3['CD_Name'])."</option>";
													}	
						
												}
											?>
										</select>
									</div>
									<div class="input_msg" id="mSpecialID">只显示您创建的专辑，请选择加入一个。</div>
								</li>
								<li>
									<div class="name">上传文件：</div>
									<div class="input">
										<input type="text" style="width: 320px;" class="input_normal" name="rUrl" id="rUrl" /><input type="hidden" name="rServer" id="rServer" value="1" />
									</div>
									<div class="input_msg"><span class="button2-main"><span><button type="button" onclick="pop.up('上传音乐', '<?php echo cd_webpath; ?>plugin.php?open=upload&opens=index&to=user&ac=song&f=form.rUrl', '406px', '180px', '140px');">本地上传</button></span></span></div><div class="input_msg"><span class="button2-main"><span><button type="button" onclick="pop.up('上传音乐', '<?php echo $cd_remotepath; ?>', '<?php echo $cd_remotewidth; ?>', '<?php echo $cd_remoteheight; ?>', '<?php echo $cd_remotetop; ?>');">远程上传</button></span></span></div><div class="input_msg" id="mUrl"></div>
								</li>
								<li>
									<div class="name">设置封面：</div>
									<div class="input">
										<input type="text" style="width: 320px;" class="input_normal" name="rPic" id="rPic" />
									</div>
									<div class="input_msg"><span class="button2-main"><span><button type="button" onclick="pop.up('上传封面', '<?php echo cd_webpath; ?>plugin.php?open=upload&opens=index&to=user&ac=pic&f=form.rPic', '406px', '180px', '140px');">本地上传</button></span></span></div>
								</li>
								<li>
									<div class="name">动态歌词：</div>
									<div class="input">
										<input type="text" style="width: 320px;" class="input_normal" name="rLrc" id="rLrc" />
									</div>
									<div class="input_msg"><span class="button2-main"><span><button type="button" onclick="pop.up('上传歌词', '<?php echo cd_webpath; ?>plugin.php?open=upload&opens=index&to=user&ac=lrc&f=form.rLrc', '406px', '180px', '140px');">本地上传</button></span></span></div>
								</li>
								<li class="note">
									<div class="name">文本歌词：</div>
									<div class="input">
										<textarea name="rnote" id="rnote"></textarea>
									</div>
								</li>
								<li>
									<div class="name"></div>
									<div class="input">
										<span class="button-main"><span><button type="button" id="danceNewAdd">上传保存</button></span></span>
									</div>
								</li>
                                                        </ul>
                                                </form>
					<?php } ?>
					</div>
				</div>
			</div>
		</div>
	</div>
	<div class="user_copyright"><?php include "source/module/system/footer.php"; ?></div>
</div>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/js/jquery/jquery.min.js"></script>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/js/core.js"></script>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/js/card.js"></script>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/js/dialog.js"></script>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/js/jquery/jquery.plugins.js"></script>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/space/js/common.js"></script>
<script type="text/javascript" src="<?php echo cd_upath; ?>static/space/js/dance.js"></script>
<script type="text/javascript" src="<?php echo cd_webpath; ?>source/plugin/layer/lib.js"></script>
<script type="text/javascript">
listenMsg.start();
nav.init();
nav.userMenu();
danceLib.shareAddInit();
layer.ready(function() {
        pop = {
                up : function(text, url, width, height, top) {
                        $.layer({
                                type : 2,
                                title : text,
                                iframe : {src : url},
                                area : [width, height],
                                offset : [top, '50%'],
                                shade : [0.1, '#000', true]
                        });
                }
        }
});
</script>
</body>
</html>