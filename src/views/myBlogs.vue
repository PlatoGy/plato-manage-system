<template>
    <div>
		<div class="container">
			<div class="handle-box">
				博客标题：<el-input v-model="query.search" placeholder="请输入博客标题" class="handle-input mr10"></el-input>
                知识库：<el-input v-model="query.library" placeholder="请输入知识库名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="RefreshLeft" @click="handleRefresh">重置</el-button>
			</div>
			<el-table :data="tableData" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column type="index" label="序号" width="55" align="center"></el-table-column>
				<el-table-column prop="title" label="标题" align="center"></el-table-column>
				<el-table-column prop="libraryName" label="知识库" align="center"></el-table-column>
				<el-table-column prop="publicTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间"  align="center"></el-table-column>
				<el-table-column label="操作" width="360" align="center">
					<template #default="scope">
						<el-button text :icon="ZoomIn" class="blue" v-permiss="15">
                            <a :href="'http://127.0.0.1:5174/#/?article='+scope.row.id" target="_blank">打开</a>
						</el-button>
                        <el-button text :icon="Edit"  @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
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
<script setup lang="ts" name="myBlogs">
import { ref, reactive, inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus,RefreshLeft,ZoomIn } from '@element-plus/icons-vue';
import { getArticleList, deleteArticle } from '@/api/myBlogs/index';
import { useRouter,useRoute } from 'vue-router'

//引入路由
const router:any = useRouter()
const route:any = useRoute()

interface TableItem {
	id: number;
	name: string;
	createTime: string;
	updateTime: string;
	creator: string;
	color: string;
}

const query = reactive({
	search: '',
	library:'',
	pageNum: 1,
	pageSize: 10
});
const tableData:any = reactive([]);
const pageTotal = ref(0);
const format:any = inject("format") 
// 获取表格数据
const getData = () => {
	getArticleList(query)
		.then((res:any)=>{
			if(res.data.code==200){
				while(tableData.length){
					tableData.pop()
				}
				Object.assign(tableData,res.data.data.list)
				tableData.forEach((e:any)=>{
					e.publicTime = format.formatDate2(e.publicTime)
					e.updateTime = format.formatDate2(e.updateTime)
				})
				pageTotal.value = res.data.data.total
			}else{

			}
			console.log(res);
			
		})
		.catch(err=>{

		})
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
	query.library = ''
	getData();
}
// 分页导航
const handlePageChange = (val: number) => {
	query.pageNum = val;
	getData();
};

// 删除操作
const handleDelete = (index: number,row:any) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			deleteArticle(row.id)
				.then((res:any)=>{
					if(res.data.code==200){
						ElMessage.success('删除成功');
						getData();
					}
				})
			
		})
		.catch(() => {});
};


const handleEdit = (index: number, row: any) => {
    router.push({path:'/editBlog', query: { article: row.id }})
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