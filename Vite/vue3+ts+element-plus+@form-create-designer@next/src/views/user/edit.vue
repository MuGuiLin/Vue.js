<script setup lang="ts" name="userEdit">
  import type { FormInstance, FormRules } from 'element-plus';
  import { ref, reactive, onMounted } from 'vue';

  import { $msg, useRoute, useRouter, usrGetDoApi, usrAddDoApi, usrEditDoApi } from '@/apis/user';
  import { depNamesGetDoApi } from '@/apis/department';

  const { query } = useRoute();
  const router = useRouter();

  const formRef = ref();
  const loading = ref(false);

  const states = [
    {
      value: '0',
      label: '冻结',
    },
    {
      value: '1',
      label: '正常',
    },
  ];

  const form = reactive({
    id: query.id || '',
    depID: '',
    state: '1',
    usrName: '',
    usrPhone: '',
    usrMail: '',
  });

  const department: any = ref<Array<any>>([]);

  const rules = reactive<FormRules>({
    usrName: [{ required: true, message: '对不起：请输入姓名！', trigger: 'blur' }],
    usrPhone: [
      { required: true, message: '对不起：请输入手机号！', trigger: 'blur' },
      { min: 11, max: 11, message: '对不起：请正确输入手机号！', trigger: 'blur' },
    ],
  });

  const suerSetup = async () => {
    try {
      loading.value = true;
      const { message }: any = form.id ? await usrEditDoApi(form) : await usrAddDoApi(form);
      $msg({
        showClose: true,
        message,
        type: 'success',
        onClose: router.back,
      });
    } catch (err) {
      throw new Error(`API请求出错：${err}`);
    } finally {
      loading.value = false;
    }
  };

  const reset = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.resetFields();
  };

  const submit = (formEl: FormInstance | undefined) => {
    if (!formEl) return;
    formEl.validate(async (valid) => {
      if (valid) {
        suerSetup();
      }
    });
  };

  onMounted(async () => {
    const { data }: Array<any> | any = await depNamesGetDoApi(form);
    if (data.length) {
      department.value = data;
    }

    if (form.id) {
      try {
        const { data }: any = await usrGetDoApi({ usrID: form.id });
        form.depID = data.depID;
        form.state = data.state;
        form.usrName = data.usrName;
        form.usrPhone = data.usrPhone;
        form.usrMail = data.usrMail;
      } catch (error) {
        console.error(error);
      }
    }
  });
</script>

<template>
  <el-main class="user-edit">
    <el-card>
      <template #header>
        <h4>
          <el-icon><Guide /></el-icon>{{ form.id ? '编辑' : '新增' }}用户
        </h4>
      </template>
      <el-form
        ref="formRef"
        :model="form"
        :rules="rules"
        size="default"
        label-position="top"
        status-icon
        label-width="100px"
      >
        <el-form-item label="姓名" prop="usrName">
          <el-input
            v-model.trim="form.usrName"
            placeholder="请输入姓名！"
            autocomplete="off"
            clearable
          />
        </el-form-item>
        <el-form-item label="手机号" prop="usrPhone">
          <el-input
            type="number"
            v-model="form.usrPhone"
            placeholder="请输入手机号！"
            autocomplete="off"
            clearable
          />
        </el-form-item>
        <el-form-item label="邮箱" prop="usrMail">
          <el-input
            v-model="form.usrMail"
            placeholder="请输入邮箱！"
            autocomplete="off"
            clearable
          />
        </el-form-item>
        <el-form-item label="部门" prop="depID">
          <el-select v-model="form.depID" placeholder="-- 请选择 --">
            <el-option v-for="o in department" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </el-form-item>
        <el-form-item label="状态" prop="state">
          <el-select v-model="form.state" placeholder="-- 请选择 --">
            <el-option v-for="o in states" :key="o.value" :label="o.label" :value="o.value" />
          </el-select>
        </el-form-item>
        <el-form-item class="setup">
          <el-button type="default" @click="router.back()">
            <el-icon><Back /> </el-icon>返 回
          </el-button>
          <el-button type="primary" @click="submit(formRef)" :loading="loading">
            <el-icon><Select /></el-icon>保 存
          </el-button>
          <el-button type="warning" @click="reset(formRef)">
            <el-icon><Refresh /> </el-icon>重 置
          </el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </el-main>
</template>

<style scoped lang="less">
  .user-edit {
    .el-card {
      h4 > .el-icon {
        margin-right: 2px;
        font-size: 26px;
        vertical-align: top;
        color: var(--el-color-primary);
      }

      .el-form {
        padding: 0 10%;

        .el-form-item {
          margin-bottom: 38px;

          .el-select {
            width: 100%;
          }
        }
      }
    }

    ::v-deep {
      .el-card__header {
        padding: 20px !important;
      }

      .setup {
        margin-top: 40px;

        .el-form-item__content {
          justify-content: center;
        }
      }
    }
  }
</style>
