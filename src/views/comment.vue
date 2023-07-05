<template>
    <div>
		<div class="container">
			<div class="handle-box">
				博客标题：<el-input v-model="query.search" placeholder="请输入博客标题" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="RefreshLeft" @click="handleRefresh">重置</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header" >
				<el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
				<el-table-column prop="mailOrigin" label="邮箱地址" align="center"></el-table-column>
				<el-table-column prop="address" label="地址" align="center"></el-table-column>
				<el-table-column prop="title" label="文章名" align="center" ></el-table-column>
				<el-table-column prop="time" label="评论时间" align="center" ></el-table-column>
				<el-table-column prop="content" label="评论内容" align="center" ></el-table-column>
                <el-table-column label="操作" width="120" align="center">
					<template #default="scope">
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.$index, scope.row)" v-permiss="16">
							删除
						</el-button>
					</template>
				</el-table-column>
			</el-table>
			<div class="pagination">
				<el-pagination
					background
					layout="total, prev, pager, next"
					:current-page="query.pageNum"
					:page-size="query.pageSize"
					:total="pageTotal"
					@current-change="handlePageChange"
				></el-pagination>
			</div>
		</div>
    </div>
</template>
<script setup lang="ts" name="comment">
import { ref, reactive, inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus,RefreshLeft,ZoomIn } from '@element-plus/icons-vue';
import { getCommentList, deleteComment } from '../api/comment/index';

// interface TableItem {
// 	id: number;
// 	name: string;
// 	createTime: string;
// 	updateTime: string;
// 	creator: string;
// 	color: string;
// }

const query:any = reactive({
	search: '',
	pageNum: 1,
	pageSize: 10
});
const tableData:any = reactive([]);
const pageTotal = ref(0);
const format:any = inject('format')
// 获取表格数据
const getData = () => {
	getCommentList(query)
    .then(res => {
        // console.log(res);
        if(res.data.code==200){
            pageTotal.value = res.data.data.total
            while(tableData.length){
                tableData.pop()
            }
            Object.assign(tableData,res.data.data.list)
            tableData.forEach((e:any)=>{
                e.time = format.formatDate2(e.time)
                e.address = e.country+e.province+e.city
            })

        }
	});
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageNum = 1;
	getData();
};
const handleRefresh = () => {
	query.pageNum = 1;
	query.search = ''
	getData();
}
const handleDelete = (index:any,row:any) => {
    // console.log(index,row);
    // 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			deleteComment(row.id)
				.then((res:any)=>{
					if(res.data.code==200){
						ElMessage.success('删除成功');
						getData();
					}
				})
			
		})
		.catch(() => {});
    
}
// 分页导航
const handlePageChange = (val: number) => {
	query.pageNum = val;
	getData();
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