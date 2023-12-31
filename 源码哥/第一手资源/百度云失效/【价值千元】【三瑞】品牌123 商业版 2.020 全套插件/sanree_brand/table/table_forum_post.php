<?php

/**
 *      [Discuz!] (C)2001-2099 Comsenz Inc.
 *      This is NOT a freeware, use is subject to license terms
 *
 *      $Id: table_forum_post.php 30707 2012-06-13 03:40:15Z liulanbo $
 */

if(!defined('IN_DISCUZ')) {
	exit('Access Denied');
}

class table_forum_post extends discuz_table
{
	private static $_tableid_tablename = array();

	public function __construct() {

		$this->_table = 'forum_post';
		$this->_pk    = 'pid';

		parent::__construct();
	}

	public static function get_tablename($tableid, $primary = 0) {
		list($type, $tid) = explode(':', $tableid);
		if(!isset(self::$_tableid_tablename[$tableid])) {
			if($type == 'tid') {
				self::$_tableid_tablename[$tableid] = self::getposttablebytid($tid, $primary);
			} else {
				self::$_tableid_tablename[$tableid] = self::getposttable($type);
			}
		}
		return self::$_tableid_tablename[$tableid];
	}

	public function count_author_by_tid($tid) {
		return XDB::result_first('SELECT count(DISTINCT authorid) FROM %t WHERE tid=%d', array(self::get_tablename('tid:'.$tid), $tid));
	}

