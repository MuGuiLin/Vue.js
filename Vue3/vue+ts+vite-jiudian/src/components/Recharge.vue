<script lang="ts" setup name="Recharge">
import { reactive, onMounted, defineEmits, getCurrentInstance } from "vue";
import { rechargeApi, paymentApi } from "@api/mine";
import { pinia } from "@/stores";
import { is, bridge } from "@/utils";

interface Props {
  show?: boolean;
}

const { proxy }: any = getCurrentInstance();

const state: any = reactive({
  money: 0,
  item: {
    id: "",
    money: 0,
  },
  recharge_item: [],
});

const emits = defineEmits(["plus"]);

const { show } = withDefaults(defineProps<Props>(), {});

const setCheck = (arr: any) => {
  if (!is.isArray(arr)) {
    return [];
  }
  return arr.map((o: any) => {
    o.check = false;
    return o;
  });
};

const select = (o: any, i: number) => {
  state.recharge_item = setCheck(state.recharge_item);
  state.recharge_item[i].check = true;
  state.item = o;
};

const recharge = async () => {
  const { data }: any = await rechargeApi();
  state.money = data.money;
  state.recharge_item = setCheck(data.recharge_item);
  state.item.money = data.recharge_item[0].money;
  state.recharge_item[0].check = true;
};

const submit = async () => {
  const { id } = state.item;
  if (id) {
    const { data }: any = await paymentApi({ chargeId: id });
    bridge.request(data, (o: any) => {
      const { getUser } = pinia();
      getUser(() => {
        recharge();
      });
    });
  } else {
    proxy.$notify.warn("您还没有选择充值金额哦！");
  }
};

onMounted(async () => {
  recharge();
});
</script>

<template>
  <section class="recharge">
    <div class="recharge-plus" v-show="show">
      <a class="back" @click="emits('plus', false)"></a>
    </div>
    <main class="recharge-main">
      <div
        :class="`recharge-main-balance ${show && 'recharge-main-balance-show'}`"
      >
        <label>{{ show ? "剩余：" : "我的账户" }}</label>
        <strong>￥{{ state.money }}</strong>
      </div>
      <div class="recharge-main-units">选择充值金额（1元=100鸡腿）</div>
      <ul class="recharge-main-amount">
        <template v-for="(o, i) in state.recharge_item">
          <li
            :key="i"
            class="recommend"
            v-if="o.is_recommend"
            :class="o.check && 'select'"
            @click="select(o, i)"
          >
            <h3>
              {{ o.money }}元<b>{{ o.subdesc }}</b>
            </h3>
            <p>{{ o.desc }}</p>
            <img src="@/assets/imgs/recommend.webp" alt="" />
          </li>
          <li v-else :class="o.check && 'select'" @click="select(o, i)">
            <h3>{{ o.money }}元</h3>
            <p>{{ o.subdesc }}</p>
            <i>{{ o.desc }}</i>
          </li>
        </template>
      </ul>
      <div class="recharge-main-topupnow">
        <nut-button
          block
          size="large"
          color="linear-gradient(293deg, #9853C0 0%, #A869BF 24%, #FFBBA0 100%)"
          @click="submit"
          >立即充值：{{ state.item.money }}元</nut-button
        >
      </div>
      <div class="recharge-main-explanation">
        <h4>购买漫币说明：</h4>
        <article>
          <p>
            <b>1.</b>
            本平台人民币与漫币兑换比率：1元=100漫币。
          </p>
          <p>
            <b>2.</b>
            有“<i></i>”标识的漫画，为付费章节。
          </p>
          <p>
            <b>3.</b>
            为了您的阅读体验，您同意在您的漫币余额足够的情况下，当你继续阅读下一章节时，则为您同意购买下一章节并同意系统从您的鸡腿余额中自动扣除相应的书币。点击充值即表示您已同意并接受上述漫画章节购买规则。
          </p>
          <p>
            <b>4.</b>
            购买鸡腿时所赠送的鸡腿存在有效期，有效期：自您成功购买鸡腿之日起5个自然日。逾期未消费的，将自动失效；消费时优先扣除所赠送的鸡腿。
          </p>
          <p>
            <b>5.</b>
            若您是未满十八周岁的未成年人，在本平台进行购买鸡腿前需获得家长同意或其他法定监护人的同意，点击购买鸡腿后即视为您已经得您的家长或其他法定监护人的明确同意。
          </p>
          <p>
            <b>6.</b>
            本平台倡导理性消费。购买成功后，平台即时收取相应费用，鸡腿为虚拟币，非因法定事由，不提供退费服务，敬请谅解。
          </p>
          <p>
            <b>7.</b>
            若您在使用本平台服务过程中存在以盈利、经营等非个人使用目的购买/使用鸡腿、利用网络漏洞、作弊工具进行购买消费等违法违规或其他不正当行为的，本平台有权中断或终止向您提供相应的服务，不予返还您购买鸡腿时的现金余额。
          </p>
          <p>
            <b>8.</b>
            本平台可根据运营情况调整相关服务规则，具体请以平台页面显示的为准。
          </p>
        </article>
      </div>
    </main>
  </section>
