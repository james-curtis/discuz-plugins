<?php


if(!defined('IN_DISCUZ') || !defined('IN_ADMINCP')) {
  exit('Access Denied');
}

 $sql = <<<EOF
CREATE TABLE IF NOT EXISTS pre_zhanmishu_sms (
  `sid` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `tid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `uid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `mobile` varchar(20) NOT NULL,
  `nationcode` varchar(6) NOT NULL,
  `model` varchar(56) NOT NULL,
  `issend` tinyint(1) NOT NULL DEFAULT '0',
  `issuccess` tinyint(1) NOT NULL DEFAULT '0',
  `type` tinyint(1) NOT NULL DEFAULT '0',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
  `code` INT(6) unsigned NOT NULL DEFAULT '0',
  `verify` INT(6) unsigned NOT NULL DEFAULT '0',
  `isverify`  tinyint(1) NOT NULL DEFAULT '0',
  `isregsuccess`  tinyint(1) NOT NULL DEFAULT '0',
  `ischangepwd`  tinyint(1) NOT NULL DEFAULT '0',
  `ismobilereg`  tinyint(1) NOT NULL DEFAULT '0',
  `isaddextcredit`  tinyint(1) NOT NULL DEFAULT '0',
  `isblack` tinyint(1) NOT NULL DEFAULT '0',
  `status`  tinyint(1) NOT NULL DEFAULT '0',
  `nums` SMALLINT(6) unsigned NOT NULL DEFAULT '0',
  `ip1` smallint(3) NOT NULL default '0',
  `ip2` smallint(3) NOT NULL default '0',
  `ip3` smallint(3) NOT NULL default '0',
  `ip4` smallint(3) NOT NULL default '0',
  `msg` varchar(80) NOT NULL DEFAULT '',
  `mts` int(6) unsigned NOT NULL DEFAULT '0',
  `province` varchar(20) NOT NULL DEFAULT '',
  `catname` varchar(20) NOT NULL DEFAULT '',
  `telstring` varchar(20) NOT NULL DEFAULT '',
  `areavid` int(6) unsigned NOT NULL DEFAULT '0',
  `ispvid` int(6) unsigned NOT NULL DEFAULT '0',
  `carrier` varchar(20) NOT NULL DEFAULT '',
  `sub_code` varchar(80) NOT NULL DEFAULT '',
  `sub_msg` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (sid),
  KEY uid (uid),
  KEY type (type),
  KEY mts (mts),
  KEY province (province),
  KEY catname (catname),
  KEY areavid (areavid),
  KEY telstring (telstring),
  KEY carrier (carrier),
  KEY mobile (mobile),
  KEY status (status),
  KEY code (code),
  KEY nums (nums),
  KEY verify (verify),
  KEY sub_code (sub_code),
  KEY issend (issend),
  KEY issuccess (issuccess),
  KEY dateline (dateline),
  KEY ip1 (ip1),
  KEY ip2 (ip2),
  KEY ip3 (ip3),
  KEY ip4 (ip4)
);
CREATE TABLE IF NOT EXISTS pre_zhanmishu_notice (
  `nid` mediumint(8) unsigned NOT NULL AUTO_INCREMENT,
  `uid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `tid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `mobile` varchar(20) NOT NULL,
  `email` char(40) NOT NULL,
  `templateid` char(40) NOT NULL,
  `model` varchar(56) NOT NULL,
  `issendsms` tinyint(1) NOT NULL DEFAULT '0',
  `issendemail` tinyint(1) NOT NULL DEFAULT '0',
  `issendgroupsms` tinyint(1) NOT NULL DEFAULT '0',
  `issmssuccess` tinyint(1) NOT NULL DEFAULT '0',
  `isemailsuccess` tinyint(1) NOT NULL DEFAULT '0',
  `isgroupsmssuccess` tinyint(1) NOT NULL DEFAULT '0',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
  `sendsmstime` int(10) unsigned NOT NULL DEFAULT '0',
  `sendemailtime` int(10) unsigned NOT NULL DEFAULT '0',
  `sendgroupsmstime` int(10) unsigned NOT NULL DEFAULT '0',
  `msg` varchar(80) NOT NULL DEFAULT '',
  `sub_code` varchar(80) NOT NULL DEFAULT '',
  `sub_msg` varchar(80) NOT NULL DEFAULT '',
  PRIMARY KEY (nid),
  KEY uid (uid),
  KEY mobile (mobile),
  KEY email (email),
  KEY sub_code (sub_code),
  KEY isemailsuccess (isemailsuccess),
  KEY issmssuccess (issmssuccess),
  KEY dateline (dateline)
);
CREATE TABLE IF NOT EXISTS pre_zhanmishu_tsetting (
  `tid` mediumint(8) unsigned NOT NULL,
  `uid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `mobile` varchar(20) NOT NULL,
  `issmsnotice` tinyint(1) NOT NULL DEFAULT '0',
  `isemailnotice` tinyint(1) NOT NULL DEFAULT '0',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
   PRIMARY KEY (tid),
  KEY uid (uid),
  KEY issmsnotice (issmsnotice),
  KEY isemailnotice (isemailnotice),
  KEY dateline (dateline),
  KEY mobile (mobile));

  CREATE TABLE IF NOT EXISTS pre_zhanmishu_template(
  `tid` mediumint(8) unsigned NOT NULL NOT NULL AUTO_INCREMENT,
  `uid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `templatename` varchar(20) NOT NULL,
  `sign` varchar(20) NOT NULL,
  `templateid` varchar(20) NOT NULL,
  `templateintro` varchar(255) NOT NULL,
  `templatetype` smallint(3) unsigned NOT NULL DEFAULT '0',
  `api` smallint(3) unsigned NOT NULL DEFAULT '0',
  `isopen` tinyint(1) NOT NULL DEFAULT '0',
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
   PRIMARY KEY (tid),
  KEY uid (uid),
  KEY templatename (templatename),
  KEY templateid (templateid),
  KEY templateintro (templateintro),
  KEY api (api),
  KEY templatetype (templatetype),
  KEY isopen (isopen),
  KEY dateline (dateline));

  CREATE TABLE IF NOT EXISTS pre_zhanmishu_var(
  `vid` mediumint(8) unsigned NOT NULL NOT NULL AUTO_INCREMENT,
  `uid` mediumint(8) unsigned NOT NULL DEFAULT '0',
  `varname` varchar(20) NOT NULL,
  `varvalue` varchar(20) NOT NULL,
  `varintro` varchar(255) NOT NULL,
  `dateline` int(10) unsigned NOT NULL DEFAULT '0',
   PRIMARY KEY (vid),
  KEY uid (uid),
  KEY varname (varname),
  KEY varintro (varintro),
  KEY dateline (dateline));
EOF;

runquery($sql);

$finish = TRUE;
?>