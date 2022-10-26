import CmsButton from './../components/Button/index.js';
import CmsSection from '../components/Section/index.js';
import CmsInput from '../components/Input/index.js';
import CmsRadio from '../components/Radio/index.js';
import CmsSwitch from '../components/Switch/index.js';
import CmsDateTimePicker from '../components/DateTimePicker/index.js';
import CmsUpload from '../components/Upload/index.js';
import LiveStreamConfig from '../views/LiveStreamConfig/index.js';
import TagsSelector from '../views/TagsSelector/index.js';
import ShareConfig from '../views/ShareConfig/index.js';
import VipConfig from '../views/VipConfig/index.js';
import CommentConfig from '../views/CommentConfig/index.js';
import DisplayRatioConfig from '../views/DisplayRatioConfig/index.js';
import MaterialSelector from '../views/MaterialSelector/index.js';
import CmsCollapse from '../components/Collapse/index.js';
import UserNumShowConfig from '../views/UserNumShowConfig/index.js';
import HostConfig from '../views/HostConfig/index.js';
import DataShowConfig from '../views/DataShowConfig/index.js';

const { createApp, ref, reactive } = Vue

const app = createApp({
  components: {
    CmsButton,
    CmsSection,
    CmsInput,
    CmsRadio,
    CmsSwitch,
    CmsDateTimePicker,
    CmsUpload,
    LiveStreamConfig,
    TagsSelector,
    ShareConfig,
    VipConfig,
    CommentConfig,
    DisplayRatioConfig,
    CmsCollapse,
    UserNumShowConfig,
    HostConfig,
    DataShowConfig
  },
  setup() {
    const radioOptions = ref([]);
    radioOptions.value = [
      {
        key: "", 
        value: 1, 
        label:'一改即改', 
        select:false
      }
    ]
    const handleBtnClick = () => {
      console.log(1111)
    }

    const data = ref({})

    data.value = {
      "model": {
        "id": 146,
        "channel": "1",
        "title": "123",
        "subtitle": "test",
        "content_type": 1,
        "system_labels": "3,5,19,27",
        "custom_labels": "111",
        "search_keys": "国内,上海,政务,动态,111",
        "cover": "https://cms.kksmg.com//attachment/sportscms/images/2022/04/14/image_1649902838_o1EwEw23.jpeg",
        "introduction": "hhhh",
        "vip": 0,
        "real_good_num": 0,
        "real_collect_num": 0,
        "real_view_num": 0,
        "real_share_num": 0,
        "real_comment_num": 0,
        "comment_able": 0,
        "ask_able": 0,
        "share_cover": null,
        "share_intro": "",
        "share_title": "",
        "status": 0,
        "audit_status": 0,
        "deleted_at": null,
        "created_by": 1,
        "publish_time": "2022-10-09 09:18:20",
        "created_at": "2022-10-09 09:18:20",
        "updated_at": "2022-10-09 09:18:20",
        "last_editor": 1,
        "is_top": 100
      },
      "params": {
        "id": "146"
      },
      "live": {
        "id": 12,
        "content_id": 146,
        "type": 1,
        "live_type": 1,
        "base_popularity": null,
        "base_play": null,
        "base_hot": null,
        "logo_cover": null,
        "sub_cover": null,
        "start_time": "2022-10-09 09:17:00",
        "end_time": "2022-10-10 09:15:00",
        "is_multiple": 0,
        "is_long_time": 0,
        "real_play_num": 0,
        "order_num": 0,
        "created_at": "2022-10-09 09:18:20",
        "updated_at": "2022-10-09 09:18:20",
        "prettify": 0,
        "visit_num": 1,
        "visit_rand_max": 1,
        "visit_rand_min": 1,
        "praise_num": 1,
        "praise_rand_max": 1,
        "praise_rand_min": 1,
        "host_name": "",
        "host_cover": ""
      },
      "streams": [
        {
          "id": 1,
          "title": "",
          "cover": "https://cms.kksmg.com//attachment/sportscms/images/2022/04/14/image_1649902798_Xz07bMTg.png",
          "cover_before": "",
          "cover_after": "",
          "content_id": 146,
          "stream_info": [
            {
              "weight": "100",
              "operator": "",
              "play_url": "111",
              "pull_url": "111",
              "push_url": "111",
              "select_type": 0,
              "time_review_url": "111",
              "url": "111",
              "name": "111"
            }
          ],
          "time_review": 0,
          "file_review": 0,
          "file_review_id": 0,
          "file_review_url": "",
          "sort": 1,
          "is_valid": 1,
          "time_review_split": 0,
          "split_start_time": null,
          "split_end_time": null,
          "type": 1,
          "create_by": 1,
          "created_at": null,
          "updated_at": null
        },
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {},
        {}
      ],
      "area_label": "国内,上海",
      "type_label": "政务,动态",
      "labels": {
        "1": {
          "id": "1",
          "parent_id": "0",
          "type": "1",
          "name": "地域",
          "status": "1",
          "created_at": "2022-01-28 18:11:09",
          "updated_at": "2022-01-28 18:11:12",
          "child": {
            "3": {
              "id": "3",
              "parent_id": "1",
              "type": "1",
              "name": "国内",
              "status": "1",
              "created_at": "2022-01-28 18:13:20",
              "updated_at": "2022-01-28 18:13:23",
              "child": [
                {
                  "id": "5",
                  "parent_id": "3",
                  "type": "1",
                  "name": "上海",
                  "status": "1",
                  "created_at": "2022-01-28 18:14:51",
                  "updated_at": "2022-01-28 18:14:54"
                },
                {
                  "id": "6",
                  "parent_id": "3",
                  "type": "1",
                  "name": "长三角",
                  "status": "1",
                  "created_at": "2022-01-28 18:19:16",
                  "updated_at": "2022-01-28 18:19:19"
                },
                {
                  "id": "7",
                  "parent_id": "3",
                  "type": "1",
                  "name": "港澳台",
                  "status": "1",
                  "created_at": "2022-01-28 18:20:13",
                  "updated_at": "2022-01-28 18:20:16"
                },
                {
                  "id": "8",
                  "parent_id": "3",
                  "type": "1",
                  "name": "珠三角",
                  "status": "1",
                  "created_at": "2022-01-28 18:23:46",
                  "updated_at": "2022-01-28 18:23:49"
                },
                {
                  "id": "9",
                  "parent_id": "3",
                  "type": "1",
                  "name": "直辖市",
                  "status": "1",
                  "created_at": "2022-01-28 18:26:19",
                  "updated_at": "2022-01-28 18:26:22"
                },
                {
                  "id": "10",
                  "parent_id": "3",
                  "type": "1",
                  "name": "东北",
                  "status": "1",
                  "created_at": "2022-01-29 09:38:19",
                  "updated_at": "2022-01-29 09:38:19"
                },
                {
                  "id": "11",
                  "parent_id": "3",
                  "type": "1",
                  "name": "中西部",
                  "status": "1",
                  "created_at": "2022-01-29 09:38:40",
                  "updated_at": "2022-01-29 09:38:44"
                },
                {
                  "id": "12",
                  "parent_id": "3",
                  "type": "1",
                  "name": "其他",
                  "status": "1",
                  "created_at": "2022-01-29 09:39:37",
                  "updated_at": "2022-01-29 09:39:41"
                }
              ]
            },
            "13": {
              "id": "13",
              "parent_id": "1",
              "type": "1",
              "name": "国际",
              "status": "1",
              "created_at": "2022-01-29 09:40:29",
              "updated_at": "2022-01-29 09:40:32",
              "child": [
                {
                  "id": "14",
                  "parent_id": "13",
                  "type": "1",
                  "name": "欧洲",
                  "status": "1",
                  "created_at": "2022-01-29 09:41:18",
                  "updated_at": "2022-01-29 09:41:20"
                },
                {
                  "id": "15",
                  "parent_id": "13",
                  "type": "1",
                  "name": "亚洲",
                  "status": "1",
                  "created_at": "2022-01-29 09:42:23",
                  "updated_at": "2022-01-29 09:42:26"
                },
                {
                  "id": "16",
                  "parent_id": "13",
                  "type": "1",
                  "name": "美洲",
                  "status": "1",
                  "created_at": "2022-01-29 09:43:25",
                  "updated_at": "2022-01-29 09:43:28"
                },
                {
                  "id": "17",
                  "parent_id": "13",
                  "type": "1",
                  "name": "非洲",
                  "status": "1",
                  "created_at": "2022-01-29 09:44:21",
                  "updated_at": "2022-01-29 09:44:23"
                },
                {
                  "id": "18",
                  "parent_id": "13",
                  "type": "1",
                  "name": "大洋洲",
                  "status": "1",
                  "created_at": "2022-01-29 09:44:39",
                  "updated_at": "2022-01-29 09:44:42"
                }
              ]
            }
          }
        },
        "2": {
          "id": "2",
          "parent_id": "0",
          "type": "2",
          "name": "类型",
          "status": "1",
          "created_at": "2022-01-28 18:12:49",
          "updated_at": "2022-01-28 18:12:52",
          "child": {
            "19": {
              "id": "19",
              "parent_id": "2",
              "type": "2",
              "name": "政务",
              "status": "1",
              "created_at": "2022-01-29 09:47:26",
              "updated_at": "2022-01-29 09:47:26",
              "child": [
                {
                  "id": "27",
                  "parent_id": "19",
                  "type": "2",
                  "name": "动态",
                  "status": "1",
                  "created_at": "2022-01-29 10:10:03",
                  "updated_at": "2022-01-29 10:10:03"
                },
                {
                  "id": "28",
                  "parent_id": "19",
                  "type": "2",
                  "name": "政策",
                  "status": "1",
                  "created_at": "2022-01-29 10:10:27",
                  "updated_at": "2022-01-29 10:10:29"
                },
                {
                  "id": "29",
                  "parent_id": "19",
                  "type": "2",
                  "name": "公告",
                  "status": "1",
                  "created_at": "2022-01-29 10:11:38",
                  "updated_at": "2022-01-29 10:11:41"
                }
              ]
            },
            "20": {
              "id": "20",
              "parent_id": "2",
              "type": "2",
              "name": "娱乐",
              "status": "1",
              "created_at": "2022-01-29 09:47:30",
              "updated_at": "2022-01-29 09:47:30",
              "child": [
                {
                  "id": "30",
                  "parent_id": "20",
                  "type": "2",
                  "name": "明星",
                  "status": "1",
                  "created_at": "2022-01-29 10:13:02",
                  "updated_at": "2022-01-29 10:13:04"
                },
                {
                  "id": "31",
                  "parent_id": "20",
                  "type": "2",
                  "name": "电影",
                  "status": "1",
                  "created_at": "2022-01-29 10:13:34",
                  "updated_at": "2022-01-29 10:13:37"
                },
                {
                  "id": "32",
                  "parent_id": "20",
                  "type": "2",
                  "name": "电视剧",
                  "status": "1",
                  "created_at": "2022-01-29 10:13:57",
                  "updated_at": "2022-01-29 10:14:00"
                },
                {
                  "id": "33",
                  "parent_id": "20",
                  "type": "2",
                  "name": "搞笑",
                  "status": "1",
                  "created_at": "2022-01-29 10:14:17",
                  "updated_at": "2022-01-29 10:14:19"
                }
              ]
            },
            "21": {
              "id": "21",
              "parent_id": "2",
              "type": "2",
              "name": "文体",
              "status": "1",
              "created_at": "2022-01-29 09:47:38",
              "updated_at": "2022-01-29 09:47:41",
              "child": [
                {
                  "id": "34",
                  "parent_id": "21",
                  "type": "2",
                  "name": "足球",
                  "status": "1",
                  "created_at": "2022-01-29 10:15:55",
                  "updated_at": "2022-01-29 10:15:58"
                },
                {
                  "id": "35",
                  "parent_id": "21",
                  "type": "2",
                  "name": "篮球",
                  "status": "1",
                  "created_at": "2022-01-29 10:16:15",
                  "updated_at": "2022-01-29 10:16:18"
                },
                {
                  "id": "36",
                  "parent_id": "21",
                  "type": "2",
                  "name": "演出",
                  "status": "1",
                  "created_at": "2022-01-29 10:16:39",
                  "updated_at": "2022-01-29 10:16:41"
                },
                {
                  "id": "37",
                  "parent_id": "21",
                  "type": "2",
                  "name": "展览",
                  "status": "1",
                  "created_at": "2022-01-29 10:17:02",
                  "updated_at": "2022-01-29 10:17:04"
                }
              ]
            },
            "22": {
              "id": "22",
              "parent_id": "2",
              "type": "2",
              "name": "财经",
              "status": "1",
              "created_at": "2022-01-29 09:48:29",
              "updated_at": "2022-01-29 09:48:32",
              "child": [
                {
                  "id": "38",
                  "parent_id": "22",
                  "type": "2",
                  "name": "股票",
                  "status": "1",
                  "created_at": "2022-01-29 10:18:35",
                  "updated_at": "2022-01-29 10:18:38"
                },
                {
                  "id": "39",
                  "parent_id": "22",
                  "type": "2",
                  "name": "房产",
                  "status": "1",
                  "created_at": "2022-01-29 10:18:52",
                  "updated_at": "2022-01-29 10:18:54"
                },
                {
                  "id": "40",
                  "parent_id": "22",
                  "type": "2",
                  "name": "理财",
                  "status": "1",
                  "created_at": "2022-01-29 10:22:54",
                  "updated_at": "2022-01-29 10:22:57"
                },
                {
                  "id": "41",
                  "parent_id": "22",
                  "type": "2",
                  "name": "汽车",
                  "status": "1",
                  "created_at": "2022-01-29 10:23:23",
                  "updated_at": "2022-01-29 10:23:25"
                }
              ]
            },
            "23": {
              "id": "23",
              "parent_id": "2",
              "type": "2",
              "name": "社会",
              "status": "1",
              "created_at": "2022-01-29 09:53:51",
              "updated_at": "2022-01-29 09:53:54",
              "child": [
                {
                  "id": "42",
                  "parent_id": "23",
                  "type": "2",
                  "name": "百态",
                  "status": "1",
                  "created_at": "2022-01-29 10:23:51",
                  "updated_at": "2022-01-29 10:23:53"
                },
                {
                  "id": "43",
                  "parent_id": "23",
                  "type": "2",
                  "name": "环保",
                  "status": "1",
                  "created_at": "2022-01-29 10:24:11",
                  "updated_at": "2022-01-29 10:24:13"
                },
                {
                  "id": "44",
                  "parent_id": "23",
                  "type": "2",
                  "name": "灾难",
                  "status": "1",
                  "created_at": "2022-01-29 10:24:51",
                  "updated_at": "2022-01-29 10:24:53"
                },
                {
                  "id": "45",
                  "parent_id": "23",
                  "type": "2",
                  "name": "法制",
                  "status": "1",
                  "created_at": "2022-01-29 10:25:15",
                  "updated_at": "2022-01-29 10:25:17"
                },
                {
                  "id": "46",
                  "parent_id": "23",
                  "type": "2",
                  "name": "案件",
                  "status": "1",
                  "created_at": "2022-01-29 10:25:50",
                  "updated_at": "2022-01-29 10:25:46"
                },
                {
                  "id": "47",
                  "parent_id": "23",
                  "type": "2",
                  "name": "事故",
                  "status": "1",
                  "created_at": "2022-01-29 10:27:00",
                  "updated_at": "2022-01-29 10:27:03"
                }
              ]
            },
            "24": {
              "id": "24",
              "parent_id": "2",
              "type": "2",
              "name": "教育",
              "status": "1",
              "created_at": "2022-01-29 09:56:21",
              "updated_at": "2022-01-29 09:56:21",
              "child": [
                {
                  "id": "48",
                  "parent_id": "24",
                  "type": "2",
                  "name": "校园",
                  "status": "1",
                  "created_at": "2022-01-29 10:27:29",
                  "updated_at": "2022-01-29 10:27:32"
                },
                {
                  "id": "49",
                  "parent_id": "24",
                  "type": "2",
                  "name": "读书",
                  "status": "1",
                  "created_at": "2022-01-29 10:28:00",
                  "updated_at": "2022-01-29 10:28:02"
                },
                {
                  "id": "50",
                  "parent_id": "24",
                  "type": "2",
                  "name": "公开课",
                  "status": "1",
                  "created_at": "2022-01-29 10:28:51",
                  "updated_at": "2022-01-29 10:28:53"
                }
              ]
            },
            "25": {
              "id": "25",
              "parent_id": "2",
              "type": "2",
              "name": "科技",
              "status": "1",
              "created_at": "2022-01-29 09:57:38",
              "updated_at": "2022-01-29 09:57:38",
              "child": [
                {
                  "id": "51",
                  "parent_id": "25",
                  "type": "2",
                  "name": "创新",
                  "status": "1",
                  "created_at": "2022-01-29 10:29:26",
                  "updated_at": "2022-01-29 10:29:28"
                },
                {
                  "id": "52",
                  "parent_id": "25",
                  "type": "2",
                  "name": "互联网",
                  "status": "1",
                  "created_at": "2022-01-29 10:29:46",
                  "updated_at": "2022-01-29 10:29:48"
                }
              ]
            },
            "26": {
              "id": "26",
              "parent_id": "2",
              "type": "2",
              "name": "生活",
              "status": "1",
              "created_at": "2022-01-29 09:58:21",
              "updated_at": "2022-01-29 09:58:26",
              "child": [
                {
                  "id": "53",
                  "parent_id": "26",
                  "type": "2",
                  "name": "时尚",
                  "status": "1",
                  "created_at": "2022-01-29 10:30:12",
                  "updated_at": "2022-01-29 10:30:14"
                },
                {
                  "id": "54",
                  "parent_id": "26",
                  "type": "2",
                  "name": "美食",
                  "status": "1",
                  "created_at": "2022-01-29 10:30:31",
                  "updated_at": "2022-01-29 10:30:34"
                },
                {
                  "id": "55",
                  "parent_id": "26",
                  "type": "2",
                  "name": "旅行",
                  "status": "1",
                  "created_at": "2022-01-29 10:30:52",
                  "updated_at": "2022-01-29 10:30:54"
                },
                {
                  "id": "56",
                  "parent_id": "26",
                  "type": "2",
                  "name": "健康",
                  "status": "1",
                  "created_at": "2022-01-29 10:31:14",
                  "updated_at": "2022-01-29 10:31:17"
                },
                {
                  "id": "57",
                  "parent_id": "26",
                  "type": "2",
                  "name": "美容",
                  "status": "1",
                  "created_at": "2022-01-29 10:31:46",
                  "updated_at": "2022-01-29 10:31:49"
                },
                {
                  "id": "58",
                  "parent_id": "26",
                  "type": "2",
                  "name": "摄影",
                  "status": "1",
                  "created_at": "2022-01-29 10:32:20",
                  "updated_at": "2022-01-29 10:32:22"
                },
                {
                  "id": "59",
                  "parent_id": "26",
                  "type": "2",
                  "name": "萌宠",
                  "status": "1",
                  "created_at": "2022-01-29 10:33:04",
                  "updated_at": "2022-01-29 10:33:06"
                },
                {
                  "id": "60",
                  "parent_id": "26",
                  "type": "2",
                  "name": "运动",
                  "status": "1",
                  "created_at": "2022-01-29 10:33:48",
                  "updated_at": "2022-01-29 10:33:46"
                }
              ]
            }
          }
        }
      },
      "sys_label": [
        "3",
        "5",
        "19",
        "27"
      ],
      "edit": "edit"
    }

    return {
      radioOptions,
      handleBtnClick,
      data
    }
  }
})
app.use(ElementPlus, {
  locale: ElementPlusLocaleZhCn,
})

app.use(MaterialSelector);

app.mount('#app');