</template>

<style lang="scss" scoped>
.recharge {
  box-sizing: border-box;
  &-plus {
    padding-top: 100px;
    width: 100%;
    height: 212px;
    background: rgba(0, 0, 0, 0.1) left bottom url(@/assets/imgs/plus.webp)
      no-repeat;
    background-size: contain;

    .back {
      position: fixed;
      top: 16px;
      left: 16px;
      display: block;
      width: 26px;
      height: 26px;
      background: url(@/assets/svg/back.svg) no-repeat;
      background-size: cover;
      z-index: 1;
    }
  }
  &-main {
    padding: 15px;
    background: white;
    &-balance {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-top: -10px;
      margin-bottom: 10px;
      height: 66px;
      border-bottom: 1px solid #f6f6f6;
      > label {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      > strong {
        position: relative;
        padding-right: 33px;
        font-size: 26px;
        font-weight: 600;
        color: #333;
        &::after {
          content: "";
          position: absolute;
          top: 5px;
          right: 0px;
          display: inline-block;
          width: 28px;
          height: 28px;
          background: url(@/assets/icon/fowlleg.webp) no-repeat;
          background-size: cover;
        }
      }
    }
    &-balance-show {
      justify-content: flex-start;
      margin: -50px 0 0 0;
      height: 40px;
      border-bottom: none;
      > label {
        font-size: 16px;
        font-weight: 600;
        color: #333;
      }
      > strong {
        font-size: 18px;
        &::after {
          top: 0;
          width: 26px;
          height: 26px;
        }
      }
    }
    &-units {
      line-height: 30px;
      font-size: 12px;
      font-weight: 400;
      color: #333;
    }
    &-amount {
      display: flex;
      flex-wrap: wrap;
      justify-content: space-between;
      align-items: center;
      padding: 0 0 18px 0;
      min-height: 340px;
      > li {
        display: flex;
        position: relative;
        flex-direction: column;
        justify-content: center;
        align-items: center;
        margin: 7px 0;
        width: 166px;
        height: 100px;
        background: #f4f8fc;
        // border: 1px solid #f4f8fc;
        border-radius: 8px;
        overflow: hidden;
        > h3 {
          font-size: 18px;
          font-weight: 600;
          color: #333;
        }
        > p {
          position: relative;
          padding-right: 10px;
          line-height: 26px;
          font-size: 12px;
          font-weight: 400;
          color: #333;
          &::after {
            content: "";
            position: absolute;
            top: 2px;
            right: -13px;
            display: inline-block;
            width: 20px;
            height: 20px;
            background: url(@/assets/icon/fowlleg.webp) no-repeat;
            background-size: cover;
          }
        }
        > i {
          font-style: normal;
          font-size: 10px;
          font-weight: 400;
          color: #e9544f;
        }
      }
      > li.recommend {
        align-items: flex-start;
        padding-left: 26px;
        width: 100%;
        height: 92px;
        // border: 2px solid #9854bf !important;
        box-shadow: 0px 0px 4px 2px #9854bf !important;
        > h3 {
          font-size: 14px;
          color: #370909;
          b {
            padding-left: 10px;
            font-size: 12px;
            font-weight: 400;
          }
        }
        > p {
          font-size: 12px;
          color: #370909;
          &::after {
            background: none;
          }
        }
        > img {
          position: absolute;
          right: 20px;
          width: 160px;
        }
      }

      > li.select {
        background: #f2edf5;
        // border: 1px solid #9854bf;
        box-shadow: 0px 0px 2px 1px #9854bf !important;
        &::before {
          content: "";
          position: absolute;
          top: 0;
          right: 0;
          width: 0;
          height: 0;
          border-top: 36px solid #9854bf;
          border-left: 36px solid transparent;
        }
        &::after {
          content: "";
          position: absolute;
          top: 4px;
          right: 3px;
          display: block;
          width: 16px;
          height: 16px;
          background: rgba(152, 83, 192, 0.1) url(@/assets/icon/hooks.webp)
            center no-repeat;
          background-size: contain;
        }
      }
    }
    &-topupnow {
      margin-bottom: 25px;
      .nut-button__warp {
        font-size: 15px;
      }
    }
    &-explanation {
      > h4 {
        line-height: 24px;
        font-size: 12px;
        color: #333;
      }
      p {
        position: relative;
        padding-left: 15px;
        line-height: 20px;
        font-size: 11px;
        font-weight: 400;
        color: #666;
        text-align: justify;
        b {
          position: absolute;
          left: 0px;
          font-weight: 400;
        }
        i {
          position: relative;
          top: 3px;
          display: inline-block;
          width: 16px;
          height: 16px;
          background: url(@/assets/svg/lock.svg) center center no-repeat;
          background-size: contain;
        }
      }
    }
  }
}
::v-deep {
  .nut-button__warp {
    font-size: 15px;
  }
}
</style>