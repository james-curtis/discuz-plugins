<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: table_forum_groupuser.php 31120 2012-07-18 06:01:46Z liulanbo $
 */

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class table_forum_groupuser extends discuz_table
{
	public function __construct() {

		$this->_table = 'forum_groupuser';
		$this->_pk    = '';

		parent::__construct();
	}
	public function fetch_all_fid_by_uids($uids) {
		if(empty($uids)) {
			return array();
		}
		$data = array();
		$query = XDB::query("SELECT fid FROM %t WHERE %i AND level>0 ORDER BY lastupdate DESC", array($this->_table, XDB::field('uid', $uids)));
		while($row = XDB::fetch($query)) {
			$data[] = $row['fid'];
		}
		return $data;
	}
	public function fetch_userinfo($uid, $fid) {
		if(empty($uid) || empty($fid)) {
			return array();
		}
		return XDB::fetch_first("SELECT * FROM %t WHERE fid=%d AND uid=%d", array($this->_table, $fid, $uid));
	}
	public function fetch_all_userinfo($uids, $fid) {
		if(empty($uids) || empty($fid)) {
			return array();
		}
		return XDB::fetch_all("SELECT * FROM %t WHERE fid=%d AND ".XDB::field('uid', $uids), array($this->_table, $fid));
	}
	public function fetch_all_by_fid($fid, $level = 0) {
		if(empty($fid)) {
			return array();
		}
		$levelsql = ' AND level>0';
		if($level == 1) {
			$levelsql = ' AND level=0';
		} elseif($level == -1) {
			$levelsql = '';
		}
		return XDB::fetch_all("SELECT * FROM %t WHERE fid=%d".$levelsql, array($this->_table, $fid));
	}
	public function fetch_count_by_fid($fid, $level = 0) {
		$levelsql = ' AND level>0';
		if($level == 1) {
			$levelsql = ' AND level=0';
		} elseif($level == -1) {
			$levelsql = '';
		}
		return XDB::result_first("SELECT COUNT(*) FROM %t WHERE fid=%d".$levelsql, array($this->_table, $fid));
	}
	public function insert($fid, $uid, $username, $level, $joindateline, $lastupdate = 0) {
		XDB::query("INSERT INTO %t (fid, uid, username, level, joindateline, lastupdate) VALUES (%d,%d,%s,%d,%d,%d)", array($this->_table, $fid, $uid, addslashes($username), $level, $joindateline, $lastupdate));
	}
	public function update_counter_for_user($uid, $fid, $threads = 0, $replies = 0) {
		if(empty($uid) || empty($fid)) {
			return array();
		}
		$sql = $threads ? 'threads=threads+1' : '';
		if($replies) {
			$sql = ($sql ? ', ' : '').'replies=replies+1';
		}
		if(empty($sql)) {
			return false;
		}
		XDB::query("UPDATE ".XDB::table('forum_groupuser')." SET $sql, lastupdate='".TIMESTAMP."' WHERE fid=%d AND uid=%d", array($fid, $uid));
	}
	public function delete_by_fid($fids, $uid = 0) {
		if(empty($fids)) {
			return false;
		}
		if($uid) {
			$sqladd = ' AND '.XDB::field('uid', $uid);
		}
		XDB::query("DELETE FROM ".XDB::table('forum_groupuser')." WHERE %i ".$sqladd, array(XDB::field('fid', $fids)));
	}
	public function update_for_user($uid, $fid, $threads = null, $replies = null, $level = null) {
		if(empty($uid) || empty($fid)) {
			return array();
		}
		$sqladd = $threads !== null ? 'threads='.intval($threads) : '';
		if($replies !== null) {
			$sqladd .= ($sqladd ? ', ' : '').'replies='.intval($replies);
		}
		if($level !== null) {
			$sqladd .= ($sqladd ? ', ' : '').'level='.intval($level);
		}
		XDB::query("UPDATE %t SET $sqladd WHERE fid=%d AND ".XDB::field('uid', $uid), array($this->_table, $fid));
	}

	public function groupuserlist($fid, $orderby = '', $num = 0, $start = 0, $addwhere = '', $fieldarray = array(), $onlinemember = array()) {
		$fid = intval($fid);
		if($fieldarray && is_array($fieldarray)) {
			$fieldadd = 'uid';
			foreach($fieldarray as $field) {
				$fieldadd .= ' ,'.$field;
			}
		} else {
			$fieldadd = '*';
		}

		$sqladd = $levelwhere = '';
		if($addwhere) {
			if(is_array($addwhere)) {
				foreach($addwhere as $field => $value) {
					if(is_array($value)) {
						$levelwhere = "AND level>'0' ";
						$sqladd .= "AND $field IN (".dimplode($value).") ";
					} else {
						$sqladd .= is_numeric($field) ? "AND $value " : "AND $field='$value' ";
					}
				}
				if(!empty($addwhere['level'])) $levelwhere = '';
			} else {
				$sqladd = $addwhere;
			}
		}

		$orderbyarray = array('level_join' => 'level ASC, joindateline ASC', 'joindateline' => 'joindateline DESC', 'lastupdate' => 'lastupdate DESC', 'threads' => 'threads DESC', 'replies' => 'replies DESC');
		$orderby = !empty($orderbyarray[$orderby]) ? "ORDER BY $orderbyarray[$orderby]" : '';
		$limitsql = $num ? XDB::limit($start, $num) : '';

		$groupuserlist = array();
		$query = XDB::query("SELECT $fieldadd FROM ".XDB::table('forum_groupuser')." WHERE fid=%d $levelwhere %i $orderby $limitsql", array($fid,$sqladd));
		while($groupuser = XDB::fetch($query)) {
			$groupuserlist[$groupuser['uid']] = $groupuser;
			$groupuserlist[$groupuser['uid']]['online'] = !empty($onlinemember) && is_array($onlinemember) && !empty($onlinemember[$groupuser['uid']]) ? 1 : 0;
		}

		return $groupuserlist;
	}
	public function fetch_all_group_for_user($uid, $count = 0, $ismanager = 0, $start = 0, $num = 0) {
		$uid = intval($uid);
		if(empty($uid)) {
			return array();
		}
		if(empty($ismanager)) {
			$levelsql = '';
		} elseif($ismanager == 1) {
			$levelsql = ' AND level IN(1,2)';
		} elseif($ismanager == 2) {
			$levelsql = ' AND level IN(3,4)';
		}
		if($count == 1) {
			return XDB::result_first("SELECT count(*) FROM ".XDB::table('forum_groupuser')." WHERE uid='$uid' $levelsql");
		}
		empty($start) && $start = 0;
		empty($num) && $num = 100;
		return XDB::fetch_all("SELECT fid, level FROM ".XDB::table('forum_groupuser')." WHERE uid='$uid' $levelsql ORDER BY lastupdate DESC ".XDB::limit($start, $num));
	}
}
//www-FX8-co
?>