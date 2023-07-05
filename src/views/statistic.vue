<template>
    <div>
		<div class="container">
			<div class="handle-box">
				博客标题：<el-input v-model="query.name" placeholder="请输入博客标题" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="RefreshLeft">重置</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" @sort-change="handleSortChange">
				<el-table-column prop="id" label="序号" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="标题" align="center"></el-table-column>
				<el-table-column prop="name" label="知识库" align="center"></el-table-column>
				<el-table-column prop="name" label="阅读量" align="center" sortable="custom" ></el-table-column>
				<el-table-column prop="name" label="评论数" align="center" sortable="custom"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center" sortable="custom"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间"  align="center" sortable="custom"></el-table-column>
				<el-table-column label="操作" width="120" align="center">
					<template #default="scope">
						<el-button text :icon="ZoomIn" class="blue" v-permiss="15">
                            <a href="https://github.com/lin-xin/vue-schart" target="_blank">打开</a>
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageIndex"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>

		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="用户名">
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="地址">
					<el-input v-model="form.address"></el-input>
				</el-form-item>
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="editVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveEdit">确 定</el-button>
				</span>
			</template>
		</el-dialog>
    </div>
</template>
<script setup lang="ts" name="statistic">
import { ref, reactive } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus,RefreshLeft,ZoomIn } from '@element-plus/icons-vue';
import { fetchData } from '../api/index';

interface TableItem {
	id: number;
	name: string;
	createTime: string;
	updateTime: string;
	creator: string;
	color: string;
}

const query = reactive({
	name: '',
	pageIndex: 1,
	pageSize: 10
});
const tableData = ref<TableItem[]>([]);
const pageTotal = ref(0);
// 获取表格数据
const getData = () => {
	fetchData().then(res => {
		tableData.value = res.data.list;
		pageTotal.value = res.data.pageTotal || 50;
	});
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 分页导航
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};
// 切换排序方式
const handleSortChange = ({ prop, order}:{prop :any,order :any}) => {
	console.log(prop,order);
	
}

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let form = reactive({
	name: '',
	address: ''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	idx = index;
	form.name = row.name;
	form.address = row.address;
	editVisible.value = true;
};
const saveEdit = () => {
	editVisible.value = false;
	ElMessage.success(`修改第 ${idx + 1} 行成功`);
	tableData.value[idx].name = form.name;
};

</script>
<style lang="scss" scoped>
.handle-box {
	margin-bottom: 20px;
}

.handle-select {
	width: 120px;
}

.handle-input {
	width: 300px;
}
.table {
	width: 100%;
	font-size: 14px;
}
.blue{
    color: #165DFF;
}
.red {
	color: #F56C6C;
}
.mr10 {
	margin-right: 10px;
}
.table-td-thumb {
	display: block;
	margin: auto;
	width: 40px;
	height: 40px;
}
</style>