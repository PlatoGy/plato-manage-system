<template>
    <div>
		<div class="container">
			<div class="handle-box">
				标签名：<el-input v-model="query.name" placeholder="请输入标签名" class="handle-input mr10"></el-input>
				<el-button type="primary" :icon="Search" @click="handleSearch">搜索</el-button>
				<el-button type="primary" :icon="RefreshLeft" @click="handleResearch">重置</el-button>
				<el-button type="primary" :icon="Plus" @click="addVisible = true">新增</el-button>
			</div>
			<el-table :data="labels" border class="table" ref="multipleTable" header-cell-class-name="table-header">
				<el-table-column prop="id" label="ID" width="55" align="center"></el-table-column>
				<el-table-column prop="name" label="标签名" align="center"></el-table-column>
				<el-table-column prop="createTime" label="创建时间" align="center"></el-table-column>
				<el-table-column prop="updateTime" label="更新时间"  align="center"></el-table-column>
				<el-table-column prop="creatorId" label="创建人ID" align="center"></el-table-column>
				<el-table-column prop="color" label="颜色" align="center">
					<template #default="scope">
						<span type="text" :style="'color:'+scope.row.color">{{ scope.row.color }}</span>
 					</template>

				</el-table-column>
				<el-table-column label="操作" width="220" align="center">
					<template #default="scope">
						<el-button text :icon="Edit" @click="handleEdit(scope.$index, scope.row)" v-permiss="15">
							编辑
						</el-button>
						<el-button text :icon="Delete" class="red" @click="handleDelete(scope.row.id)" v-permiss="16">
							删除
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
		<!-- 新增弹出框 -->
		<el-dialog title="新增" v-model="addVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="标签名">
					<el-input v-model="addForm.name"></el-input>
				</el-form-item>
				<!-- <el-form-item label="颜色">
					<el-input v-model="addForm.color"></el-input>
				</el-form-item> -->
			</el-form>
			<template #footer>
				<span class="dialog-footer">
					<el-button @click="addVisible = false">取 消</el-button>
					<el-button type="primary" @click="saveAdd">确 定</el-button>
				</span>
			</template>
		</el-dialog>
		
		<!-- 编辑弹出框 -->
		<el-dialog title="编辑" v-model="editVisible" width="30%">
			<el-form label-width="70px">
				<el-form-item label="标签名">
					<el-input v-model="editForm.name"></el-input>
				</el-form-item>
				<el-form-item label="颜色">
					<el-input v-model="editForm.color"></el-input>
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
<script setup lang="ts" name="tagConfig">
import { ref, reactive,inject } from 'vue';
import { ElMessage, ElMessageBox } from 'element-plus';
import { Delete, Edit, Search, Plus,RefreshLeft } from '@element-plus/icons-vue';
import { getLabelList,createLabel,changeLabel,deleteLabel } from '../api/tagConfig';

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
	pageSize: 5
});
const labels:Array<any> = reactive([])
const pageTotal = ref(0);
const format:any = inject("format") 
// 获取表格数据
const getData = () => {
    getLabelList(query.name,query.pageIndex,query.pageSize)
        .then((res:any)=>{
            // console.log(res.data.data);
            while(labels.length){
                labels.pop()
            }
            Object.assign(labels,res.data.data.list.items)
			labels.forEach(e=>{
				e.createTime = format.formatDate2(e.createTime)
				e.updateTime = format.formatDate2(e.updateTime)
			})
            pageTotal.value = res.data.data.total
        })
};
getData();

// 查询操作
const handleSearch = () => {
	query.pageIndex = 1;
	getData();
};
// 重置操作
const handleResearch = () => {
	query.name = ""
	query.pageIndex = 1;
	getData();
};
const handlePageChange = (val: number) => {
	query.pageIndex = val;
	getData();
};
// 新增操作
const addVisible = ref(false);
let addForm = reactive({
	name: '',
	// color:''
});
const saveAdd = () => {
	createLabel(addForm)
		.then((res:any) :any =>{
            if(res.data.code == 200){
                ElMessage({
                    // elmessage: error.elmessage,
                    message: '新建标签成功!',
                    type: 'success',
                    duration: 3 * 1000
                })
            }else{
                ElMessage({
                    // elmessage: error.elmessage,
                    message: '新建失败',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
            addVisible.value = false
            getData();
        })
        .catch((err:any)=>{
            ElMessage({
                // elmessage: error.elmessage,
                message: '新建失败',
                type: 'error',
                duration: 3 * 1000
            })
            addVisible.value = false
        })
};


// 删除操作
const handleDelete = (index: number) => {
	// 二次确认删除
	ElMessageBox.confirm('确定要删除吗？', '提示', {
		type: 'warning'
	})
		.then(() => {
			deleteLabel(index)
				.then((res:any) :any =>{
				if(res.data.code == 200){
					ElMessage({
						// elmessage: error.elmessage,
						message: '删除标签成功!',
						type: 'success',
						duration: 3 * 1000
					})
				}else{
					ElMessage({
						// elmessage: error.elmessage,
						message: '删除失败',
						type: 'error',
						duration: 3 * 1000
					})
				}
				// addVisible.value = false
				query.pageIndex = 1;
				getData();
			})
			.catch((err:any)=>{
				ElMessage({
					// elmessage: error.elmessage,
					message: '删除失败',
					type: 'error',
					duration: 3 * 1000
				})
				// addVisible.value = false
			})
		})
		.catch(() => {});
};

// 表格编辑时弹窗和保存
const editVisible = ref(false);
let editForm = reactive({
	id:-1,
	name: '',
	color:''
});
let idx: number = -1;
const handleEdit = (index: number, row: any) => {
	editForm.id = row.id;
	editForm.name = row.name;
	editForm.color = row.color;
	editVisible.value = true;
};
const saveEdit = () => {
	changeLabel(editForm)
		.then((res:any) :any =>{
            if(res.data.code == 200){
                ElMessage({
                    // elmessage: error.elmessage,
                    message: '修改标签成功!',
                    type: 'success',
                    duration: 3 * 1000
                })
            }else{
                ElMessage({
                    // elmessage: error.elmessage,
                    message: '新建失败',
                    type: 'error',
                    duration: 3 * 1000
                })
            }
            editVisible.value = false
            getData();
        })
        .catch((err:any)=>{
            ElMessage({
                // elmessage: error.elmessage,
                message: '新建失败',
                type: 'error',
                duration: 3 * 1000
            })
            editVisible.value = false
        })
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