	public function count_by_tid_dateline($tableid, $tid, $dateline) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE tid=%d AND invisible=0 AND dateline<=%d',
				array(self::get_tablename($tableid), $tid, $dateline));
	}

	public function fetch_maxposition_by_tid($tableid, $tid) {
		return XDB::result_first('SELECT position FROM %t WHERE tid=%d ORDER BY position DESC LIMIT 1',
				array(self::get_tablename($tableid), $tid));
	}
	public function fetch_all_by_tid_range_position($tableid, $tid, $start, $end, $maxposition, $ordertype = 0) {
		$storeflag = false;
		if($this->_allowmem) {
			if($ordertype != 1 && $start == 1 && $maxposition > ($end - $start)) {
				$data = $this->fetch_cache($tid, $this->_pre_cache_key.'tid_');
				if($data && count($data) == ($end - $start)) {
					$delauthorid = $this->fetch_cache('delauthorid');
					$updatefid = $this->fetch_cache('updatefid');
					$delpid = $this->fetch_cache('delpid');
					foreach($data as $k => $post) {
						if(in_array($post['pid'], $delpid) || $post['invisible'] < 0 || in_array($post['authorid'], $delauthorid)) {
							$data[$k]['invisible'] = 0;
							$data[$k]['authorid'] = 0;
							$data[$k]['useip'] = '';
							$data[$k]['dateline'] = 0;
							$data[$k]['pid'] = 0;
							$data[$k]['message'] = lang('forum/misc', 'post_deleted');
						}
						if(isset($updatefid[$post['fid']]) && $updatefid[$post['fid']]['dateline'] > $post['dateline']) {
							$data[$k]['fid'] = $updatefid[$post['fid']]['fid'];
						}
					}
					return $data;
				}
				$storeflag = true;
			}
		}
		$data = XDB::fetch_all('SELECT * FROM %t WHERE tid=%d AND position>=%d AND position<%d ORDER BY position'.($ordertype == 1 ? ' DESC' : ''), array(self::get_tablename($tableid), $tid, $start, $end), 'pid');
		if($storeflag) {
			$this->store_cache($tid, $data, $this->_cache_ttl, $this->_pre_cache_key.'tid_');
		}
		return $data;
	}
	public function fetch_all_by_tid_position($tableid, $tid, $position) {
		return XDB::fetch_all('SELECT * FROM %t WHERE tid=%d AND '.XDB::field('position', $position), array(self::get_tablename($tableid), $tid));
	}
	public function count_by_tid_invisible_authorid($tid, $authorid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE tid=%d AND invisible=0 AND authorid=%d',
				array(self::get_tablename('tid:'.$tid), $tid, $authorid));
	}

	public function count_visiblepost_by_tid($tid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE tid=%d AND invisible=0', array(self::get_tablename('tid:'.$tid), $tid));
	}

	public function count_by_tid_pid($tid, $pid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE tid=%d AND pid<%d', array(self::get_tablename('tid:'.$tid), $tid, $pid));
	}

	public function count_by_tid_authorid($tid, $authorid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE tid=%d AND first=0 AND authorid=%d', array(self::get_tablename('tid:'.$tid), $tid, $authorid));
	}

	public function count_by_authorid($tableid, $authorid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE authorid=%d AND invisible=0', array(self::get_tablename($tableid), $authorid));
	}

	public function count_group_authorid_by_fid($tableid, $fid) {
		return XDB::fetch_all('SELECT COUNT(*) as num, authorid FROM %t WHERE fid=%d AND first=0 GROUP BY authorid', array(self::get_tablename($tableid), $fid));
	}

	public function count_by_first($tableid, $first) {
		return XDB::result_first('SELECT count(*) FROM %t WHERE %i', array(self::get_tablename($tableid), XDB::field('first', $first)));
	}

	public function count_by_invisible($tableid, $invisible) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE %i', array(self::get_tablename($tableid), XDB::field('invisible', $invisible)));
	}

	public function count_table($tableid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t', array(self::get_tablename($tableid)));
	}

	public function count_by_fid_invisible($tableid, $fid, $invisible) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE fid=%d AND invisible=%d', array(self::get_tablename($tableid), $fid, $invisible));
	}

	public function count_by_dateline($tableid, $dateline) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE dateline>=%d AND invisible=0', array(self::get_tablename($tableid), $dateline));
	}

	public function fetch($tableid, $pid, $outmsg = true) {
		$post = XDB::fetch_first('SELECT * FROM %t WHERE pid=%d', array(self::get_tablename($tableid), $pid));
		if(!$outmsg) {
			unset($post['message']);
		}
		return $post;
	}

	public function fetch_visiblepost_by_tid($tableid, $tid, $start = 0, $order = 0) {
		return XDB::fetch_first('SELECT * FROM %t WHERE tid=%d AND invisible=0 ORDER BY dateline '. ($order ? 'DESC' : '').' '. XDB::limit($start, 1),
				array(self::get_tablename($tableid), $tid));
	}

	public function fetch_threadpost_by_tid_invisible($tid, $invisible = null) {
		return XDB::fetch_first('SELECT * FROM %t WHERE tid=%d AND first=1'.($invisible !== null ? ' AND '.XDB::field('invisible', $invisible) : ''),
				array(self::get_tablename('tid:'.$tid), $tid));
	}

	public function fetch_pid_by_tid_authorid($tid, $authorid) {
		return XDB::result_first('SELECT pid FROM %t WHERE tid=%d AND authorid=%d LIMIT 1', array(self::get_tablename('tid:'.$tid), $tid, $authorid));
	}

	public function fetch_pid_by_tid_clientip($tid, $clientip) {
		return XDB::result_first('SELECT pid FROM %t WHERE tid=%d AND authorid=0 AND useip=%s LIMIT 1', array(self::get_tablename('tid:'.$tid), $tid, $clientip));
	}

	public function fetch_attachment_by_tid($tid) {
		return XDB::result_first('SELECT attachment FROM %t WHERE tid=%d AND invisible=0 AND attachment>0 LIMIT 1', array(self::get_tablename('tid:'.$tid), $tid));
	}

	public function fetch_maxid($tableid) {
		return XDB::result_first('SELECT MAX(pid) FROM %t', array(self::get_tablename($tableid)));
	}

	public function fetch_posts($tableid) {
		return XDB::fetch_first('SELECT COUNT(*) AS posts, (MAX(dateline)-MIN(dateline))/86400 AS runtime FROM %t', array(self::get_tablename($tableid)));
	}

	public function fetch_by_pid_condition($tableid, $pid, $addcondiction = '', $fields = '*') {
		return XDB::fetch_first('SELECT %i FROM %t WHERE pid=%d %i LIMIT 1',
			array($fields, self::get_tablename($tableid), $pid, $addcondiction));
	}


	public function fetch_all($tableid, $pids, $outmsg = true) {
		$postlist = array();
		if($pids) {
			$query = XDB::query('SELECT * FROM %t WHERE %i', array(self::get_tablename($tableid), XDB::field($this->_pk, $pids)));
			while($post = XDB::fetch($query)) {
				if(!$outmsg) {
					unset($post['message']);
				}
				$postlist[$post[$this->_pk]] = $post;
			}
		}
		return $postlist;
	}

	public function fetch_all_tradepost_viewthread_by_tid($tid, $visibleallflag, $authorid, $pids, $forum_pagebydesc, $ordertype, $start, $limit) {
		if(empty($pids)) {
			return array();
		}
		$data = array();
		$parameter = $this->handle_viewthread_parameter($visibleallflag, $authorid, $forum_pagebydesc, $ordertype);
		$query = XDB::query('SELECT * FROM %t WHERE tid=%d'.
				($parameter['invisible'] ? ' AND '.$parameter['invisible'] : '').($parameter['authorid'] ? ' AND '.$parameter['authorid'] : '').
				' AND pid NOT IN ('.dimplode($pids).')'.
				' '.$parameter['orderby'].
				' '.XDB::limit($start, $limit),
				array(self::get_tablename('tid:'.$tid), $tid));
		while($post = XDB::fetch($query)) {
			$data[$post['pid']] = $post;
		}
		return $data;
	}

	public function fetch_all_debatepost_viewthread_by_tid($tid, $visibleallflag, $authorid, $stand, $forum_pagebydesc, $ordertype, $start, $limit) {
		$data = array();
		$parameter = $this->handle_viewthread_parameter($visibleallflag, $authorid, $forum_pagebydesc, $ordertype, 'p.');
		$query = XDB::query("SELECT dp.*, p.* FROM %t p LEFT JOIN %t dp ON p.pid=dp.pid WHERE p.tid=%d".
				($parameter['invisible'] ? ' AND '.$parameter['invisible'] : '').($parameter['authorid'] ? ' AND '.$parameter['authorid'] : '').
				(isset($stand) ? ($stand ? ' AND (dp.stand='.intval($stand).' OR p.first=1)' : ' AND (dp.stand=0 OR dp.stand IS NULL OR p.first=1)') : '').
				' '.$parameter['orderby'].
				' '.XDB::limit($start, $limit),
				array(self::get_tablename('tid:'.$tid), 'forum_debatepost', $tid));
		while($post = XDB::fetch($query)) {
			$data[$post['pid']] = $post;
		}
		return $data;
	}

	public function fetch_all_common_viewthread_by_tid($tid, $visibleallflag, $authorid, $forum_pagebydesc, $ordertype, $count, $start, $limit) {
		$data = array();
		$storeflag = false;
		if($this->_allowmem) {
			if($ordertype != 1 && !$forum_pagebydesc && !$start && $count > $limit) {
				$data = $this->fetch_cache($tid, $this->_pre_cache_key.'tid_');
				if($data && count($data) == $limit) {
					$delauthorid = $this->fetch_cache('delauthorid');
					$updatefid = $this->fetch_cache('updatefid');
					$delpid = $this->fetch_cache('delpid');
					foreach($data as $k => $post) {
						if(in_array($post['pid'], $delpid) || $post['invisible'] < 0 || in_array($post['authorid'], $delauthorid)) {
							$data[$k]['invisible'] = 0;
							$data[$k]['authorid'] = 0;
							$data[$k]['useip'] = '';
							$data[$k]['dateline'] = 0;
							$data[$k]['pid'] = 0;
							$data[$k]['message'] =lang('forum/misc', 'post_deleted');
						}
						if(isset($updatefid[$post['fid']]) && $updatefid[$post['fid']]['dateline'] > $post['dateline']) {
							$data[$k]['fid'] = $updatefid[$post['fid']]['fid'];
						}
					}
					return $data;
				}
				$storeflag = true;
			}
		}
		$parameter = $this->handle_viewthread_parameter($visibleallflag, $authorid, $forum_pagebydesc, $ordertype);
		$query = XDB::query('SELECT * FROM %t WHERE tid=%d'.
				($parameter['invisible'] ? ' AND '.$parameter['invisible'] : '').($parameter['authorid'] ? ' AND '.$parameter['authorid'] : '').
				' '.$parameter['orderby'].
				' '.XDB::limit($start, $limit),
				array(self::get_tablename('tid:'.$tid), $tid));
		while($post = XDB::fetch($query)) {
			$data[$post['pid']] = $post;
		}
		if($storeflag) {
			$this->store_cache($tid, $data, $this->_cache_ttl, $this->_pre_cache_key.'tid_');
		}
		return $data;
	}

	private function handle_viewthread_parameter($visibleallflag, $authorid, $forum_pagebydesc, $ordertype, $alias = '') {
		$return = array();
		if(!$visibleallflag) {
			$return['invisible'] = $alias.XDB::field('invisible', 0);
		}
		if($authorid) {
			$return['authorid'] = $alias.XDB::field('authorid', $authorid);
		}
		if($forum_pagebydesc) {
			if($ordertype != 1) {
				$return['orderby'] = 'ORDER BY '.$alias.'dateline DESC';
			} else {
				$return['orderby'] = 'ORDER BY '.$alias.'dateline ASC';
			}
		} else {
			if($ordertype != 1) {
				$return['orderby'] = 'ORDER BY '.$alias.'dateline';
			} else {
				$return['orderby'] = 'ORDER BY '.$alias.'dateline DESC';
			}
		}
		return $return;
	}

	public function fetch_all_by_authorid($tableid, $authorid, $outmsg = true, $order = '', $start = 0, $limit = 0, $first = null, $invisible = null, $fid = null, $filterfid = null) {
		$postlist = $sql = array();
		if($first !== null && $invisible !== null) {
			if($first == 1) {
				$sql[] = XDB::field('invisible', $invisible);
				$sql[] = XDB::field('first', 1);
			} else {
				$sql[] = XDB::field('invisible', $invisible);
				$sql[] = XDB::field('first', 0);
			}
		} elseif($invisible !== null) {
			$sql[] = XDB::field('invisible', $invisible);
		} elseif($first !== null) {
			$sql[] = XDB::field('first', $first);
		}
		if($fid !== null) {
			$sql[] = XDB::field('fid', $fid);
		}
		if($filterfid !== null) {
			$filterfid = dintval($filterfid, true);
			$sql[] = XDB::field('fid', $filterfid, is_array($filterfid) ? 'notin' : '<>');
		}
		$query = XDB::query('SELECT * FROM %t WHERE '.XDB::field('authorid', $authorid).' %i '.($order ? 'ORDER BY dateline '.$order : '').' '.XDB::limit($start, $limit),
				array(self::get_tablename($tableid), ($sql ? 'AND '.implode(' AND ', $sql) : '')));
		while($post = XDB::fetch($query)) {
			if(!$outmsg) {
				unset($post['message']);
			}
			$postlist[$post[$this->_pk]] = $post;
		}
		return $postlist;
	}

	public function fetch_all_tid_by_first($tableid, $first, $start = 0, $limit = 0) {
		return XDB::fetch_all('SELECT tid FROM %t WHERE first=%d '.XDB::limit($start, $limit), array(self::get_tablename($tableid), $first));
	}

	public function fetch_all_by_tid($tableid, $tids, $outmsg = true, $order = '', $start = 0, $limit = 0, $first = null, $invisible = null, $authorid = null, $fid = null) {
		$postlist = $sql = array();
		if($first !== null && $invisible !== null) {
			if($first == 1) {
				$sql[] = XDB::field('first', 1);
				$sql[] = XDB::field('invisible', $invisible);
			} else {
				$sql[] = XDB::field('invisible', $invisible);
				$sql[] = XDB::field('first', 0);
			}
		} elseif($first !== null) {
			$sql[] = XDB::field('first', $first);
		} elseif($invisible !== null) {
			$sql[] = XDB::field('invisible', $invisible);
		}
		if($authorid !== null) {
			$sql[] = XDB::field('authorid', $authorid);
		}
		if($fid !== null) {
			$sql[] = XDB::field('fid', $fid);
		}
		$query = XDB::query('SELECT * FROM %t WHERE '.XDB::field('tid', $tids).' %i '.($order ? 'ORDER BY dateline '.$order : '').' '.XDB::limit($start, $limit),
				array(self::get_tablename($tableid), ($sql ? 'AND '.implode(' AND ', $sql) : '')));
		while($post = XDB::fetch($query)) {
			if(!$outmsg) {
				unset($post['message']);
			}
			$postlist[$post[$this->_pk]] = $post;
		}
		return $postlist;
	}

	public function fetch_all_pid_by_tid_lastpid($tid, $lastpid, $round) {
		return XDB::fetch_all("SELECT pid FROM %t WHERE tid=%d AND pid>%d ORDER BY pid ASC %i",
				array(self::get_tablename('tid:'.$tid), $tid, $lastpid, XDB::limit(0, $round)));
	}

	public function fetch_all_by_fid($tableid, $fid, $outmsg = true, $order = '', $start = 0, $limit = 0, $first = null, $invisible = null) {
		$postlist = $sql = array();
		if($first !== null && $invisible !== null) {
			if($first == 1) {
				$sql[] = XDB::field('first', 1);
				$sql[] = XDB::field('invisible', $invisible);
			} else {
				$sql[] = XDB::field('invisible', $invisible);
				$sql[] = XDB::field('first', 0);
			}
		} elseif($first !== null) {
			$sql[] = XDB::field('first', $first);
		} elseif($invisible !== null) {
			$sql[] = XDB::field('invisible', $invisible);
		}
		$query = XDB::query('SELECT * FROM %t WHERE '.XDB::field('fid', $fid).' %i '.($order ? 'ORDER BY dateline '.$order : '').' '.XDB::limit($start, $limit),
				array(self::get_tablename($tableid), ($sql ? 'AND '.implode(' AND ', $sql) : '')));
		while($post = XDB::fetch($query)) {
			if(!$outmsg) {
				unset($post['message']);
			}
			$postlist[$post[$this->_pk]] = $post;
		}
		return $postlist;
	}

	public function fetch_all_by_pid($tableid, $pids, $outmsg = true, $order = '', $start = 0, $limit = 0, $fid = null, $invisible = null) {
		$postlist = $sql = array();
		if($fid !== null) {
			$sql[] = XDB::field('fid', $fid);
		}
		if($invisible !== null) {
			$sql[] = XDB::field('invisible', $invisible);
		}
		$query = XDB::query('SELECT * FROM %t WHERE '.XDB::field('pid', $pids).' %i '.($order ? 'ORDER BY dateline '.$order : '').' '.XDB::limit($start, $limit),
				array(self::get_tablename($tableid), ($sql ? 'AND '.implode(' AND ', $sql) : '')));
		while($post = XDB::fetch($query)) {
			if(!$outmsg) {
				unset($post['message']);
			}
			$postlist[$post[$this->_pk]] = $post;
		}
		return $postlist;
	}

	public function fetch_all_debatepost_by_tid_stand($tid, $stand, $start, $limit) {
		return XDB::fetch_all('
			SELECT author, authorid
			FROM %t p, %t dp
			WHERE p.tid=%d AND p.anonymous=0 AND p.invisible=0 AND dp.stand=%d AND p.pid=dp.pid
			ORDER BY p.dateline DESC %i',
			array(self::get_tablename('tid:'.$tid), 'forum_debatepost', $tid, $stand, XDB::limit($start, $limit)));
	}

	public function fetch_all_visiblepost_by_tid_groupby_authorid($tableid, $tid) {
		return XDB::fetch_all('SELECT pid, tid, authorid, subject, dateline FROM %t WHERE tid=%d AND invisible=0 GROUP BY authorid ORDER BY dateline',
				array(self::get_tablename($tableid), $tid));
	}

	public function fetch_all_pid_by_invisible_dateline($tableid, $invisible, $dateline, $start, $limit) {
		return XDB::fetch_all('SELECT pid FROM %t WHERE invisible=%d AND dateline<%d %i', array(self::get_tablename($tableid), $invisible, $dateline, XDB::limit($start, $limit)));
	}

	public function fetch_all_top_post_author($tableid, $timelimit, $num) {
		return XDB::fetch_all('SELECT DISTINCT(author) AS username, authorid AS uid, COUNT(pid) AS posts
			FROM %t
			WHERE dateline>=%d AND invisible=0 AND authorid>0
			GROUP BY author
			ORDER BY posts DESC %i',
			array(self::get_tablename($tableid), $timelimit, XDB::limit(0, $num)));
	}

	public function fetch_all_author_posts_by_dateline($tableid, $authorid, $dateline) {
		return XDB::fetch_all('SELECT authorid, COUNT(*) AS posts FROM %t
			WHERE dateline>=%d AND %i AND invisible=0 GROUP BY authorid', array(self::get_tablename($tableid), $dateline, XDB::field('authorid', $authorid)));
	}

	public function update($tableid, $pid, $data, $unbuffered = false, $low_priority = false, $first = null, $invisible = null, $fid = null, $status = null) {
		$where = array();
		$where[] = XDB::field('pid', $pid);
		if($first !== null) {
			$where[] = XDB::field('first', $first);
		}
		if($invisible !== null) {
			$where[] = XDB::field('invisible', $invisible);
		}
		if($status !== null) {
			$where[] = XDB::field('status', $status);
		}
		if($fid !== null) {
			$where[] = XDB::field('fid', $fid);
		}
		$return = XDB::update(self::get_tablename($tableid), $data, implode(' AND ', $where), $unbuffered, $low_priority);
		if($return && $this->_allowmem) {
			$this->update_cache($tableid, $pid, 'pid', $data, array('invisible' => $invisible, 'first' => $first, 'fid' => $fid, 'status' => $status));
		}
		return $return;
	}

	public function update_by_tid($tableid, $tid, $data, $unbuffered = false, $low_priority = false, $first = null, $invisible = null, $status = null) {
		$where = array();
		$where[] = XDB::field('tid', $tid);
		if($first !== null) {
			$where[] = XDB::field('first', $first);
		}
		if($invisible !== null) {
			$where[] = XDB::field('invisible', $invisible);
		}
		if($status !== null) {
			$where[] = XDB::field('status', $status);
		}
		$return = XDB::update(self::get_tablename($tableid), $data, implode(' AND ', $where), $unbuffered, $low_priority);
		if($return && $this->_allowmem) {
			$this->update_cache(0, $tid, 'tid', $data, array('first' => $first, 'invisible' => $invisible, 'status' => $status));
		}
		return $return;
	}

	public function update_fid_by_fid($tableid, $fid, $newfid, $unbuffered = false, $low_priority = false) {
		$where = array();
		$where[] = XDB::field('fid', $fid);
		$return = XDB::update(self::get_tablename($tableid), array('fid' => $newfid), implode(' AND ', $where), $unbuffered, $low_priority);
		if($return && $this->_allowmem) {
			$updatefid = $this->fetch_cache('updatefid');
			$updatefid[$fid] = array('fid' => $newfid, 'dateline' => TIMESTAMP);
			$this->store_cache('updatefid', $updatefid);
		}
		return $return;
	}

	public function update_cache($tableid, $id, $idtype, $data, $condition = array(), $glue = 'merge') {
		if(!$this->_allowmem) return;

		if($idtype == 'tid') {
			$memorydata = $this->fetch_cache($id, $this->_pre_cache_key.'tid_');
			if(!$memorydata) {
				return;
			}
			if(!is_array($id)) {
				$memorydata = array($id => $memorydata);
				$id = (array)$id;
			}
			foreach($id as $v) {
				if(!$memorydata[$v]) {
					continue;
				}
				foreach($memorydata[$v] as $pid => $post) {
					$updateflag = true;
					if($condition) {
						foreach($condition as $ck => $cv) {
							if($cv !== null && !in_array($post[$ck], (array)$cv)) {
								$updateflag = false;
								break;
							}
						}
					}
					if($updateflag) {
						if($glue == 'merge') {
							$memorydata[$v][$pid] = array_merge($post, $data);
						} else {
							foreach($data as $dk => $dv) {
								$memorydata[$v][$pid][$dk] = helper_util::compute($memorydata[$v][$pid][$dk], $dv, $glue);
							}
						}
					}
				}
				$this->store_cache($v, $memorydata[$v], $this->_cache_ttl, $this->_pre_cache_key.'tid_');
			}
		} elseif($idtype == 'pid') {
			$memorytid = array();
			$query = XDB::query('SELECT pid, tid FROM %t WHERE '.XDB::field('pid', $id), array(self::get_tablename($tableid)));
			while($post = XDB::fetch($query)) {
				$memorytid[$post['pid']] = $post['tid'];
			}
			$memorydata = $this->fetch_cache($memorytid, $this->_pre_cache_key.'tid_');
			if(!$memorydata) {
				return;
			}
			if(!is_array($id)) {
				$id = (array)$id;
			}
			foreach($id as $v) {
				if($memorydata[$memorytid[$v]][$v]) {
					$updateflag = true;
					if($condition) {
						foreach($condition as $ck => $cv) {
							if($cv !== null && !in_array($memorydata[$memorytid[$v]][$v][$ck], (array)$cv)) {
								$updateflag = false;
								break;
							}
						}
					}
					if($updateflag) {
						if($glue == 'merge') {
							$memorydata[$memorytid[$v]][$v] = array_merge($memorydata[$memorytid[$v]][$v], $data);
						} else {
							foreach($data as $dk => $dv) {
								$memorydata[$memorytid[$v]][$v][$dk] = helper_util::compute($memorydata[$memorytid[$v]][$v][$dk], $dv, $glue);
							}
						}
					}
				}
			}
			foreach($memorydata as $tid => $postlist) {
				$this->store_cache($tid, $postlist, $this->_cache_ttl, $this->_pre_cache_key.'tid_');
			}
		} elseif($idtype == 'fid') {

		}
	}

	public function concat_threadtags_by_tid($tid, $tags) {
		$return = XDB::query('UPDATE %t SET tags=concat(tags, %s) WHERE tid=%d AND first=1', array(self::get_tablename('tid:'.$tid), $tags, $tid));
		if($return && $this->_allowmem) {
			$this->update_cache(0, $tid, 'tid', array('tags' => $tags), array('first' => 1), '.');
		}
		return $return;
	}


	public function increase_rate_by_pid($tableid, $pid, $rate, $ratetimes) {
		$return = XDB::query('UPDATE %t SET rate=rate+\'%d\', ratetimes=ratetimes+\'%d\' WHERE pid=%d',
				array(self::get_tablename($tableid), $rate, $ratetimes, $pid));
		if($return && $this->_allowmem) {
			$this->update_cache($tableid, $pid, 'pid', array('rate' => $rate, 'ratetimes' => $ratetimes), array(), '+');
		}
		return $return;
	}
	public function increase_position_by_tid($tableid, $tid, $position) {
		$return = XDB::query('UPDATE %t SET position=position+\'%d\' WHERE '.XDB::field('tid', $tid),
				array(self::get_tablename($tableid), $position));
		return $return;
	}

	public function increase_status_by_pid($tableid, $pid, $status, $glue, $unbuffered = false) {
		$return = XDB::query('UPDATE %t SET %i WHERE %i', array(self::get_tablename($tableid), XDB::field('status', $status, $glue), XDB::field('pid', $pid)), $unbuffered);
		if($return && $this->_allowmem) {
			$this->update_cache($tableid, $pid, 'pid', array('status' => $status), array(), $glue);
		}
		return $return;
	}

	public function insert($tableid, $data, $return_insert_id = false, $replace = false, $silent = false) {
		return XDB::insert(self::get_tablename($tableid), $data, $return_insert_id, $replace, $silent);
	}

	public function delete($tableid, $pid, $unbuffered = false) {
		$return = XDB::delete(self::get_tablename($tableid), XDB::field($this->_pk, $pid), 0, $unbuffered);
		if($return && $this->_allowmem) {
			$delpid = $this->fetch_cache('delpid');
			$this->store_cache('delpid', array_merge((array)$pid, (array)$delpid));
		}
		return $return;
	}

	public function delete_by_tid($tableid, $tids, $unbuffered = false) {
		$return = XDB::delete(self::get_tablename($tableid), XDB::field('tid', $tids), 0, $unbuffered);
		if($return && $this->_allowmem) {
			$this->clear_cache($tids, $this->_pre_cache_key.'tid_');
		}
		return $return;
	}

	public function delete_by_authorid($tableid, $authorids, $unbuffered = false) {
		$return = XDB::delete(self::get_tablename($tableid), XDB::field('authorid', $authorids), 0, $unbuffered);
		if($return && $this->_allowmem) {
			$delauthorid = $this->fetch_cache('delauthorid');
			$this->store_cache('delauthorid', array_merge((array)$authorids, (array)$delauthorid));
		}
		return $return;
	}

	public function delete_by_fid($tableid, $fids, $unbuffered = false) {
		return XDB::delete(self::get_tablename($tableid), XDB::field('fid', $fids), 0, $unbuffered);
	}

	public function show_table() {
		return XDB::fetch_all("SHOW TABLES LIKE '".XDB::table('forum_post')."\_%'");
	}

	public function show_table_by_tableid($tableid) {
		return XDB::fetch_first('SHOW CREATE TABLE %t', array(self::get_tablename($tableid)));
	}

	public function drop_table($tableid) {
		return ($tableid = dintval($tableid)) ? XDB::query('DROP TABLE %t', array(self::get_tablename($tableid))) : false;
	}

	public function optimize_table($tableid) {
		return XDB::query('OPTIMIZE TABLE %t', array(self::get_tablename($tableid)), true);
	}

	public function move_table($tableid, $fieldstr, $fromtable, $tid) {
		$tidsql = is_array($tid) ? 'tid IN(%n)' : 'tid=%d';
		return XDB::query("INSERT INTO %t ($fieldstr) SELECT $fieldstr FROM $fromtable WHERE $tidsql", array(self::get_tablename($tableid), $tid), true);
	}

	public function count_by_search($tableid, $tid = null, $keywords = null, $invisible =null, $fid = null, $authorid = null, $author = null, $starttime = null, $endtime = null, $useip = null, $first = null) {
		$sql = '';
		$sql .= $tid ? ' AND '.XDB::field('tid', $tid) : '';
		$sql .= $authorid !== null ? ' AND '.XDB::field('authorid', $authorid) : '';
		$sql .= $invisible !== null ? ' AND '.XDB::field('invisible', $invisible) : '';
		$sql .= $first !== null ? ' AND '.XDB::field('first', $first) : '';
		$sql .= $fid ? ' AND '.XDB::field('fid', $fid) : '';
		$sql .= $author ? ' AND '.XDB::field('author', $author) : '';
		$sql .= $starttime ? ' AND '.XDB::field('dateline', $starttime, '>=') : '';
		$sql .= $endtime ? ' AND '.XDB::field('dateline', $endtime, '<') : '';
		$sql .= $useip ? ' AND '.XDB::field('useip', $useip, 'like') : '';
		if(trim($keywords)) {
			$sqlkeywords = $or = '';
			foreach(explode(',', str_replace(' ', '', $keywords)) as $keyword) {
				$keyword = addslashes($keyword);
				$sqlkeywords .= " $or message LIKE '%$keyword%'";
				$or = 'OR';
			}
			$sql .= " AND ($sqlkeywords)";
		}
		if($sql) {
			return XDB::result_first('SELECT COUNT(*) FROM %t WHERE 1 %i', array(self::get_tablename($tableid), $sql));
		} else {
			return 0;
		}
	}

	public function fetch_all_by_search($tableid, $tid = null, $keywords = null, $invisible = null, $fid = null, $authorid = null, $author = null, $starttime = null, $endtime = null, $useip = null, $first = null, $start = null, $limit = null) {
		$sql = '';
		$sql .= $tid ? ' AND '.XDB::field('tid', $tid) : '';
		$sql .= $authorid ? ' AND '.XDB::field('authorid', $authorid) : '';
		$sql .= $invisible !== null ? ' AND '.XDB::field('invisible', $invisible) : '';
		$sql .= $first !== null ? ' AND '.XDB::field('first', $first) : '';
		$sql .= $fid ? ' AND '.XDB::field('fid', $fid) : '';
		$sql .= $author ? ' AND '.XDB::field('author', $author) : '';
		$sql .= $starttime ? ' AND '.XDB::field('dateline', $starttime, '>=') : '';
		$sql .= $endtime ? ' AND '.XDB::field('dateline', $endtime, '<') : '';
		$sql .= $useip ? ' AND '.XDB::field('useip', $useip, 'like') : '';
		if(trim($keywords)) {
			$sqlkeywords = $or = '';
			foreach(explode(',', str_replace(' ', '', $keywords)) as $keyword) {
				$keyword = addslashes($keyword);
				$sqlkeywords .= " $or message LIKE '%$keyword%'";
				$or = 'OR';
			}
			$sql .= " AND ($sqlkeywords)";
		}
		if($sql) {
			return XDB::fetch_all('SELECT * FROM %t WHERE 1 %i ORDER BY dateline DESC %i', array(self::get_tablename($tableid), $sql, XDB::limit($start, $limit)));
		} else {
			return array();
		}
	}

	public function count_prune_by_search($tableid, $isgroup = null, $keywords = null, $message_length = null, $fid = null, $authorid = null, $starttime = null, $endtime = null, $useip = null) {
		$sql = '';
		$sql .= $fid ? ' AND p.'.XDB::field('fid', $fid) : '';
		$sql .= $isgroup ? ' AND t.'.XDB::field('isgroup', $isgroup) : '';
		$sql .= $authorid !== null ? ' AND p.'.XDB::field('authorid', $authorid) : '';
		$sql .= $starttime ? ' AND p.'.XDB::field('dateline', $starttime, '>=') : '';
		$sql .= $endtime ? ' AND p.'.XDB::field('dateline', $endtime, '<') : '';
		$sql .= $useip ? ' AND p.'.XDB::field('useip', $useip, 'like') : '';
		$sql .= $message_length !== null ? ' AND LENGTH(p.message) < '.intval($message_length) : '';
		if(trim($keywords)) {
			$sqlkeywords = '';
			$or = '';
			$keywords = explode(',', str_replace(' ', '', $keywords));
			for($i = 0; $i < count($keywords); $i++) {
				if(preg_match("/\{(\d+)\}/", $keywords[$i])) {
					$keywords[$i] = preg_replace("/\\\{(\d+)\\\}/", ".{0,\\1}", preg_quote($keywords[$i], '/'));
					$sqlkeywords .= " $or p.subject REGEXP '".$keywords[$i]."' OR p.message REGEXP '".$keywords[$i]."'";
				} else {
					$keywords[$i] = addslashes($keywords[$i]);
					$sqlkeywords .= " $or p.subject LIKE '%".$keywords[$i]."%' OR p.message LIKE '%".$keywords[$i]."%'";
				}
				$or = 'OR';
			}
			$sql .= " AND ($sqlkeywords)";
		}
		if($sql) {
			if($isgroup) {
				return XDB::result_first('SELECT COUNT(*)
					FROM %t p LEFT JOIN %t t USING(tid)
					WHERE 1 %i', array(self::get_tablename($tableid), 'forum_thread', $sql));
			} else {
				return XDB::result_first('SELECT COUNT(*)
					FROM %t p
					WHERE 1 %i', array(self::get_tablename($tableid), $sql));
			}
		} else {
			return 0;
		}
	}

	public function fetch_all_new_post_by_pid($pid, $start = 0, $limit = 0, $tableid = 0, $glue = '>', $sort = 'ASC') {
		return $limit ? XDB::fetch_all('SELECT * FROM '.XDB::table($this->get_tablename($tableid)).
				' WHERE '.XDB::field('pid', $pid, $glue).
				' ORDER BY '.XDB::order('pid', $sort).
				XDB::limit($start, $limit), $this->_pk) : array();
	}
	public function fetch_all_prune_by_search($tableid, $isgroup = null, $keywords = null, $message_length = null, $fid = null, $authorid = null, $starttime = null, $endtime = null, $useip = null, $outmsg = true, $start = null, $limit = null) {
		$sql = '';
		$sql .= $fid ? ' AND p.'.XDB::field('fid', $fid) : '';
		$sql .= $isgroup ? ' AND t.'.XDB::field('isgroup', $isgroup) : '';
		$sql .= $authorid !== null ? ' AND p.'.XDB::field('authorid', $authorid) : '';
		$sql .= $starttime ? ' AND p.'.XDB::field('dateline', $starttime, '>=') : '';
		$sql .= $endtime ? ' AND p.'.XDB::field('dateline', $endtime, '<') : '';
		$sql .= $useip ? ' AND p.'.XDB::field('useip', $useip, 'like') : '';
		$sql .= $message_length !== null ? ' AND LENGTH(p.message) < '.intval($message_length) : '';
		$postlist = array();
		if(trim($keywords)) {
			$sqlkeywords = '';
			$or = '';
			$keywords = explode(',', str_replace(' ', '', $keywords));
			for($i = 0; $i < count($keywords); $i++) {
				if(preg_match("/\{(\d+)\}/", $keywords[$i])) {
					$keywords[$i] = preg_replace("/\\\{(\d+)\\\}/", ".{0,\\1}", preg_quote($keywords[$i], '/'));
					$sqlkeywords .= " $or p.subject REGEXP '".$keywords[$i]."' OR p.message REGEXP '".$keywords[$i]."'";
				} else {
					$keywords[$i] = addslashes($keywords[$i]);
					$sqlkeywords .= " $or p.subject LIKE '%".$keywords[$i]."%' OR p.message LIKE '%".$keywords[$i]."%'";
				}
				$or = 'OR';
			}
			$sql .= " AND ($sqlkeywords)";
		}
		if($sql) {
			if($isgroup) {
				$query = XDB::query('SELECT p.*, t.*
					FROM %t p LEFT JOIN %t t USING(tid)
					WHERE 1 %i %i', array(self::get_tablename($tableid), 'forum_thread', $sql, XDB::limit($start, $limit)));
			} else {
				$query = XDB::query('SELECT *
					FROM %t p
					WHERE 1 %i %i', array(self::get_tablename($tableid), $sql, XDB::limit($start, $limit)));
			}
			while($post = XDB::fetch($query)) {
				if(!$outmsg) {
					unset($post['message']);
				}
				$postlist[$post[$this->_pk]] = $post;
			}
		}
		return $postlist;
	}


	public static function getposttablebytid($tids, $primary = 0) {

		$isstring = false;
		if(!is_array($tids)) {
			$thread = getglobal('thread');
			if(!empty($thread) && isset($thread['posttableid']) && $tids == $thread['tid']) {
				return 'forum_post'.(empty($thread['posttableid']) ? '' : '_'.$thread['posttableid']);
			}
			$tids = array(intval($tids));
			$isstring = true;
		}
		$tids = array_unique($tids);
		$tids = array_flip($tids);
		if(!$primary) {
			loadcache('threadtableids');
			$threadtableids = getglobal('threadtableids', 'cache');
			empty($threadtableids) && $threadtableids = array();
			if(!in_array(0, $threadtableids)) {
				$threadtableids = array_merge(array(0), $threadtableids);
			}
		} else {
			$threadtableids = array(0);
		}
		$tables = array();
		$posttable = '';
		foreach($threadtableids as $tableid) {
			$threadtable = $tableid ? "forum_thread_$tableid" : 'forum_thread';
			$query = XDB::query("SELECT tid, posttableid FROM ".XDB::table($threadtable)." WHERE tid IN(".dimplode(array_keys($tids)).")");
			while ($value = XDB::fetch($query)) {
				$posttable = 'forum_post'.($value['posttableid'] ? "_$value[posttableid]" : '');
				$tables[$posttable][$value['tid']] = $value['tid'];
				unset($tids[$value['tid']]);
			}
			if(!count($tids)) {
				break;
			}
		}
		if(empty($posttable)) {
			$posttable = 'forum_post';
			$tables[$posttable] = array_flip($tids);
		}
		return $isstring ? $posttable : $tables;
	}
	public function show_table_columns($table) {
		$data = array();
		$db = &XDB::object();
		if($db->version() > '4.1') {
			$query = $db->query("SHOW FULL COLUMNS FROM ".XDB::table($table), 'SILENT');
		} else {
			$query = $db->query("SHOW COLUMNS FROM ".XDB::table($table), 'SILENT');
		}
		while($field = @XDB::fetch($query)) {
			$data[$field['Field']] = $field;
		}
		return $data;
	}

	public static function getposttable($tableid = 0, $prefix = false) {
		global $_G;
		$tableid = intval($tableid);
		if($tableid) {
			loadcache('posttableids');
			$tableid = $_G['cache']['posttableids'] && in_array($tableid, $_G['cache']['posttableids']) ? $tableid : 0;
			$tablename = 'forum_post'.($tableid ? "_$tableid" : '');
		} else {
			$tablename = 'forum_post';
		}
		if($prefix) {
			$tablename = XDB::table($tablename);
		}
		return $tablename;
	}
	
	public function count_by_tid_post($tableid, $tid) {
		return XDB::result_first('SELECT COUNT(*) FROM %t WHERE tid=%d AND invisible=0 AND first=0',
				array(self::get_tablename($tableid), $tid));
	}
}
//From:www_YMG6_COM
?>